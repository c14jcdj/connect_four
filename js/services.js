var connectFourServices = angular.module('connectFourApp');
connectFourServices.factory('boardFactory', ['$http', function($http) {
    
    function Board(columns, rows){
      this.columns = columns;
      this.rows = rows;
      this.gameBoard = [];

      this.init = function () {

        //Create new board with empty slots
        for(var i=0, ii = this.rows; i < ii ; i++){
          var array = new Array(7);
          this.gameBoard.push(array)
        }

      }

      this.isSlotEmpty = function (column, row) {
        return this.gameBoard[row][column] == undefined ? true : false;
      }

      this.checkColumnForEmptySlots = function (column) {

        var rows = this.rows;
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

      this.checkFourAcross = function  (row) {
        var row = this.gameBoard[row]
        var color = row[0] ? row[0].color : 'white';
        var piecesInARow = 1;
        for(var i = 1, ii = row.length; i < ii; i++){
          if(row[i] != undefined){
            if(row[i].color == color){
              piecesInARow +=1;
            } else {
              color = row[i].color
              piecesInARow = 1;
            } 
          } else {
            color = 'white'
          }
          
        }
          return piecesInARow >= 4;
        
      }
      this.checkFourDown = function  (column) {

        var color = this.gameBoard[0][column] ? this.gameBoard[0][column].color : 'white';
        var piecesInARow = 1;
        for(var i = 1, ii=this.rows; i<ii; i++){
          if(this.gameBoard[i][column] != undefined){
            if(this.gameBoard[i][column].color == color){
              piecesInARow +=1
            }else {
              color = this.gameBoard[i][column].color
              piecesInARow = 1;
            }
          } else {
            color = 'white';
          }

        }

        return piecesInARow >= 4;
      }
      this.checkFourDiagonal = function  (coordinates) {
        var rows = this.rows;
        var columns = this.columns;
        var gameBoard = this.gameBoard;
        function findBaseCoordinatesLeftDiagonal(){
          var row = coordinates[0];
          var column = coordinates[1];
          while(row < rows -1 && column > 0){
            row += 1;
            column -=1;
          }
          return [row, column]
        }

        function findBaseCoordinatesRightDiagonal(){
          var row = coordinates[0];
          var column = coordinates[1];
          while(row < rows-1 && column < columns-1){
            row += 1;
            column +=1;
          }
          return [row, column]
        }

        function checkFourInARow (coordinates, direction) {
          console.log(coordinates)
          var row = coordinates[0];
          var column = coordinates[1];
          var color = gameBoard[row][column] ? gameBoard[row][column].color : 'white';
          var piecesInARow = 1;
          
          if(direction == 'right'){
            row -= 1;
            column += 1; 

            while(row - 1 >= 0 && column + 1 < columns ){
              if(gameBoard[row][column] != undefined){
              console.log(gameBoard[row][column].color)
                if(gameBoard[row][column].color == color){
                  piecesInARow +=1
                }else {
                  color = gameBoard[row][column].color
                  piecesInARow = 1;
                }
              } else {
                color = 'white'
              }

              row -= 1;
              column += 1;
              
              
            }
              
              return piecesInARow >= 4;
          } else {
            row -= 1;
            column -= 1; 

            while(row - 1 >= 0 && column >= 0 ){
              console.log('row '+row+' column '+column+'')
              console.log('control color ' +color)
              if(gameBoard[row][column] != undefined){
              console.log(gameBoard[row][column].color)
                if(gameBoard[row][column].color == color){
                  console.log('yes')
                  piecesInARow +=1
                }else {
                  console.log('no')
                  color = gameBoard[row][column].color
                  piecesInARow = 1;
                }
              } else {
                color = 'white'
              }

              row -= 1;
              column -= 1;
              console.log('pieces in a row ' + piecesInARow)
              
            }
              return piecesInARow >= 4;
          }
          

        }
        
        var coordinatesLeftDiagonal = findBaseCoordinatesLeftDiagonal()
        var coordinatesRightDiagonal = findBaseCoordinatesRightDiagonal()
        if(checkFourInARow(coordinatesLeftDiagonal, 'right')){
          return true
        }
        if(checkFourInARow(coordinatesRightDiagonal, 'left')){
          return true
        }

      }

    }


   return {
    Board:Board
   }
}]);

connectFourServices.factory('pieceFactory', ['$http', function($http) {

      function Piece (player) {
        this.player = player;
        this.color = player.color;
      }
    
       return {
    Piece:Piece
   }
}]);

connectFourServices.factory('playerFactory', ['$http', function($http) {

      function Player (name, color, first) {
        this.name = name;
        this.color = color;
        this.first = first;

        
      }
    
       return {
    Player:Player
   }
}]);

