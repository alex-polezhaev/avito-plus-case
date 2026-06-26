/* eslint-disable max-len */
import axios from 'axios';
import PQueue from 'p-queue';
import fs from 'fs/promises';
import { processAndSaveImage } from '../src/processImage.js';

const handleServerError = (res, error) => {
  console.error(error);
  res.status(500).json({ error });
};

const handleAsyncServerError = () => (error) => {
  throw new Error(error.message);
};

const yandexHost = process.env.YANDEX_HOST;

export const getYandexToken = async (req, res) => {
  const { code, state: accID } = req.query;

  try {
    const link = `${yandexHost}/yandex/token?code=${code}&state=${accID}`;
    const response = await axios.get(link).catch(handleAsyncServerError(res));
    res.status(302).redirect(response.data);
  } catch (error) {
    handleServerError(res, error);
  }
};

/**
 * @api {get} /img/:letter/:imageKey Yandex image buffer
 * @apiName yandexImageBuffer
 * @apiGroup Image
 *
 * @apiParam {String} imageKey
 * @apiParam {String} letter
 */

// Configure the queue with a maximum of 10 concurrent tasks
const queue = new PQueue({ concurrency: 20 });

export const imageBufferController = async (req, res) => {
  if (queue.size > 10000) {
    return res.status(429).send('Too Many Requests');
  }

  const { imageKey, letter } = req.params;

  if (!imageKey || !letter) {
    return res.status(400).end('can not found imageKey or letter');
  }

  // Delete unique URL part
  const [realImageKey] = imageKey.split('*');

  const imagePath = `/app/images/${letter}${imageKey}.jpg`;

  // Check whether the file exists
  return res.sendFile(imagePath, (err) => {
    if (err) {
      res.status(429).send('Loading');

      // Enqueue the task and wait for it to finish
      queue.add(async () => processAndSaveImage(letter, realImageKey, imagePath));
    }
  });
};
