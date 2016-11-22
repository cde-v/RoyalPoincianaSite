var express = require('express');
var path = require('path');
let logger = require('morgan');
let compression = require('compression');
let cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
let expressValidator = require('express-validator');
let dotenv = require('dotenv');
let mongoose = require('mongoose');
let jwt = require('jsonwebtoken');
let moment = require('moment');
let request = require('request');
var routes = require('server/routes');

var app = express();

// Load environment variables from .env file, only for LOCAL env, .env not on heroku, actually part of vars
// console.log(process.env)

if (process.env.NODE_ENV !== 'prod') {
  dotenv.load();
  console.log('BOOM')
}

var PORT = process.env.PORT || 3000;

app.set('port', PORT || 3000);

app.use(bodyParser.json());

// Used for production build
app.use(express.static(path.join(__dirname, 'public')));

routes(app);

app.all('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(PORT, function() {
    console.log('Server running on ' + PORT);
});
