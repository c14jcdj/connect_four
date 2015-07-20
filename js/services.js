var connectFourServices = angular.module('connectFourApp');

connectFourServices.factory('boardFactory', [ function() {
    
  function Board(columns, rows){
    this.columns = columns;
    this.rows = rows;
    this.gameBoard = [];

    this.init = function () {

      //Create new board with empty slots
      for(var i=0, ii = this.rows; i < ii ; i++){
        this.gameBoard.push(new Array(7))
      }

    }

    this.clearBoard = function(ctrl){

      //Remove Piece Objects from board 
      for(var i=0, ii = this.rows; i < ii ; i++){
        for(var j = 0, jj = this.columns; j < jj; j++){
          this.gameBoard[i][j] = undefined;
        }
      }

      //Reset values for turn and player
      ctrl.turn = 1;
      ctrl.playerTurn ='Player 1'

    }

    this.isSlotEmpty = function (column, row) {
      return this.gameBoard[row][column] == undefined ? true : false;
    }

    this.checkColumnForEmptySlots = function (column) {
      var emptySlot;

      //Check column from bottom up if there is an empty slot
      for(var row=this.rows -1; row >= 0; row--){
        if(this.isSlotEmpty(column, row)){
          emptySlot = [row, column]
          break;
        }
      }

      return emptySlot;
        
    }

    this.insertGamePiece = function (piece, emptySlot) {
      var row = emptySlot[0],
          column = emptySlot[1];
      
      this.gameBoard[row][column] = piece;
    }

    this.checkFourAcross = function (row) {
      var row = this.gameBoard[row],
          color = row[0] ? row[0].color : 'white',
          variableObj = {
            'iterator' : row,
            'maxLength' : row.length,
            'color' : color,
            'piecesInARow' : 1,
            'checkType' : 'linear'
          };
      
      return checkHowManySameColoredPiecesInARow(variableObj).piecesInARow >= 4;
    }

    this.checkFourDown = function  (column) {
      var maxLength = this.rows,
          color = this.gameBoard[0][column] ? this.gameBoard[0][column].color : 'white',
          gameBoard = this.gameBoard,
          variableObj = {
            'iterator' : gameBoard,
            'maxLength' : maxLength,
            'color' : color,
            'piecesInARow' : 1,
            'option' : column,
            'checkType' : 'linear'
          };
      
      return checkHowManySameColoredPiecesInARow(variableObj).piecesInARow >= 4;
    }

    this.checkFourDiagonal = function  (coordinates) {
      var rows = this.rows;
          columns = this.columns,
          row = coordinates[0],
          column = coordinates[1],
          gameBoard = this.gameBoard,
          baseCoordinatesLeftDiagonal = undefined, 
          baseCoordinatesRightDiagonal = undefined,
          findBaseCoordinates = function (diagonalType){
            var row = coordinates[0],
                column = coordinates[1],
                columnBoundary = diagonalType == 'left' ? (column > 0) : (column < columns -1); 
            
            while(row < rows - 1 && columnBoundary){
              row += 1;
              diagonalType == 'left'? column -=1 : column += 1;
            }

            return [row, column]
          },
          checkForFourPiecesInARow = function (coordinates, direction) {
            var row = coordinates[0],
                column = coordinates[1],
                color = gameBoard[row][column] ? gameBoard[row][column].color : 'white',
                variableObj = {
                  'color' : color,
                  'piecesInARow' : 1,
                  'checkType' : 'diagonal',
                  'iterator': gameBoard[row][column],
                  'row' : row,
                  'column' : column,
                  'columns' : columns,
                  'gameBoard' : gameBoard
                };

            if(direction == 'right'){
              variableObj.direction = 'right'
              return checkHowManySameColoredPiecesInARow(variableObj).piecesInARow >= 4;
            } else {
              variableObj.direction = 'left'
              return checkHowManySameColoredPiecesInARow(variableObj).piecesInARow >= 4;
            }
          };
      
      //Set base coordinates to start diagonal search
      baseCoordinatesLeftDiagonal = findBaseCoordinates('left'),
      baseCoordinatesRightDiagonal = findBaseCoordinates('right');
      //Check for four in a row starting from base coordinates
      if(checkForFourPiecesInARow(baseCoordinatesLeftDiagonal, 'right')){ return true };
      if(checkForFourPiecesInARow(baseCoordinatesRightDiagonal, 'left')){ return true };
    }
  }

  //Private

  function checkHowManySameColoredPiecesInARow(obj){
      var iterator = obj.iterator,
          color = obj.color,
          piecesInARow = obj.piecesInARow,
          maxLength = obj.maxLength,
          resetControlToNewColor = function (piece){
            color = piece.color
            piecesInARow = 1;
          },
          incrementPiecesInARowVar = function (){
            piecesInARow +=1;
          },
          checkColor = function (piece){
            //If piece color is equal to control color increment var, if not reset var and color
            piece.color && piece.color == color ? incrementPiecesInARowVar() : resetControlToNewColor(piece);
          },
          resetColorToDefault = function (){
            color = 'white';
          },
          updateObj = function (){
            obj.piecesInARow = piecesInARow;
          },
          linearCheck = function (){
            for(var i = 1, ii = maxLength; i < ii; i++){
              //Determine iterator to use: check if there is an option on object(column vs row)
              var iteratorToUse = obj.option !== undefined ? iterator[i][obj.option] : iterator[i]
              //If there is a piece, check for color; if not reset color back to default
              iteratorToUse ? checkColor(iteratorToUse) : resetColorToDefault()
              if(piecesInARow >= 4){return}
            }
          },
          diagonalCheck = function (){
            var row = obj.row,
                column = obj.column,
                gameBoard = obj.gameBoard,
                direction = obj.direction,
                columns = obj.columns,
                columnBoundary,
                incrementDiagonal = function (direction){
                  row -= 1;
                  direction == 'right' ? column += 1 : column -= 1;

                  //Sets max column or min column depending on direction
                  columnBoundary = direction == 'right' ? (column + 1 < columns) : column >=0;
                }

            //Increment to next spot to start checking color since control color is set to base coordinate color
            direction == 'right' ? incrementDiagonal('right') : incrementDiagonal('left')

            while(row - 1 >= 0 && columnBoundary ){
              //If there is a piece, check for color; if not reset color back to default
              gameBoard[row][column] ? checkColor(gameBoard[row][column]) : resetColorToDefault()
              direction == 'right' ? incrementDiagonal('right') : incrementDiagonal('left')
            }

          };
      
      obj.checkType == 'linear' ? linearCheck() : diagonalCheck();

      updateObj()        

      return obj
    }

 return {
  Board:Board
 }
}]);

