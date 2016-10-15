'use strict';

var _ = require('lodash');
var fs = require('fs');
var path = require('path');
var config = require('../../config/environment');
var Actuality = require('./actuality.model');
var cloudinary = require('cloudinary');

exports.uploadImage = function(req, res, next) {

    var stream = cloudinary.uploader.upload_stream(function(result) {
        res.send(result.url);
    }, { public_id: req.body.title });
    fs.createReadStream(req.files.file.path).pipe(stream);

};

// Get list of actualitys
exports.index = function(req, res) {


    var query = null;
    if (req.query.count === 'true') {
        query = Actuality.count({ published: true });
    } else {
        query = Actuality.find({ published: true });
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
    query.exec(function(err, actualitys) {
        if (err) {
            return handleError(res, err);
        }
        return res.status(200).json(actualitys);
    });

};


exports.paginate = function(req, res) {
    var queryFind = Actuality.find();
    var queryCount = Actuality.count();
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
        queryFind.exec(function(err, actualitys) {
            if (err) {
                return handleError(res, err);
            }
            return res.status(200).json({ count: count, datas: actualitys });
        });
    });
};

// Get a single actuality
exports.show = function(req, res) {
    Actuality.findById(req.params.id, function(err, actuality) {
        if (err) {
            return handleError(res, err);
        }
        if (!actuality) {
            return res.status(404).send('Not Found');
        }
        return res.json(actuality);
    });
};

// Creates a new actuality in the DB.
exports.create = function(req, res) {
    Actuality.create(req.body, function(err, actuality) {
        if (err) {
            return handleError(res, err);
        }
        return res.status(201).json(actuality);
    });
};

// Updates an existing actuality in the DB.
exports.update = function(req, res) {
    if (req.body._id) { delete req.body._id; }
    Actuality.findById(req.params.id, function(err, actuality) {
        if (err) {
            return handleError(res, err);
        }
        if (!actuality) {
            return res.status(404).send('Not Found');
        }
        var updated = _.merge(actuality, req.body);
        updated.save(function(err) {
            if (err) {
                return handleError(res, err);
            }
            return res.status(200).json(actuality);
        });
    });
};

// Deletes a actuality from the DB.
exports.destroy = function(req, res) {
    Actuality.findById(req.params.id, function(err, actuality) {
        if (err) {
            return handleError(res, err);
        }
        if (!actuality) {
            return res.status(404).send('Not Found');
        }
        actuality.remove(function(err) {
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
