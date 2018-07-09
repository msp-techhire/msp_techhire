
const express = require('express');
require('dotenv').config();

const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');

const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const editPartner = require('./routes/editPartner.router');
const partnerRouter = require('./routes/partner.router');
const summaryRouter = require('./routes/summary.router');
const searchAdmin = require('./routes/search.router');
const editStudentRouter = require('./routes/studentSearch.router');

// Body parser middleware
app.use(bodyParser.json({ limit: '50mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/editPartner', editPartner);
app.use('/api/partner', partnerRouter)
app.use('/api/summary', summaryRouter);
app.use('/api/admin', searchAdmin); 
app.use('/api/studentEdit', editStudentRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
