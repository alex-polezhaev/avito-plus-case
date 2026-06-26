import axios from 'axios';
import sharp from 'sharp';
import fs from 'fs/promises';

/* eslint-disable max-len */
// Assumes that the random, randomWithStep and randomWithSmallStep functions are already implemented in your code.

const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
const randomWithStep = (min, max) =>
  Math.floor(Math.random() * ((max - min) * 10 + 1) + min * 10) / 10;
const randomWithSmallStep = (min, max) =>
  Math.floor(Math.random() * ((max - min) * 100 + 1) + min * 100) / 100;

export const processAndSaveImage = async (letter, realImageKey, imagePath) => {
  try {
    console.log(`Starting download ${imagePath}`);

    try {
      await fs.access(imagePath);
      return;
    } catch (error) {}

    // Fetch the file from the Yandex Disk API
    const file = await axios
      .get(
        `https://cloud-api.yandex.net/v1/disk/public/resources?public_key=https://disk.yandex.ru/${letter}/${realImageKey}`
      )
      .then(({ data }) => axios.get(data.file, { responseType: 'arraybuffer' }))
      .then(({ data }) => data);

    const original = sharp(file);
    const { height, width } = await original.metadata();

    const percent = randomWithStep(0.1, 2) / 100;
    const widthOffset = Math.floor(width * percent);
    const heightOffset = Math.floor(height * percent);

    const result = await original
      .rotate(randomWithSmallStep(-1.2, 1.2))
      .extract({
        left: widthOffset,
        top: heightOffset,
        width: width - widthOffset * 2,
        height: height - heightOffset * 2,
      })
      .jpeg({ quality: random(25, 40) })
      .withExif({})
      .withMetadata({})
      .sharpen({
        sigma: randomWithSmallStep(0.01, 3),
        m1: randomWithSmallStep(0.01, 3),
        m2: randomWithSmallStep(0.01, 3),
        x1: randomWithSmallStep(0.01, 3),
        y2: randomWithSmallStep(0.01, 3),
        y3: randomWithSmallStep(0.01, 3),
      })
      .median(random(1, 3))
      .modulate({
        brightness: randomWithSmallStep(0.9, 1.1),
        saturation: randomWithSmallStep(0.9, 1.1),
      })
      .toBuffer();

    // Save the file
    await fs.writeFile(imagePath, result, 'binary');

    console.log(`Image saved to path: ${imagePath}`);
  } catch (error) {
    console.error('Image processing error:', error);
  }
};
