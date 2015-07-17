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

    }


   return {
    Board:Board
   }
}]);

