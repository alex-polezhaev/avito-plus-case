import Spec from '../../models/Spec.js';
import { getAccById } from './accountsDB.js';
import { getLogger } from '../../config/logger.js';

const logger = getLogger();

export const getAllSpecs = () => Spec
  .find()
  .then((specs) => specs);

export const createSpec = (body) => {
  const spec = new Spec(body);

  return spec
    .save()
    .then((result) => result);
};

export const getSpecById = (id) => Spec
  .findById(id)
  .then((spec) => spec);

export const updateSpecById = (id, body) => Spec
  .findByIdAndUpdate(id, body)
  .then((result) => result);

export const deleteSpecById = (id) => Spec
  .findByIdAndDelete(id)
  .then((result) => result);

export const getSpecsByAccId = (accID) => Spec
  .find({ acc_id: accID })
  .then((specs) => specs);

// No route

export const getAllCategoriesByAccId = (accID) => getSpecsByAccId(accID)
  .then((specs) => specs.map((spec) => spec.category));

export const getAllSheetIDsByAccId = (accID) => getSpecsByAccId(accID)
  .then((specs) => specs.map((spec) => spec.sheet_id));

export const getSpecBySheetID = (sheetID) => Spec
  .findOne({ sheet_id: sheetID })
  .then((spec) => spec);

export const getSpecByUserIdAndSpecId = (userID, specID) => getSpecById(specID)
  .then((spec) => {
    if (spec.length === 0) { return 403; }
    return getAccById(spec.acc_id)
      .then((acc) => {
        if (acc.length === 0) { return 403; }
        if (acc.user_id === userID) {
          return spec;
        } return 403;
      });
  }).catch(() => 404);

// sheet_id is not unique across the database, but it is unique within an account.
export const updateSpecBySheetIdAndAccId = (sheet_id, acc_id, body) => Spec
  .findOneAndUpdate({ sheet_id, acc_id }, body)
  .then((result) => result)
  .catch(() => {});

// Total number of ads on an account.
export const getAdsAmount = (acc_id) => Spec
  .find({ acc_id })
  .then((specs) => {
    if (specs.length === 0) {
      logger.warn(`Suspicious logic error in specsDB - check account ${acc_id}`);
      return 'The account has no specifications';
    }
    let result = 0;

    specs.forEach((spec) => {
      const { total_ads } = spec.stat;
      result += total_ads;
    });

    return result;
  });
