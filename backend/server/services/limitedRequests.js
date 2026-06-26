import _ from 'lodash';

/**
 * makeLimitedRequests
 * Splits a large set of requests into optimally sized chunks executed
 * sequentially. The callback MUST handle its own errors and return a default
 * value on failure.
 */
export const makeLimitedRequests = async (values, callback, size = 100) => {
  const result = [];
  const chunks = _.chunk(values, size);
  for (let i = 0; i < chunks.length; i += 1) {
    const chunk = chunks[i];
    const promises = chunk.map(callback);
    /* eslint-disable no-await-in-loop */
    const interimResult = await Promise.all(promises);
    /* eslint-enable no-await-in-loop */
    result.push(...interimResult);
  }
  return result;
};

export const getLimitedItems = async (itemIds, callback, size = 200) => {
  const chunks = _.chunk(itemIds, size);
  const promises = chunks.map(callback);
  const result = await Promise.all(promises);
  return result.reduce((acc, arr) => [...acc, ...arr], []);
};

export const getLimitedFileIDs = async (avitoIds, callback, size = 200) => {
  const chunks = _.chunk(avitoIds, size);
  const promises = chunks.map(callback);
  const result = await Promise.all(promises);
  return result.reduce((acc, obj) => ({ ...acc, ...obj }), {});
};
