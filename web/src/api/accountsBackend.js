import { backend } from './index.js';

export const createNewAccount = (token, title, category) =>
  backend(token).post('/google/new_table', { title, category });

export const editAccountTitle = (token, accID, newTitle) =>
  backend(token).patch(`/edit_acc_title/${accID}`, { newTitle });

export const editAccountData = (token, accID, body) =>
  backend(token).patch(`/accounts/${accID}`, body);
