var Notice = require('../models/Notice');

exports.getNoticeList = function(req, res, next) {
  Notice.find({}, function(err, notices) {
    if (err) {
      res.status(500).send({ msg: 'Internal server error.' });
      return;
    }
    if (!notices) {
      res.status(404).send({ msg: 'Notices not found.' });
      return;
    }
    res.send({ notices: notices, msg: 'Notices found.' });
  });
};
