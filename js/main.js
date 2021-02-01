
var gBoard;
var gDefaultDifLevel = 16;
var gDificultyLevel;
var gClickedNum = 0;
var gCorrectClicksCounter = 0;
var gShowTimeInterval = null;

function init(dificultyLevel) {
    if (!dificultyLevel) {
        dificultyLevel = gDefaultDifLevel;
    }
    gBoard = createBoard(dificultyLevel);
    gDificultyLevel = dificultyLevel;
    renderBoard(gBoard);
}

function endGame() {
    var elMessage = document.querySelector('.victory');
    elMessage.style.display = "block";
    stopWatch();
}

function newGame(elButton) {
    stopWatch();
    var elStopWatch = document.querySelector('.stopWatch');
    elStopWatch.innerText = '0.000';
    
    var elMessage = document.querySelector('.victory');
    elMessage.style.display = "none";
    if (elButton.innerText === 'Easy(16)') {
        gDificultyLevel = 16;
    }
    else if (elButton.innerText === 'Hard(25)') {
        gDificultyLevel = 25;
    }
    else if (elButton.innerText === 'Extreme(36)') {
        gDificultyLevel = 36;
    }
    else if (!gDificultyLevel) {
        gDificultyLevel = gDefaultDifLevel;
    }
    gClickedNum = 0;
    firstNumClick = false;
    gCorrectClicksCounter = 0;
    init(gDificultyLevel);
}

function createBoard(dificultyLevel) {
    var numsForBoard = getNumsForBoard(dificultyLevel);
    var board = [];
    for (var i = 0; i < Math.sqrt(dificultyLevel); i++) {
        board.push([]);
        for (var j = 0; j < Math.sqrt(dificultyLevel); j++) {
            randomNum = numsForBoard[Math.floor(Math.random() * numsForBoard.length)];
            board[i][j] = randomNum
            numsForBoard.splice(numsForBoard.indexOf(randomNum), 1);
        }
    }
    return board;
}

function renderBoard(board) {
    var strHtml = '';
    for (var i = 0; i < board.length; i++) {
        strHtml += '<tr>'
        for (var j = 0; j < board[0].length; j++) {
            var cell = board[i][j];
            strHtml += `<td data-i="${i}" data-j="${j}"
            onclick="cellClicked(this, ${i},${j})">${cell}</td>`
        }
        strHtml += '</tr>'
    }
    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHtml;
}

function cellClicked(elCell, i, j) {
    if (gBoard[i][j] === (gClickedNum + 1)) {
        elCell.classList.add('right');
        gClickedNum = gBoard[i][j];
        gCorrectClicksCounter++;
    }
    if (gClickedNum === 1) {
        addStopWatch();
    }
    if (gCorrectClicksCounter === gDificultyLevel) {
        endGame();
    }
}

function addStopWatch() {
    startTime = new Date();
    var elStopWatch = document.querySelector('.stopWatch');
    gShowTimeInterval = setInterval(function () {
        var timeElapsed = (new Date() - startTime);
        elStopWatch.innerText = (timeElapsed / 1000);
    }, 1);
}
function stopWatch() {
    clearInterval(gShowTimeInterval);
    gShowTimeInterval = null;
}

////////////////////////////////////////////////////////////////

function getNumsForBoard(dificultyLevel) {
    var numsForBoard = [];
    for (var i = 0; i < dificultyLevel; i++) {
        numsForBoard[i] = i + 1;
    }
    console.log('nums', numsForBoard);
    return numsForBoard;
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}