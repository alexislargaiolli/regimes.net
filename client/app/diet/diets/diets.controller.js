'use strict';

angular.module('regimesApp')
    .controller('DietsCtrl', function($scope, $stateParams, Diet, Label) {
        var self = this;
        this.list = [];
        $scope.type = $stateParams.type;
        if ($stateParams.type === 'slimming') {
            this.title = 'Régimes amincissants';
        } else {
            this.title = 'Régimes santé';
        }

        function activate() {
            var type = $stateParams.type === 'slimming' ? 0 : 1;
            Diet.getDiet(type).then(function(diets) {
                self.list = diets;
            });
            Label.query({ key: 'diets.' + $scope.type + '.summary' }, function(label) {
                $scope.summary = label[0].value;
            });
        }
        activate();
    });
