/* eslint-disable no-unused-expressions */
import mongoose from 'mongoose';
import Spec from '../models/Spec.js';
import Account from '../models/Account.js';

const handleServerError = (res, error) => {
  res.status(500).json({ error });
};

/**
 * @api {post} /specs Create spec
 * @apiName createSpec
 * @apiGroup Spec
 *
 * @apiParam {Json} payload spec schema payload
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
    "category": "Watches and jewelry",
    "acc_id": "658ae036701d9ba37843797b",
    "stat": {
        "total_ads": 0,
        "active_ads": 0,
        "old_ads": 0,
        "blocked_ads": 0,
        "rejected_ads": 0,
        "archived_ads": 0,
        "deleted_ads": 0,
        "waiting_ads": 0,
        "views1": 0,
        "messages1": 0,
        "likes1": 0,
        "views7": 0,
        "messages7": 0,
        "likes7": 0,
        "views30": 0,
        "messages30": 0,
        "likes30": 0
    },
    "_id": "658ae054701d9ba37843797d",
    "createdAt": "2023-12-26T14:16:52.175Z",
    "updatedAt": "2023-12-26T14:16:52.175Z"
}
 * @apiParamExample {json} Request-Example:
 *  {"acc_id":"658ae036701d9ba37843797b","category":"Watches and jewelry"}
 */
export const createSpecController = (req, res) => {
  try {
    const payload = req.body;

    // Reject if the payload is empty
    if (Object.keys(payload).length === 0 || !payload) {
      return res.status(400).end('empty body payload');
    }

    new Spec(payload)
      .save()
      .then((spec) => res.status(200).json(spec))
      .catch((err) => res.status(400).end(err.message));
  } catch (error) {
    handleServerError(res, error);
  }
};

/**
 * @api {get} /specs/:specID Get spec
 * @apiName getSpec
 * @apiGroup Spec
 *
 * @apiParam {OnjectID} specID
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
    "stat": {
        "total_ads": 21,
        "active_ads": 7,
        "old_ads": 6,
        "blocked_ads": 1,
        "rejected_ads": 1,
        "archived_ads": 1,
        "deleted_ads": 1,
        "waiting_ads": 4,
        "views1": 420,
        "messages1": 420,
        "likes1": 420,
        "views7": 231,
        "messages7": 231,
        "likes7": 231,
        "views30": 420,
        "messages30": 420,
        "likes30": 420
    },
    "_id": "6579c49dff7cf24a5dfc336f",
    "category": "Watches and jewelry",
    "acc_id": "6579c49dff7cf24a5dfc336d",
    "sheet_id": "2077348259",
    "options_sheet_id": "367200210",
    "createdAt": "2023-12-13T14:50:05.145Z",
    "updatedAt": "2023-12-20T13:30:50.604Z"
}
 */
export const getSpecByIdController = async (req, res) => {
  try {
    const { specID } = req.params;

    // Reject if the id is not a valid mongo id
    if (!mongoose.Types.ObjectId.isValid(specID)) {
      return res.status(400).end('invalid mongo id');
    }

    const spec = await Spec.findById(specID);
    spec ? res.status(200).send(spec) : res.status(404).end();
  } catch (error) {
    handleServerError(res, error);
  }
};

/**
 * @api {get} /specs/byAcc/:accID Get spec by accID
 * @apiName getSpecByAccId
 * @apiGroup Spec
 *
 * @apiParam {accID} accID
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
    "stat": {
        "total_ads": 21,
        "active_ads": 7,
        "old_ads": 6,
        "blocked_ads": 1,
        "rejected_ads": 1,
        "archived_ads": 1,
        "deleted_ads": 1,
        "waiting_ads": 4,
        "views1": 420,
        "messages1": 420,
        "likes1": 420,
        "views7": 231,
        "messages7": 231,
        "likes7": 231,
        "views30": 420,
        "messages30": 420,
        "likes30": 420
    },
    "_id": "6579c49dff7cf24a5dfc336f",
    "category": "Watches and jewelry",
    "acc_id": "6579c49dff7cf24a5dfc336d",
    "sheet_id": "2077348259",
    "options_sheet_id": "367200210",
    "createdAt": "2023-12-13T14:50:05.145Z",
    "updatedAt": "2023-12-20T13:30:50.604Z"
}
 */
