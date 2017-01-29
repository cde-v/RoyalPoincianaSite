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
      res.status(500).send({ msg: 'Internal server error.' });
      return;
    }
    if (!docs) {
      res.status(404).send({ msg: 'Document not found.' });
      return;
    }
    res.send({ docs: docs, msg: 'Documents found' });
  });
};
