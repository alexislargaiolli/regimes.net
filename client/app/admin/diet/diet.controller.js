'use strict';

angular.module('regimesApp')
    .controller('AdminDietCtrl', function($scope, $mdDialog, $mdMedia, $mdToast, Diet, Upload, $timeout) {
        $scope.selectedDiet = null;
        $scope.datas = null;
        $scope.selected = [];
        $scope.query = {
            order: 'name',
            limit: 5,
            page: 1
        };
        $scope.dietTypes = [{ value: 0, label: 'Régime amincissant' }, { value: 1, label: 'Régime santé' }];

        function activate() {
            loadDatas();
        }

        activate();

        function loadDatas() {
            $scope.promise = Diet.paginate($scope.query, loadDatasSuccess).$promise;
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

        $scope.select = function(diet) {
            $scope.selectedDiet = diet;
            $scope.selectedDiet.date = new Date(diet.date);
        };

        $scope.clearSelection = function() {
            $scope.selected = [];
        };

        $scope.saveSelected = function() {
            Diet.update({}, $scope.selectedDiet, function() {
                $scope.selectedDiet = null;
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
                    controller: CreateDietController,
                    templateUrl: 'app/admin/diet/diet.create.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true
                })
                .then(function(diet) {
                    diet.$save(function() {
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
                Diet.delete({}, eltToDelete, success, error);
            }

            $mdDialog.show(confirm).then(function() {
                for (var i = 0; i < $scope.selected.length; i++) {
                    var eltToDelete = $scope.selected[i];
                    deleteElt(eltToDelete);
                }
            }, function() {

            });
        };

        $scope.changeImage = function() {
            $scope.selectedDiet.image = null;
        };

        $scope.uploadFiles = function(file, errFiles) {
            $scope.f = file;
            $scope.errFile = errFiles && errFiles[0];
            if (file) {
                file.upload = Upload.upload({
                    url: '/api/actualities/image',
                    data: { file: file }
                });

                file.upload.then(function(response) {
                    $timeout(function() {
                        file.result = response.data;
                        $scope.selectedDiet.image = response.data;
                    });
                }, function(response) {
                    if (response.status > 0) {
                        $scope.errorMsg = response.status + ': ' + response.data;
                    }
                }, function(evt) {
                    file.progress = Math.min(100, parseInt(100.0 *
                        evt.loaded / evt.total));
                });
            }
        };

        $scope.showList = function() {
            if (!$mdMedia('sm')) {
                return true;
            }
            return $scope.selectedDiet === null;
        };

        function CreateDietController($scope, $mdDialog, Diet) {

            $scope.dietTypes = [{ value: 0, label: 'Régime amincissant' }, { value: 1, label: 'Régime santé' }];

            function activate() {
                $scope.diet = new Diet();
                $scope.diet.date = new Date();
                $scope.diet.published = false;
            }

            activate();

            $scope.hide = function() {
                $mdDialog.hide();
            };

            $scope.cancel = function() {
                $mdDialog.cancel();
            };

            $scope.addDiet = function() {
                if ($scope.createForm.$valid) {
                    $mdDialog.hide($scope.diet);
                }
            };
        }

    });
