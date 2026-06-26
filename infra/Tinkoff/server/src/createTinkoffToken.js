import { createHash } from 'crypto';

const createTinkoffToken = (tokenBody) => {
  const Password = process.env.TINKOFF_TERM_PASS;
  const newTokenBody = { ...tokenBody, Password };
  const sortedValsByKeys = Object
    .keys(newTokenBody)
    .sort()
    .reduce((acc, key) => `${acc}${newTokenBody[key]}`, '');
  return createHash('sha256').update(sortedValsByKeys).digest('hex');
};

export default createTinkoffToken;
