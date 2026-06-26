import jwt from 'jsonwebtoken';
import log4js from 'log4js';
import {
  getAccountByUserIdAndAccId,
  getSpecByUserIdAndSpecId,
} from '../src/mongoFuncs.js';

log4js.configure({
  appenders: { JWT: { type: 'file', filename: './logs/debug.log' } },
  categories: { default: { appenders: ['JWT'], level: 'trace' } },
});

const logger = log4js.getLogger('JWT');

const verifyToken = async (req, res, next) => {
  logger.trace(`Request to a protected route ${req.originalUrl}`);
  try {
    let token = req.header('Authorization') || req.header('authorization');

    if (!token) {
      logger.warn('Login attempt without a token. Connection closed.\n\n\n');
      return res.status(403).send('Authorization missing!');
    }

    if (token && token.startsWith('Bearer')) {
      [, token] = token.split(' ');

      logger.info(`Received token = ${token}`);

      jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
          logger.error('Invalid token. Connection closed.\n\n\n');
          return res.status(401).send('Invalid auth token');
        }
        req.user = decoded.user;

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
          logger.info(`Account check passed ${acc[0]?.title}. Access granted.`);
        }

        if (acc === 403) {
          logger.warn('Attempt to access someone else's account. Access denied.\n\n\n');
          return res.status(403).send('Forbidden account ID');
        }
        if (acc === 404) {
          logger.warn('The provided account ID does not exist. Access denied.\n\n\n');
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
          logger.info(`Category check passed ${spec[0]?.category}. Access granted.`);
        }

        if (spec === 403) {
          logger.warn('Attempt to access someone else's category. Access denied.\n\n\n');
          return res.status(403).send('Forbidden spec ID');
        }

        if (spec === 404) {
          logger.warn('The provided specification ID does not exist. Access denied.\n\n\n');
          return res.status(404).send('Cant find spec ID');
        }

        next();
        logger.info('Token check completed without errors. Access granted.\n\n\n');
      });

      if (!token) {
        logger.warn('Token is missing in headers. Access denied.\n\n\n');
        return res.status(401).send('Authorization token missing');
      }
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default verifyToken;
