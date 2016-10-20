'use strict';

angular.module('regimesApp')
  .factory('Video', function ($resource) {    

    var Video = $resource('/api/videos/:id', {id:'@_id'}, {
        'update': { method:'PUT' },
        'paginate': {method:'GET', url: '/api/videos/paginate'}
    });

    // Public API here
    return Video;
  });
