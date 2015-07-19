'use strict';

/* Controllers */

var connectFourControllers = angular.module('connectFourControllers', []);




connectFourControllers.controller('gameController', [ 'boardFactory', 'pieceFactory', 'playerFactory', 'gameFactory',
  function(boardFactory, pieceFactory, playerFactory, gameFactory) {
    var _this = this;
        
    _this.showOverlay = true;
    _this.showPrompts = false;
    
    _this.columnSelected = function(ctrl,column){
      _this.game.columnSelected(ctrl,column);
    }

    _this.columnHover = function (ctrl,column) {
      _this.game.columnHover(ctrl,column)
    }

    _this.startGame = function (ctrl) {

      var game = new gameFactory.Game(),
        board = new boardFactory.Board(7,6),
        player1 = new playerFactory.Player('Player 1', 'blue', true),
        player2 = new playerFactory.Player('Player 2', 'red', false),
        turn = 1;

    _this.game = game;
    _this.gameBoard = board.gameBoard;
    _this.board = board;
    _this.player1 = player1;
    _this.player2 = player2;
    _this.turn = turn;
    _this.playerTurn = 'Player 1'
    _this.message = 'Click on any column to place a token in the slot'
    _this.messageRed = false;
    _this.showWinnerMessage = false;
    _this.hoverMessage = 'Dropping Token in Column: ';
    _this.pieceFactory = pieceFactory;
      game.removeBoardOverlay(ctrl)
      board.init();
    }

    _this.restart = function(ctrl){
      _this.game.restart(ctrl)
    }

  }]);
