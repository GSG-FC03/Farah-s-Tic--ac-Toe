//Declerations of all varibles
let computerPerson = document.querySelector('input[name="CP"]:checked');
let XOoptions = document.querySelector('input[name="XO"]:checked');
let playersOptions = document.querySelector('input[name="plyrs"]:checked');
let start = document.getElementById("start");
let reset = document.getElementById("reset");
let edit1 = document.getElementById("edit1");
let edit2 = document.getElementById("edit2");
let p1 = document.getElementById("p1");
let p2 = document.getElementById("p2");
let plyr1 = document.getElementById("plyr1");
let plyr2 = document.getElementById("plyr2");
let nameOfPlayer1 = document.getElementById("nameOfPlayer1");
let nameOfPlayer2 = document.getElementById("nameOfPlayer2");
let Player1 = document.getElementById("firstPlayer");
let Player2 = document.getElementById("secondPlayer");
let Pop = document.getElementById("Pop");
let squareDiv = document.querySelectorAll(".squareDiv");
let score1 = document.getElementById("score1");
let score2 = document.getElementById("score2");
let games = document.getElementById("games");
let rounds = document.getElementById("rounds");

let noOfGame = document.getElementById("noOfGame");
let winner = document.getElementById("winner");
let wins = document.getElementById("wins");
let whoGame = document.getElementById("whoGame");
let gmresult = document.getElementById("gmresult");
let gameTable = document.getElementById("gameTable");
let player1 = p1.textContent;
let player2 = p2.textContent;
let results;
let winner1 = document.getElementById("winner1");
let winner2 = document.getElementById("winner2");
let winner3 = document.getElementById("winner3");
let choosePl1 = document.getElementsByClassName("choosePl1")[0];

let pl1 = document.getElementById("pl1");
let pl2 = document.getElementById("pl2");
let congrats = document.getElementsByClassName("congrats")[0];
let arrayOfRounds = [];
let aray = [];

let startedSign;
let startedPlayer;
let scorePlayer1 = 0,
    scorePlayer2 = 0,
    game = 0,
    round = 0;

let objectOfSetting = {
    comperson: "computer",
    sign: "X",
    first: `${player1}`,
    second: `${player2}`,
    started: `${player1}`,
};
let dataOfSetting;
localStorage.setItem("objectOfSetting", JSON.stringify(objectOfSetting));
//start function  that storage data in local storage to get it later.
start.addEventListener("click", function () {
    localStorage.getItem(objectOfSetting);
    dataOfSetting =
        localStorage.getItem("objectOfSetting") == null ?
        objectOfSetting :
        JSON.parse(localStorage.getItem("objectOfSetting"));
    computerPerson = document.querySelector('input[name="CP"]:checked');
    XOoptions = document.querySelector('input[name="XO"]:checked');
    playersOptions = document.querySelector('input[name="plyrs"]:checked');
    dataOfSetting.comperson = computerPerson.value;
    dataOfSetting.sign = XOoptions.value;
    dataOfSetting.first = p1.textContent;
    dataOfSetting.second = p2.textContent;
    dataOfSetting.started = playersOptions.value;

    localStorage.setItem("objectOfSetting", JSON.stringify(dataOfSetting));

    Pop.style.display = "none";

    document.getElementsByClassName("borderLine")[0].style.animation =
        "borderLine 3s ease-in-out";
    document.getElementsByClassName("boxGameParent")[0].style.animation =
        "move 5s ease-in-out";

    if (dataOfSetting.comperson == "computer") {
        if (dataOfSetting.started == "PC" || dataOfSetting.started == "P") {
            p2.textContent = "PC"
            startedSign = dataOfSetting.sign == "X" ? "O" : "X";

            randomCell(startedSign);

        }
    }

    startedSign = XOoptions.value;
    startedPlayer = playersOptions.value;
    playStart = playersOptions.value;
    signStart = XOoptions.value;
    whoGame.textContent = p1.textContent + "&" + p2.textContent;
    nameOfPlayer1.textContent = p1.textContent;
    nameOfPlayer2.textContent = p2.textContent;

});
//this function for getting random sign for computer
let valueOfCell;

function randomCell(start) {
    valueOfCell = Math.floor(Math.random() * 9);

    if (squareDiv[valueOfCell].children.length == 0) {
        let imgs = document.createElement("img");
        imgs.setAttribute("class", "imgs");
        imgs.setAttribute("src", `./assets/${start}.svg`);
        squareDiv[valueOfCell].appendChild(imgs);

        gameStatus[squareDiv[valueOfCell].getAttribute("data-cell-index")] = start;
        squareDiv[valueOfCell].style.pointerEvents = 'none';

    } else {
        let draw = gameStatus.every((el) => el == "X" || el == "O");
        if (!draw) {

            randomCell(start);
        }
    }
}
// this functtion for set signs in the box  and check the cells then showing the winning sign

