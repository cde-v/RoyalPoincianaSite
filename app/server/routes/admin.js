let async = require('async');
let crypto = require('crypto');
let nodemailer = require('nodemailer');
let jwt = require('jsonwebtoken');
let moment = require('moment');
let request = require('request');
let qs = require('querystring');
let path = require('path');
let fs = require('fs');
let multer = require('multer');
let multerS3 = require('multer-storage-s3');
let AWS = require('aws-sdk');
let User = require('../models/User');
let Doc = require('../models/Doc');
let Notice = require('../models/Notice');

AWS.config.update({
  region: 'us-east-1'
});

let s3 = new AWS.S3();

function generateToken(user) {
  let payload = {
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

  let errors = req.validationErrors();

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
      res.send({ token: generateToken(user), user: user, msg: 'User added.' });
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
  req.assert('name', 'Name cannot be blank').notEmpty();
  req.assert('email', 'Email is not valid').isEmail();
  req.assert('email', 'Email cannot be blank').notEmpty();
  req.sanitize('email').normalizeEmail({ remove_dots: false });

  let errors = req.validationErrors();

  if (errors) {
    return res.status(400).send(errors);
  }

  User.findById(req.params.userId, function(err, user) {
    user.email = req.body.email;
    user.name = req.body.name;

    user.save(function(err) {
      if (err) {
        res.status(500).send({ msg: 'Internal server error.' });
        return;
      } else {
        res.send({ user: user, msg: 'User updated.' });
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
        return;
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

// File upload/storage using multer

let storage = multerS3({
  destination: function(req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function(req, file, cb) {
    // cb( null, file.fieldname + '-' + Date.now() );
    cb(null, file.originalname.replace(path.extname(file.originalname), '') + path.extname(file.originalname));
  },
  bucket: 'royalpoincianasite',
  region: 'us-east-1'
});

let upload = multer({ storage: storage }).single('file');

exports.adminSaveDoc = function(req, res, next) {
  upload(req, res, function(err) {
    if (err) {
      console.error(err);
      res.status(500).send({ msg: 'Internal server error.' });
      return;
    }
    next();
  })
}

exports.adminPostDoc = function(req, res, next) {
  Doc.findOne({ name: req.file.filename }, function(err, doc) {
    if (err) {
      res.status(500).send({ msg: 'Internal server error.' });
      return;
    }
    if (doc) {
      return res.status(400).send({ msg: 'A document already exists with this name.' });
    }
    doc = new Doc({
      title: req.body.title,
      filename: req.file.filename,
      desc: req.body.desc,
      category: req.body.category
    });
    doc.save(function(err) {
      if (err) {
        res.status(500).send({ msg: 'Internal server error.' });
        return;
      }
      res.send({ doc: doc, msg: 'Document added.' });
    });
  });
};

exports.adminDeleteDoc = function(req, res, next) {
  let params = { Bucket: 'royalpoincianasite', Key: 'uploads/' + req.params.docId };
  s3.deleteObject(params, function(err) {
    if (err) {
      res.status(500).send({ msg: 'Internal server error.' });
      return;
    }
    Doc.remove({ filename: req.params.docId }, function(err) {
      if (err) {
        res.status(500).send({ msg: 'Internal server error.' });
        return;
      }
      res.send({ msg: 'Document has been successfully deleted.' });
    });
  });
};

exports.adminGetDocs = function(req, res, next) {
  Doc.find({}, function(err, docs) {
    if (err) {
      res.status(500).send({ msg: 'Internal server error.' });
      return;
    }
    if (!docs) {
      res.status(404).send({ msg: 'Document not found.' });
      return;
    }
    res.send({ docs: docs, msg: 'Document found.' });
  });
};

exports.adminPostNotice = function(req, res, next) {
  let notice = new Notice({
    title: req.body.title,
    noticeContent: req.body.noticeContent
  });
  notice.save(function(err) {
    if (err) {
      res.status(500).send({ msg: 'Internal server error.' });
      return;
    }
    res.send({ notice: notice, msg: 'Notice added.' });
  });
};

exports.adminDeleteNotice = function(req, res, next) {
  Notice.remove({ _id: req.params.noticeId }, function(err) {
    if (err) {
      res.status(500).send({ msg: 'Internal server error.' });
      return;
    }
    res.send({ msg: 'Notice has been successfully deleted.' });
  });
};
