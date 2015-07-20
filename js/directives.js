var connectFourDirectives = angular.module('connectFourDirectives', []);

connectFourDirectives.directive('rulesContainer', function() {
      return {
          restrict: 'E',
          templateUrl: 'templates/rules_container.html',
          controller: 'gameController',
          controllerAs: 'game'
      };
 });

connectFourDirectives.directive('boardContainer', function() {
      return {
          restrict: 'E',
          templateUrl: 'templates/board_container.html',
          controller: 'gameController',
          controllerAs: 'game'
      };
 });

