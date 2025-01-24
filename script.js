const cells = document.querySelectorAll('.cell');
const currentPlayerDisplay = document.getElementById('current-player');
const restartButton = document.getElementById('restart-btn');
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];

function handleClick(event) {
  const index = event.target.dataset.index;
  if (board[index] !== '') return; // Cell already occupied

  // Mark the cell with the current player's symbol
  board[index] = currentPlayer;
  event.target.textContent = currentPlayer;

  // Check if the current player has won
  if (checkWinner()) {
    setTimeout(() => {
      alert(`${currentPlayer} wins!`);
      resetGame();
    }, 200);
  } else if (board.every(cell => cell !== '')) {
    setTimeout(() => {
      alert("It's a tie!");
      resetGame();
    }, 200);
  } else {
    // Switch player
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    currentPlayerDisplay.textContent = `Current Player: ${currentPlayer}`;
  }
}

function checkWinner() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Columns
    [0, 4, 8], [2, 4, 6]               // Diagonals
  ];

  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return true;
    }
  }
  return false;
}

function resetGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  cells.forEach(cell => cell.textContent = '');  // Clear all cells
  currentPlayer = 'X';
  currentPlayerDisplay.textContent = `Current Player: ${currentPlayer}`;
}

function addEventListeners() {
  cells.forEach(cell => {
    cell.addEventListener('click', handleClick);
  });
  restartButton.addEventListener('click', resetGame);
}

// Initialize the game
addEventListeners();
