'use strict';

/* Controllers */

var connectFourControllers = angular.module('connectFourControllers', []);




connectFourControllers.controller('gameController', [ 'boardFactory',
  function(boardFactory) {
    var _this = this;
    var board = new boardFactory.Board(7,6);
    var piece = {color: 'blue'}
    
    _this.board = board.gameBoard;
    _this.selectColumn = function(column){
      var emptySlot = board.checkColumnForEmptySlots(column)

      board.insertGamePiece(piece, emptySlot);
      console.log(board.gameBoard)
    } 
    board.selectColumn;
    board.init();
  }]);
