'use strict';

var _ = require('lodash');

var Clinic = require('./clinic.model');


// Get list of clinics
exports.index = function(req, res) {
    
    
    var query = null;
    if (req.query.count === 'true') {
        query = Clinic.count();
    } else {
        query = Clinic.find();
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
    query.exec(function(err, clinics) {
        if (err) {
            return handleError(res, err);
        }
        return res.status(200).json(clinics);
    });
    
};


exports.paginate = function(req, res) {
    var queryFind = Clinic.find();
    var queryCount = Clinic.count();
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
        queryFind.exec(function(err, clinics) {
            if (err) {
                return handleError(res, err);
            }
            return res.status(200).json({ count: count, datas: clinics });
        });
    });
};

// Get a single clinic
exports.show = function(req, res) {
    Clinic.findById(req.params.id, function(err, clinic) {
        if (err) {
            return handleError(res, err);
        }
        if (!clinic) {
            return res.status(404).send('Not Found');
        }
        return res.json(clinic);
    });
};

// Creates a new clinic in the DB.
exports.create = function(req, res) {
    Clinic.create(req.body, function(err, clinic) {
        if (err) {
            return handleError(res, err);
        }
        return res.status(201).json(clinic);
    });
};

// Updates an existing clinic in the DB.
exports.update = function(req, res) {
    if (req.body._id) { delete req.body._id; }
    Clinic.findById(req.params.id, function(err, clinic) {
        if (err) {
            return handleError(res, err);
        }
        if (!clinic) {
            return res.status(404).send('Not Found');
        }
        var updated = _.merge(clinic, req.body);
        updated.save(function(err) {
            if (err) {
                return handleError(res, err);
            }
            return res.status(200).json(clinic);
        });
    });
};

// Deletes a clinic from the DB.
exports.destroy = function(req, res) {
    Clinic.findById(req.params.id, function(err, clinic) {
        if (err) {
            return handleError(res, err);
        }
        if (!clinic) {
            return res.status(404).send('Not Found');
        }
        clinic.remove(function(err) {
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

