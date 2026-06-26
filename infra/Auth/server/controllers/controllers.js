import { randomBytes } from 'crypto';
import axios from 'axios';
import bcrypt from 'bcrypt';
import { nanoid } from 'nanoid';
import jwt from 'jsonwebtoken';
import {
  getUserByEmail,
  updateUserById,
  createUser,
  getUserById,
} from '../src/mongoFuncs.js';

const handleServerError = (res, error) => {
  console.error(error);
  res.status(500).json({ error });
};

const handleAsyncServerError = (res) => (error) => {
  console.error(error);
  res.status(500).json({ error });
};

const emailHost = process.env.EMAIL_HOST;
const backendDomain = process.env.BACKEND_DOMAIN;
const sendLink = (type, link, email) => axios.post(`${emailHost}/email/send`, { type, link, email });

export const registerUserController = async (req, res) => {
  try {
    const { firstname, email, password } = req.body;

    if (!firstname || !email || !password) {
      return res.status(400).json({ message: 'Please fill in the required fields' });
    }

    const duplicateEmail = await getUserByEmail(email);
    if (duplicateEmail && duplicateEmail?.verification?.isVerified) {
      return res.status(400).json({ message: 'A user with this email already exists!' });
    }

    const hashForVerification = randomBytes(20).toString('hex');
    const hashCreatedAtInMS = Date.now();
    const hashedPassword = await bcrypt.hash(password, 10);

    const userData = {
      firstname,
      email,
      password: hashedPassword,
      verification: {
        hash: hashForVerification,
        hashCreatedAtInMS,
        isVerified: false,
      },
      telegram: {
        user_token: `GhbDtN${nanoid(10)}`,
      },
    };

    if (duplicateEmail) {
      const updatedUser = await updateUserById(duplicateEmail._id, userData);
      if (!updatedUser) {
        return res.status(400).json({ message: 'An error occurred, please try again' });
      }

      const verificationLink = `${backendDomain}/verify/${updatedUser._id}?hash=${hashForVerification}`;
      sendLink('verification', verificationLink, email);

      res.status(200).json({ message: `We have sent an email to ${email} with a confirmation` });
    } else {
      const newUser = await createUser(userData);
      if (!newUser) {
        return res.status(400).json({ message: 'An error occurred, please try again' });
      }

      const returnedUser = {
        id: newUser._id,
        firstname: newUser.firstname,
        email: newUser.email,
        balance: newUser.balance,
        telegram: {
          user_token: newUser.telegram.user_token,
        },
      };

      const verificationLink = `${backendDomain}/verify/${returnedUser.id}?hash=${hashForVerification}`;
      sendLink('verification', verificationLink, email);

      res.status(201).json({ message: `We have sent an email to ${email} with a confirmation` });
    }
  } catch (error) {
    handleServerError(res, error);
  }
};

/**
 * verifyUserController
 * Controller for user verification (link delivered by email)
 */

export const verifyUserController = async (req, res) => {
  const { userID } = req.params;
  const { hash } = req.query;

  const user = await getUserById(userID);
  if (!user) {
    return res.status(404).json({ message: 'User not found!' });
  }

  const { verification } = user;

  const mins15inMS = 900000;
  const nowInMS = Date.now();

  if (hash !== verification.hash || verification.hashCreatedAtInMS < nowInMS - mins15inMS) {
    return res.status(400).json({ message: 'Invalid or expired hash' });
  }

  updateUserById(userID, {
    verification: {
      isVerified: true,
      hash: null,
      hashCreatedAtInMS: null,
    },
  })
    .then(() => {
      res.status(200).send(`${process.env.FRONTEND_DOMAIN}/auth/login`);
    })
    .catch(handleAsyncServerError(res));
};

/**
 * loginUserController
 * Controller for user authentication
 */

export const loginUserController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please fill in the required fields!' });
    }

    const user = await getUserByEmail(email);

    if (!user) {
      return res.status(404).json({ message: 'No user found with this email' });
    }

    if (!user.verification.isVerified) {
      return res.status(403).json({ message: 'Your email is not verified' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    const accessToken = jwt.sign(
      {
        user: {
          id: user._id,
          email: user.email,
        },
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      },
    );

    const returnedUser = {
      id: user.id,
      email: user.email,
      firstname: user.firstname,
      balance: user.balance,
      telegram: {
        user_token: user.telegram.user_token,
      },
      transactions: user.transactions
        .filter(({ status }) => status === 'fulfilled'),
    };

    res.status(200).json({ user: returnedUser, token: accessToken });
  } catch (error) {
    handleServerError(error);
  }
};

/**
 * forgotPasswordController
 * Controller for starting the password recovery process (entering the email)
 */

export const forgotPasswordController = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Please provide an email' });
  }

  try {
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(400).json({ message: 'No user found with this email' });
    }

    const otp = Math.floor(1000 + Math.random() * 9000);
    const OTPcreatedAtInMS = Date.now();

    updateUserById(user._id, {
      resetPasswordToken: {
        otp,
        OTPcreatedAtInMS,
      },
    })
      .then(() => {
        const resetLink = `${process.env.FRONTEND_DOMAIN}/auth/change?token=${otp}&userID=${user._id}`;
        sendLink('changePass', resetLink, email);
        res.status(202).json({ message: `A recovery link has been sent to ${email}` });
      });
  } catch (err) {
    handleServerError(res, err);
  }
};

/**
 * resetPasswordController
 * Controller for changing the password
 */

export const resetPasswordController = (req, res) => {
  const {
    userID,
    password,
    confirmPassword,
    token,
  } = req.body;

  if (!password || !confirmPassword) {
    return res.status(400).json({ message: 'Please fill in all required fields' });
  }

  try {
    if (password.localeCompare(confirmPassword) !== 0) return res.status(400).json({ message: 'Passwords do not match' });

    getUserById(userID)
      .then(async ({ resetPasswordToken }) => {
        const { otp, OTPcreatedAtInMS } = resetPasswordToken;
        const mins15inMS = 900000;
        const nowInMS = Date.now();

        if (otp !== token || OTPcreatedAtInMS < nowInMS - mins15inMS) {
          return res.status(400).json({ message: 'More than 15 minutes have passed, please restart the recovery process' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        return updateUserById(userID, {
          password: hashedPassword,
          resetPasswordToken: {
            otp: null,
            OTPcreatedAtInMS: null,
          },
        })
          .then(() => {
            res.json({
              data: 'Password changed successfully',
            });
          });
      });
  } catch (err) {
    handleServerError(res, err);
  }
};
