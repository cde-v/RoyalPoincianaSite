var Notice = require('../models/Notice');

exports.adminPostNotice = function(req, res, next) {
  Notice.findOne({ title: req.body.title }, function(err, notice) {
    if (err) {
      res.json({ errorCode: 1, errDesc: err });
      return;
    }
    if (notice) {
      return res.status(400).send({ msg: 'An notice already exists with this title' });
    }
    notice = new Notice({
      title: req.body.title,
      textContent: req.body.textContent
    });
    notice.save(function(err) {
      if (err) {
        res.json({ errorCode: 1, errDesc: err });
        return;
      }
      res.send({ notice });
    });
  });
};

exports.adminGetNotices = function(req, res, next) {
  Notice.find({}, function(err, notices) {
    if (err) {
      res.json({ errorCode: 1, errDesc: err });
      return;
    }
    if (!notices) {
      res.json({ errorCode: 1, errDesc: 'No notices found' });
      return;
    }
    res.send({ notices });
  });
};

exports.adminDeleteNotice = function(req, res, next) {
  Notice.remove({ _id: req.params.docId }, function(err) {
    if (err) {
      res.json({ errorCode: 1, errDesc: err });
      return;
    }
    res.send({ msg: 'Notice has been successfully deleted.' });
  });
};
