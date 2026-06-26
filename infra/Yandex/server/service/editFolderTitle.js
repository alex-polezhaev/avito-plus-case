import axios from 'axios';
import createFolder from './createFolder.js';

const editFolderTitle = async (acc, newTitle) => {
  let error;

  const oldTitle = encodeURIComponent(acc.title);

  const yandexAPI = axios.create({
    baseURL: 'https://cloud-api.yandex.net/v1/disk/resources/move',
    headers: {
      Accept: 'application/json',
      Authorization: `OAuth ${acc.yandex_token.token}`,
    },
    method: 'POST',
  });

  const from = `?from=${encodeURIComponent(`Avito Plus/${oldTitle}`)}`;
  const path = `&path=${encodeURIComponent(`Avito Plus/${newTitle}`)}`;

  await yandexAPI(from + path)
    .then(({ data }) => console.log(data))
    .catch((err) => {
      error = err.response.status;
    });

  if (error >= 400) {
    return createFolder(acc._id);
  }
  return 'Folder title changed successfully';
};

export default editFolderTitle;
