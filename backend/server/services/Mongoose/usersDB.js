import User from '../../models/User.js';

// create
export const createUser = (body) => {
  const user = new User(body);

  return user.save().then((result) => result);
};

// get
export const getAllUsers = () => User.find().then((users) => users);

export const getUserById = (id) => User.findById(id).then((user) => user);

export const getUserByEmail = (email) => User.findOne({ email }).then((user) => user);

export const getUserByTelegramToken = (token) => User.findOne({ 'telegram.user_token': token }).then((user) => user);

export const getUsersByChatID = (chatID) => User.find({
  'telegram.chat_ids': {
    $elemMatch: {
      chat_id: chatID,
    },
  },
}).then((user) => user);

export const getUserByOrderId = (orderID) => User.find({
  transactions: {
    $elemMatch: {
      order_id: orderID,
    },
  },
}).then((user) => user);

// other
export const updateUserById = (id, body) => User.findByIdAndUpdate(id, body)
  .then((result) => result);

export const deleteUserById = (id) => User.findByIdAndDelete(id).then((result) => result);

export const newTransactionByUserId = (userId, payload) => User.findByIdAndUpdate(
  userId,
  { $push: { transactions: payload } },
).then((data) => data);
