'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BookSchema = new Schema({
  title: String,
  description: String,
  author: String,
  date: String,
  link: String
});

module.exports = mongoose.model('Book', BookSchema);