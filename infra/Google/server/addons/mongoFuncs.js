import axios from 'axios';

const mongoHost = process.env.MONGO_HOST;

export const getAccById = async (id) => {
  const url = `${mongoHost}/accounts/${id}`;
  const acc = await axios.get(url)
    .then((resp) => resp.data);
  return acc;
};

export const getSpecById = async (id) => {
  const url = `${mongoHost}/specs/${id}`;
  const spec = await axios.get(url)
    .then((resp) => resp.data);
  return spec;
};

export const deleteSpecById = async (id) => {
  const url = `${mongoHost}/specs/${id}`;
  const spec = await axios.delete(url)
    .then((resp) => resp.data);
  return spec;
};
