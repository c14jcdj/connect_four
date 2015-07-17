var connectFourDirectives = angular.module('connectFourDirectives', []);

connectFourDirectives.directive('fantasySuites', function() {
      return {
          restrict: 'E',
          templateUrl: 'partials/fantasy_suites.html',
          controller: 'fantasySuitesController',
          controllerAs: 'fantasy'
      };
 });

connectFourDirectives.directive('finalRose', function() {
      return {
          restrict: 'E',
          templateUrl: 'partials/final_rose.html',
          controller: 'finalRoseController',
          controllerAs: 'final'
      };
 });


connectFourDirectives.directive('hometownDates', function() {
      return {
          restrict: 'E',
          templateUrl: 'partials/hometown.html',
          controller: 'hometownController',
          controllerAs: 'hometown'
      };
 });


connectFourDirectives.directive('longTermPick', function() {
      return {
          restrict: 'E',
          templateUrl: 'partials/long_term_picks.html',
          controller: 'longTermPickController',
          controllerAs: 'long'
      };
 });


connectFourDirectives.directive('weeklyPick', function() {
      return {
          restrict: 'E',
          templateUrl: 'partials/weekly_picks.html',
          controller: 'weeklyPickController',
          controllerAs: 'weekly'
      };
 });
connectFourDirectives.directive('gameQuestions', function() {
      return {
          restrict: 'E',
          templateUrl: 'partials/questions.html',
          controller: 'gameQuestionsController',
          controllerAs: 'questionCtl'
      };
 });
