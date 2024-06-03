let currMoleTile;
let currPlantTile;
let score = 0;
let gameOver = false;

const cuekImages = ["cuek.png", "cuek2.png", "cuek3.png", "cuek4.png"];
const michiImages = ["michi.png", "michi2.png", "michi3.png", "michi4.png"];

window.onload = function() {
    setGame();
}

function setGame() {
    for (let i = 0; i < 9; i++) {
        let tile = document.createElement("div");
        tile.id = i.toString();
        tile.addEventListener("click", selectTile);
        document.getElementById("board").appendChild(tile);
    }
    setInterval(setMole, 1000);
    setInterval(setPlant, 2000);
}

function getRandomTile() {
    let num = Math.floor(Math.random() * 9);
    return num.toString();
}

function getRandomImage(imagesArray) {
    const randomIndex = Math.floor(Math.random() * imagesArray.length);
    return imagesArray[randomIndex];
}

function setMole() {
    if (gameOver) {
        return;
    }
    if (currMoleTile) {
        currMoleTile.innerHTML = "";
    }
    let mole = document.createElement("img");
    mole.src = getRandomImage(cuekImages);

    let num = getRandomTile();
    if (currPlantTile && currPlantTile.id == num) {
        return;
    }
    currMoleTile = document.getElementById(num);
    currMoleTile.appendChild(mole);
}

function setPlant() {
    if (gameOver) {
        return;
    }
    if (currPlantTile) {
        currPlantTile.innerHTML = "";
    }
    let plant = document.createElement("img");
    plant.src = getRandomImage(michiImages);

    let num = getRandomTile();
    if (currMoleTile && currMoleTile.id == num) {
        return;
    }
    currPlantTile = document.getElementById(num);
    currPlantTile.appendChild(plant);
}

function selectTile() {
    if (gameOver) {
        return;
    }
    if (this == currMoleTile) {
        score += 10;
        document.getElementById("score").innerText = score.toString();
        document.getElementById("cuekGolpeada").play();
    }
    else if (this == currPlantTile) {
        document.getElementById("score").innerText = "PERDISTE, GOLPEASTE AL MICHI, tu puntaje es: " + score.toString();
        document.getElementById("catSound").play();
        gameOver = true;
    }
}

function restartGame() {
    score = 0;
    gameOver = false;
    currMoleTile = null;
    currPlantTile = null;
    document.getElementById("score").innerText = score.toString();
    let tiles = document.querySelectorAll("#board div");
    tiles.forEach(tile => {
        tile.innerHTML = "";
    });
}

window.onload = function() {
    setGame();
    document.getElementById("restartButton").addEventListener("click", restartGame);
}
