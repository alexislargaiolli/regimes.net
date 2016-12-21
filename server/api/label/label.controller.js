'use strict';

var _ = require('lodash');

var Label = require('./label.model');


// Get list of labels
exports.index = function(req, res) {
    
    
    var query = null;
    if (req.query.count === 'true') {
        query = Label.count();
    } else {
        query = Label.find();
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
    if (req.query.key) {
        query.where({key : req.query.key});
    }
    query.exec(function(err, labels) {
        if (err) {
            return handleError(res, err);
        }
        return res.status(200).json(labels);
    });
    
};


exports.paginate = function(req, res) {
    var queryFind = Label.find();
    var queryCount = Label.count();
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
        queryFind.exec(function(err, labels) {
            if (err) {
                return handleError(res, err);
            }
            return res.status(200).json({ count: count, datas: labels });
        });
    });
};

// Get a single label
exports.show = function(req, res) {
    Label.findById(req.params.id, function(err, label) {
        if (err) {
            return handleError(res, err);
        }
        if (!label) {
            return res.status(404).send('Not Found');
        }
        return res.json(label);
    });
};

// Creates a new label in the DB.
exports.create = function(req, res) {
    Label.create(req.body, function(err, label) {
        if (err) {
            return handleError(res, err);
        }
        return res.status(201).json(label);
    });
};

// Updates an existing label in the DB.
exports.update = function(req, res) {
    if (req.body._id) { delete req.body._id; }
    Label.findById(req.params.id, function(err, label) {
        if (err) {
            return handleError(res, err);
        }
        if (!label) {
            return res.status(404).send('Not Found');
        }
        var updated = _.merge(label, req.body);
        updated.save(function(err) {
            if (err) {
                return handleError(res, err);
            }
            return res.status(200).json(label);
        });
    });
};

// Deletes a label from the DB.
exports.destroy = function(req, res) {
    Label.findById(req.params.id, function(err, label) {
        if (err) {
            return handleError(res, err);
        }
        if (!label) {
            return res.status(404).send('Not Found');
        }
        label.remove(function(err) {
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

