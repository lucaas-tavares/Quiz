const buttonStart = document.querySelector(".start");

buttonStart.addEventListener('click', start);

document.getElementById("start").addEventListener("click", function() {
    const nome = document.querySelector('input[type="text"]').value.trim();
    const generoMasculino = document.getElementById("masculino").checked;
    const generoFeminino = document.getElementById("feminino").checked;

    if (!nome) {
        alert("Por favor, informe o seu nome.");
        return;
    }

    if (!generoMasculino && !generoFeminino) {
        alert("Por favor, selecione o seu gênero.");
        return;
    }

    localStorage.setItem("name", nome);
    localStorage.setItem("gender", generoMasculino ? "masculino" : "feminino");

    window.location.href = "source/index.html";
});
