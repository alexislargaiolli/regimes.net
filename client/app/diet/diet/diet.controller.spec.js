'use strict';

describe('Controller: DietCtrl', function () {

  // load the controller's module
  beforeEach(module('regimesApp'));

  var DietCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DietCtrl = $controller('DietCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
