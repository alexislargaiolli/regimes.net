'use strict';

var _ = require('lodash');

var Diet = require('./diet.model');


// Get list of diets
exports.index = function(req, res) {
    
    var type = req.query.dietType;
    var selector = {published : true};
    if(type){
        selector.dietType = type;
    }
    var query = null;
    if (req.query.count === 'true') {
        query = Diet.count(selector);
    } else {
        query = Diet.find(selector);
    }
    if (req.query.limit) {
        query.limit(req.query.limit);
    }
    if (req.query.skip) {
        query.skip(req.query.skip);
    }
    if (req.query.sort) {
        query.sort(req.query.sort);
    }
    query.exec(function(err, diets) {
        if (err) {
            return handleError(res, err);
        }
        return res.status(200).json(diets);
    });
    
};


exports.paginate = function(req, res) {
    var queryFind = Diet.find();
    var queryCount = Diet.count();
    if (req.query.limit) {
        queryFind.limit(req.query.limit);
    }
    if (req.query.page) {
        var skip = (req.query.page - 1) * req.query.limit;        
        queryFind.skip(skip);
    }
    if (req.query.order) {
        queryFind.sort(req.query.order);
    }
    queryCount.exec(function(err, count) {
        if (err) {
            return handleError(res, err);
        }
        queryFind.exec(function(err, diets) {
            if (err) {
                return handleError(res, err);
            }
            return res.status(200).json({ count: count, datas: diets });
        });
    });
};

// Get a single diet
exports.show = function(req, res) {
    Diet.findById(req.params.id, function(err, diet) {
        if (err) {
            return handleError(res, err);
        }
        if (!diet) {
            return res.status(404).send('Not Found');
        }
        return res.json(diet);
    });
};

// Creates a new diet in the DB.
exports.create = function(req, res) {
    Diet.create(req.body, function(err, diet) {
        if (err) {
            return handleError(res, err);
        }
        return res.status(201).json(diet);
    });
};

// Updates an existing diet in the DB.
exports.update = function(req, res) {
    if (req.body._id) { delete req.body._id; }
    Diet.findById(req.params.id, function(err, diet) {
        if (err) {
            return handleError(res, err);
        }
        if (!diet) {
            return res.status(404).send('Not Found');
        }
        var updated = _.merge(diet, req.body);
        updated.save(function(err) {
            if (err) {
                return handleError(res, err);
            }
            return res.status(200).json(diet);
        });
    });
};

// Deletes a diet from the DB.
exports.destroy = function(req, res) {
    Diet.findById(req.params.id, function(err, diet) {
        if (err) {
            return handleError(res, err);
        }
        if (!diet) {
            return res.status(404).send('Not Found');
        }
        diet.remove(function(err) {
            if (err) {
                return handleError(res, err);
            }
            return res.status(204).send('No Content');
        });
    });
};

function handleError(res, err) {
    return res.status(500).send(err);
}

