/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var path = require('path');

module.exports = function(app) {

  // Insert routes below
  app.use('/api/labels', require('./api/label'));
  app.use('/api/books', require('./api/book'));
  app.use('/api/videos', require('./api/video'));
  app.use('/api/clinics', require('./api/clinic'));
  app.use('/api/actualities', require('./api/actuality'));
  app.use('/api/diets', require('./api/diet'));
  app.use('/api/users', require('./api/user'));
  app.use('/contact', require('./components/contact'));

  app.use('/auth', require('./auth'));
  
  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });
};
