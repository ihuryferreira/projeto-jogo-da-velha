const btnStart = document.getElementById("form");
const game = document.querySelectorAll(".game span");
let lista = [];
let play = "";

const update = () => {
    const input = document.getElementById(play);
    document.getElementById("jogador").style.textTransform = "uppercase";
    document.querySelector("#jogador").innerText = input.innerText;
};

const startGame = () => {
    lista = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
    ];

    play = "nomeJogador1";
    document.querySelector("h2").innerHTML =
        "Vez de: <span id='jogador'></span>";
    update();

    game.forEach((btn) => {
        btn.classList.remove("win");
        btn.innerText = "";
        btn.classList.add("cursor-pointer");
        btn.addEventListener("click", clickRegion);
    });
};

const Bd = () => {
    const bd = [];
    if (
        lista[0][0] &&
        lista[0][0] === lista[0][1] &&
        lista[0][0] === lista[0][2]
    )
        bd.push("0.0", "0.1", "0.2");
    if (
        lista[1][0] &&
        lista[1][0] === lista[1][1] &&
        lista[1][0] === lista[1][2]
    )
        bd.push("1.0", "1.1", "1.2");
    if (
        lista[2][0] &&
        lista[2][0] === lista[2][1] &&
        lista[2][0] === lista[2][2]
    )
        bd.push("2.0", "2.1", "2.2");
    if (
        lista[0][0] &&
        lista[0][0] === lista[1][0] &&
        lista[0][0] === lista[2][0]
    )
        bd.push("0.0", "1.0", "2.0");
    if (
        lista[0][1] &&
        lista[0][1] === lista[1][1] &&
        lista[0][1] === lista[2][1]
    )
        bd.push("0.1", "1.1", "2.1");
    if (
        lista[0][2] &&
        lista[0][2] === lista[1][2] &&
        lista[0][2] === lista[2][2]
    )
        bd.push("0.2", "1.2", "2.2");
    if (
        lista[0][0] &&
        lista[0][0] === lista[1][1] &&
        lista[0][0] === lista[2][2]
    )
        bd.push("0.0", "1.1", "2.2");
    if (
        lista[0][2] &&
        lista[0][2] === lista[1][1] &&
        lista[0][2] === lista[2][0]
    )
        bd.push("0.2", "1.1", "2.0");
    return bd;
};

const desativarCursorPointer = (ev) => {
    ev.classList.remove("cursor-pointer");
    ev.removeEventListener("click", clickRegion);
};

const pintarSpan = (element) => {
    element.forEach((element) => {
        const span = document.querySelector("[data-roude='" + element + "']");
        span.classList.add("win");
    });

    const playName = document.getElementById(play);
    playName.style.textTransform = "uppercase";

    document.querySelector("h2").innerHTML =
        "O jogador " + playName.innerText + " venceu!";

    document.querySelectorAll("#game span").forEach(function (ele) {
        ele.classList.remove("cursor-pointer");
        ele.removeEventListener("click", clickRegion);
    });

    setTimeout(() => {
        document.querySelectorAll(".modalStyle")[0].style.display = "flex";
        document.querySelectorAll(".container")[0].style.display = "none";
    }, 1000);
};

const clickRegion = (ev) => {
    const span = ev.currentTarget;
    const region = span.dataset.roude;
    const rowColumnPair = region.split(".");
    const row = rowColumnPair[0];
    const column = rowColumnPair[1];
    if (play === "nomeJogador1") {
        span.innerText = "X";
        lista[row][column] = "x";
    } else {
        span.innerText = "O";
        lista[row][column] = "o";
    }

    console.clear();
    console.table(lista);
    desativarCursorPointer(span);
    const winRegion = Bd();
    if (winRegion.length > 0) {
        pintarSpan(winRegion);
    } else if (lista.flat().includes("")) {
        play = play === "nomeJogador1" ? "nomeJogador2" : "nomeJogador1";
        update();
    } else {
        document.querySelector("h2").innerText = "Empate!";
        setTimeout(() => {
            document.querySelectorAll(".modalStyle")[0].style.display = "flex";
            document.querySelectorAll(".container")[0].style.display = "none";
        }, 1200);
    }
};

btnStart.addEventListener("submit", function (ev) {
    ev.preventDefault();
    const play1 = document.getElementById("play1");
    const play2 = document.getElementById("play2");

    const nomeJogador1 = document.getElementById("nomeJogador1");
    const nomeJogador2 = document.getElementById("nomeJogador2");

    const modal = document.getElementsByClassName("container-principal")[0];
    const gamerStart = document.querySelectorAll(".container")[0];

    nomeJogador1.innerText = play1.value;
    nomeJogador2.innerText = play2.value;

    if (gamerStart.style.display === "none") {
        document.querySelectorAll(".container")[0].style.display = "flex";
        modal.style.display = "none";
    }
    startGame();
});

document.querySelector("#modalStart").addEventListener("click", function () {
    document.querySelectorAll(".modalStyle")[0].style.display = "none";
    document.querySelectorAll(".container")[0].style.display = "flex";
    startGame();
});

document.querySelector("#modalReset").addEventListener("click", function () {
    window.location.assign("index.html");
});
