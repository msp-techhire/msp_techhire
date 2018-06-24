const rejectUnauthenticated = (req, res, next) => {
  // check if logged in
  // THIS FIRST IF STATEMENT CHECKS IF THEY ARE ADMIN
  if (req.isAuthenticated() && req.user.role === 'admin') {
    // They were authenticated! User may do the next thing
    // Note! They may not be Authorized to do all things
    next();
  // PLACEHOLDER: Same thing happens if they are a partner
  // Have to figure out how to parse the role and decide where
  // they will go.
  } else if (req.isAuthenticated() && req.user.role === 'partner') {
    next();
  } else {
    // failure best handled on the server. do redirect here.
    res.sendStatus(403);
  }
};

module.exports = { rejectUnauthenticated };
