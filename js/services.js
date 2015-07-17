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
          }
          
        }
          return piecesInARow >= 4;
        
      }
      this.checkFourDown = function  (column) {

        var color = this.gameBoard[0][column] ? this.gameBoard[0][column].color : 'white';
        var piecesInARow = 1;
        for(var i = 1, ii=this.rows; i<ii; i++){
          console.log(color)
          if(this.gameBoard[i][column] != undefined){
            if(this.gameBoard[i][column].color == color){
              piecesInARow +=1
            }else {
              color = this.gameBoard[i][column].color
              piecesInARow = 1;
            }
          }

        }

        return piecesInARow >= 4;
      }
      this.checkFourDiagonal = function  (argument) {
        
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

