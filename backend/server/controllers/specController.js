import { getSpecsByAccId } from '../services/Mongoose/specsDB.js';
import { getLogger } from '../config/logger.js';

const logger = getLogger();

const handleError = (res) => (error) => {
  logger.error(error);
  res.status(500).json({ message: 'Internal server error' });
};

/**
 * @module controllers/spec
 */

/**
 * getSpecsByAccIdController
 * Returns all specifications that belong to the given account.
 */
export const getSpecsByAccIdController = (req, res) => {
  getSpecsByAccId(req.params.accID)
    .then((specs) => {
      res
        .status(200)
        .json(specs);
    }).catch(handleError(res));
};
