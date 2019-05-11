const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const session = require('express-session');
const uuid = require('uuid/v4');
const bodyParser = require('body-parser');
const FileStore = require('session-file-store')(session);
const cors = require('cors');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const booksRouter = require('./routes/books');
const categoriesRouter = require('./routes/categories');

const app = express();
app.use('/uploads', express.static('uploads'));
app.use(express.static(path.join(__dirname, '../client/build')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(cors());
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});
app.use(
  session({
    genid: req => {
      return uuid(); // use UUIDs for session IDs
    },
    store: new FileStore(),
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.session());
// app.use(express.static(path.join(__dirname, 'public')));
require('./middleware/passport');

// app.use((req, res, next) => {
//   req.login = promisify(req.login, req);
//   next();
// });

app.use('/api/categories', categoriesRouter);
app.use('/api/users', usersRouter);
app.use('/api/books', booksRouter);
app.use('/api', indexRouter);

module.exports = app;
