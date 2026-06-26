import axios from 'axios';
import fs from 'fs';
import loadXML from '../services/XML/loadXML.js';
import exhangeCodeToToken from '../services/Yandex/exhangeCodeToToken.js';
import {
  updateAccById,
  getAccById, getAllAccs,
  getDataForAvitoFuncs,
  createAcc,
  findAccsToRenew,
} from '../services/Mongoose/accountsDB.js';
import createSpreadSheet from '../services/Google/createSpreadSheet.js';
import {
  getSpecById, updateSpecById, deleteSpecById, createSpec,
} from '../services/Mongoose/specsDB.js';
import createFolder from '../services/Yandex/createFolder.js';
import { setAvitoSettings, getProfile } from '../services/Avito/setAvitoSettings.js';
import addSheet from '../services/Google/addSheet.js';
import loadAvitoStats from '../services/Avito/loadAvitoStats.js';
import loadAvitoReport from '../services/Avito/loadAvitoReport.js';
import deleteSheet from '../services/Google/delSheet.js';
import paymentInit from '../services/Payment/Tinkoff/paymentInit.js';
import {
  getUserById, getUserByOrderId, updateUserById,
} from '../services/Mongoose/usersDB.js';
import {
  addValidateMarks,
  plusDaysToExpireAt,
  setDate,
} from '../services/Date/index.js';
import updateTableData from '../services/Google/index.js';
import { getMoneyDiffBetweenTarif, writeOffBalanceTransaction } from '../services/Payment/transactions.js';
import { getAllTableValues } from '../services/Google/getDataFromTable.js';
import { oneMinuteTableScripts } from '../services/oneMinuteTableScripts.js';
import { getLogger } from '../config/logger.js';

const logger = getLogger('CRON');

const handleServerError = (res) => (error) => {
  logger.error(error);
  res.status(500).json({ message: 'Internal server error' });
};

const sleep = (time) => new Promise((res) => { setTimeout(res, time); });

/**
 * @module controllers/services
 */

// Avito

/**
 * setAvitoSettingsController
 * Configures the XML feed URL and autoload settings for an Avito account, then
 * fetches and stores the Avito profile data.
 */
export const setAvitoSettingsController = async (req, res) => {
  try {
    await updateAccById(req.params.accID, req.body);
    const accData = await getAccById(req.params.accID);
    setAvitoSettings(
      accData.avito.clientId,
      accData.avito.clientSecret,
      `${process.env.BACKEND_DOMAIN}/xml/${accData._id}`,
    );
    const {
      id, name, phone, profile_url: profileUrl, email,
    } = await getProfile(accData.avito.clientId, accData.avito.clientSecret);
    return updateAccById(req.params.accID, {
      avito: {
        id,
        name,
        phone,
        profile_url: profileUrl,
        email,
        clientId: accData.avito.clientId,
        clientSecret: accData.avito.clientSecret,
      },
    }).then(() => {
      res
        .status(200)
        .send('Avito settings updated successfully');
    }).catch(handleServerError(res));
  } catch (error) {
    return handleServerError(res)(error);
  }
};

// Google

/**
 * createNewTableController
 * Provisions a brand-new account: a Google spreadsheet, the account record and
 * its first specification, all in one shot.
 */
export const createNewTableController = async (req, res) => {
  const userID = req.user.id;
  const { title, category } = req.body;

  if (!title || !category) {
    return res
      .status(400)
      .send('Missing title or category in request body');
  }

  try {
    // Create the spreadsheet
    const newTable = await createSpreadSheet(category, title);

    // Create the account for the user
    const acc = await createAcc({
      title,
      user_id: userID,
      table_id: newTable.tableID,
      table_link: newTable.tableLink,
    });

    // Create the specification for the account
    await createSpec({
      category,
      acc_id: acc._id,
      sheet_id: newTable.sheetID,
      options_sheet_id: newTable.options_sheet_id,
    });
  } catch (err) {
    logger.error(err);
    return res
      .status(400)
      .send('Error while creating the spreadsheet, account or specification');
  }

  return res
    .status(200)
    .send('New Google spreadsheet created successfully');
};

