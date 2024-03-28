const container = document.querySelector("#container");

const maxCards = 24;
const maxPress = 2;

let idsPressed = [];
let idsRemoved = [];
let myPress = 0;

let hold = false;

const table = [ // half of maxCards
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L"
];

startGame();
function startGame() {
    if (maxCards % 2 != 0 || table.length != (maxCards / 2)) {
        console.log("Invalid Game Setup, Unable to start");
        return;
    }
    let list = shuffle(table);
    for (let i = 0; i < maxCards; i++) {
        const card = document.createElement("button");
        card.classList.add("card", list[i]);
        container.append(card);
        const innerContent = document.createElement("div");
        innerContent.classList.add("inner-card");
        const front = document.createElement("div");
        const back = document.createElement("div");
        front.classList.add("front");
        back.classList.add("back");
        back.innerHTML = list[i];
        innerContent.append(front, back);
        card.append(innerContent);
    }
}

const cards = document.querySelectorAll(".card");

cards.forEach(function (card, id) {
    card.addEventListener("click", function () {
        if (idsRemoved.find((num) => num == id)) {
            return;
        }

        if (idsPressed[0] != id && idsPressed.length < maxPress) {
            idsPressed.push(id);
            myPress++;
            card.children[0].style.transform = "rotateY(180deg)";
        }

        if (myPress == maxPress && hold == false) {
            hold = true;
            const cardValue = card.querySelector(".back");
            if (cards[idsPressed[0]].classList.contains(cardValue.innerHTML)) setTimeout(resetPairs, 500, true);
            else setTimeout(resetPairs, 1500, false);
        }
    });
});

function resetPairs(match) {
    if (match) {
        idsRemoved = idsRemoved.concat(idsPressed);
        if (idsRemoved.length == (table.length * 2)) {
            alert("Game Finished");
            startGame();
        }
    } else {
        for (let i = 0; i < idsPressed.length; i++) {
            cards[idsPressed[i]].children[0].style.transform = "rotateY(360deg)";
        }
    }
    idsPressed = [];
    myPress = 0;
    hold = false;
}

function shuffle(list) {
    // list = list.concat(list);
    let newList = [];
    for (let i = 0; i < list.length; i++) {
        for (let g = 0; g < 2; g++) {
            newList.push(list[i]);
        }
    }
    for (let i = 0; i < newList.length; i++) {
        let g = Math.floor(Math.random() * newList.length);
        let temp = newList[i];
        newList[i] = newList[g];
        newList[g] = temp;
    }
    return newList;
}