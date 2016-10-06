'use strict';

describe('Controller: ClinicsCtrl', function () {

  // load the controller's module
  beforeEach(module('regimesApp'));

  var ClinicsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ClinicsCtrl = $controller('ClinicsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