connectFourServices.factory('pieceFactory', [ function() {

  function Piece (player) {
    this.player = player;
    this.color = player.color;
  }
  
  return {
    Piece:Piece
  }

}]);

connectFourServices.factory('playerFactory', [ function() {

  function Player (name, color, first) {
    this.name = name;
    this.color = color;
    this.first = first;
  }
  
  return {
    Player:Player
  }

}]);

connectFourServices.factory('gameFactory', [ function() {

  function Game () {

    this.checkForWinner = function (board,emptySlot,ctrl) {
      var row = emptySlot[0],
          column = emptySlot[1];

      if(board.checkFourAcross(row) ){
        this.winnerModal(ctrl)
        return;
      }
      if(board.checkFourDown(column)){
        this.winnerModal(ctrl)
        return;
      }
      if(board.checkFourDiagonal(emptySlot)){
        this.winnerModal(ctrl)
        return;
      }
    }

    this.winnerModal= function(ctrl){

      //Show winner modal text
      $('.board-overlay').css('width', '100%')
      ctrl.showWinnerMessage = true;
      ctrl.showRestartButton = true;
    }

    this.isOdd = function (num) {
      return num % 2;
    }

    this.columnSelected = function(ctrl,column){
      var emptySlot = ctrl.board.checkColumnForEmptySlots(column),
          player = this.isOdd(ctrl.turn) ? ctrl.player1 : ctrl.player2,
          playerTurn = this.isOdd(ctrl.turn) ? ctrl.player2 : ctrl.player1,
          piece = new ctrl.pieceFactory.Piece(player);
          addGamePiece = function(){
            ctrl.board.insertGamePiece(piece, emptySlot)
            ctrl.turn += 1;
            ctrl.playerTurn = playerTurn.name
          },
          displayErrorMessage = function(){
            ctrl.messageRed = true;
            ctrl.message = 'Column Full! Try another column'   
          },
          resetErrorMessage = function(){
            ctrl.messageRed = false;
            ctrl.message = 'Click on any column to place a token in the slot'   
          },
          updateWinner = function(){
            ctrl.winner = player;
          }

      resetErrorMessage();
      emptySlot ? addGamePiece() : displayErrorMessage();

      // Start checking for winner after turn 7
      updateWinner();
      if(ctrl.turn >7){ this.checkForWinner(ctrl.board,emptySlot, ctrl) };
    }

    this.columnHover = function (ctrl,column) {
      column += 1;
      ctrl.hoverMessage = 'Dropping Token in Column: ' + column ;
    }

    this.removeBoardOverlay = function (ctrl) {

      //Remove overlay and show game prompts
      ctrl.showPrompts = true;
      $('.board-overlay, .board-pic').animate({
        width: 0
      }, 2000);
      $('.rules-container button').animate({ opacity: 0 }, 1000)
      $('.prompts').animate({ opacity: 1 }, 2000)
    }

    this.restart = function (ctrl) {

      //Remove Overlay
      $('.board-overlay').animate({
        width: 0
      }, 2000);

      //Hide text, buttons and clear board
      ctrl.showWinnerMessage = false;
      ctrl.showRestartButton = false;
      ctrl.board.clearBoard(ctrl)
    }
  }
  
  return {
    Game:Game
  }

}]);

