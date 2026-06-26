import { getImageLinks } from '../service/getImageLinks.js';

const handleServerError = (res, error) => {
  console.error(error);
  res.status(500).json({ error });
};

/**
 * @api {get} /folder/images Get images from folder
 * @apiName getImageLinks
 * @apiGroup Image
 *
 * @apiParam {String} acc
 * @apiParam {String} ImageFolder
 * @apiParam {String} sleep
 */
export const getImageLinksController = (req, res) => {
  const { acc, ImageFolder, sleep } = req.body;

  if (!acc || !ImageFolder || !sleep) {
    return res.status(400).end('can not found acc or ImageFolder or sleep');
  }

  try {
    getImageLinks(acc, ImageFolder, sleep).then((result) => res.status(200).end(result));
  } catch (error) {
    handleServerError(res, error);
  }
};
