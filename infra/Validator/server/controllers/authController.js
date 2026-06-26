import axios from 'axios';

const handleServerError = (res, error) => {
  console.error(error);
  res.status(500).json({ error });
};

const authHost = process.env.AUTH_HOST;

export const registerUserController = async (req, res) => {
  const { firstname, email, password } = req.body;
  const body = { firstname, email, password };
  try {
    const link = `${authHost}/register`;

    let status = null;
    let data = null;
    await axios.post(link, body)
      .then((response) => {
        status = response.status;
        data = response.data;
      })
      .catch((error) => {
        if (error.response.status <= 499) {
          status = error.response.status;
          data = error.response.data;
          return;
        }
        throw new Error(error.message);
      });

    res
      .status(status)
      .json(data);
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
  try {
    const link = `${authHost}/verify/${userID}?hash=${hash}`;

    let status = null;
    let data = null;
    await axios.get(link)
      .then((response) => {
        status = 302;
        data = response.data;
      })
      .catch((error) => {
        if (error.response.status <= 499) {
          status = error.response.status;
          data = error.response.data;
          return;
        }
        throw new Error(error.message);
      });

    res
      .status(status)
      .redirect(data);
  } catch (error) {
    handleServerError(res, error);
  }
};

/**
   * loginUserController
   * Controller for user authentication
   */

export const loginUserController = async (req, res) => {
  const { email, password } = req.body;
  const body = { email, password };
  try {
    const link = `${authHost}/login`;

    let status = null;
    let data = null;
    await axios.post(link, body)
      .then((response) => {
        status = response.status;
        data = response.data;
      })
      .catch((error) => {
        if (error.response.status <= 499) {
          status = error.response.status;
          data = error.response.data;
          return;
        }
        throw new Error(error.message);
      });

    res
      .status(status)
      .json(data);
  } catch (error) {
    handleServerError(res, error);
  }
};

/**
   * forgotPasswordController
   * Controller for starting the password recovery process (entering the email)
   */

export const forgotPasswordController = async (req, res) => {
  const { email } = req.body;
  const body = { email };
  try {
    const link = `${authHost}/forgot`;

    let status = null;
    let data = null;
    await axios.post(link, body)
      .then((response) => {
        status = response.status;
        data = response.data;
      })
      .catch((error) => {
        if (error.response.status <= 499) {
          status = error.response.status;
          data = error.response.data;
          return;
        }
        throw new Error(error.message);
      });

    res
      .status(status)
      .json(data);
  } catch (error) {
    handleServerError(res, error);
  }
};

/**
   * resetPasswordController
   * Controller for changing the password
   */

export const resetPasswordController = async (req, res) => {
  const {
    userID,
    password,
    confirmPassword,
    token,
  } = req.body;
  const body = {
    userID,
    password,
    confirmPassword,
    token,
  };
  try {
    const link = `${authHost}/reset`;

    let status = null;
    let data = null;
    await axios.post(link, body)
      .then((response) => {
        status = response.status;
        data = response.data;
      })
      .catch((error) => {
        if (error.response.status <= 499) {
          status = error.response.status;
          data = error.response.data;
          return;
        }
        throw new Error(error.message);
      });

    res
      .status(status)
      .json(data);
  } catch (error) {
    handleServerError(res, error);
  }
};
