import axios from 'axios';
import { nanoid } from 'nanoid';

const sleep = (time) => new Promise((res) => { setTimeout(res, time); });

export const getImageLinks = async (acc, folder, timeToSleep) => {
  await sleep(timeToSleep);

  const yandexAPI = axios.create({
    baseURL: 'https://cloud-api.yandex.net/v1/disk/resources',
    headers: {
      Accept: 'application/json',
      Authorization: `OAuth ${acc.yandex_token.token}`,
    },
  });

  const folderPath = `${acc.title}/${folder}`;
  let error = false;

  // Get image paths from the folder
  const pathsArray = await yandexAPI
    .get(`?path=Avito Plus/${encodeURIComponent(folderPath)}`)
    .then(async ({ data }) => data._embedded.items
      .map((file) => file.path.replace('disk:/', '')))
    .catch((err) => { error = err?.response?.status; });

  if (error === 404) { return '❗️Folder not found'; }
  if (error === 400) { return '❗️Invalid data'; }
  if (error === 403) { return '❗️Increase the Disk capacity'; }
  if (error === 423) { return '❗️Maintenance in progress'; }
  if (error === 503) { return '❗️Service temporarily unavailable'; }
  if (error === 429) { return '❗️Too many requests'; }
  if (error) { return '❗️Please try again'; }

  // Publish the photos using the paths
  await Promise
    .all(pathsArray?.map((path) => yandexAPI
      .put(`/publish?path=${encodeURIComponent(path)}`)))
    .catch((err) => { error = err; });

  if (error) { return '❗️There was a problem uploading the photos - contact support'; }

  // Get the public urls
  const publicUrls = await Promise
    .all(pathsArray?.map((path) => yandexAPI
      .get(`?path=${encodeURIComponent(path)}`)
      .then(({ data }) => data.public_url)))
    .catch((err) => { error = err; });

  if (error) { return '❗️There was a problem uploading the photos - contact support'; }

  // Validate the links
  const promises = publicUrls.map((url) => axios.get(url));
  await Promise.all(promises)
    .catch((err) => { error = err; });

  if (error) { return '❗️Please try again'; }

  // Make the link unique
  const uniqueUrls = publicUrls.map((url) => `${url}*${nanoid(8)}`);

  // Adapt the link for the spreadsheet
  const result = uniqueUrls
    .join('\n')
    .replaceAll('https://yadi.sk', `${process.env.BACKEND_DOMAIN}/img`);
  if (!result) { return '❗️The folder has no photos'; }
  return result;
};
