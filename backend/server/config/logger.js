import fs from 'fs';
import log4js from 'log4js';

// Ensure the log directory exists before any file appender is created.
const LOG_DIR = './logs';
if (!fs.existsSync(LOG_DIR)) {
  fs.mkdirSync(LOG_DIR, { recursive: true });
}

/**
 * Central log4js configuration. Configured exactly once for the whole process so
 * that categories and appenders stay consistent across modules (previously each
 * module called log4js.configure() and clobbered the others).
 *
 * Categories:
 *  - default: application logs (app.log + stdout)
 *  - HTTP:    morgan access logs
 *  - JWT:     auth-middleware traces
 *  - CRON:    scheduled-job traces (separate cron.log)
 */
log4js.configure({
  appenders: {
    app: { type: 'file', filename: `${LOG_DIR}/app.log` },
    cron: { type: 'file', filename: `${LOG_DIR}/cron.log` },
    out: { type: 'stdout' },
  },
  categories: {
    default: { appenders: ['app', 'out'], level: process.env.LOG_LEVEL || 'info' },
    HTTP: { appenders: ['app'], level: 'info' },
    JWT: { appenders: ['app'], level: 'trace' },
    CRON: { appenders: ['cron', 'out'], level: 'trace' },
  },
});

export const getLogger = (category) => log4js.getLogger(category);

export default log4js;
