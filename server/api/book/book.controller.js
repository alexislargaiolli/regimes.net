'use strict';

var _ = require('lodash');

var Book = require('./book.model');


// Get list of books
exports.index = function(req, res) {
    
    
    var query = null;
    if (req.query.count === 'true') {
        query = Book.count();
    } else {
        query = Book.find();
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
    query.exec(function(err, books) {
        if (err) {
            return handleError(res, err);
        }
        return res.status(200).json(books);
    });
    
};


exports.paginate = function(req, res) {
    var queryFind = Book.find();
    var queryCount = Book.count();
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
        queryFind.exec(function(err, books) {
            if (err) {
                return handleError(res, err);
            }
            return res.status(200).json({ count: count, datas: books });
        });
    });
};

// Get a single book
exports.show = function(req, res) {
    Book.findById(req.params.id, function(err, book) {
        if (err) {
            return handleError(res, err);
        }
        if (!book) {
            return res.status(404).send('Not Found');
        }
        return res.json(book);
    });
};

// Creates a new book in the DB.
exports.create = function(req, res) {
    Book.create(req.body, function(err, book) {
        if (err) {
            return handleError(res, err);
        }
        return res.status(201).json(book);
    });
};

// Updates an existing book in the DB.
exports.update = function(req, res) {
    if (req.body._id) { delete req.body._id; }
    Book.findById(req.params.id, function(err, book) {
        if (err) {
            return handleError(res, err);
        }
        if (!book) {
            return res.status(404).send('Not Found');
        }
        var updated = _.merge(book, req.body);
        updated.save(function(err) {
            if (err) {
                return handleError(res, err);
            }
            return res.status(200).json(book);
        });
    });
};

// Deletes a book from the DB.
exports.destroy = function(req, res) {
    Book.findById(req.params.id, function(err, book) {
        if (err) {
            return handleError(res, err);
        }
        if (!book) {
            return res.status(404).send('Not Found');
        }
        book.remove(function(err) {
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