function creatingSins(element) {
    if (dataOfSetting.comperson == "computer") {
        let startedSignnnn = dataOfSetting.sign == "X" ? "O" : "X";
        let imgs = document.createElement("img");
        imgs.setAttribute("class", "imgs");
        imgs.setAttribute("src", `./assets/${ dataOfSetting.sign  }.svg`);
        element.appendChild(imgs);
        gameStatus[element.getAttribute("data-cell-index")] = dataOfSetting.sign;
        randomCell(startedSignnnn);
        element.style.pointerEvents = 'none';
        let flag = false;

        // this loop for check what is the winning signal
        for (let i = 0; i <= 7; i++) {
            let winCondition = winningConditions[i];
            let a = gameStatus[winCondition[0]];
            let b = gameStatus[winCondition[1]];
            let c = gameStatus[winCondition[2]];

            if (a === "" || b === "" || c === "") {
                continue;
            }

            if (a == b && b == c) {
                winer(winCondition[0], winCondition[1], winCondition[2]);
                flag = true;
                element.style.pointerEvents = "none";
                document.getElementsByClassName("boxGameParent")[0].style.pointerEvents =
                    "none";

                if (playStart == "P") {
                    scoreOfWiner1(a);
                } else {
                    scoreOfWiner2(a);
                }
                break;
            }
        }
        let draw = gameStatus.every((el) => el == "X" || el == "O");
        if (draw) {
            resetBoxOfSigns();
        }
        // this condition check if you win make this statements..,
        if (flag) {
            round += 1;

            rounds.textContent = round;
            arrayOfRounds.push(`${winner.textContent}`);

            if (round == 3) {
                game += 1;
                games.textContent = game;

                if (scorePlayer1 > scorePlayer2) {
                    winner.textContent = `${p1.textContent} is winner`;
                } else {
                    winner.textContent = `${p2.textContent} is winner`;
                }

                let objectOfResult = {
                    games: game,
                    rounds: arrayOfRounds,
                    winner: winner.textContent

                }
                arrayOfRounds = [];
                aray = localStorage.getItem("tableOfResult") == null ? [] : JSON.parse(localStorage.getItem("tableOfResult"));
                aray.push(objectOfResult)
                localStorage.setItem("tableOfResult", JSON.stringify(aray));
                let arayOfResults = JSON.parse(localStorage.getItem("tableOfResult"));

                for (let i in arayOfResults) {
                    noOfGame.textContent = arayOfResults[i].games;
                    wins.textContent = arayOfResults[i].winner;
                    for (let r in arayOfResults[i].rounds) {
                        winner1.textContent = arayOfResults[i].rounds[0];
                        winner2.textContent = arayOfResults[i].rounds[1];
                        winner3.textContent = arayOfResults[i].rounds[2];
                    }
                }

                congrats.style.display = "block";
                animation1();

                setTimeout(() => {
                    congrats.style.display = "none";

                }, 2500)
                setTimeout(() => {
                    scorePlayer1 = 0;
                    scorePlayer2 = 0;
                    round = 0;
                    score1.textContent = "0";
                    score2.textContent = "0";
                    rounds.textContent = "0";
                    winner.textContent = ``;



                }, 1000);
            }

        }
    }

    ///// this condition for person sate
    else {
        let flag = false;
        let imgs = document.createElement("img");
        imgs.setAttribute("class", "imgs");
        imgs.setAttribute("src", `./assets/${startedSign}.svg`);
        element.appendChild(imgs);
        gameStatus[element.getAttribute("data-cell-index")] = startedSign;
        // this loop for check what is the winning signal
        for (let i = 0; i <= 7; i++) {
            let winCondition = winningConditions[i];
            let a = gameStatus[winCondition[0]];
            let b = gameStatus[winCondition[1]];
            let c = gameStatus[winCondition[2]];

            if (a === "" || b === "" || c === "") {
                continue;
            }

            if (a == b && b == c) {
                winer(winCondition[0], winCondition[1], winCondition[2]);
                flag = true;

                if (playStart == "P1") {
                    scoreOfWiner1(a);
                } else {
                    scoreOfWiner2(a);
                }
                break;
            }
        }

        count += 1;
        if (count == 9) {
            let draw = gameStatus.every((el) => el == "X" || el == "O");
            if (draw) {
                resetBoxOfSigns();
            }
        }
        // this condition check if you win make this statements..,

        if (flag) {
            count = 0;
            round += 1;

            rounds.textContent = round;
            arrayOfRounds.push(`${winner.textContent}`);


            if (round == 3) {

                if (scorePlayer1 > scorePlayer2) {
                    winner.textContent = `${p1.textContent} is winner`;
                } else {
                    winner.textContent = `${p2.textContent} is winner`;
                }

                game += 1;
                games.textContent = game;

                let objectOfResult = {
                    games: game,
                    rounds: arrayOfRounds,
                    winner: winner.textContent

                }
                arrayOfRounds = [];
                aray = localStorage.getItem("tableOfResult") == null ? [] : JSON.parse(localStorage.getItem("tableOfResult"));
                aray.push(objectOfResult)
                localStorage.setItem("tableOfResult", JSON.stringify(aray));

                let arayOfResults = JSON.parse(localStorage.getItem("tableOfResult"));

                for (let i in arayOfResults) {
                    noOfGame.textContent = arayOfResults[i].games;
                    wins.textContent = arayOfResults[i].winner;
                    for (let r in arayOfResults[i].rounds) {
                        winner1.textContent = arayOfResults[i].rounds[0];
                        winner2.textContent = arayOfResults[i].rounds[1];
                        winner3.textContent = arayOfResults[i].rounds[2];
                    }
                }

                congrats.style.display = "block";
                animation1();

                setTimeout(() => {
                    congrats.style.display = "none";

                }, 2500)
                setTimeout(() => {
                    scorePlayer1 = 0;
                    scorePlayer2 = 0;
                    round = 0;
                    score1.textContent = "0";
                    score2.textContent = "0";
                    rounds.textContent = round;
                    winner.textContent = ``;



                }, 1000);
            }
            startedSign = signStart;
        } else {
            startedSign = startedSign == "X" ? "O" : "X";
            element.style.pointerEvents = "none";
        }
    }
}

