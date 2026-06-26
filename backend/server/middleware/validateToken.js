import jwt from 'jsonwebtoken';
import { getAccountByUserIdAndAccId } from '../services/Mongoose/accountsDB.js';
import { getSpecByUserIdAndSpecId } from '../services/Mongoose/specsDB.js';
import { getLogger } from '../config/logger.js';

const logger = getLogger('JWT');

/**
 * verifyToken
 * Auth middleware: validates the Bearer JWT, then (when the request references
 * an account or specification) verifies the caller owns it. Returns 401/403/404
 * as appropriate, otherwise calls next() and attaches req.user / req.acc / req.spec.
 */
const verifyToken = async (req, res, next) => {
  logger.trace(`Request to a protected route ${req.originalUrl}`);

  const header = req.header('Authorization') || req.header('authorization');

  if (!header || !header.startsWith('Bearer')) {
    logger.warn('Request without a valid Bearer token. Connection closed.');
    return res.status(401).send('Authorization token missing');
  }

  const [, token] = header.split(' ');

  if (!token) {
    logger.warn('Malformed Authorization header. Connection closed.');
    return res.status(401).send('Authorization token missing');
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    logger.error('Invalid token. Connection closed.');
    return res.status(401).send('Invalid auth token');
  }

  logger.info('Received token.');
  req.user = decoded.user;

  try {
    let acc;

    if (req.body.accID) {
      acc = await getAccountByUserIdAndAccId(decoded.user.id, req.body.accID);
      req.acc = acc;
    }
    if (req.params.accID) {
      acc = await getAccountByUserIdAndAccId(decoded.user.id, req.params.accID);
      req.acc = acc;
    }
    if (req.query.accID) {
      acc = await getAccountByUserIdAndAccId(decoded.user.id, req.query.accID);
      req.acc = acc;
    }

    if (acc && acc !== 403 && acc !== 404) {
      logger.info(`Account check passed for ${acc[0]?.title}. Access granted.`);
    }
    if (acc === 403) {
      logger.warn('Attempt to access another user\'s account. Access denied.');
      return res.status(403).send('Forbidden account ID');
    }
    if (acc === 404) {
      logger.warn('The provided account ID does not exist. Access denied.');
      return res.status(404).send('Cant find account ID');
    }

    let spec;

    if (req.body.specID) {
      spec = await getSpecByUserIdAndSpecId(decoded.user.id, req.body.specID);
      req.spec = spec;
    }
    if (req.params.specID) {
      spec = await getSpecByUserIdAndSpecId(decoded.user.id, req.params.specID);
      req.spec = spec;
    }
    if (req.query.specID) {
      spec = await getSpecByUserIdAndSpecId(decoded.user.id, req.query.specID);
      req.spec = spec;
    }

    if (spec && spec !== 403 && spec !== 404) {
      logger.info(`Specification check passed for ${spec[0]?.category}. Access granted.`);
    }
    if (spec === 403) {
      logger.warn('Attempt to access another user\'s specification. Access denied.');
      return res.status(403).send('Forbidden spec ID');
    }
    if (spec === 404) {
      logger.warn('The provided specification ID does not exist. Access denied.');
      return res.status(404).send('Cant find spec ID');
    }

    logger.info('Token check finished without errors. Access granted.');
    return next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export default verifyToken;
