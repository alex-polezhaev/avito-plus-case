import { api } from '../api/index.js';

export const markUsedTasks = async (accID, startTimeOMS, service) => {
  const date = startTimeOMS;

  api('mongo').patch(`tasks/update_used/${accID}`, {
    service,
    date,
  });
};
