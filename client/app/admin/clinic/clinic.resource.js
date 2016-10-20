'use strict';

angular.module('regimesApp')
  .factory('Clinic', function ($resource) {    

    var Clinic = $resource('/api/clinics/:id', {id:'@_id'}, {
        'update': { method:'PUT' },
        'paginate': {method:'GET', url: '/api/clinics/paginate'}
    });

    // Public API here
    return Clinic;
  });
