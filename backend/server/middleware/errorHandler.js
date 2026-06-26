import log4js from 'log4js';

const logger = log4js.getLogger('HTTP');

/**
 * asyncHandler
 * Wraps an async route handler so any rejected promise is forwarded to the
 * central error-handling middleware instead of crashing the process with an
 * unhandled rejection.
 *
 * @param {Function} handler async (req, res, next) => {...}
 * @returns {Function} Express-compatible handler
 */
export const asyncHandler = (handler) => (req, res, next) => Promise
  .resolve(handler(req, res, next))
  .catch(next);

/**
 * notFoundHandler
 * Terminal 404 handler for unmatched routes.
 */
export const notFoundHandler = (req, res) => {
  res.status(404).json({ message: `Route not found: ${req.method} ${req.originalUrl}` });
};

/**
 * errorHandler
 * Central Express error-handling middleware. Produces a clean JSON envelope and
 * keeps internal error details out of the HTTP response in production.
 */
// eslint-disable-next-line no-unused-vars
export const errorHandler = (err, req, res, next) => {
  const status = err.status || err.statusCode || 500;
  logger.error(`${req.method} ${req.originalUrl} -> ${status}: ${err.message}`);

  res.status(status).json({
    message: err.message || 'Internal server error',
  });
};
