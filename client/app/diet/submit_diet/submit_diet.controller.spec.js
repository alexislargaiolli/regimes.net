'use strict';

describe('Controller: SubmitDietCtrl', function () {

  // load the controller's module
  beforeEach(module('regimesApp'));

  var SubmitDietCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SubmitDietCtrl = $controller('SubmitDietCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
