'use strict';

/* Controllers */

var connectFourControllers = angular.module('connectFourControllers', []);




connectFourControllers.controller('gameController', [ 'boardFactory', 'pieceFactory', 'playerFactory',
  function(boardFactory, pieceFactory, playerFactory) {
    var _this = this;
    var board = new boardFactory.Board(7,6);
    var player1 = new playerFactory.Player('player1', 'blue', true)
    var player2 = new playerFactory.Player('player2', 'red', false)

    var turn = 1;
    
    
    
    _this.board = board.gameBoard;

    var checkForWinner = function () {
      for(var i = 0, ii = board.rows;i<ii; i++){
        if(board.checkFourAcross(i)){
          alert('winner')
          return;
        }
      }

      for(var j = 0, jj = board.columns; j < jj ; j++){
        if(board.checkFourDown(j)){
          alert('winner')
          return;
        }
      }
      board.checkFourDiagonal()
    }
    _this.selectColumn = function(column){

      var emptySlot = board.checkColumnForEmptySlots(column)
      function isOdd(num) { return num % 2;}
      var player = isOdd(turn) ? player1 : player2
      var piece = new pieceFactory.Piece(player)
      if(emptySlot) {
        board.insertGamePiece(piece, emptySlot)
        turn += 1;

      } else {
         _this.message = 'Column Full! Try another column'
      }  

      if(turn >7){
        checkForWinner(emptySlot)
      }

      
    } 

    board.selectColumn;
    board.init();
  }]);
