let express = require('express');
let path = require('path');
let logger = require('morgan');
let compression = require('compression');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let expressValidator = require('express-validator');
let dotenv = require('dotenv');
let mongoose = require('mongoose');
let jwt = require('jsonwebtoken');
let moment = require('moment');
let request = require('request');

// Load environment variables from .env file, only for LOCAL env, .env not on heroku, actually part of vars

if (process.env.NODE_ENV !== 'prod') {
  dotenv.load();
}

// Models
let User = require('./models/User');

// Routes
let userRoutes = require('./routes/user');
let contactRoutes = require('./routes/contact');
let adminRoutes = require('./routes/admin');
let documentsRoutes = require('./routes/documents');
let noticesRoutes = require('./routes/notices');

let app = express();

// let npmPath = path.join(__dirname, './node_modules');
// let browserPath = path.join(__dirname, './browser');

// app.use(express.static(npmPath));
// app.use(express.static(browserPath));

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('error', function() {
  console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
  process.exit(1);
});
app.set('port', process.env.PORT || 3000);
app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.static(path.join(__dirname, '../../uploads')));

app.use(function(req, res, next) {
  req.isAuthenticated = function() {
    let token = (req.headers.authorization && req.headers.authorization.split(' ')[1]) || req.cookies.token;
    try {
      return jwt.verify(token, process.env.TOKEN_SECRET);
    } catch (err) {
      return false;
    }
  };

  if (req.isAuthenticated()) {
    let payload = req.isAuthenticated();
    User.findById(payload.sub, function(err, user) {
      req.user = user;
      next();
    });
  } else {
    next();
  }
});

app.get('/documents/download/:docId', documentsRoutes.downloadDocument);
app.get('/documents', userRoutes.ensureAuthenticated, documentsRoutes.getDocumentList);
app.get('/admin/documents', userRoutes.ensureAuthenticated, adminRoutes.ensureAdmin, adminRoutes.adminGetDocs);
app.delete('/admin/documents/delete/:docId', userRoutes.ensureAuthenticated, adminRoutes.ensureAdmin, adminRoutes.adminDeleteDoc);
app.post('/admin/documents/upload', userRoutes.ensureAuthenticated, adminRoutes.ensureAdmin, adminRoutes.adminSaveDoc, adminRoutes.adminPostDoc);
app.get('/notices', userRoutes.ensureAuthenticated, noticesRoutes.getNoticeList);
app.get('/admin/notices', userRoutes.ensureAuthenticated, adminRoutes.ensureAdmin, adminRoutes.adminGetNotices);
app.delete('/admin/notices/delete/:docId', userRoutes.ensureAuthenticated, adminRoutes.ensureAdmin, adminRoutes.adminDeleteNotice);
app.post('/admin/notices/upload', userRoutes.ensureAuthenticated, adminRoutes.ensureAdmin, adminRoutes.adminPostNotice);
app.get('/admin/users', userRoutes.ensureAuthenticated, adminRoutes.ensureAdmin, adminRoutes.adminGetUsers);
app.put('/admin/users/updateUser/:userId', userRoutes.ensureAuthenticated, adminRoutes.ensureAdmin, adminRoutes.adminUpdateUser);
app.put('/admin/users/toggleAdmin/:userId', userRoutes.ensureAuthenticated, adminRoutes.ensureAdmin, adminRoutes.adminToggleAdmin);
app.delete('/admin/users/delete/:userId', userRoutes.ensureAuthenticated, adminRoutes.ensureAdmin, adminRoutes.adminDeleteUser);
app.post('/contact', contactRoutes.contactPost);
app.put('/account', userRoutes.ensureAuthenticated, userRoutes.accountPut);
app.delete('/account', userRoutes.ensureAuthenticated, userRoutes.accountDelete);
app.post('/signup', userRoutes.ensureAuthenticated, adminRoutes.ensureAdmin, userRoutes.signupPost);
app.post('/login', userRoutes.loginPost);
app.post('/forgot', userRoutes.forgotPost);
app.post('/reset/:token', userRoutes.resetPost);

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../../public/index.html'));
});

app.get('*', function(req, res) {
  res.redirect('/#' + req.originalUrl);
});

// Production error handler
if (app.get('env') === 'production') {
  app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.sendStatus(err.status || 500);
  });
}

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});

module.exports = app;
