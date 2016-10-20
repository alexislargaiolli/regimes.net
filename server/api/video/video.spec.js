'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');
var Video = require('./video.model');
var Controller = require('./video.controller');

describe('VideoController', function() {

    describe('GET /api/videos', function() {

        it('should respond with JSON array', function(done) {
            request(app)
                .get('/api/videos')
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function(err, res) {
                    if (err) return done(err);
                    res.body.should.be.instanceof(Array);
                    done();
                });
        });
    });
});
