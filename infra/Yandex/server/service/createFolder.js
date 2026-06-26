/* eslint no-await-in-loop: 0 */
import axios from 'axios';
import { api } from '../api/index.js';

const createFolder = async (accID) => {
  const acc = await api('mongo')
    .get(`/accounts/${accID}`)
    .then((resp) => resp.data);

  if (!acc?.yandex_token?.token) {
    return null;
  }

  const url = 'https://cloud-api.yandex.net/v1/disk/resources';
  const makeReqToCreateFolder = (path) => axios
    .put(
      `${url}?path=${path}`,
      null,
      {
        headers: {
          Accept: 'application/json',
          Authorization: `OAuth ${acc.yandex_token.token}`,
        },
      },
    );

  const folder = encodeURIComponent(acc.title);
  const partsOfPath = ['Avito Plus', folder];
  for (let i = 0; i < partsOfPath.length; i += 1) {
    const path = partsOfPath.slice(0, i + 1).join('/');
    await makeReqToCreateFolder(path)
      .then((response) => {
        if (response.status < 200 && response.status > 299) {
          throw new Error(response.statusText);
        }
        console.log(`**********\nFolder created successfully on the path ${path}.\nAccount ID - ${accID}\n**********`);
      })
      .catch((error) => {
        if (error.response.status && error.response.status === 409) {
          console.log(`**********\nThe folder already exists on the path ${path} or parent folders are not created.\nMessage - ${error.response.data.message}\nAccount ID - ${accID}\n**********`);
          return;
        }
        console.error(error);
        throw new Error(error.message);
      });
  }
};

export default createFolder;