export const addSheetController = async (req, res) => {
  const { category, acc_id } = req.body;

  const acc = await getAccById(acc_id);

  if (acc.length === 0) {
    return res
      .status(404)
      .send('Account not found');
  }

  try {
    const { newSheet, enumSheet } = await addSheet(acc.table_id, category);

    const spec = await createSpec(req.body);

    await updateSpecById(spec._id, { sheet_id: newSheet.sheetId, options_sheet_id: enumSheet });

    await createFolder(acc._id);

    return res
      .status(200)
      .send('New sheet has been planted');
  } catch (error) {
    return handleServerError(res)(error);
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
    return handleServerError(res)(error);
  }
};

/**
 * paymentInitController
 * --------------------
 * Returns a Tinkoff payment link and records a pending transaction for the user.
 * @param {Number} amount - rounded payment amount in RUB
 * @param {String} userID - payment initiator
 * @returns Tinkoff payment link
 */
export const paymentInitController = (req, res) => {
  const { amount, userID } = req.body;
  paymentInit(amount, userID)
    .then((PaymentURL) => {
      res.status(200).json({ PaymentURL });
    }).catch(handleServerError(res));
};

/**
 * catchPaymentController
 * @function
 * @param  {String} Success From the Tinkoff query
 * @param  {String} Message From the Tinkoff query
 * @param  {String} OrderId From the Tinkoff query
 * @param  {String} Amount From the Tinkoff query
 * @returns Redirect to the frontend with a toast query
 */
export const catchPaymentController = async (req, res) => {
  const {
    Success, Message, OrderId, Amount,
  } = req.query;

  try {
    const success = Success === 'true';
    const roundAmount = Amount / 100;
    const [user] = await getUserByOrderId(OrderId);
    if (!user) {
      return res
        .status(404)
        .json({ message: 'User not found!' });
    }

    // Update the transactions array
    const newTransactions = user.transactions.map((transaction) => {
      const { order_id: currOrderID } = transaction;
      if (currOrderID === OrderId) {
        return {
          ...transaction.toObject(),
          success,
          message: Message,
        };
      }
      return transaction;
    });

    // New balance depending on success
    const newBalance = success ? user.balance + (+Amount / 100) : user.balance;

    // Persist the new data to the database
    await updateUserById(user._id, {
      balance: newBalance,
      transactions: newTransactions,
    });

    if (success) {
      res.status(301).redirect(`${process.env.FRONTEND_DOMAIN}/subscription?positiveToast=${roundAmount}`);
    } else {
      res.status(301).redirect(`${process.env.FRONTEND_DOMAIN}/subscription?negativeToast=${roundAmount}`);
    }
  } catch (error) {
    return handleServerError(res)(error);
  }
  return null;
};

// XML

export const loadXMLController = (req, res) => {
  const { accID } = req.params;

  loadXML(accID).then((xmlView) => {
    res.set('Content-Type', 'text/xml');
    res.send(xmlView);
  }).catch(handleServerError(res));
};

// Yandex

export const getYandexToken = (req, res) => {
  const { code, state: accID } = req.query;
  exhangeCodeToToken(code)
    .then(({ token, expirationDate, refreshToken }) => updateAccById(accID, {
      yandex_token: {
        token,
        refresh_token: refreshToken,
        expiration_date: expirationDate,
      },
    }).then(() => createFolder(accID))
      .then(() => {
        res.status(301).redirect(`${process.env.FRONTEND_DOMAIN}/accounts`);
      })
      .catch(handleServerError(res)));
};

export const imageBufferController = (req, res) => {
  const { imageKey, letter } = req.params;
  axios.get(`https://cloud-api.yandex.net/v1/disk/public/resources?public_key=https://disk.yandex.ru/${letter}/${imageKey}`)
    .then(({ data }) => axios.get(data.file, { responseType: 'arraybuffer' }))
    .then((result) => res.status(200).contentType('image/jpeg').send(result.data))
    .catch((error) => {
      logger.error(error.message);
      logger.error(`Can't load image with key - ${imageKey} and url - ${error.config?.url}`);
    });
};

