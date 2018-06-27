
const express = require('express');
require('dotenv').config();

const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');

const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const editPartner = require('./routes/editPartner.router');
const summaryRouter = require('./routes/summary.router');

// TO DO
// work in progress for search
// need dummy data to test
const searchAdmin = require('./routes/search.router');


// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/editPartner', editPartner);
app.use('/api/summary', summaryRouter);

// TO DO
// work in progress for search
// need dummy data to test
app.use('/api/admin', searchAdmin); 


// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
