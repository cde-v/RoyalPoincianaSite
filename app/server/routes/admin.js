var async = require('async');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
var jwt = require('jsonwebtoken');
var moment = require('moment');
var request = require('request');
var qs = require('querystring');
var User = require('../models/User');

function generateToken(user) {
  var payload = {
    iss: 'my.domain.com',
    sub: user.id,
    iat: moment().unix(),
    exp: moment().add(7, 'days').unix()
  };
  return jwt.sign(payload, process.env.TOKEN_SECRET);
}

/**
 * Admin required middleware
 */
exports.ensureAdmin = function(req, res, next) {
  if (req.user.isAdmin) {
    next();
  } else {
    res.status(403).send({ msg: 'Forbidden' });
  }
};

/**
 * POST /signup
 * Allow admin to add users
 */
exports.adminSignupPost = function(req, res, next) {
  req.assert('name', 'Name cannot be blank').notEmpty();
  req.assert('email', 'Email is not valid').isEmail();
  req.assert('email', 'Email cannot be blank').notEmpty();
  req.assert('password', 'Password must be at least 4 characters long').len(4);
  req.sanitize('email').normalizeEmail({ remove_dots: false });

  var errors = req.validationErrors();

  if (errors) {
    return res.status(400).send(errors);
  }

  User.findOne({ email: req.body.email }, function(err, user) {
    if (user) {
      return res.status(400).send({ msg: 'The email address you have entered is already associated with another account.' });
    }
    user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });
    user.save(function(err) {
      res.send({ token: generateToken(user), user: user });
    });
  });
};


/**
 * GET /admin/users
 * Get all users / info for admin panel
 */
exports.adminGetUsers = function(req, res, next) {
  User.find({}, function(err, users) {
    res.send({ users: users, msg: 'Got all users.' });
  });
};

/**
 * PUT /admin/user/updateUser/:userId
 * Update user info
 */
exports.adminUpdateUser = function(req, res, next) {
  req.assert('email', 'Email is not valid').isEmail();
  req.assert('email', 'Email cannot be blank').notEmpty();
  req.sanitize('email').normalizeEmail({ remove_dots: false });

  var errors = req.validationErrors();

  if (errors) {
    return res.status(400).send(errors);
  }

  User.findById(req.params.userId, function(err, user) {
    user.email = req.body.email;
    user.name = req.body.name;

    user.save(function(err) {
      if (err) {
        res.status(500).send({ msg: 'Internal server error.' });
      } else {
        res.send({ user: user, msg: 'User admin status has been changed.' });
      }
    });
  });
};

/**
 * PUT /admin/user/toggleAdmin/:userId
 * Toggle whether the user is an admin or not
 */
exports.adminToggleAdmin = function(req, res, next) {
  User.findById(req.params.userId, function(err, user) {
    user.isAdmin = !user.isAdmin;
    user.save(function(err) {
      if (err) {
        res.status(500).send({ msg: 'Internal server error.' });
      } else {
        res.send({ user: user, msg: 'User admin status has been changed.' });
      }
    });
  });
};

/**
 * DELETE /admin/user/delete/:userId
 * Delete user
 */
exports.adminDeleteUser = function(req, res, next) {
  User.remove({ _id: req.params.userId }, function(err) {
    res.send({ msg: 'The account has been permanently deleted.' });
  });
};
