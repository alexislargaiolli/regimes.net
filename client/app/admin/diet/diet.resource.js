'use strict';

angular.module('regimesApp')
  .factory('Diet', function ($resource) {    

    var Diet = $resource('/api/diets/:id', {id:'@_id'}, {
        'update': { method:'PUT' },
        'paginate': {method:'GET', url: '/api/diets/paginate'},
        'submit' : {method: 'POST', url : '/api/diets/submit'},
        'addReview' : {method: 'POST', url : '/api/diets/addReview/:id/:adaptability/:efficiency/:impact/:cost', params :  {id:'@id', adaptability : '@adaptability', efficiency : '@efficiency', impact : '@impact', cost : '@cost'}}
    });

    // Public API here
    return Diet;
  });
