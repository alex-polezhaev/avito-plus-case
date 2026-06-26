/* eslint-disable no-unused-expressions */
import mongoose from 'mongoose';
import User from '../models/User.js';

const handleServerError = (res, error) => {
  console.error(error);
  res.status(500).json({ error });
};

/**
 * @api {get} /users/:userID Get user data
 * @apiName getUserById
 * @apiGroup User
 *
 * @apiParam {ObjectId} userID mongo db object id
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
    "resetPasswordToken": {
        "otp": null,
        "OTPcreatedAtInMS": null
    },
    "verification": {
        "isVerified": false,
        "hash": "bed11cceeb79a40bc9960fc518352eebea698586",
        "hashCreatedAtInMS": 1703319806640
    },
    "telegram": {
        "user_token": "GhbDtNcsmAnaWPiT",
        "chat_ids": []
    },
    "_id": "658698fe79b382fa4551c1a3",
    "firstname": "Alexander",
    "email": "service@your-domain.example",
    "password": "$2b$10$skH7K3RxEEF84dtwoexp/eA3ffBZN.A5NEwjWIIuBfn9siowH5W5m",
    "balance": 0,
    "transactions": [],
    "createdAt": "2023-12-23T08:23:26.715Z",
    "updatedAt": "2023-12-23T08:23:26.715Z"
}
 */
export const getUserByIdController = async (req, res) => {
  const { userID } = req.params;

  // Reject if the id is not a valid mongo id
  if (!mongoose.Types.ObjectId.isValid(userID)) {
    return res.status(400).end('invalid mongo id');
  }

  try {
    const user = await User.findById(userID);
    user ? res.status(200).json(user) : res.status(404).end('user not found');
  } catch (error) {
    handleServerError(res, error);
  }
};

/**
 * @api {patch} /users/:userID Edit user data
 * @apiName updateUserById
 * @apiGroup User
 *
 * @apiParam {ObjectId} userID mongo db object id
 * @apiParam {Json} payload user schema payload
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
    "resetPasswordToken": {
        "otp": null,
        "OTPcreatedAtInMS": null
    },
    "verification": {
        "isVerified": false,
        "hash": "bed11cceeb79a40bc9960fc518352eebea698586",
        "hashCreatedAtInMS": 1703319806640
    },
    "telegram": {
        "user_token": "GhbDtNcsmAnaWPiT",
        "chat_ids": []
    },
    "_id": "658698fe79b382fa4551c1a3",
    "firstname": "Alexander",
    "email": "service@your-domain.example",
    "password": "$2b$10$skH7K3RxEEF84dtwoexp/eA3ffBZN.A5NEwjWIIuBfn9siowH5W5m",
    "balance": 0,
    "transactions": [],
    "createdAt": "2023-12-23T08:23:26.715Z",
    "updatedAt": "2023-12-23T08:23:26.715Z"
}
 */
export const updateUserByIdController = async (req, res) => {
  const payload = req.body;
  const { userID } = req.params;

  // Reject if the payload is empty
  if (Object.keys(payload).length === 0 || !payload) {
    return res.status(400).end('empty body payload');
  }

  // Reject if the id is not a valid mongo id
  if (!mongoose.Types.ObjectId.isValid(userID)) {
    return res.status(400).end('invalid mongo id');
  }

  try {
    const user = await User.findByIdAndUpdate(userID, payload, {
      new: true,
    });
    user ? res.status(200).json(user) : res.status(404).end('user not found');
  } catch (error) {
    handleServerError(res, error);
  }
};

/**
 * @api {get} /users/byEmail/:email Get user by email
 * @apiName getUserByEmail
 * @apiGroup User
 *
 * @apiParam {String} Email user email
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
    "resetPasswordToken": {
        "otp": null,
        "OTPcreatedAtInMS": null
    },
    "verification": {
        "isVerified": false,
        "hash": "bed11cceeb79a40bc9960fc518352eebea698586",
        "hashCreatedAtInMS": 1703319806640
    },
    "telegram": {
        "user_token": "GhbDtNcsmAnaWPiT",
        "chat_ids": []
    },
    "_id": "658698fe79b382fa4551c1a3",
    "firstname": "Alexander",
    "email": "service@your-domain.example",
    "password": "$2b$10$skH7K3RxEEF84dtwoexp/eA3ffBZN.A5NEwjWIIuBfn9siowH5W5m",
    "balance": 0,
    "transactions": [],
    "createdAt": "2023-12-23T08:23:26.715Z",
    "updatedAt": "2023-12-23T08:23:26.715Z"
}
 */
