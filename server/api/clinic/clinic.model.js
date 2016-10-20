'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ClinicSchema = new Schema({
    name: String,
    address: String,
    coord: {
        latitude: Number,
        longitude: Number
    }
});

module.exports = mongoose.model('Clinic', ClinicSchema);
