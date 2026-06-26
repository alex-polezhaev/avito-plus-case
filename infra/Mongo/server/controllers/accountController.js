/* eslint-disable no-unused-expressions */
import mongoose from 'mongoose';
import Account from '../models/Account.js';

const handleServerError = (res, error) => {
  console.error(error);
  res.status(500).json({ error });
};

/**
 * @api {get} /accounts Get all accounts
 * @apiName getAllAccs
 * @apiGroup Accounts
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [{
        "automatic": {
            "renew_blocked": false,
            "renew_old": false
        },
        "_id": "658aaa64807072b52854a887",
        "title": "true",
        "user_id": "323232",
        "archived": false,
        "renewable": true,
        "month_price": 1490,
        "createdAt": "2023-12-26T10:26:44.965Z",
        "updatedAt": "2023-12-26T10:26:44.965Z"
    }]
 */
export const getAllAccsController = async (req, res) => {
  try {
    Account.find()
      .sort([['createdAt', -1]])
      .then((accounts) => {
        res.status(200).json(accounts);
      });
  } catch (error) {
    handleServerError(res, error);
  }
};

/**
 * @api {get} /accounts/:accID Get account by accID
 * @apiName getAccById
 * @apiGroup Accounts
 *
 * @apiParam {ObjectId} accID mongo db object id
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
        "automatic": {
            "renew_blocked": false,
            "renew_old": false
        },
        "_id": "658aaa64807072b52854a887",
        "title": "true",
        "user_id": "323232",
        "archived": false,
        "renewable": true,
        "month_price": 1490,
        "createdAt": "2023-12-26T10:26:44.965Z",
        "updatedAt": "2023-12-26T10:26:44.965Z"
    }
 */
export const getAccByIdController = async (req, res) => {
  const { accID } = req.params;

  // Reject if the id is not a valid mongo id
  if (!mongoose.Types.ObjectId.isValid(accID)) {
    return res.status(400).end('invalid mongo id');
  }

  try {
    const account = await Account.findById(accID);
    account
      ? res.status(200).json(account)
      : res.status(404).end('account not found');
  } catch (error) {
    handleServerError(res, error);
  }
};

/**
 * @api {patch} /accounts/:accID Update account by accID
 * @apiName updateAccById
 * @apiGroup Accounts
 *
 * @apiParam {ObjectId} accID mongo db object id
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
*     [{
    "automatic": {
        "renew_blocked": false,
        "renew_old": false
    },
    "_id": "658aaa64807072b52854a887",
    "title": "true",
    "user_id": "323232",
    "archived": false,
    "renewable": true,
    "month_price": 1490,
    "createdAt": "2023-12-26T10:26:44.965Z",
    "updatedAt": "2023-12-26T10:26:44.965Z"
    }]
 */
export const updateAccByIdController = async (req, res) => {
  try {
    const payload = req.body;
    const { accID } = req.params;

    // Reject if the payload is empty
    if (Object.keys(payload).length === 0 || !payload) {
      return res.status(400).end('empty body payload');
    }

    // Reject if the id is not a valid mongo id
    if (!mongoose.Types.ObjectId.isValid(accID)) {
      return res.status(400).end('invalid mongo id');
    }

    const account = await Account.findByIdAndUpdate(accID, payload);
    account
      ? res.status(200).json(account)
      : res.status(404).end('account not found');
  } catch (error) {
    handleServerError(res, error);
  }
};

/**
 * @api {patch} /accounts/:accID Update account by accID
 * @apiName updateAccById
 * @apiGroup Accounts
 *
 * @apiParam {ObjectId} accID mongo db object id
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
*     [{
    "automatic": {
        "renew_blocked": false,
        "renew_old": false
    },
    "_id": "658aaa64807072b52854a887",
    "title": "true",
    "user_id": "323232",
    "archived": false,
    "renewable": true,
    "month_price": 1490,
    "createdAt": "2023-12-26T10:26:44.965Z",
    "updatedAt": "2023-12-26T10:26:44.965Z"
    }]
 */
export const getAccsByUserIdController = async (req, res) => {
  const { userID } = req.params;

  // Reject if the id is not a valid mongo id
  if (!mongoose.Types.ObjectId.isValid(userID)) {
    return res.status(400).end('invalid mongo id');
  }

  try {
    const account = await Account.find({ user_id: userID }).sort([
      ['createdAt', -1],
    ]);
    account.length > 0
      ? res.status(200).json(account)
      : res.status(200).json([]);
  } catch (error) {
    handleServerError(res, error);
  }
};

/**
 * @api {post} /accounts Create account
 * @apiName createAccount
 * @apiGroup Accounts
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
*     {
    "automatic": {
        "renew_blocked": false,
        "renew_old": false
    },
    "_id": "658aaa64807072b52854a887",
    "title": "true",
    "user_id": "323232",
    "archived": false,
    "renewable": true,
    "month_price": 1490,
    "createdAt": "2023-12-26T10:26:44.965Z",
    "updatedAt": "2023-12-26T10:26:44.965Z"
    }
 */
export const createAccController = async (req, res) => {
  const payload = req.body;

  // Reject if the payload is empty
  if (Object.keys(payload).length === 0 || !payload) {
    return res.status(400).end('empty body payload');
  }

  try {
    new Account(payload)
      .save()
      .then((account) => res.status(200).json(account))
      .catch((err) => res.status(400).end(err.message));
  } catch (error) {
    handleServerError(res, error);
  }
};

/**
 * @api {get} /accounts_ready_to_renew Get accounts to renew
 * @apiName getAccsForRenew
 * @apiGroup Accounts
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
*     [{
    "automatic": {
        "renew_blocked": false,
        "renew_old": false
    },
    "_id": "658aaa64807072b52854a887",
    "title": "true",
    "user_id": "323232",
    "archived": false,
    "renewable": true,
    "month_price": 1490,
    "createdAt": "2023-12-26T10:26:44.965Z",
    "updatedAt": "2023-12-26T10:26:44.965Z"
    }]
 */
export const findAccsToRenewController = async (req, res) => {
  try {
    Account.find({
      expire_at: { $lt: new Date() },
      renewable: true,
    }).then((accounts) => {
      res.status(200).json(accounts);
    });
  } catch (error) {
    handleServerError(res, error);
  }
};

export const getAccountByUserIdAndAccId = async (req, res) => {
  const { userID, accID } = req.params;
  try {
    Account
      .find({ user_id: userID, _id: accID })
      .then((account) => {
        account.length !== 0
          ? res.status(200).json(account)
          : res.status(403).json({ code: 403 });
      })
      .catch(() => {
        res.status(404).json({ code: 404 });
      });
  } catch (error) {
    handleServerError(res, error);
  }
};
