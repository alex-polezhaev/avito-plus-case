import Account from '../../models/Account.js';

export const getAllAccs = () => Account
  .find()
  .sort([['createdAt', -1]])
  .then((accounts) => accounts);

export const createAcc = (body) => {
  const acc = new Account(body);

  return acc
    .save()
    .then((result) => result);
};

export const getAccById = (id) => Account
  .findById(id)
  .then((acc) => acc);

export const updateAccById = (id, body) => Account
  .findByIdAndUpdate(id, body)
  .then((result) => result);

export const deleteAccById = (id) => Account
  .findByIdAndDelete(id)
  .then((result) => result);

export const getAccsByUserId = (userID) => Account
  .find({ user_id: userID })
  .sort([['createdAt', -1]])
  .then((accounts) => accounts);

// No route
export const getAccTitleByID = (id) => getAccById(id)
  .then(({ title }) => title);

export const getTableIdByAccId = (id) => getAccById(id)
  .then((acc) => acc.table_id);

export const updateManyAccs = (filter, update) => Account
  .updateMany(filter, update);

export const findAccsToRenew = () => Account.find({
  expire_at: { $lt: new Date() },
  renewable: true,
});

export const getDataForAvitoFuncs = async (accID) => {
  const {
    table_id: spreadsheetId,
    avito: {
      id: avitoUserID,
      clientId: clientID,
      clientSecret,
    },
  } = await getAccById(accID);

  return {
    avitoUserID,
    clientID,
    clientSecret,
    spreadsheetId,
  };
};

export const getAccountByUserIdAndAccId = (userID, accID) => Account
  .find({ user_id: userID, _id: accID })
  .then((acc) => {
    if (acc.length === 0) { return 403; } return acc;
  }).catch(() => 404);