export const getUserByEmailController = async (req, res) => {
  const { email } = req.params;

  // Reject if there is no email
  if (!email) {
    return res.status(400).end('empty user email');
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).end('user not found');
    }
    res.status(200).json(user);
  } catch (error) {
    handleServerError(res, error);
  }
};

/**
 * @api {post} /users Create user
 * @apiName createUser
 * @apiGroup User
 *
 * @apiParam {Json} payload user schema payload
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
    "firstname": "category",
    "email": "category",
    "password": "deedwed",
    "balance": 0,
    "resetPasswordToken": {
        "otp": null,
        "OTPcreatedAtInMS": null
    },
    "verification": {
        "isVerified": false,
        "hash": null,
        "hashCreatedAtInMS": null
    },
    "telegram": {
        "chat_ids": []
    },
    "_id": "658adb85701d9ba37843795a",
    "transactions": [],
    "createdAt": "2023-12-26T13:56:21.766Z",
    "updatedAt": "2023-12-26T13:56:21.766Z"
}
 */
export const createUserController = (req, res) => {
  const payload = req.body;

  // Reject if the payload is empty
  if (Object.keys(payload).length === 0 || !payload) {
    return res.status(400).end('empty body payload');
  }

  try {
    new User(payload)
      .save()
      .then((user) => res.status(200).json(user))
      .catch((err) => res.status(400).end(err.message));
  } catch (error) {
    handleServerError(res, error);
  }
};

/**
 * @api {post} /users/transactions/:userID Push user transaction
 * @apiName pushUserTransaction
 * @apiGroup User
 *
 * @apiParam {Json} payload transaction payload
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
    "resetPasswordToken": {
        "otp": null,
        "OTPcreatedAtInMS": null
    },
    "verification": {
        "isVerified": true,
        "hash": null,
        "hashCreatedAtInMS": null
    },
    "telegram": {
        "user_token": "REPLACE_ME_TOKEN",
        "chat_ids": []
    },
    "_id": "000000000000000000000000",
    "firstname": "demo-user",
    "email": "service@your-domain.example",
    "password": "$2b$10$examplehashexamplehashexamplehashexampleha",
    "balance": 2047,
    "transactions": [
        {
            "order_id": "String",
            "title": "String",
            "transaction": "String",
            "success": false,
            "message": "String",
            "_id": "658aa244b8f8bf14aa6bb92e"
        }
    ],
    "createdAt": "2023-12-12T08:24:06.435Z",
    "updatedAt": "2023-12-26T09:54:55.152Z"
}
 * @apiParamExample {json} Request-Example:
 *  {"transactions": {
    "order_id":"String",
    "title":"String",
    "transaction": 433443,
    "date":"23.12.2023",
    "success":"String",
    "message":"String"
    }}
 */
export const pushUserTransactionController = (req, res) => {
  const { userID } = req.params;
  const payload = req.body;

  // Reject if the id is not a valid mongo id
  if (!mongoose.Types.ObjectId.isValid(userID)) {
    return res.status(400).end('invalid mongo id');
  }

  // Reject if the payload is empty
  if (Object.keys(payload).length === 0 || !payload) {
    return res.status(400).end('empty body payload');
  }

  try {
    User.findByIdAndUpdate(userID, { $push: { transactions: payload } })
      .then((user) => {
        res.status(200).json(user);
      })
      .catch((err) => res.status(400).end(err.message));
  } catch (error) {
    handleServerError(res, error);
  }
};

/**
 * @api {get} /users/byTransaction/:orderID Get user by order id
 * @apiName getUserByOrderId
 * @apiGroup User
 *
 * @apiParam {String} orderId orderId
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
    "firstname": "category",
    "email": "category",
    "password": "deedwed",
    "balance": 0,
    "resetPasswordToken": {
        "otp": null,
        "OTPcreatedAtInMS": null
    },
    "verification": {
        "isVerified": false,
        "hash": null,
        "hashCreatedAtInMS": null
    },
    "telegram": {
        "chat_ids": []
    },
    "_id": "658adb85701d9ba37843795a",
    "transactions": [],
    "createdAt": "2023-12-26T13:56:21.766Z",
    "updatedAt": "2023-12-26T13:56:21.766Z"
}
 */
export const getUserByOrderIdController = async (req, res) => {
  const { orderID } = req.params;
  try {
    const user = await User.find({
      transactions: {
        $elemMatch: {
          order_id: orderID,
        },
      },
    });
    user.length > 0
      ? res.status(200).json(user)
      : res.status(404).end('user not found');
  } catch (error) {
    handleServerError(res, error);
  }
};
