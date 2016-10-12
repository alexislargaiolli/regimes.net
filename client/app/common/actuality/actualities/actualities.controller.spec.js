'use strict';

describe('Controller: ActualitiesCtrl', function () {

  // load the controller's module
  beforeEach(module('regimesApp'));

  var ActualitiesCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ActualitiesCtrl = $controller('ActualitiesCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
