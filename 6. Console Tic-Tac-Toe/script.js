let player1 = {};
let player2 = {};

let board = undefined;

setTimeout(setupGame, 4000); // Time to open the console

function setupGame() {
    player1 = {
        name: getPlayerName(),
        symbol: "X",
        turn: true
    }

    player2 = {
        name: getPlayerName(),
        symbol: "O",
        turn: false
    }

    board = setupBoard();

    printBoard(board, player1, player2);
    playerAction();
}

function playerAction() {
    let positionId = "";
    let position = positionId.split("-");

    while (!positionId ||
        position.length !== 2 ||
        !parseInt(position[0]) ||
        !parseInt(position[1]) ||
        parseInt(position[0] === 0) ||
        parseInt(position[1] === 0) ||
        position[0] > board.length ||
        position[1] > board[0].length ||
        board[position[0] - 1][position[1] - 1] !== "_") {

        positionId = prompt(`${player1.turn ? player1.name : player2.name}'s turn!\n`
            + `Playing as: ${player1.turn ? player1.symbol : player2.symbol}\n`
            + "Write coords of the location you want\n"
            + "place your symbol as: height-width");

        position = positionId.split("-");
    }
    board[position[0] - 1][position[1] - 1] = player1.turn ? player1.symbol : player2.symbol;

    printBoard(board, player1, player2);
    checkWin();
}

function checkWin() {
    let win = is2DLinesEqual(board);
    if (win) {
        alert(`${player1.turn ? player1.name : player2.name} is the Winner!`);
        return setupGame();
    }

    let spaceLeft = false;
    for (let height = 0; height < board.length; height++) {
        for (let width = 0; width < board.length; width++) {
            if (board[height][width] === "_") {
                spaceLeft = true;
                break;
            }
        }
    }

    if (!spaceLeft) {
        alert("It's a Draw!");
        return setupGame();
    }

    // switch turns
    player1.turn = !player1.turn;
    player2.turn = !player2.turn;

    playerAction();
}

function getPlayerName() {
    let playerName = undefined;

    while (!playerName || parseInt(playerName)) {
        playerName = prompt("Please enter your name");
    }
    return playerName;
}

function setupBoard() {
    let boardSize = undefined;

    while (!parseInt(boardSize) || parseInt(boardSize) < 3) {
        boardSize = prompt("Please enter board width and length"); // boardSize * boardSize
    }

    let size = parseInt(boardSize);

    let array = [];

    for (let height = 0; height < size; height++) {
        array[height] = [];
        for (let width = 0; width < size; width++) {
            array[height][width] = "_";
        }
    }
    return array;
}

function printBoard(board, ...players) {
    console.clear();

    let playersMsg = "";
    for (let i = 0; i < players.length; i++) {
        playersMsg += `${players[i].name}: ${players[i].symbol}\t`;
    }
    console.log(playersMsg);

    let size = board.length + 1;

    let customBoard = []; // create custom board with coords

    for (let height = 0; height < size; height++) {
        customBoard[height] = [];

        for (let width = 0; width < size; width++) {
            if (height === 0 && width === 0) {
                customBoard[height][width] = "_";
                continue;
            }

            customBoard[height][width] = (height === 0 || width === 0) ?
                height === 0 ? width : height : board[height - 1][width - 1];
        }
    }
    for (let i = 0; i < customBoard.length; i++) console.log(customBoard[i].join());
}

function is2DLinesEqual(array) {
    for (let i = 0; i < array.length; i++) {
        // Check rows
        if (array[i].every(e => e === array[i][0] && array[i][0] !== "_")) {
            return true;
        }

        // Check columns
        let column = array.map(row => row[i]);
        if (column.every(e => e === column[0] && column[0] !== "_")) {
            return true;
        }
    }

    // Check main diagonal
    let mainDiagonal = array.map((row, i) => row[i]);
    if (mainDiagonal.every(e => e === mainDiagonal[0] && mainDiagonal[0] !== "_")) {
        return true;
    }

    // Check anti-diagonal
    let antiDiagonal = array.map((row, i) => row[row.length - 1 - i]);
    if (antiDiagonal.every(e => e === antiDiagonal[0] && antiDiagonal[0] !== "_")) {
        return true;
    }
    return false;
}
