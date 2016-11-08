'use strict';

angular.module('regimesApp')
    .controller('AdminBookCtrl', function($scope, $mdDialog, $mdMedia, $mdToast, Book) {
        $scope.selectedBook = null;
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
            $scope.promise = Book.paginate($scope.query, loadDatasSuccess).$promise;
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

        $scope.select = function(book) {
            $scope.selectedBook = book;
        };

        $scope.clearSelection = function() {
            $scope.selected = [];
        };

        $scope.saveSelected = function() {
            Book.update({}, $scope.selectedBook,
                function() {
                    $scope.selectedBook = null;
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
                    controller: ('CreateBookController', ['$scope', '$mdDialog', 'Book', CreateBookController]),                    
                    templateUrl: 'app/admin/book/book.create.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true
                })
                .then(function(book) {
                    book.$save(function() {
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
                    Book.delete({}, eltToDelete, success, error);
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
            return $scope.selectedBook === null;
        };

        function CreateBookController ($scope, $mdDialog, Book) {
            $scope.book = new Book ();

            activate();

            function activate() {

            }

            $scope.hide = function() {
                $mdDialog.hide();
            };

            $scope.cancel = function() {
                $mdDialog.cancel();
            };

            $scope.addBook = function() {
                if ($scope.createForm.$valid) {
                    $mdDialog.hide($scope.book);
                }
            };
        }

    });
