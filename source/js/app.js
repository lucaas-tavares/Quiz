import { asks } from './asks.js';

const announced = document.querySelector(".announced");
const boxAnswers = document.querySelector(".box-answers");
const currentAskCount = document.querySelector(".current-ask");

let current = 0;
let currentAsk;
let countA = 0;
let countB = 0;
let countC = 0;

function mostraPergunta() {
    if (current >= asks.length) {
        console.log("acabooo");
        return;
    }

    currentAsk = asks[current];
    currentAskCount.textContent = current + 1;
    announced.textContent = currentAsk.question;
    boxAnswers.textContent = "";
    mostraAlternativas();
}

function mostraAlternativas() {
    for (const alternative of currentAsk.answers) {
        const buttonAnswers = document.createElement("button");
        buttonAnswers.textContent = alternative;
        buttonAnswers.addEventListener("click", () => selectedAnswer(alternative));
        boxAnswers.appendChild(buttonAnswers);
    }
}

function selectedAnswer(selectedOption) {
    if (current < asks.length - 1) {
        current++;
        mostraPergunta();
    } else {
        console.log("Quiz terminado");
    }
}

mostraPergunta();
