'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var VideoSchema = new Schema({
    name: String,
    url: String,
    active: Boolean //True to show on home page
});


VideoSchema.statics.resetAllActive = function(next) {
    mongoose.model('Video').update({ active: true }, { $set: { active: false } }).exec(function(err, videos) {
        next(err, videos);
    });
}

VideoSchema.pre('update', function(next) {
    if (this.active === true) {
        mongoose.model('Video').resetAllActive(next);
    } else {
        next();
    }
});

VideoSchema.pre('save', function(next) {
    if (this.active === true) {
        mongoose.model('Video').resetAllActive(next);
    } else {
        next();
    }
});

module.exports = mongoose.model('Video', VideoSchema);
