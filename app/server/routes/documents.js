let path = require('path');
let fs = require('fs');
var Doc = require('../models/Doc');

exports.downloadDocument = function(req, res, next) {
  let stream = fs.createReadStream(path.resolve(__dirname, '../../../uploads/' + req.params.docId));
  let filename = req.params.docId;

  filename = encodeURIComponent(filename);

  res.setHeader('Content-disposition', 'attachment; filename="' + filename + '"');
  res.setHeader('Content-type', 'application/pdf');

  stream.pipe(res);
};

exports.getDocumentList = function(req, res, next) {
  Doc.find({}, function(err, docs) {
    if (err) {
      res.json({ errorCode: 1, errDesc: err });
      return;
    }
    if (!docs) {
      res.json({ errorCode: 1, errDesc: 'No documents found' });
      return;
    }
    res.send({ docs });
  });
};


