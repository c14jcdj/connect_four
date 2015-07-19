var connectFourDirectives = angular.module('connectFourDirectives', []);

connectFourDirectives.directive('fantasySuites', function() {
      return {
          restrict: 'E',
          templateUrl: 'partials/fantasy_suites.html',
          controller: 'fantasySuitesController',
          controllerAs: 'fantasy'
      };
 });

