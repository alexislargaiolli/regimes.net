'use strict';

angular.module('regimesApp')
    .controller('ClinicsCtrl', function($scope, uiGmapGoogleMapApi, Clinic) {
        $scope.map = { center: { latitude: 46.52863469527167, longitude: 2.43896484375 }, zoom: 6 };
        $scope.markers = [{
            coord: {
                latitude: 44.93, //Coordonnées où placer le point
                longitude: 4.89
            },
            name: 'Clinique de sainte Marte',
            address: '12 rue de blabla',
            id: 412
        }, {
            coord: {
                latitude: 46.5132,
                longitude: 0.1033
            },
            name: 'Clinique de sainte Marte',
            address: '13 rue de blabla',
            id: 413
        }];
        uiGmapGoogleMapApi.then(function() {

        });

        function activate(){
            Clinic.query({}, function(clinics){
                $scope.clinics = clinics;
            });
        }
        activate();

    });
