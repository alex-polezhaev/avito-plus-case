import axios from 'axios';

const mongoHost = process.env.MONGO_HOST;

export const getUserById = async (id) => {
  const url = `${mongoHost}/users/${id}`;
  const user = await axios.get(url)
    .then((resp) => resp.data)
    .catch((err) => {
      if (err.response.status === 400) return null;
      throw err;
    });
  return user;
};

export const getUserByEmail = async (email) => {
  const url = `${mongoHost}/users/byEmail/${email}`;
  const user = await axios.get(url)
    .then((resp) => resp.data)
    .catch((err) => {
      if (err.response.status === 404) return null;
      throw err;
    });
  return user;
};

export const updateUserById = async (id, data) => {
  const url = `${mongoHost}/users/${id}`;
  const response = await axios.patch(url, data);
  return response.data;
};

export const createUser = async (data) => {
  const url = `${mongoHost}/users`;
  const user = await axios.post(url, data)
    .then((resp) => resp.data)
    .catch(() => null);
  return user;
};
