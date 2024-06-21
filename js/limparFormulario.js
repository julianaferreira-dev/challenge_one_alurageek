const limparBtn = document.querySelector("[data-limpar");

limparBtn.addEventListener("click", () => {
    const nome = document.querySelector("[data-nome]");
    const valor = document.querySelector("[data-valor]");
    const imagem = document.querySelector("[data-imagem]");

    nome.value = "";
    valor.value = "";
    imagem.value = "";
});