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

    showBoard(board, player1, player2);
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
        board[position[0] - 1][position[1] - 1] !== " ") {

        positionId = prompt(`${player1.turn ? player1.name : player2.name}'s turn!\n`
            + `Playing as: ${player1.turn ? player1.symbol : player2.symbol}\n`
            + "Write coords of the location you want\n"
            + "place your symbol as: height-width");

        position = positionId.split("-");
    }
    board[position[0] - 1][position[1] - 1] = player1.turn ? player1.symbol : player2.symbol;

    showBoard(board, player1, player2);
    checkWin();
}

function checkWin() {
    let win = is2DLineEqual(board);
    if (win) {
        alert(`Winner is ${player1.turn ? player1.name : player2.name}`);
        return setupGame();
    }

    let spaceLeft = false;
    for (let height = 0; height < board.length; height++) {
        for (let width = 0; width < board.length; width++) {
            if (board[height][width] === " ") {
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
            array[height][width] = " ";
        }
    }
    return array;
}

function showBoard(board, ...players) {
    console.clear();

    let playersMsg = "";
    for (let i = 0; i < players.length; i++) {
        playersMsg += `${players[i].name}: ${players[i].symbol}\t`;
    }
    console.log(playersMsg);

    let size = board.length + 1;

    let customBoard = []; // add coords to default board

    for (let height = 0; height < size; height++) {
        customBoard[height] = [];
        for (let width = 0; width < size; width++) {
            if (height === 0 && width === 0) {
                customBoard[height][width] = " ";
                continue;
            }
            customBoard[height][width] = (height === 0 || width === 0) ?
                height === 0 ? width : height : board[height - 1][width - 1];
        }
    }
    for (let i = 0; i < customBoard.length; i++) console.log(customBoard[i].join());
}

function is2DLineEqual(array) {
    // Check rows
    for (let i = 0; i < array.length; i++) {
        if (array[i].every(e => e === array[i][0] && array[i][0] !== " ")) {
            return true;
        }
    }

    // Check columns
    for (let i = 0; i < array.length; i++) {
        let column = array.map(row => row[i]);
        if (column.every(e => e === column[0] && column[0] !== " ")) {
            return true;
        }
    }

    // Check main diagonal
    let mainDiagonal = array.map((row, i) => row[i]);
    if (mainDiagonal.every(e => e === mainDiagonal[0] && mainDiagonal[0] !== " ")) {
        return true;
    }

    // Check anti-diagonal
    let antiDiagonal = array.map((row, i) => row[row.length - 1 - i]);
    if (antiDiagonal.every(e => e === antiDiagonal[0] && antiDiagonal[0] !== " ")) {
        return true;
    }
    return false;
}
