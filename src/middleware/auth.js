/**
 * Authentication middleware
 */

/**
 * Middleware to check if user is authenticated
 */
function isAuthenticated(req, res, next) {
  if (req.session && req.session.accessToken) {
    return next();
  }
  res.status(401).json({ error: 'Not authenticated' });
}

module.exports = { isAuthenticated };