export const getSpecByAccIdController = async (req, res) => {
  try {
    const { accID } = req.params;

    // Reject if the id is not a valid mongo id
    if (!mongoose.Types.ObjectId.isValid(accID)) {
      return res.status(400).end('invalid mongo id');
    }

    const spec = await Spec.find({ acc_id: accID });
    spec ? res.status(200).send(spec) : res.status(404).end();
  } catch (error) {
    handleServerError(res, error);
  }
};

/**
 * @api {patch} /specs/:specID Update spec by id
 * @apiName updateSpecById
 * @apiGroup Spec
 *
 * @apiParam {specID} specID
 * @apiParam {Json} payload spec schema payload
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
    "stat": {
        "total_ads": 21,
        "active_ads": 7,
        "old_ads": 6,
        "blocked_ads": 1,
        "rejected_ads": 1,
        "archived_ads": 1,
        "deleted_ads": 1,
        "waiting_ads": 4,
        "views1": 420,
        "messages1": 420,
        "likes1": 420,
        "views7": 231,
        "messages7": 231,
        "likes7": 231,
        "views30": 420,
        "messages30": 420,
        "likes30": 420
    },
    "_id": "6579c49dff7cf24a5dfc336f",
    "category": "Watches and jewelry",
    "acc_id": "6579c49dff7cf24a5dfc336d",
    "sheet_id": "2077348259",
    "options_sheet_id": "367200210",
    "createdAt": "2023-12-13T14:50:05.145Z",
    "updatedAt": "2023-12-20T13:30:50.604Z"
}
 */
export const updateSpecByIdController = async (req, res) => {
  try {
    const payload = req.body;
    const { specID } = req.params;

    // Reject if the payload is empty
    if (Object.keys(payload).length === 0 || !payload) {
      return res.status(400).end('empty body payload');
    }

    // Reject if the id is not a valid mongo id
    if (!mongoose.Types.ObjectId.isValid(specID)) {
      return res.status(400).end('invalid mongo id');
    }

    const spec = await Spec.findByIdAndUpdate(specID, payload, {
      new: true,
    });
    spec ? res.status(200).json(spec) : res.status(404).end('Spec not found');
  } catch (error) {
    handleServerError(res, error);
  }
};

/**
 * @api {delete} /specs/:specID Delete spec by id
 * @apiName delSpecById
 * @apiGroup Spec
 *
 * @apiParam {specID} specID
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
    "stat": {
        "total_ads": 21,
        "active_ads": 7,
        "old_ads": 6,
        "blocked_ads": 1,
        "rejected_ads": 1,
        "archived_ads": 1,
        "deleted_ads": 1,
        "waiting_ads": 4,
        "views1": 420,
        "messages1": 420,
        "likes1": 420,
        "views7": 231,
        "messages7": 231,
        "likes7": 231,
        "views30": 420,
        "messages30": 420,
        "likes30": 420
    },
    "_id": "6579c49dff7cf24a5dfc336f",
    "category": "Watches and jewelry",
    "acc_id": "6579c49dff7cf24a5dfc336d",
    "sheet_id": "2077348259",
    "options_sheet_id": "367200210",
    "createdAt": "2023-12-13T14:50:05.145Z",
    "updatedAt": "2023-12-20T13:30:50.604Z"
}
 */
export const delSpecByIdController = async (req, res) => {
  try {
    const { specID } = req.params;

    // Reject if the id is not a valid mongo id
    if (!mongoose.Types.ObjectId.isValid(specID)) {
      return res.status(400).end('invalid mongo id');
    }

    const spec = await Spec.findByIdAndDelete(specID);
    spec ? res.status(200).json(spec) : res.status(404).end('Spec not found');
  } catch (error) {
    handleServerError(res, error);
  }
};

