'use strict';

angular.module('regimesApp')
  .factory('Label', function ($resource) {    

    var Label = $resource('/api/labels/:id', {id:'@_id'}, {
        'update': { method:'PUT' },
        'paginate': {method:'GET', url: '/api/labels/paginate'}
    });

    // Public API here
    return Label;
  });
