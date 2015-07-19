'use strict';

/* Controllers */

var connectFourControllers = angular.module('connectFourControllers', []);




connectFourControllers.controller('gameController', [ 'boardFactory', 'pieceFactory', 'playerFactory', 'gameFactory',
  function(boardFactory, pieceFactory, playerFactory, gameFactory) {
    var _this = this,
        game = new gameFactory.Game(),
        board = new boardFactory.Board(7,6),
        player1 = new playerFactory.Player('player1', 'blue', true),
        player2 = new playerFactory.Player('player2', 'red', false),
        turn = 1;
    
    _this.gameBoard = board.gameBoard;
    _this.board = board;
    _this.player1 = player1;
    _this.player2 = player2;
    _this.turn = turn;
    _this.pieceFactory = pieceFactory;
    _this.columnSelected = function(ctrl,column){
      game.columnSelected(ctrl,column);
    }

    board.init();
  }]);
