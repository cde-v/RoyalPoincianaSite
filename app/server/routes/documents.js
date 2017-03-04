let path = require('path');
let fs = require('fs');
let AWS = require('aws-sdk');
var Doc = require('../models/Doc');

AWS.config.update({
  region: 'us-east-1'
});

let s3 = new AWS.S3();

exports.downloadDocument = function(req, res, next) {
  let params = { Bucket: 'royalpoincianasite', Key: 'uploads/' + req.params.docId };
  let fileStream = s3.getObject(params).createReadStream();
  res.attachment(req.params.docId);
  fileStream.pipe(res);
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
