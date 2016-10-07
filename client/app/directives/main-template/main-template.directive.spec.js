'use strict';

describe('Directive: mainTemplate', function () {

  // load the directive's module and view
  beforeEach(module('regimesApp'));
  beforeEach(module('app/directives/main-template/main-template.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<main-template></main-template>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the mainTemplate directive');
  }));
});