//reset button ,when clicking on it ,it  will reset all data as default
reset.addEventListener("click", function () {
    let dataOfSetting =
        localStorage.getItem("objectOfSetting") == null ?
        objectOfSetting :
        JSON.parse(localStorage.getItem("objectOfSetting"));
    dataOfSetting = objectOfSetting;
    localStorage.setItem("objectOfSetting", JSON.stringify(dataOfSetting));
    updateState();
});
// this function for reset the setting of game as default
function updateState() {
    let opponent = document.querySelectorAll('input[name="CP"]')[0];
    opponent.setAttribute("checked", "");

    computerDiv.style.background = "#feb360";
    personDiv.style.background = "#191c32";
    personDiv.style.border = "1px solid #ffffff";

    p1.textContent = "P1";
    p2.textContent = "P2";

    let signOptions = document.querySelectorAll('input[name="XO"]')[0];
    signOptions.setAttribute("checked", "");
    XDiv.style.background = "#feb360";
    ODiv.style.background = "#191c32";
    ODiv.style.border = "1px solid #ffffff";

    let plyrOptions = document.querySelectorAll('input[name="plyrs"]')[0];
    plyrOptions.setAttribute("checked", "");
    plyr1.style.background = "#feb360";
    plyr2.style.background = "#191c32";
    plyr2.style.border = "1px solid #ffffff";
}

// this buttons for editing the names on the setting pop
edit1.onclick = editName1;
edit2.onclick = editName2;

// this function for editing name of player 1
function editName1() {
    if (edit1.textContent == "Edit") {
        p1.style.display = "none";
        Player1.style.display = "block";
        edit1.textContent = "Save";
    } else {
        p1.textContent = Player1.value;
        p1.style.display = "block";
        Player1.style.display = "none";
        edit1.textContent = "Edit";
    }
}

// this function for editing name of player 1
function editName2() {
    if (edit2.textContent == "Edit") {
        p2.style.display = "none";
        Player2.style.display = "block";
        edit2.textContent = "Save";
    } else {
        p2.textContent = Player2.value;
        p2.style.display = "block";
        Player2.style.display = "none";
        edit2.textContent = "Edit";
    }
}
//////////////////////////////////////////

// make computer as opponent

function checkTheOpponent() {
    computerPerson = document.querySelector('input[name="CP"]:checked');

    if (computerPerson.value == "computer") {
        document.getElementsByClassName("OtherDiv")[0].style.display = "none";
        document.getElementById("pl1").textContent = "P";
        document.getElementById("pl2").textContent = "PC";
        plyr1.value = "P";
        plyr2.value = "PC";
    } else {
        document.getElementsByClassName("OtherDiv")[0].style.display = "flex";
        document.getElementById("pl1").textContent = "P1";
        document.getElementById("pl2").textContent = "p2";
        plyr1.value = "P1";
        plyr2.value = "P2";
    }
}
checkTheOpponent();

computerDiv.addEventListener("click", function () {
    checkTheOpponent();
});
personDiv.addEventListener("click", function () {
    checkTheOpponent();
});


