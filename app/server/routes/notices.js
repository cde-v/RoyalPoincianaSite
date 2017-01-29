var Notice = require('../models/Notice');

exports.getNoticeList = function(req, res, next) {
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
