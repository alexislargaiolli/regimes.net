'use strict';

describe('Controller: DietsCtrl', function () {

  // load the controller's module
  beforeEach(module('regimesApp'));

  var DietsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DietsCtrl = $controller('DietsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
