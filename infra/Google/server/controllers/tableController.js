/* eslint-disable no-eval */
import { api } from '../api/index.js';
import addSheet from '../service/addSheet.js';
import { SpreadsheetApp } from '../service/auth/googleApps.js';
import createSpreadSheet from '../service/createSpreadSheet.js';
import { getAllTableValues } from '../service/getDataFromTable.js';
import {
  getSpecById,
  getAccById,
  deleteSpecById,
} from '../addons/mongoFuncs.js';
import deleteSheet from '../service/delSheet.js';

const handleServerError = (res, error) => {
  console.error(error);
  res.status(500).json({ error });
};

/**
 * @api {patch} /table/title Edit table title
 * @apiName editTableTitle
 * @apiGroup Table
 *
 * @apiParam {String} spreadsheetId google table id
 * @apiParam {String} newTitle new google table title
 */
export const editTableTitleController = (req, res) => {
  const { spreadsheetId, newTitle } = req.body;

  if (!spreadsheetId || !newTitle) {
    return res.status(400).end('check spreadsheetId or newTitle');
  }

  try {
    SpreadsheetApp.spreadsheets
      .batchUpdate({
        spreadsheetId,
        requestBody: {
          requests: [
            {
              updateSpreadsheetProperties: {
                properties: {
                  title: `${newTitle} - Avito Plus`,
                },
                fields: '*',
              },
            },
          ],
        },
      })
      .then(({ data }) => {
        res.status(200).json(data);
      });
  } catch (error) {
    handleServerError(res, error);
  }
};

/**
 * @api {post} /table Create new table
 * @apiName createNewTable
 * @apiGroup Table
 *
 * @apiParam {String} category
 * @apiParam {String} title
 * @apiParam {ObjectId} userID
 */
export const createNewTableController = async (req, res) => {
  try {
    const { category: fullName, title, user } = req.body;
    const userID = user.id;

    if (!fullName || !title) {
      return res.status(400).end('Cant get title or category in body');
    }

    const splittedFullName = fullName.split('/');
    const category = splittedFullName[splittedFullName.length - 1];

    // Create the spreadsheet
    const newTable = await createSpreadSheet(category, title, fullName);

    // Create the account for the user
    const acc = await api('mongo').post('/accounts', {
      title,
      user_id: userID,
      table_id: newTable.tableID,
      table_link: newTable.tableLink,
      expire_at: new Date(new Date().setDate(new Date().getDate() + 7)),
    })
      .then((resp) => resp.data)
      .catch((error) => {
        console.error(`Can't create account for user ${userID}`);
        throw error;
      });

    // Create the specification for the account
    await api('mongo').post('/specs', {
      category,
      fullName,
      acc_id: acc._id,
      sheet_id: newTable.sheetID,
      options_sheet_id: newTable.options_sheet_id,
    })
      .catch((error) => {
        console.error(`Can't create spec for user ${userID}`);
        throw error;
      });

    res.status(200).send('New Google SpreadSheet created successfully');
  } catch (error) {
    handleServerError(res, error);
  }
};

/**
 * @api {post} /table/sheet Create new sheet
 * @apiName createNewSheet
 * @apiGroup Table
 *
 * @apiParam {String} category
 * @apiParam {ObjectId} acc_id
 */
export const addSheetController = async (req, res) => {
  try {
    const { category: fullName, acc_id } = req.body;

    if (!fullName || !acc_id) {
      return res.status(400).end('Cant get acc_id or category in body');
    }

    const splittedFullName = fullName.split('/');
    const category = splittedFullName[splittedFullName.length - 1];

    const acc = await api('mongo')
      .get(`/accounts/${acc_id}`)
      .then((resp) => resp.data)
      .catch(() => res.status(400).end('Cant get account data'));

    const { newSheet, enumSheet } = await addSheet(acc.table_id, category, fullName);

    const spec = await api('mongo').post('/specs', {
      category,
      fullName,
      acc_id,
    })
      .then((resp) => resp.data)
      .catch((error) => {
        console.error(error);
        throw new Error('Error in addSheetController in Google service');
      });

    await api('mongo').patch(`/specs/${spec._id}`, {
      sheet_id: newSheet.sheetId,
      options_sheet_id: enumSheet,
    });

    await api('yandex').post(`/folder/${acc._id}`);

    return res.status(200).send('New sheet has been planted');
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
* @apiParam {String} majorDimension
*/

export const getAllTableValuesController = (req, res) => {
  const { spreadsheetId } = req.params;
  let { majorDimension } = req.body;

  if (!majorDimension) {
    majorDimension = 'COLUMNS';
  }

  if (!spreadsheetId) {
    res
      .status(400)
      .end('load spreadsheetId');
  }

  try {
    getAllTableValues(spreadsheetId, majorDimension)
      .then((data) => res.status(200).json(data));
  } catch (error) {
    handleServerError(res, error);
  }
};

export const delSheetController = async (req, res) => {
  const { specID } = req.params;

  try {
    const spec = await getSpecById(specID);
    const acc = await getAccById(spec.acc_id);

    await deleteSheet(acc.table_id, spec.sheet_id);
    await deleteSheet(acc.table_id, spec.options_sheet_id);
    await deleteSpecById(specID);

    return res
      .status(200)
      .send('Sheet has been defused');
  } catch (error) {
    handleServerError(res, error);
  }
};
