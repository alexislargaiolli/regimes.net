'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');
var Controller = require('./diet.controller');
var Diet = require('./diet.model');

describe('Diet controller', function() {

    describe('GET /api/diets', function() {

        it('should respond with JSON array', function(done) {
            request(app)
                .get('/api/diets')
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function(err, res) {
                    if (err) return done(err);
                    res.body.should.be.instanceof(Array);
                    done();
                });
        });
    });

    describe('GET /api/addReview', function() {

        it('should respond status 500', function(done) {
            request(app)
                .post('/api/diets/addReview/1/1/1/1/1')
                .expect(500, done)
        });

        it('should respond status 200', function(done) {
            request(app)
                .post('/api/diets/addReview/57f7977ff7130efc245adfc6/1/1/1/1')
                .expect(200, done)
        });
        
    });

    describe('#validateSubmitedDiet', function() {

        it('should return error if author is empty', function(done) {
            Controller.validateSubmitedDiet({}, function(err, diet) {
                should.exist(err);
                done();
            });
        });

        it('should return error if author.lastname is empty', function(done) {
            Controller.validateSubmitedDiet({ author: { test: 'test' } }, function(err, diet) {
                should.exist(err);
                done();
            });
        });

        it('should return error if author.firstname is empty', function(done) {
            Controller.validateSubmitedDiet({ author: { test: 'test' } }, function(err, diet) {
                should.exist(err);
                done();
            });
        });

        it('should return error if author.email is empty', function(done) {
            Controller.validateSubmitedDiet({ author: { test: 'test' } }, function(err, diet) {
                should.exist(err);
                done();
            });
        });
    });

    describe('#submitProcess', function() {
        var correctDiet = {
            title: 'test',
            abstract: 'test',
            content: 'test',
            dietType: '0',
            author: {
                lastname: 'test',
                firstname: 'test',
                email: 'test@test'
            }
        };

        before(function(done) {
            Diet.remove().exec(function() {
                done();
            });
        });

        afterEach(function(done) {
            Diet.remove().exec(function() {
                done();
            });
        });

        it('should begin with no diet', function(done) {
            Diet.find({}).exec(function(err, diets) {
                diets.should.have.length(0);
                done();
            });
        });

        it('should return an error if no author is provided', function(done) {
            Controller.submitProcess({}, function(err, diet) {
                should.exist(err);
                done();
            });
        });

        it('should work with a correct diet', function(done) {
            Controller.submitProcess(correctDiet, function(err, diet) {
                should.not.exist(err);
                should.exist(diet);
                done();
            });
        });

        it('should return a diet unpublished', function(done) {
            Controller.submitProcess(correctDiet, function(err, diet) {
                should.not.exist(err);
                should.exist(diet);
                diet.published.should.be.false; // jshint ignore:line
                done();
            });
        });

    });

});
