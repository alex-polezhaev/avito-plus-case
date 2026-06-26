import { backend } from './index.js';

export const createTask = (token, body) =>
  backend(token)
    .post('/tasks', body)
    .then(({ data }) => data);
