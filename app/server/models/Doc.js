var mongoose = require('mongoose');

var schemaOptions = {
  timestamps: true,
  toJSON: {
    virtuals: true
  }
};

var docSchema = new mongoose.Schema({
	title: String,
  filename: String,
  desc: String,
  category: String
}, schemaOptions);

var Doc = mongoose.model('Doc', docSchema);

module.exports = Doc;
