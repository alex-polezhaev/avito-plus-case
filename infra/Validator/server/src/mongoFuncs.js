import axios from 'axios';

const mongoHost = process.env.MONGO_HOST;

export const getAccountByUserIdAndAccId = async (userID, accID) => {
  const url = `${mongoHost}/account/${userID}/${accID}`;
  const acc = await axios.get(url)
    .then((resp) => resp.data)
    .catch((error) => {
      if (!error.response) throw new Error(error.message);
      if (error.response.status <= 499) return error.response.data.code;
      throw new Error(error.message);
    });
  return acc;
};

export const getSpecByUserIdAndSpecId = async (userID, specID) => {
  const url = `${mongoHost}/spec/${userID}/${specID}`;
  const acc = await axios.get(url)
    .then((resp) => resp.data)
    .catch((error) => {
      if (!error.response) throw new Error(error.message);
      if (error.response.status <= 499) return error.response.data.code;
      throw new Error(error.message);
    });
  return acc;
};
