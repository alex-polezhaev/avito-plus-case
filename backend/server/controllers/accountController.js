import { editSpreadsheetTitle } from '../services/Google/putDataToTable.js';
import {
  getAccById,
  updateAccById,
  getAccsByUserId,
} from '../services/Mongoose/accountsDB.js';
import { getSpecsByAccId } from '../services/Mongoose/specsDB.js';
import editFolderTitle from '../services/Yandex/editFolderTitle.js';
import { getLogger } from '../config/logger.js';

const logger = getLogger();

const handleServerError = (res) => (error) => {
  logger.error(error);
  res.status(500).json({ message: 'Internal server error' });
};

/**
 * @module controllers/account
 */

/**
 * updateAccByIdController
 * Updates an account. Only these fields may be changed:
 * yandex_token, avito, renewable, archived, automatic.
 */
export const updateAccByIdController = (req, res) => {
  const {
    yandex_token, avito, renewable, archived, automatic,
  } = req.body;

  updateAccById(req.params.accID, {
    yandex_token, avito, renewable, archived, automatic,
  })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch(handleServerError(res));
};

/**
 * getAccsByUserIdController
 * Returns all accounts owned by the authenticated user.
 */
export const getAccsByUserIdController = (req, res) => {
  getAccsByUserId(req.user.id)
    .then((accounts) => {
      res.status(200).json(accounts);
    })
    .catch(handleServerError(res));
};

/**
 * getAccsAndSpecsByUserIdController
 * Returns the user's accounts, each enriched with its specifications.
 */
export const getAccsAndSpecsByUserIdController = (req, res) => {
  getAccsByUserId(req.user.id)
    .then((accounts) => Promise.all(
      accounts.map(async (acc) => {
        let account = { ...acc };
        account = account._doc;
        account.specs = await getSpecsByAccId(acc._id);
        return account;
      }),
    ))
    .then((accounts) => {
      res.status(200).json(accounts);
    })
    .catch(handleServerError(res));
};

/**
 * editAccountTitleController
 * Renames an account and propagates the new title to its Google spreadsheet and
 * its Yandex.Disk folder (when connected).
 */
export const editAccountTitleController = async (req, res) => {
  const { accID } = req.params;
  const { newTitle } = req.body;

  try {
    const acc = await getAccById(accID);

    if (acc.title === newTitle) {
      return res.status(200).send('Account already has the same title');
    }

    // Update the title in the database
    await updateAccById(accID, { title: newTitle })
      .catch((err) => logger.error(err));

    // Update the spreadsheet title
    await editSpreadsheetTitle(acc.table_id, newTitle);

    if (acc.yandex_token.token) {
      // Update the folder name on Yandex.Disk
      await editFolderTitle(acc, newTitle);
    }

    return res.status(200).send('Account title updated successfully');
  } catch (error) { handleServerError(res)(error); }

  return null;
};
