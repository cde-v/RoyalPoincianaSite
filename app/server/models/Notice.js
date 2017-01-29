var mongoose = require('mongoose');

var schemaOptions = {
  timestamps: true,
  toJSON: {
    virtuals: true
  }
};

var noticeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  noticeContent: { type: String, required: true }
}, schemaOptions);

var Notice = mongoose.model('Notice', noticeSchema);

module.exports = Notice;