/**
 * @api {get} /specs Get all specs
 * @apiName getAllSpecs
 * @apiGroup Spec
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [{
        "stat": {
            "total_ads": 0,
            "active_ads": 0,
            "old_ads": 0,
            "blocked_ads": 0,
            "rejected_ads": 0,
            "archived_ads": 0,
            "deleted_ads": 0,
            "waiting_ads": 0,
            "views1": 0,
            "messages1": 0,
            "likes1": 0,
            "views7": 0,
            "messages7": 0,
            "likes7": 0,
            "views30": 0,
            "messages30": 0,
            "likes30": 0
        },
        "_id": "65785dde42114d340f338766",
        "category": "category",
        "acc_id": "deedwed",
        "createdAt": "2023-12-12T13:19:26.093Z",
        "updatedAt": "2023-12-26T11:20:50.881Z",
        "options_sheet_id": "1051621890",
        "sheet_id": "1487511960"
    }]
 */
export const getAllSpecsController = (req, res) => {
  try {
    Spec.find().then((allSpecs) => {
      res.status(200).json(allSpecs);
    });
  } catch (error) {
    handleServerError(res, error);
  }
};

/**
 * @api {patch} /update_spec_by_sheet_and_acc_id Update spec by sheetID and accID
 * @apiName updateSpecBySheetAndAccId
 * @apiGroup Spec
 *
 * @apiParam {Json} payload spec schema payload
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [{
        "stat": {
            "total_ads": 0,
            "active_ads": 0,
            "old_ads": 0,
            "blocked_ads": 0,
            "rejected_ads": 0,
            "archived_ads": 0,
            "deleted_ads": 0,
            "waiting_ads": 0,
            "views1": 0,
            "messages1": 0,
            "likes1": 0,
            "views7": 0,
            "messages7": 0,
            "likes7": 0,
            "views30": 0,
            "messages30": 0,
            "likes30": 0
        },
        "_id": "65785dde42114d340f338766",
        "category": "category",
        "acc_id": "deedwed",
        "createdAt": "2023-12-12T13:19:26.093Z",
        "updatedAt": "2023-12-26T11:20:50.881Z",
        "options_sheet_id": "1051621890",
        "sheet_id": "1487511960"
    }]
 */
export const updateSpecBySheetAndAccIdController = async (req, res) => {
  try {
    const { accID, sheetID } = req.query;
    const payload = req.body;

    // Reject if the payload is empty
    if (Object.keys(payload).length === 0 || !payload) {
      return res.status(400).end('empty body payload');
    }

    // Reject if the id is not a valid mongo id
    if (!mongoose.Types.ObjectId.isValid(accID)) {
      return res.status(400).end('invalid mongo id');
    }

    // Reject if there is no sheet id
    if (!sheetID) {
      return res.status(400).end('invalid sheet id');
    }
    const spec = await Spec.findOneAndUpdate(
      { sheet_id: sheetID, acc_id: accID },
      payload,
    );
    spec ? res.status(200).json(spec) : res.status(404).end('Spec not found');
  } catch (error) {
    handleServerError(res, error);
  }
};

export const getSpecByUserIdAndSpecId = (req, res) => {
  try {
    const { userID, specID } = req.params;
    Spec
      .findById(specID)
      .then((spec) => spec)
      .then((spec) => {
        if (spec.length === 0) {
          res.status(403).json({ code: 403 });
          return;
        }
        Account
          .findById(spec.acc_id)
          .then((acc) => acc)
          .then((acc) => {
            if (acc.length === 0) {
              res.status(403).json({ code: 403 });
              return;
            }
            acc.user_id === userID
              ? res.status(200).json(spec)
              : res.status(403).json({ code: 403 });
          })
          .catch(() => {
            res.status(404).json({ code: 404 });
          });
      });
  } catch (error) {
    handleServerError(res, error);
  }
};
