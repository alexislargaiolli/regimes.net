'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var DietSchema = new Schema({
    date: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String,
        required: true
    },
    abstract: {
        type: String,
        minlength: 1,
        maxlength: 500
    },
    content: {
        type: String,
        minlength: 1,
        maxlength: 3000
    },
    image: String,
    author: {
        firsname: String,
        lastname: String,
        email: String
    },
    dietType: { 
      type: Number,
      required : true
    },
    submitDate: {
        type: Date,
        default: Date.now
    },
    published: {
      type : Boolean,
      default : false
    }
});

module.exports = mongoose.model('Diet', DietSchema);