export const simpleChangeTariffController = async (req, res) => {
  try {
    const { accID, newMonthPrice } = req.body;
    const acc = await getAccById(accID);

    if (!acc) {
      return res.status(400).json({ message: 'Account not found' });
    }
    if (![1490, 2900, 3900, 5900]
      .includes(Number(newMonthPrice))) {
      return res.status(400).json({ message: 'Invalid tariff price' });
    }
    if (acc.month_price === Number(newMonthPrice)) {
      return res.status(200).json({ message: 'Tariff is the same as you have now' });
    }
    if (!accID || !newMonthPrice) {
      return res.status(400).json({ message: 'accID | newMonthPrice not found in request' });
    }

    const { month_price, expire_at } = acc;
    const writeOffMoney = getMoneyDiffBetweenTarif(month_price, newMonthPrice, expire_at);

    const userBalance = await getUserById(acc.user_id)
      .then(({ balance }) => balance);

    if (userBalance < writeOffMoney) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }

    await updateUserById(
      acc.user_id,
      { balance: userBalance - writeOffMoney },
    );

    await updateAccById(accID, {
      month_price: newMonthPrice,
      expire_at: setDate(30),
    });

    return res.status(200).json({ message: 'Simple tariff changed successfully' });
  } catch (err) { return handleServerError(res)(err); }
};

export const simpleRenewTariffController = async (req, res) => {
  try {
    const { accID } = req.body;

    if (!accID) {
      return res.status(400).json({ message: 'accID not found in request' });
    }

    const acc = await getAccById(accID);
    if (!acc) {
      return res.status(400).json({ message: 'Cannot find user or account in database' });
    }

    const user = await getUserById(acc.user_id);
    if (!user) {
      return res.status(400).json({ message: 'Cannot find user or account in database' });
    }

    if (user.balance < acc.month_price) {
      return res.status(400).json({ message: 'Insufficient balance to renew the tariff' });
    }

    await updateUserById(user._id, { balance: user.balance - acc.month_price });
    await updateAccById(
      acc._id,
      { expire_at: plusDaysToExpireAt(acc.expire_at, 30) },
    );
    await writeOffBalanceTransaction(user._id, acc.title, acc.month_price);

    return res.status(200).json({ message: 'Simple tariff renewed successfully' });
  } catch (err) { return handleServerError(res)(err); }
};

/**
 * updateTableDataInStorageController
 * Loads data from the active spreadsheets into local server storage so the XML
 * feed can be served quickly.
 * 2 Google requests per pass every 1.2 seconds (100 requests/minute limit).
 * CRON: every 55 minutes.
 */
export const updateTableDataInStorageController = async (req, res) => {
  const accsArray = await getAllAccs();
  // Only accounts within the limit, with an active subscription and a connected Avito profile.
  const markedAccs = await addValidateMarks([...accsArray]);
  const validAccs = markedAccs.filter((acc) => {
    const { valid_by_date, valid_by_avito, valid_by_limit } = acc;
    if (!valid_by_date) { logger.info(`Invalid by subscription in updateStorage: ${acc.title}`); return false; }
    if (!valid_by_avito) { logger.info(`Invalid by Avito in updateStorage: ${acc.title}`); return false; }
    if (!valid_by_limit) { logger.info(`Invalid by limit in updateStorage: ${acc.title}`); return false; }
    logger.info(`Passed validation in updateStorage: ${acc.title}`);
    return true;
  });

  const requests = validAccs.map(async (acc, index) => {
    try {
      const timeToSleep = (index + 1) * 1200;
      await sleep(timeToSleep);
      fs.writeFile(`./server/services/Google/tablesData/${acc._id}.json`, JSON.stringify(await getAllTableValues(acc.table_id, 'COLUMNS')), () => logger.info(`File written: ${acc.title}`));
    } catch (err) {
      logger.error(`Error while writing table-values file: ${acc.title} Message: ${err.message}`);
    } return null;
  });

  Promise.all(requests)
    .then(() => {
      res.status(200).json({ message: `Loading of table-data to local storage is done for ${validAccs.length} accounts of total ${accsArray.length}` });
    })
    .catch(handleServerError(res));
};

