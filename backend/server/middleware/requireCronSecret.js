import log4js from 'log4js';

const logger = log4js.getLogger('CRON');

/**
 * requireCronSecret
 * Guards the internal /cron/* endpoints, which are triggered by an external
 * scheduler (crontab / uptime pinger) rather than an authenticated user.
 *
 * The caller must supply the shared secret from process.env.CRON_SECRET either
 * as an `x-cron-secret` header or a `secret` query parameter. Any mismatch is
 * rejected with 401 so the heavy Google Sheets / Avito jobs cannot be invoked
 * anonymously.
 */
const requireCronSecret = (req, res, next) => {
  const expected = process.env.CRON_SECRET;

  if (!expected) {
    logger.error('CRON_SECRET is not configured - refusing to run cron job.');
    return res.status(500).json({ message: 'Cron secret is not configured' });
  }

  const provided = req.get('x-cron-secret') || req.query.secret;

  if (provided !== expected) {
    logger.warn(`Unauthorized cron call to ${req.originalUrl}. Access denied.`);
    return res.status(401).json({ message: 'Invalid or missing cron secret' });
  }

  return next();
};

export default requireCronSecret;
