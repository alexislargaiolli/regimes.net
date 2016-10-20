'use strict';

var should = require('should');
var app = require('../../app');
var Diet = require('./diet.model');

describe('Diet', function() {

    before(function(done) {
        // Clear users before testing
        Diet.remove().exec().then(function() {
            done();
        });
    });

    afterEach(function(done) {
        Diet.remove().exec().then(function() {
            done();
        });
    });

    it('should begin with no diets', function(done) {
        Diet.find({}, function(err, diets) {
            diets.should.have.length(0);
            done();
        });
    });

    describe('addReview', function() {
        it('should return null with not diet', function(done) {
            Diet.addReview(1, 1, 1, 1, 1, function(err, diet) {
                should.not.exist(diet);
                done();
            })
        });

        it('should add review to an extisting diet', function(done) {
            Diet.create({title : 'test', dietType : 0}, function(err, diet) {
                if(err){
                    return done(err);
                }
                Diet.addReview(diet._id, 1, 1, 1, 1, function(err, diet) {
                    if(err){
                        return done(err);
                    }
                    diet.reviews.should.have.length(1);
                    done();
                });
            });
        });
    });

});

