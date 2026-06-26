import createFolder from '../service/createFolder.js';
import editFolderTitle from '../service/editFolderTitle.js';

const handleServerError = (res, error) => {
  console.error(error);
  res.status(500).json({ error });
};

/**
 * @api {patch} /folder Edit folder title
 * @apiName editFolderTitle
 * @apiGroup Folder
 *
 * @apiParam {Object} acc account data
 * @apiParam {String} newTitle new folder name
 */
export const editFolderTitleController = (req, res) => {
  const { acc, newTitle } = req.body;

  if (!acc || !newTitle) {
    return res.status(400).end('can not found acc or newTitle in body');
  }

  try {
    editFolderTitle(acc, newTitle).then((result) => res.status(200).end(result));
  } catch (error) {
    handleServerError(res, error);
  }
};

/**
 * @api {post} /folder/:accID Create new folder
 * @apiName createFolder
 * @apiGroup Folder
 *
 * @apiParam {ObjectId} accID
 */
export const createFolderController = (req, res) => {
  const { accID } = req.params;

  if (!accID) {
    return res.status(400).end('can not found accID');
  }

  try {
    createFolder(accID).then((result) => res.status(200).end(result));
  } catch (error) {
    handleServerError(res, error);
  }
};
