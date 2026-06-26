import { backend } from './index.js';

const apiHostname = import.meta.env.VITE_API_URL;

export const addSpecAndSheet = (accID, category, token) =>
  backend(token).post(`${apiHostname}/google/add_sheet`, {
    acc_id: accID,
    category,
  });

export const delSpecAndSheet = (specID, token) =>
  backend(token).delete(`${apiHostname}/google/table/sheet/${specID}`);

export const getSpecsByAccId = (token, accID) =>
  backend(token)
    .get(`/specs/byAcc/${accID}`)
    .then(({ data }) => data);
