var mongoose = require('mongoose');

var schemaOptions = {
  timestamps: true,
  toJSON: {
    virtuals: true
  }
};

var noticeSchema = new mongoose.Schema({
  title: String,
  textContent: String
}, schemaOptions);

var Notice = mongoose.model('Notice', noticeSchema);

module.exports = Notice;
