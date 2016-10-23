'use strict';

var express = require('express');
var router = express.Router();
var controller = require('./contact.controller');

router.post('/', controller.contact	);

module.exports = router;