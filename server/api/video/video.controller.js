'use strict';

var _ = require('lodash');

var Video = require('./video.model');


// Get list of videos
exports.index = function(req, res) {
    var query = null;
    if (req.query.count === 'true') {
        query = Video.count();
    } else {
        query = Video.find();
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
    query.exec(function(err, videos) {
        if (err) {
            return handleError(res, err);
        }
        return res.status(200).json(videos);
    });
    
};


exports.paginate = function(req, res) {
    var queryFind = Video.find();
    var queryCount = Video.count();
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
        queryFind.exec(function(err, videos) {
            if (err) {
                return handleError(res, err);
            }
            return res.status(200).json({ count: count, datas: videos });
        });
    });
};

// Get a single video
exports.show = function(req, res) {
    Video.findById(req.params.id, function(err, video) {
        if (err) {
            return handleError(res, err);
        }
        if (!video) {
            return res.status(404).send('Not Found');
        }
        return res.json(video);
    });
};

// Creates a new video in the DB.
exports.create = function(req, res) {
    Video.create(req.body, function(err, video) {
        if (err) {
            return handleError(res, err);
        }
        return res.status(201).json(video);
    });
};

// Updates an existing video in the DB.
exports.update = function(req, res) {
    if (req.body._id) { delete req.body._id; }
    Video.findById(req.params.id, function(err, video) {
        if (err) {
            return handleError(res, err);
        }
        if (!video) {
            return res.status(404).send('Not Found');
        }        
        var updated = _.merge(video, req.body);
        updated.save(function(err) {
            if (err) {
                return handleError(res, err);
            }
            return res.status(200).json(video);
        });
    });
};

// Deletes a video from the DB.
exports.destroy = function(req, res) {
    Video.findById(req.params.id, function(err, video) {
        if (err) {
            return handleError(res, err);
        }
        if (!video) {
            return res.status(404).send('Not Found');
        }
        video.remove(function(err) {
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

