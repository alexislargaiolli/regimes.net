'use strict';

describe('Controller: ActualityCtrl', function () {

  // load the controller's module
  beforeEach(module('regimesApp'));

  var ActualityCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ActualityCtrl = $controller('ActualityCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
