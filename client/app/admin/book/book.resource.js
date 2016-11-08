'use strict';

angular.module('regimesApp')
  .factory('Book', function ($resource) {    

    var Book = $resource('/api/books/:id', {id:'@_id'}, {
        'update': { method:'PUT' },
        'paginate': {method:'GET', url: '/api/books/paginate'}
    });

    // Public API here
    return Book;
  });
