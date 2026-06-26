import { randomBytes } from 'crypto';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { nanoid } from 'nanoid';
import {
  createUser,
  getUserById,
  getUserByEmail,
  updateUserById,
} from '../services/Mongoose/usersDB.js';
import { sendVerificationLink, sendResetLink } from '../services/Email/index.js';
import { getLogger } from '../config/logger.js';

const logger = getLogger();

const handleServerError = (res) => (error) => {
  logger.error(error);
  res.status(500).json({ message: 'Internal server error' });
};

/**
 * @module controllers/user
 */

/**
 * getUserByIdController
 * Returns the authenticated user's profile, exposing only successful
 * transactions sorted by most recent first.
 */
export const getUserByIdController = (req, res) => {
  getUserById(req.user.id)
    .then((user) => {
      const result = { ...user.toObject() };
      result.transactions = result.transactions
        .filter(({ success }) => success)
        .sort((a, b) => b.date - a.date);
      res
        .status(200)
        .json(result);
    }).catch(handleServerError(res));
};

/**
 * updateUserFirstnameByIdController
 * Updates the authenticated user's first name.
 */
export const updateUserFirstnameByIdController = (req, res) => {
  const { firstname } = req.body;
  updateUserById(req.user.id, { firstname })
    .then((result) => {
      res
        .status(200)
        .json(result);
    }).catch(handleServerError(res));
};

/**
 * registerUserController
 * Registers a new user (or re-sends verification for an unverified duplicate),
 * then emails a verification link.
 */
export const registerUserController = async (req, res) => {
  const { firstname, email, password } = req.body;

  if (!firstname || !email || !password) {
    return res.status(400).json({ message: 'Please fill in all required fields' });
  }

  const duplicateEmail = await getUserByEmail(email);
  if (duplicateEmail && duplicateEmail?.verification?.isVerified) {
    return res.status(400).json({ message: 'A user with this email already exists' });
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

    const verificationLink = `${process.env.BACKEND_DOMAIN}/verify/${updatedUser._id}?hash=${hashForVerification}`;
    sendVerificationLink(email, verificationLink);

    res.status(200).json({ message: `We have sent a confirmation email to ${email}` });
  } else {
    const newUser = await createUser(userData);
    if (!newUser) {
      return res.status(400).json({ message: 'An error occurred, please try again' });
    }

    const returnedUser = {
      id: newUser.id,
      firstname: newUser.firstname,
      email: newUser.email,
      balance: newUser.balance,
      telegram: {
        user_token: newUser.telegram.user_token,
      },
    };

    const verificationLink = `${process.env.BACKEND_DOMAIN}/verify/${returnedUser.id}?hash=${hashForVerification}`;
    sendVerificationLink(email, verificationLink);

    res.status(201).json({ message: `We have sent a confirmation email to ${email}` });
  }

  return null;
};

/**
 * verifyUserController
 * Confirms a user account via the link delivered by email.
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
      res.status(301).redirect(`${process.env.FRONTEND_DOMAIN}/auth/login`);
    })
    .catch(handleServerError(res));

  return null;
};

/**
 * loginUserController
 * Authenticates a user and returns a signed JWT.
 */
export const loginUserController = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Please fill in all required fields' });
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
        id: user.id,
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
      .filter(({ success }) => success),
  };

  res.status(200).json({ user: returnedUser, token: accessToken });
  return 'success';
};

/**
 * forgotPasswordController
 * Starts the password-recovery flow by emailing a one-time link.
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
        sendResetLink(email, resetLink);
        res.status(202).json({ message: `A recovery link has been sent to ${email}` });
      });
  } catch (err) {
    logger.error(err);
    handleServerError(res);
  }
  return null;
};

/**
 * resetPasswordController
 * Completes the password-recovery flow.
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
    logger.error(err);
    handleServerError(res);
  }

  return null;
};
