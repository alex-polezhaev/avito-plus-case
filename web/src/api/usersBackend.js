import axios from 'axios';

const apiHostname = import.meta.env.VITE_API_URL;

export const registerUser = (body) =>
  axios.post(`${apiHostname}/register`, body).then(({ data }) => data);

export const loginUser = (body) =>
  axios.post(`${apiHostname}/login`, body).then(({ data }) => data);

export const forgotPassword = (body) =>
  axios.post(`${apiHostname}/forgot`, body).then(({ data }) => data);

export const resetPassword = (body) =>
  axios.post(`${apiHostname}/reset`, body).then(({ data }) => data);

export const editUserData = (token, body) =>
  axios
    .patch(`${apiHostname}/users`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(({ data }) => data);
