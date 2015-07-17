var connectFourServices = angular.module('connectFourApp');
connectFourServices.factory('boardFactory', ['$http', function($http) {
    
    function Board(columns, rows){
      this.columns = columns;
      this.rows = rows;
      this.gameBoard = [];

      this.init = function () {
        var columns = this.columns,
            rows = this.rows,
            gameBoard = this.gameBoard;

        //Create new board with empty slots
        for(var i=0, ii = rows; i < ii ; i++){
          var array = new Array(7);
          gameBoard.push(array)
        }

      }

      this.selectColumn = function (index) {
        alert(index)
      }

    }


   return {
    Board:Board
   }
}]);

