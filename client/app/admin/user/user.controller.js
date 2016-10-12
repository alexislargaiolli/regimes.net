'use strict';

angular.module('regimesApp')
    .controller('UserCtrl', function($scope, $mdDialog, $mdMedia, $mdToast, User) {
        $scope.selectedUser = null;
        $scope.datas = null;
        $scope.selected = [];
        $scope.query = {
            order: 'name',
            limit: 5,
            page: 1
        };
        $scope.roles = [{
            value: 'user',
            label: 'Utilisateur'
        }, {
            value: 'admin',
            label: 'Administrateur'
        }];

        function activate() {
            loadDatas();
        }

        activate();

        function loadDatas() {
            $scope.promise = User.paginate($scope.query, loadDatasSuccess).$promise;
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

        $scope.select = function(user) {
            $scope.selectedUser = user;
        };

        $scope.clearSelection = function() {
            $scope.selected = [];
        };

        $scope.saveSelected = function() {
            User.update({}, $scope.selectedUser, function() {
                $scope.selectedUser = null;
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
                    controller: CreateUserController,
                    templateUrl: 'app/admin/user/user.create.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true
                })
                .then(function(user) {
                    user.$save(function() {
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
                    var success = function() {
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
                    };
                    var error = function() {
                        $mdToast.show(
                            $mdToast.simple()
                            .textContent('Erreur lors de la suppression...')
                            .position('bottom right')
                            .toastClass('error-toast')
                            .hideDelay(3000)
                        );
                    };


                    User.delete({}, eltToDelete, success, error);
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
            return $scope.selectedUser === null;
        };

        function CreateUserController($scope, $mdDialog, User) {
            $scope.user = new User();

            $scope.hide = function() {
                $mdDialog.hide();
            };

            $scope.cancel = function() {
                $mdDialog.cancel();
            };

            $scope.addUser = function() {
                if ($scope.createForm.$valid) {
                    $mdDialog.hide($scope.user);
                }
            };
        }

    });
