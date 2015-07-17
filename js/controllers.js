'use strict';

/* Controllers */

var connectFourControllers = angular.module('connectFourControllers', []);




connectFourControllers.controller('gameController', [ 'boardFactory', 'pieceFactory',
  function(boardFactory, pieceFactory) {
    var _this = this;
    var board = new boardFactory.Board(7,6);

    var turn = 1;
    
    function isOdd(num) { return num % 2;}
    
    _this.board = board.gameBoard;
    _this.selectColumn = function(column){

      var emptySlot = board.checkColumnForEmptySlots(column)
      var player = isOdd(turn) ? 'player1' : 'player2'
      var color = player == 'player1' ? 'blue' : 'red'
      var piece = new pieceFactory.Piece(player, color)

      board.insertGamePiece(piece, emptySlot);
      turn += 1;
    } 

    board.selectColumn;
    board.init();
  }]);
