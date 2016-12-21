'use strict';

angular.module('regimesApp')
    .controller('AdminLabelCtrl', function($scope, $mdDialog, $mdMedia, $mdToast, Label) {
        $scope.selectedLabel = null;
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
            $scope.promise = Label.paginate($scope.query, loadDatasSuccess).$promise;
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

        $scope.select = function(label) {
            $scope.selectedLabel = label;
        };

        $scope.clearSelection = function() {
            $scope.selected = [];
        };

        $scope.saveSelected = function() {
            Label.update({}, $scope.selectedLabel,
                function() {
                    $scope.selectedLabel = null;
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
                    controller: ('CreateLabelController', ['$scope', '$mdDialog', 'Label', CreateLabelController]),                    
                    templateUrl: 'app/admin/label/label.create.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true
                })
                .then(function(label) {
                    label.$save(function() {
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
                function deleteElt(eltToDelete){
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
                    Label.delete({}, eltToDelete, success, error);
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
            return $scope.selectedLabel === null;
        };

        function CreateLabelController ($scope, $mdDialog, Label) {
            $scope.label = new Label ();

            activate();

            function activate() {

            }

            $scope.hide = function() {
                $mdDialog.hide();
            };

            $scope.cancel = function() {
                $mdDialog.cancel();
            };

            $scope.addLabel = function() {
                if ($scope.createForm.$valid) {
                    $mdDialog.hide($scope.label);
                }
            };
        }

    });
