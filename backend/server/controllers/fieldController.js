import { getFields } from '../services/Mongoose/fieldsDB.js';
import { getSpecsByAccId } from '../services/Mongoose/specsDB.js';
import { getLogger } from '../config/logger.js';

const logger = getLogger();

const handleServerError = (res) => (error) => {
  logger.error(error);
  res.status(500).json({ message: 'Internal server error' });
};

/**
 * @module controllers/field
 */

// Return every available category (excluding the shared-tags pseudo-category).
export const getFieldsController = (req, res) => {
  getFields()
    .then((fields) => {
      const newFields = fields
        .filter((field) => field.categoryName !== 'Shared tags')
        .map(({ categoryName }) => categoryName);
      res.status(200).json(newFields);
    })
    .catch(handleServerError(res));
};

// Return the categories that are still available to add to the given account.
export const getPossibleFieldsController = async (req, res) => {
  try {
    const allFields = await getFields()
      .then((fields) => fields
        .filter((field) => field.categoryName !== 'Shared tags'));
    const accSpecs = await getSpecsByAccId(req.params.accID);

    const specs = await Promise.all(allFields, accSpecs).then(() => allFields
      .map((spec) => spec.categoryName)
      .filter((x) => !accSpecs.map((spec) => spec.category).includes(x)));

    const result = allFields
      .map((field) => {
        let output;
        specs.forEach((el) => {
          if (el === field.categoryName) {
            output = el;
          }
        });
        if (output) {
          output = field;
        }
        return output;
      })
      .filter((n) => n)
      .map(({ categoryName }) => categoryName);

    res.status(200).json(result);
  } catch (error) {
    handleServerError(res)(error);
  }
};
