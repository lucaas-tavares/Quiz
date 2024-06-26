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
        finalizarQuiz();
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
    if (selectedOption === currentAsk.answers[0]) {
        countA++;
    } else if (selectedOption === currentAsk.answers[1]) {
        countB++;
    } else if (selectedOption === currentAsk.answers[2]) {
        countC++;
    }

    if (current < asks.length - 1) {
        current++;
        mostraPergunta();
    } else {
        finalizarQuiz();
    }
}

function finalizarQuiz() {
    const gender = localStorage.getItem("gender");
    const nome = localStorage.getItem("name");
    let resultado;

    if (gender === "masculino") {
        resultado = (countA * 15) + (countB * 5) + (countC * -5);
    } else {
        resultado = (countA * 10) + (countB * 5) + (countC * -5);
    }

    let classificacao;
    let descricao;

    if (resultado < -150 || resultado <= 149) {
        classificacao = "Cérebro supermasculino";
        descricao = "Essas pessoas demonstram grande talento para atividades que exigem raciocínio lógico e analítico. Elas são muito boas na articulação verbal, tendem a ser mais disciplinadas e organizadas, e lidam facilmente com a previsão de cursos e o planejamento com base em dados estatísticos, raramente se deixando levar pela emoção.";
    } else if (resultado >= 150 && resultado <= 179) {
        classificacao = "Interseção";
        descricao = "Você possui um equilíbrio raro entre as características de ambos os sexos, demonstrando uma flexibilidade mental que é extremamente vantajosa para a solução de problemas. Pessoas na interseção tendem a fazer amigos facilmente, seja entre homens ou mulheres, e mostram uma habilidade natural para compreender e integrar diferentes perspectivas.";
    } else if (resultado >= 180 && resultado <= 450) {
        classificacao = "Cérebro Superfeminino";
        descricao = "Essas pessoas têm uma grande tendência para a criatividade, talento artístico e musical. Suas decisões são frequentemente baseadas na intuição, e elas solucionam problemas com inteligência e criatividade, muitas vezes a partir de poucas informações.";
    }

    announced.innerHTML = `<span class="result-message">${nome}, sua pontuação é <span style="color:#7F00FE;">${resultado}</span></span>`;
    boxAnswers.innerHTML = `<p class="result-description"><span style="color:#A960F2;">${classificacao}</span> - ${descricao}</p>
                            <button class="return-button" onclick="location.href='../../index.html'">Voltar ao início</button>`;
}

mostraPergunta();
