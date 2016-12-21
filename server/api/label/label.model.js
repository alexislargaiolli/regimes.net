'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var LabelSchema = new Schema({
  name: String,
  key:String,
  value:String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Label', LabelSchema);