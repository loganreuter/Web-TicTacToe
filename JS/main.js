let board = ["", "", "", "", "", "", "", "", ""];
var GameOverSpan = document.getElementById('GameOver');
let thinking = document.getElementById("thinking");
window.addEventListener('DOMContentLoaded', () => {

  var player1 = "X";
  var AI = "O";
  var CanMove = true;
  var player2 = "O";
  var cells = document.querySelectorAll('.cell');
  var restart = document.getElementById('restart');

  //Handles click event
  cells.forEach((cell) => {
    cell.addEventListener('click', (event) => {
      target = event.currentTarget.id;
      var check = CheckIfOpen(board, target)
      if (check && CanMove) {
        CanMove = !CanMove;
        board[target] = player1;
        document.getElementById(target).innerText = player1;
        document.getElementById(target).style.color = "#6969B3";
        var game_over = CheckForGameOver(board);
        //board.forEach((cell) => console.log(cell));
        if (game_over || GetAllOpen(board).length == 0) {
          GameOver("The Player Wins!")
        } else {
          console.log("Thinking.....");
          thinking.classList.add("show")
          // randomThinking()
          setTimeout(function () {
            thinking.classList.remove("show")
            console.log("I've Got It!");
            var aiMove = AIMove(board);
            board[aiMove] = AI;
            document.getElementById(aiMove).innerText = AI;
            document.getElementById(aiMove).style.color = "#4B244A";
            game_over = CheckForGameOver(board);
            CanMove = !CanMove;
            if (game_over || GetAllOpen(board).length == 0) {
              GameOver("The Computer Wins!");
            }
          }, 3000);

        }
      }
    })
  })

  //Resets Game
  restart.addEventListener('click', () => {
    board = ["", "", "", "", "", "", "", "", ""];
    cells.forEach((cell) => {
      cell.innerText = '';
    })
    GameOverSpan.innerText = '';
    GameOverSpan.classList.remove("show")
    CanMove = true;
  })
})

// function randomThinking(){
//   while (thinking) {
//     setInterval(() => {
//       let index = Math.floor(Math.random() * 9);
//       console.log(index);
//     }, 500)
//   }
// }


function GameOver(text) {
  GameOverSpan.classList.add("show")
  if (GetAllOpen(board).length == 0) {
    GameOverSpan.innerText = "It is a tie";
  } else {
    GameOverSpan.innerText = text;
  }
}

function CheckForGameOver(board) {
  //checks rows
  for (var i = 0; i < 9; i += 3) {
    if (board[i] != "") {
      if (board[i] == board[i + 1] && board[i] == board[i + 2]) {
        return true;
      }
    }
  }
  //Checks columns
  for (var i = 0; i < 3; i++) {
    if (board[i] != "") {
      if (board[i] == board[i + 3] && board[i] == board[i + 6]) {
        return true;
      }
    }
  }
  //Checks Horizontals
  if (board[0] != "") {
    if (board[0] == board[4] && board[0] == board[8]) {
      return true;
    }
  }
  if (board[2] != "") {
    if (board[2] == board[4] && board[2] == board[6]) {
      return true;
    }
  }
  return false;
}

function CheckIfOpen(board, index) {
  return (board[index] == "") ? true : false;
}

function GetAllOpen(board) {
  var AllOpen = [];

  for (var i = 0; i < board.length; i++) {
    if (board[i] == "") {
      AllOpen.push(i);
    }
  }
  return AllOpen;
}

function AIMove(board) {
  let bestVal = -1000;
  let bestMove = -1;
  //console.log(board.length);

  for (var i = 0; i < board.length; i++) {
    if (board[i] == "") {
      board[i] = "O";
      var moveVal = minimax(board, 0, false);
      board[i] = "";
      //var moveVal = 1;
      if (moveVal > bestVal) {
        //console.log(bestMove);
        bestMove = i;
        //console.log(bestMove);
        bestVal = moveVal
      }
    }
  }
  // console.log(board);
  return bestMove
}

function minimax(board, depth, isMax) {
  var PossibleMoves = GetAllOpen(board); //Gets the indexes for all of the open board spaces
  var GameOver = CheckForGameOver(board); //Boolean is the game over

  // console.log(board);
  if (GameOver && !isMax) { //game over and the ai won
    return 10;
  }
  if (GameOver && isMax) { //game over and the ai lost
    return -10;
  }
  if (PossibleMoves.length == 0) { //Tie, no more moves
    return 0;
  }

  if (isMax) {
    var best = -1000;
    for (var i = 0; i < board.length; i++) {
      if (board[i] == "") {
        board[i] = "O";

        best = Math.max(best, minimax(board, depth + 1, !isMax));

        board[i] = "";
      }
    }
    return best;
  } else {
    let best = 1000;
    for (var i = 0; i < board.length; i++) {
      if (board[i] == "") {
        board[i] = "X";
        best = Math.min(best, minimax(board, depth + 1, !isMax));
        board[i] = "";
      }
    }
    return best;
  }
}