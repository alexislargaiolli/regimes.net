'use strict';

angular.module('regimesApp')
    .controller('AdminActualityCtrl', function($scope, $mdDialog, $mdMedia, $mdToast, Actuality, Upload, $timeout) {
        $scope.selectedActuality = null;
        $scope.datas = null;
        $scope.selectedList = [];
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
            $scope.promise = Actuality.paginate($scope.query, loadDatasSuccess).$promise;
        }

        function loadDatasSuccess(datas) {
            $scope.datas = datas;
        }

        $scope.loadDatas = function() {
            loadDatas();
        };

        $scope.hasMultipleSelected = function() {
            return $scope.selectedList.length > 1;
        };

        $scope.hasOneSelected = function() {
            return $scope.selectedList.length === 1;
        };

        $scope.hasSelected = function() {
            return $scope.selectedList.length > 0;
        };

        $scope.select = function(actuality) {
            Actuality.get({id : actuality._id}, function(actuality){
                $scope.selectedActuality = actuality;
                $scope.selectedActuality.date = new Date(actuality.date);
            });
            
        };

        $scope.clearSelection = function() {
            $scope.selectedList = [];
        };

        $scope.saveSelected = function() {
            Actuality.update({}, $scope.selectedActuality, function() {
                $scope.selectedActuality = null;
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
                    controller: ('CreateActualityController', ['$scope', '$mdDialog', 'Actuality', CreateActualityController]),
                    templateUrl: 'app/admin/actuality/actuality.create.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true
                })
                .then(function(actuality) {
                    actuality.$save(function() {
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
                        var index = $scope.selectedList.indexOf(eltToDelete);
                        $scope.selectedList.splice(index, 1);
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

                    Actuality.delete({}, eltToDelete, success, error);
                }

                for (var i = 0; i < $scope.selectedList.length; i++) {
                    var eltToDelete = $scope.selectedList[i];
                    deleteElt(eltToDelete);
                }
            }, function() {

            });
        };

        $scope.changeImage = function() {
            $scope.selectedActuality.image = null;
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
                        $scope.selectedActuality.image = response.data;
                    });
                }, function(response) {
                    if (response.status > 0) {
                        $scope.errorMsg = response.status + ': ' + response.data;
                    }
                }, function(evt) {
                    file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                });
            }
        };

        $scope.showList = function() {
            if (!$mdMedia('sm')) {
                return true;
            }
            return $scope.selectedActuality === null;
        };

        function CreateActualityController($scope, $mdDialog, Actuality) {

            function activate() {
                $scope.actuality = new Actuality();
                $scope.actuality.date = new Date();
                $scope.actuality.published = false;
            }

            activate();

            $scope.hide = function() {
                $mdDialog.hide();
            };

            $scope.cancel = function() {
                $mdDialog.cancel();
            };

            $scope.addActuality = function() {
                if ($scope.createForm.$valid) {
                    $mdDialog.hide($scope.actuality);
                }
            };
        }

    });
