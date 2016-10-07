'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ActualitySchema = new Schema({
  date: Date,
  title: String,
  content: String,
  image: String,
  published: Boolean
});

module.exports = mongoose.model('Actuality', ActualitySchema);