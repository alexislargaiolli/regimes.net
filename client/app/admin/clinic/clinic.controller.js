'use strict';

angular.module('regimesApp')
    .controller('AdminClinicCtrl', function($scope, $mdDialog, $mdMedia, $mdToast, Clinic, uiGmapGoogleMapApi, Map, PlacesAutocomplete, $timeout) {
        var self = this;
        $scope.render = true;
        $scope.selectedClinic = null;
        $scope.datas = null;
        $scope.selected = [];
        $scope.query = {
            order: 'name',
            limit: 5,
            page: 1
        };

        function activate() {
            loadDatas();
        }
        activate();

        function loadDatas() {
            $scope.promise = Clinic.paginate($scope.query, loadDatasSuccess).$promise;
        }

        function loadDatasSuccess(datas) {
            $scope.datas = datas;
        }

        $scope.loadDatas = function() {
            loadDatas();
        };

        $scope.hasMultipleSelected = function() {
            return $scope.selected.length > 1;
        };

        $scope.hasOneSelected = function() {
            return $scope.selected.length === 1;
        };

        $scope.hasSelected = function() {
            return $scope.selected.length > 0;
        };

        function initSelectedMap(){
            uiGmapGoogleMapApi.then(function() {
                $timeout(function() {
                    var map = Map.init('selectedClinicMap');
                    self.currentMarker = Map.addClinicMarker(map, $scope.selectedClinic);
                    PlacesAutocomplete.init('selectedClinicSearchInput', function(place) {
                        if(self.currentMarker){
                            self.currentMarker.setMap(null);
                        }
                        self.currentMarker = Map.addMarker(map, place);
                        $scope.selectedClinic.coord =   {};
                        $scope.selectedClinic.coord.latitude = place.geometry.location.lat();
                        $scope.selectedClinic.coord.longitude = place.geometry.location.lng();
                        $scope.selectedClinic.address = place.formatted_address;// jshint ignore:line
                        $scope.$apply();
                    });
                }, 500);
            });
        }

        $scope.select = function(clinic) {
            $scope.selectedClinic = clinic;            
            initSelectedMap();
        };        

        $scope.clearSelection = function() {
            $scope.selected = [];
        };

        $scope.saveSelected = function() {
            Clinic.update({}, $scope.selectedClinic,
                function() {
                    $scope.selectedClinic = null;
                    $mdToast.show(
                        $mdToast.simple()
                        .textContent('Sauvegarde réussie.')
                        .position('bottom right')
                        .toastClass('success-toast')
                        .hideDelay(3000)
                    );
                });
        };

        $scope.showAddForm = function(ev) {
            $mdDialog.show({
                    controller: ('CreateClinicController', ['$scope', '$mdDialog', 'Clinic', 'Map', 'uiGmapGoogleMapApi', '$timeout', CreateClinicController]),
                    templateUrl: 'app/admin/clinic/clinic.create.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true
                })
                .then(function(clinic) {
                    clinic.$save(function() {
                        $scope.loadDatas();
                    });
                }, function() {});
        };

        $scope.deleteSelected = function(ev) {
            var confirm = $mdDialog.confirm()
                .title('Êtes-vous sûr ?')
                .targetEvent(ev)
                .ok('Oui, supprimer')
                .cancel('Non, annuler');

            $mdDialog.show(confirm).then(function() {
                function deleteElt(eltToDelete) {
                    function success() {
                        var index = $scope.selected.indexOf(eltToDelete);
                        $scope.selected.splice(index, 1);
                        $scope.loadDatas();
                        $mdToast.show(
                            $mdToast.simple()
                            .textContent('Suppression réussie.')
                            .position('bottom right')
                            .toastClass('success-toast')
                            .hideDelay(3000)
                        );
                    }

                    function error() {
                        $mdToast.show(
                            $mdToast.simple()
                            .textContent('Erreur lors de la suppression...')
                            .position('bottom right')
                            .toastClass('error-toast')
                            .hideDelay(3000)
                        );
                    }
                    Clinic.delete({}, eltToDelete, success, error);
                }
                for (var i = 0; i < $scope.selected.length; i++) {
                    var eltToDelete = $scope.selected[i];
                    deleteElt(eltToDelete);
                }
            }, function() {

            });
        };

        $scope.showList = function() {
            if (!$mdMedia('sm')) {
                return true;
            }
            return $scope.selectedClinic === null;
        };

        function CreateClinicController($scope, $mdDialog, Clinic, Map, uiGmapGoogleMapApi, $timeout) {
            var self = this;
            $scope.clinic = new Clinic();
            $scope.render = true;

            function activate() {
                uiGmapGoogleMapApi.then(function() {
                    $timeout(function() {
                        var map = Map.init('addClinicMap');
                        PlacesAutocomplete.init('searchInput', function(place) {
                            if(self.currentMarker){
                                self.currentMarker.setMap(null);
                            }
                            self.currentMarker = Map.addMarker(map, place);                            
                            $scope.clinic.coord =   {};
                            $scope.clinic.coord.latitude = place.geometry.location.lat();
                            $scope.clinic.coord.longitude = place.geometry.location.lng();
                            $scope.clinic.address = place.formatted_address;// jshint ignore:line
                            $scope.$apply();
                        });
                    }, 500);
                });
            }

            activate();

            $scope.hide = function() {
                $mdDialog.hide();
            };

            $scope.cancel = function() {
                $mdDialog.cancel();
            };

            $scope.addClinic = function() {
                if ($scope.createForm.$valid) {
                    $mdDialog.hide($scope.clinic);
                }
            };
        }

    });
