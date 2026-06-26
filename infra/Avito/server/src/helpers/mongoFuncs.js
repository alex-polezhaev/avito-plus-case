import axios from 'axios';

const mongoHost = process.env.MONGO_HOST;

export const getAllAccs = async () => {
  const url = `${mongoHost}/accounts`;
  const accs = await axios.get(url);
  return accs;
};

export const getAccById = async (id) => {
  const url = `${mongoHost}/accounts/${id}`;
  const acc = await axios.get(url)
    .then((resp) => resp.data)
    .catch((error) => {
      if (error.response.status <= 499) return null;
      throw new Error(error.message);
    });
  return acc;
};

export const updateAccById = async (id, data) => {
  const url = `${mongoHost}/accounts/${id}`;
  const acc = await axios.patch(url, data)
    .then((resp) => resp.data)
    .catch((error) => {
      if (error.response.status <= 499) return null;
      throw new Error(error.message);
    });
  return acc;
};
