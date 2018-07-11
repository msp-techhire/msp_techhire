const rejectUnauthenticated = (req, res, next) => {
  if (req.isAuthenticated() && req.user.role === 'admin') {
    next();
  } else {
    res.sendStatus(403);
  }
};

module.exports = { rejectUnauthenticated };
