'use strict';

describe('Controller: BibliographyCtrl', function () {

  // load the controller's module
  beforeEach(module('regimesApp'));

  var BibliographyCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BibliographyCtrl = $controller('BibliographyCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
