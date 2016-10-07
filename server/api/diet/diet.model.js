'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var DietSchema = new Schema({
  date: Date,
  title: String,
  abstract: String,
  content: String,
  image: String,
  author: {
  	firsname: String,
  	lastname: String,
  	email: String
  }, 
  dietType: Number,
  published: Boolean
});

module.exports = mongoose.model('Diet', DietSchema);