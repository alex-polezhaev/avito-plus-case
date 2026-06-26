import axios from 'axios';
import { getAccById } from '../Mongoose/accountsDB.js';
import { getLogger } from '../../config/logger.js';

const logger = getLogger();

const createFolder = async (accID) => {
  const acc = await getAccById(accID);

  const folder = encodeURIComponent(acc.title);

  return axios
    .put(`https://cloud-api.yandex.net/v1/disk/resources?path=Avito Plus/${folder}`, null, {
      headers: {
        Accept: 'application/json',
        Authorization: `OAuth ${acc.yandex_token.token}`,
      },
    })
    .then(({ data }) => data.message)
    .catch(({ response }) => {
      logger.error(`Failed to create a folder for the account: ${response.data.message}`);
    });
};

export default createFolder;
