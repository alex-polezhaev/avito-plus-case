import axios from 'axios';

const mongoHost = process.env.MONGO_HOST;

export const newTransactionByUserId = async (id, data) => {
  const url = `${mongoHost}/users/transactions/${id}`;
  const user = await axios.post(url, data)
    .then((resp) => resp.data);
  return user;
};

export const getUserByOrderId = async (id) => {
  const url = `${mongoHost}/users/byTransaction/${id}`;
  const user = await axios.get(url)
    .then((resp) => resp.data);
  return user;
};

export const updateUserById = async (id, data) => {
  const url = `${mongoHost}/users/${id}`;
  const user = await axios.patch(url, data)
    .then((resp) => resp.data);
  return user;
};

export const getAccById = async (id) => {
  const url = `${mongoHost}/accounts/${id}`;
  const acc = await axios.get(url)
    .then((resp) => resp.data);
  return acc;
};

export const getUserById = async (id) => {
  const url = `${mongoHost}/users/${id}`;
  const user = await axios.get(url)
    .then((resp) => resp.data);
  return user;
};

export const updateAccById = async (id, data) => {
  const url = `${mongoHost}/accounts/${id}`;
  const acc = await axios.patch(url, data)
    .then((resp) => resp.data);
  return acc;
};
