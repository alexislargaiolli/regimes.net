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
    },
    reviews : [{
        date : {
            type : Date,
            default : Date.now
        },
        adaptability : {
            type : Number,
            min : 0,
            max : 2
        },
        efficiency : {
            type : Number,
            min : 0,
            max : 2
        },
        impact : {
            type : Number,
            min : 0,
            max : 2
        },
        cost : {
            type : Number,
            min : 0,
            max : 2
        }
    }],
    average : {
        adaptabilitySum : {
            type : Number,
            default : 0
        },
        efficiencySum : {
            type : Number,
            default : 0
        },
        impactSum : {
            type : Number,
            default : 0
        },
        costSum : {
            type : Number,
            default : 0
        },
        reviewCount : {
            type : Number,
            default : 0
        }

    }
});

DietSchema.statics.addReview = function(id, adaptability, efficiency, impact, cost, next){
    mongoose.model('Diet').findById(id, function(err, diet) {
            if (err) {
                return next(err, null);
            }
            if (diet === null) {
                return next(null, null);
            }
            else{
                diet.reviews.push({
                    adaptability : adaptability,
                    efficiency : efficiency,
                    impact : impact,
                    cost : cost
                });

                diet.average.adaptabilitySum += Number(adaptability);
                diet.average.efficiencySum += Number(efficiency);
                diet.average.impactSum += Number(impact);
                diet.average.costSum += Number(cost);
                diet.average.reviewCount++;
                diet.save(next);
            }
        });
}

module.exports = mongoose.model('Diet', DietSchema);
