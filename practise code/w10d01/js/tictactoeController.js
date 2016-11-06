angular
  .module("ticTacToe")
  .controller("TicTacToeController", TicTacToeController)

function TicTacToeController(){
  this.winningCombinations = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ];
  this.move = playMove

  function playMove(index){
    if (this.cells[index]) return false;

    this.counter++;

    if (this.counter % 2 === 0) {
      // O's go
      this.Omoves.push(index);
      this.cells[index] = "O"
      this.checkForWin(this.Omoves, "O");
    } else {
      // X's go
      this.Xmoves.push(index);
      this.cells[index] = "X"
      this.checkForWin(this.Xmoves, "X");
    }

    if (this.counter == 10 && this.over === false) {
      this.message = "Game Over - It's a tie";
      this.over = true;
    }
  }

  this.checkForWin = function(movesArray, name){
    for(var i = 0; i < this.winningCombinations.length; i++){
      this.winCounter = 0;

      for(var j = 0; j < this.winningCombinations[i].length; j++){
        if(movesArray.indexOf(this.winningCombinations[i][j]) !== -1){
          this.winCounter ++;
        }

        if(this.winCounter === 3){
          this.message = "Game over, Player "+ name + " won the game";
          this.over = true;
        }                                                                                                  
      }
    }
  }

  this.reset = function() {
    this.counter             = 1;
    this.winCounter;
    this.Omoves              = [];
    this.Xmoves              = [];
    this.message             = "Welcome to TicTacToe"
    this.cells               = new Array(9);
    this.over                = false;
  }
  this.reset();
}
