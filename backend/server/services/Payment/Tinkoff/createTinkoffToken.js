import { createHash } from 'crypto';

const createTinkoffToken = (TerminalKey, Amount, OrderId, Description) => {
  const Password = process.env.TINKOFF_TERM_PASS;
  const line = [Amount, Description, OrderId, Password, TerminalKey].join('');
  return createHash('sha256').update(line).digest('hex');
};

export default createTinkoffToken;
