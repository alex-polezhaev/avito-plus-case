/**
 * validate.js
 * Lightweight request-body validation helpers. Intentionally dependency-free so
 * the auth/account routes can declare their required fields without pulling in a
 * full validation framework.
 */

/**
 * requireFields
 * Returns Express middleware that rejects the request with 400 if any of the
 * listed fields is missing (undefined, null, or an empty/whitespace string).
 *
 * @param {string[]} fields Required body field names
 * @returns {Function} Express middleware
 */
export const requireFields = (fields) => (req, res, next) => {
  const body = req.body || {};
  const missing = fields.filter((field) => {
    const value = body[field];
    if (value === undefined || value === null) return true;
    return typeof value === 'string' && value.trim() === '';
  });

  if (missing.length > 0) {
    return res.status(400).json({
      message: `Missing required field(s): ${missing.join(', ')}`,
    });
  }

  return next();
};

const EMAIL_REGEXP = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * isValidEmail
 * Minimal email-shape check used by the auth routes.
 *
 * @param {string} email
 * @returns {boolean}
 */
export const isValidEmail = (email) => typeof email === 'string' && EMAIL_REGEXP.test(email);

/**
 * requireEmail
 * Express middleware ensuring req.body[field] looks like an email address.
 *
 * @param {string} field Body field name holding the email (default: 'email')
 * @returns {Function} Express middleware
 */
export const requireEmail = (field = 'email') => (req, res, next) => {
  if (!isValidEmail(req.body?.[field])) {
    return res.status(400).json({ message: `Invalid or missing ${field}` });
  }
  return next();
};
