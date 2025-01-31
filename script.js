 const submitButton = document.getElementById('submit');
    const inputSection = document.querySelector('.input-section');
    const gameSection = document.querySelector('.game-section');
    const boardElement = document.getElementById('board');
    const messageElement = document.getElementById('message');

    let players = [];
    let currentPlayer = 0;
    let board = Array(9).fill(null);

    const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
    ];

    function createBoard() {
      boardElement.innerHTML = '';
      for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.id = i;
        cell.addEventListener('click', () => handleCellClick(i));
        boardElement.appendChild(cell);
      }
    }

    function handleCellClick(index) {
      if (board[index] || checkWinner()) return;
      board[index] = currentPlayer === 0 ? 'X' : 'O';
      document.getElementById(index).textContent = board[index];

      if (checkWinner()) {
        messageElement.textContent = `${players[currentPlayer]} wins!`;
      } else if (board.every(cell => cell)) {
        messageElement.textContent = "It's a Draw!";
      } else {
        currentPlayer = 1 - currentPlayer;
        messageElement.textContent = `${players[currentPlayer]}'s turn!`;
      }
    }

    function checkWinner() {
      return winningCombinations.some(combination => 
        combination.every(index => board[index] === (currentPlayer === 0 ? 'X' : 'O'))
      );
    }

    submitButton.addEventListener('click', () => {
      const player1 = document.getElementById('player-1').value.trim();
      const player2 = document.getElementById('player-2').value.trim();

      if (!player1 || !player2) {
        alert('Please enter both player names');
        return;
      }

      players = [player1, player2];
      currentPlayer = 0;
      board.fill(null);

      inputSection.style.display = 'none';
      gameSection.style.display = 'block';
      createBoard();
      messageElement.textContent = `${players[currentPlayer]}'s turn!`;
    });

    // Show input section by default
    inputSection.style.display = 'block';