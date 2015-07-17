'use strict';

/* Controllers */

var connectFourControllers = angular.module('connectFourControllers', []);




connectFourControllers.controller('gameController', [ 'boardFactory',
  function(boardFactory) {
    var _this = this;
    var board = new boardFactory.Board(7,6);
    
    _this.board = board.gameBoard;
    _this.selectColumn = board.selectColumn;
    board.init();
  }]);