/**
 * startAvitoReportAndStatController
 * Loads the Avito autoload report and statistics for active accounts.
 * 3 Google requests per pass every 2.0 seconds (90 requests/minute limit).
 * CRON: every 45 minutes.
 * Callback order matters: loadAvitoStats relies on the Avito ids written into
 * the sheet by loadAvitoReport.
 */
export const startAvitoReportAndStatController = async (req, res) => {
  const accsArray = await getAllAccs();
  // Only accounts with an active subscription and a connected Avito profile.
  const markedAccs = await addValidateMarks([...accsArray]);
  const validAccs = markedAccs.filter((acc) => {
    const { valid_by_date, valid_by_avito } = acc;
    if (!valid_by_date) { logger.info(`Invalid by subscription in avitoReportStat: ${acc.title}`); return false; }
    if (!valid_by_avito) { logger.info(`Invalid by Avito in avitoReportStat: ${acc.title}`); return false; }
    logger.info(`Passed validation in avitoReportStat: ${acc.title}`);
    return true;
  });

  const requests = validAccs.map(async (acc, index) => {
    const timeToSleep = (index + 1) * 2000;
    await sleep(timeToSleep);

    const callbacks = [loadAvitoReport, loadAvitoStats];
    getDataForAvitoFuncs(acc._id)
      .then((data) => {
        const fieldsToChange = ['AvitoStatus', 'AvitoIdStat', 'AvitoDateEnd', 'Url', 'Messages', 'AutoloadFinishedAt', 'UniqViews270', 'UniqContacts270', 'CV270', 'UniqFavorites270', 'UniqViews30', 'UniqContacts30', 'CV30', 'UniqFavorites30', 'UniqViews7', 'UniqContacts7', 'CV7', 'UniqFavorites7', 'UniqViews1', 'UniqContacts1', 'CV1', 'UniqFavorites1'];
        updateTableData(data.spreadsheetId, callbacks, fieldsToChange, data);
      });
  });

  Promise.all(requests)
    .then(() => {
      res.status(200).json({ message: `Loading of avito report and stat is done for ${validAccs.length} accounts of total ${accsArray.length}` });
    })
    .catch(handleServerError(res));
};

/**
 * startOneMinuteScriptsController
 * Runs the one-minute scripts in first-come-first-served order.
 * 3 Google requests per pass every 2.0 seconds (90 requests/minute limit).
 * CRON: every 1 minute.
 */
export const startOneMinuteScriptsController = async (req, res) => {
  const accsArray = await getAllAccs();
  // Only accounts with an active subscription.
  const markedAccs = await addValidateMarks([...accsArray]);
  const validAccs = markedAccs.filter((acc) => {
    const { valid_by_date } = acc;
    if (!valid_by_date) { logger.info(`Invalid by subscription in oneMinuteScripts: ${acc.title}`); return false; }
    logger.info(`Passed validation in oneMinuteScripts: ${acc.title}`);
    return true;
  });

  const requests = validAccs.map(async (acc, index) => {
    try {
      const timeToSleep = (index + 1) * 2000;
      await sleep(timeToSleep);

      oneMinuteTableScripts(acc);
    } catch (err) {
      logger.error(`Error while starting one-minute scripts for account: ${acc.title} Message: ${err.message}`);
    } return null;
  });

  Promise.all(requests)
    .then(() => {
      res.status(200).json({ message: `Loading of one-minute scripts is done for ${validAccs.length} accounts of total ${accsArray.length}` });
    })
    .catch(handleServerError(res));
};

export const autoRenewSubController = async (req, res) => {
  const accounts = await findAccsToRenew();

  if (accounts) {
    accounts.forEach(async (acc) => {
      try {
        const user = await getUserById(acc.user_id);

        if (user.balance >= acc.month_price) {
          const newBalance = user.balance - acc.month_price;
          updateUserById(user._id, { balance: newBalance });
          updateAccById(acc._id, { expire_at: setDate(30) });
          logger.info(`Tariff automatically renewed for account ${acc.title}`);
        }
      } catch (err) {
        logger.error(err);
      }
    });
  }

  res
    .status(200)
    .send('Starting tariff renewing');
};
