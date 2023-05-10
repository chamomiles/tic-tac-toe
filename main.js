/* TODO:
1. Display a tic tac toe board
    - in HTML create a board layout
    2. When the user clicks on a space, add their mark to it
    - display marks depending on value
        - update entire board on click
    - use a click event
    - allow changes only if it's empty
    - update the value
    - remember what the space now is
    - disable the button
3. Switch to the other player
    - use different values for players
    - switch automatically
4. Evaluate for winning conditions
    - check for game ending conditions every click
5. Finish the game with a message
    - add text to hidden element and show it
6. Have a reset button
    - clear all state & hide message
*/



const game = {
    board: [
        0, 0, 0,
        0, 0, 0,
        0, 0, 0
    ],

    boardElements: document.querySelectorAll('.cell'),

    players: [
        {id: 1, mark: 'x'},
        {id: 2, mark: 'o'}
    ],
    currentPlayer: {},
    finished: false,

    start() {
        game.board = game.board.map(item => 0);
        game.currentPlayer = game.players[0];
        game.addEventListeners();
        game.updateMarks();
        game.reenableButtons();
        game.disableRestartButton();
    },

    addEventListeners() {
        // Cell buttons
        for (const boardElement of game.boardElements) {
            boardElement.addEventListener('click', game.setMark);
        };

        // Restart button
        document.querySelector('#restart-button').addEventListener('click', this.start);
    },

    update() {
        this.updateMarks();
        this.switchPlayer();
        if (this.gameIsOver()) this.enableRestartButton();
    },

    setMark(e) {
        const id = e.target.id.slice(-1);
        game.board[id] = game.currentPlayer.id;
        console.log(game.board);

        game.disableCell(id);
        game.update();
    },

    disableCell(id) {
        document.querySelector(`#cell-${id}`).disabled = true;
    },

    switchPlayer() {
        if (this.currentPlayer === this.players[0]) {
            this.currentPlayer = this.players[1];
        } else {
            this.currentPlayer = this.players[0];
        }
    },

    updateMarks() {
        for (let i = 0; i < this.board.length ; i++) {
            if (this.board[i] === 1) {
                document.querySelector(`#cell-${i}`).innerText = this.players[0].mark;
            } else if (this.board[i] === 2) {
                document.querySelector(`#cell-${i}`).innerText = this.players[1].mark;
            } else {
                document.querySelector(`#cell-${i}`).innerText = '';
            }
        }
    },

    gameIsOver() {
        return this.winExists() || this.boardIsFull();
    },

    winExists() {
        // Horizontal wins
        if (this.board.slice(0, 3).every((item, _, arr) => item === arr[0] && item !== 0)) return this.board[0];
        if (this.board.slice(3, 6).every((item, _, arr) => item === arr[0] && item !== 0)) return this.board[3];
        if (this.board.slice(6, 9).every((item, _, arr) => item === arr[0] && item !== 0)) return this.board[6];

        // Vertical wins
        if (this.board.filter((_, index) => index % 3 === 0).every((item, _, arr) => item === arr[0] && item !== 0)) return this.board[0];
        if (this.board.filter((_, index) => (index - 1) % 3 === 0).every((item, _, arr) => item === arr[0] && item !== 0)) return this.board[1];
        if (this.board.filter((_, index) => (index - 2) % 3 === 0).every((item, _, arr) => item === arr[0] && item !== 0)) return this.board[2];

        // Diagonal wins
        if (this.board.filter((_, index) => index % 4 === 0).every((item, _, arr) => item === arr[0] && item !== 0)) return this.board[0];
        if (this.board[2] === this.board[4] && this.board[2] === this.board[6] && this.board[2] !== 0) return this.board[2];

        // No win
        return 0;
    },

    boardIsFull() {
        return !this.board.includes(0);
    },

    reenableButtons() {
        for (const boardElement of this.boardElements) {
            boardElement.disabled = false;
        }
    },

    enableRestartButton() {
        document.querySelector('#restart-button').disabled = false;
    },

    disableRestartButton() {
        document.querySelector('#restart-button').disabled = true;
    }
}

game.start();