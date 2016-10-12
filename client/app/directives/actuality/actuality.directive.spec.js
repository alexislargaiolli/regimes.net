'use strict';

describe('Directive: actuality', function () {

  // load the directive's module and view
  beforeEach(module('regimesApp'));
  beforeEach(module('app/directives/actuality/actuality.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    var title = 'test';
    element = angular.element('<actuality title="'+ title +'"></actuality>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.html()).toContain(title);
  }));
});