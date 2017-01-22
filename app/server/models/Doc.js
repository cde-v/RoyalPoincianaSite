var mongoose = require('mongoose');

var schemaOptions = {
  timestamps: true,
  toJSON: {
    virtuals: true
  }
};

var docSchema = new mongoose.Schema({
  name: String,
  desc: String
}, schemaOptions);

var Doc = mongoose.model('Doc', docSchema);

module.exports = Doc;
