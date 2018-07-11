const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {

  pool.query('SELECT "id", "username", "role" FROM "user" WHERE "id" = $1', [id]).then((result) => {
    const user = result && result.rows && result.rows[0];

    if (!user) {
      done(null, false, { message: 'Incorrect credentials.' });
    } else {
      done(null, user);
    }
  }).catch((err) => {
    done(err);
  });
});

passport.use('local', new LocalStrategy({
  passReqToCallback: true,
  usernameField: 'username',
}, ((req, username, password, done) => {

    pool.query('SELECT * FROM "user" WHERE "username" = $1', [username])
      .then((result) => {
        const user = result && result.rows && result.rows[0];
        if (user && encryptLib.comparePassword(password, user.password)) {
          done(null, user);
        } else if (user) {
          done(null, false, { message: 'Incorrect credentials.' });
        } else {
          done(null, false);
        }
      }).catch((err) => {
        done(null, {});
      });
  })));

module.exports = passport;