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

    var checkForWinner = function (emptySlot) {
      var row = emptySlot[0]
      var column = emptySlot[1]
      if(board.checkFourAcross(row) ){
        alert('winner');
        return;
      }
      if(board.checkFourDown(column)){
        alert('winner');
        return;
      }
      if(board.checkFourDiagonal(emptySlot)){
        alert('winner');
        return;
      }
      
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
