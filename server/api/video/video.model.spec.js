'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');
var Video = require('./video.model');

describe('Video', function() {

    before(function(done) {
        // Clear users before testing
        Video.remove().exec().then(function() {
            done();
        });
    });

    afterEach(function(done) {
        Video.remove().exec().then(function() {
            done();
        });
    });

    it('should begin with no videos', function(done) {
        Video.find({}, function(err, videos) {
            videos.should.have.length(0);
            done();
        });
    });


    describe('resetAllActive', function() {

        it('should modify 0 videos', function(done) {
            Video.resetAllActive(function(err, result) {
                should.not.exist(err);
                result.nModified.should.equal(0);
                done();
            });
        });

        it('should modify 0 videos after having create an non active video', function(done) {
            Video.create({ active: false }, function() {
                Video.resetAllActive(function(err, result) {
                    should.not.exist(err);
                    result.nModified.should.equal(0);
                    done();
                });
            });
        });

        it('should modify 1 videos after having create an active video', function(done) {
            Video.create({ active: true }, function() {
                Video.resetAllActive(function(err, result) {
                    should.not.exist(err);
                    result.nModified.should.equal(1);
                    done();
                });
            });
        });

        it('should not exit active video after calling the method', function(done) {
            Video.create({ active: true }, function() {
                Video.resetAllActive(function(err, result) {
                    Video.find({ active: true }, function(err, videos) {
                        should.not.exist(err);
                        videos.should.have.length(0);
                    });
                    done();
                });
            });
        });
    });

    describe('pre update hook', function() {

        it('should always have a maximum number of active video of 1', function(done) {
            Video.create({ active: true }, function() {
                Video.create({ active: true }, function() {
                    Video.find({ active: true }, function(err, videos) {
                        should.not.exist(err);
                        videos.should.have.length(1);
                    });
                    done();
                });
            });
        });

    });
});