let gameStatus = ["", "", "", "", "", "", "", "", ""];
let count = 0;
//this function for coloring winnig boxes in green
function winer(a, b, c) {
    document.getElementsByClassName("squareDiv")[a].style.background = "#58A751";
    document.getElementsByClassName("squareDiv")[b].style.background = "#58A751";
    document.getElementsByClassName("squareDiv")[c].style.background = "#58A751";

    document.getElementsByClassName("boxGameParent")[0].style.pointerEvents =
        "none";
    resetBoxOfSigns();
}
// this function for reset boxes and empty them  after 1s.
function resetBoxOfSigns() {
    setTimeout(() => {
        gameStatus = ["", "", "", "", "", "", "", "", ""];
        for (let i = 0; i < squareDiv.length; i++) {
            squareDiv[i].textContent = "";
            squareDiv[i].style.background = "#feb360";
            squareDiv[i].style.pointerEvents = "visible";
            document.getElementsByClassName("boxGameParent")[0].style.pointerEvents =
                "visible";
        }
    }, 1000);
}
// this functions for checking who's the winner
function scoreOfWiner1(signOfWiner) {
    if (signOfWiner == signStart) {
        score1.textContent = scorePlayer1 += 1;
        winner.textContent = `${p1.textContent} is winner`;
        // winner1.textContent = winner.textContent;
    } else {
        score2.textContent = scorePlayer2 += 1;
        winner.textContent = `${p2.textContent} is winner`;
        // winner2.textContent = winner.textContent;
    }
}

function scoreOfWiner2(signOfWiner) {
    if (signOfWiner == signStart) {
        score2.textContent = scorePlayer2 += 1;
        winner.textContent = `${p2.textContent} is winner`;
    } else {
        score1.textContent = scorePlayer1 += 1;
        winner.textContent = `${p1.textContent} is winner`;
    }
}

// array of winning status
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];
// restart game button for restart game
let Restart = document.getElementById("res");
Restart.addEventListener("click", function () {
    scorePlayer1 = 0;
    scorePlayer2 = 0;
    round = 0;
    game = 0;
    score1.textContent = "0";
    score2.textContent = "0";
    rounds.textContent = "0";
    games.textContent = "0";
    winner.textContent = ``;
    noOfGame.textContent = "0";
    wins.textContent = ``;


    gameTable.style.display = "flex";
    gmresult.style.display = "none";
});

//setting div for showing pop of settind for editing or else.
let settingDiv = document.getElementById("settingDiv");
settingDiv.addEventListener("click", function () {
    Pop.style.display = "block";
});

// game table ,this is table of result that showing winners ,scores,..,.

plus.addEventListener("click", function () {
    gameTable.style.display = "none";
    gmresult.style.display = "block";
});
sub.addEventListener("click", function () {
    gameTable.style.display = "flex";
    gmresult.style.display = "none";
});
// making animatiopn for winnin 
function animation1() {
    const Confettiful = function (el) {
        this.el = el;
        this.containerEl = null;

        this.confettiFrequency = 3;
        this.confettiColors = ['#EF2964', '#00C09D', '#2D87B0', '#48485E', '#EFFF1D'];
        this.confettiAnimations = ['slow', 'medium', 'fast'];

        this._setupElements();
        this._renderConfetti();
    };

    Confettiful.prototype._setupElements = function () {
        const containerEl = document.createElement('div');
        const elPosition = this.el.style.position;

        if (elPosition !== 'relative' || elPosition !== 'absolute') {
            this.el.style.position = 'relative';
        }

        containerEl.classList.add('confetti-container');

        this.el.appendChild(containerEl);

        this.containerEl = containerEl;
    };

    Confettiful.prototype._renderConfetti = function () {
        this.confettiInterval = setInterval(() => {
            const confettiEl = document.createElement('div');
            const confettiSize = (Math.floor(Math.random() * 3) + 7) + 'px';
            const confettiBackground = this.confettiColors[Math.floor(Math.random() * this.confettiColors.length)];
            const confettiLeft = (Math.floor(Math.random() * this.el.offsetWidth)) + 'px';
            const confettiAnimation = this.confettiAnimations[Math.floor(Math.random() * this.confettiAnimations.length)];

            confettiEl.classList.add('confetti', 'confetti--animation-' + confettiAnimation);
            confettiEl.style.left = confettiLeft;
            confettiEl.style.width = confettiSize;
            confettiEl.style.height = confettiSize;
            confettiEl.style.backgroundColor = confettiBackground;

            confettiEl.removeTimeout = setTimeout(function () {
                confettiEl.parentNode.removeChild(confettiEl);
            }, 3000);

            this.containerEl.appendChild(confettiEl);
        }, 25);
    };

    window.confettiful = new Confettiful(document.querySelector('.js-container'));
}