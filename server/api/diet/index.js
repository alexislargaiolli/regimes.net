'use strict';

var express = require('express');
var controller = require('./diet.controller');
var auth = require('../../auth/auth.service');
var router = express.Router();

router.get('/', controller.index);
router.get('/paginate', auth.hasRole('admin'), controller.paginate);
router.post('/submit', controller.submit);
router.post('/addReview/:id/:adaptability/:efficiency/:impact/:cost', controller.addReview);
router.get('/:id', controller.show);
router.post('/', auth.hasRole('admin'), controller.create);
router.put('/:id', auth.hasRole('admin'), controller.update);
router.patch('/:id', auth.hasRole('admin'), controller.update);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);

module.exports = router;