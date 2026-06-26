import fs from 'fs';
import axios from 'axios';

const handleServerError = (res, error) => {
  console.error(error);
  res.status(500).json({ error });
};

const handleAsyncServerError = (res) => (error) => {
  console.error(error);
  res.status(500).json({ error });
};

const googleHost = process.env.GOOGLE_HOST;

export const createNewTableController = async (req, res) => {
  try {
    const { user } = req;
    const { category, title } = req.body;
    const body = { category, title, user };
    const link = `${googleHost}/table`;
    const response = await axios.post(link, body)
      .catch(handleAsyncServerError(res));
    res
      .status(response.status)
      .send(response.statusText);
  } catch (error) {
    handleServerError(res, error);
  }
};

export const addSheetController = async (req, res) => {
  const { category, acc_id: accID } = req.body;
  const body = { category, acc_id: accID };

  try {
    const link = `${googleHost}/table/sheet`;
    const response = await axios.post(link, body)
      .catch(handleAsyncServerError(res));
    res
      .status(response.status)
      .send(response.statusText);
  } catch (error) {
    handleServerError(res, error);
  }
};

export const delSheetController = async (req, res) => {
  const { specID } = req.params;

  try {
    const link = `${googleHost}/table/sheet/${specID}`;
    const response = await axios.delete(link)
      .catch(handleAsyncServerError(res));
    res
      .status(response.status)
      .send(response.statusText);
  } catch (error) {
    handleServerError(res, error);
  }
};

/**
* @api {get} /table/values/:spreadsheetId Get table data
* @apiName getTableData
* @apiGroup Table
*
* @apiParam {String} spreadsheetId google table id
*/

export const getAllTableValuesController = (req, res) => {
  try {
    const { spreadsheetId } = req.params;
    const fileStream = fs.createReadStream(`/app/table-data/${spreadsheetId}.json`);
    fileStream.pipe(res);
  } catch (error) {
    handleServerError(res, error);
  }
};
