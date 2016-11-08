'use strict';

angular.module('regimesApp')
    .controller('ContactCtrl', function($scope, $http) {

        $scope.message = {};
        $scope.response = {};

        $scope.contact = function(form) {
            if (form.$valid) {
                $http.post('/contact', $scope.message).then(function() {
                    $scope.response.status = 200;
                    $scope.response.message = 'Votre formulaire de contact a bien été envoyé.';
                }, function() {
                    $scope.response.status = 500;
                    $scope.response.message = 'Une erreur est survenue pendant l\'envoie du formulaire...';
                });
            }
        };
    });
