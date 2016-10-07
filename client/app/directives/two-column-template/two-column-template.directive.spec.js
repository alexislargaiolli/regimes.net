'use strict';

describe('Directive: twoColumnTemplate', function () {

  // load the directive's module and view
  beforeEach(module('regimesApp'));
  beforeEach(module('app/directives/two-column-template/two-column-template.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<two-column-template></two-column-template>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the twoColumnTemplate directive');
  }));
});