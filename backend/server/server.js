import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config';

import { getLogger } from './config/logger.js';
import indexRoutes from './routes/indexRoutes.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';

const logger = getLogger();
const httpLogger = getLogger('HTTP');

const PORT = process.env.APP_PORT || 3000;
const URL = process.env.DB_CONNECTION_STRING;

const app = express();

app.use(cors());
app.use(express.static('server/services/Email/media'));
// Pipe morgan access logs through log4js so all logging shares one configuration.
app.use(morgan('tiny', { stream: { write: (message) => httpLogger.info(message.trim()) } }));
app.use(express.json());

app.use(indexRoutes);

// Optional Telegram bot: only wired up when a bot token is configured.
if (process.env.TELEGRAM_BOT_TOKEN) {
  const { default: runTelegramBot } = await import('./services/Telegram/runTelegramBot.js');
  runTelegramBot();
  logger.info('Telegram bot started.');
}

// 404 + central error handling must be registered after the routes.
app.use(notFoundHandler);
app.use(errorHandler);

mongoose
  .connect(URL)
  .then(() => logger.info('Connected to MongoDB'))
  .catch((err) => logger.error(`DB connection error: ${err}`));

app.listen(PORT, (err) => {
  if (!err) {
    logger.info(`Listening on port ${PORT}`);
  } else {
    logger.error(err);
    process.exit(1);
  }
});
