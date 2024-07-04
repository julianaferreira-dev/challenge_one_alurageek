import { conectaApi } from "./conectaApi.js";

function criaCard(nome, valor, imagem, id) {
    const lista = document.querySelector("[data-lista]");

    const produto = document.createElement("li");
    produto.className = "secao__produtos__bloco__item";
    produto.setAttribute("data-id", id);
    produto.innerHTML = `
        <img class="secao__produtos__bloco__item__imagem" src="${imagem}" />
        <p>${nome}</p>
        <span class="secao__produtos__bloco__item__info">
            <p>R$ ${valor}</p>
            <span>
                <img
                    class="lixeira__branca"
                    src="/assets/ico/lixeira1.png"
                    alt=""
                />
                <img
                    class="lixeira__vermelha"
                    src="/assets/ico/lixeira2.png"
                    data-id="${id}"
                    alt="Excluir"
                />
            </span>
        </span>
    `;

    const lixeiraBtn = produto.querySelector(".lixeira__vermelha");
    lixeiraBtn.addEventListener("click", async (evento) => {
        evento.preventDefault();

        produto.remove();
        
        await conectaApi.excluiProduto(id);

        const produtosRestantes = document.querySelectorAll(".secao__produtos__bloco__item");
        if (produtosRestantes.length === 0) {
            semProdutos();  
        }
    });

    lista.appendChild(produto);
}

async function exibirProdutos() {
    const lista = document.querySelector("[data-lista]");
    lista.innerHTML = "";

        const listaApi = await conectaApi.listaProdutos();

        if (listaApi.length === 0) {
            semProdutos();
        } else {
            listaApi.forEach(elemento => {
                criaCard(elemento.nome, elemento.valor, elemento.imagem, elemento.id);
            });
        }
}

document.addEventListener("DOMContentLoaded", exibirProdutos);

function semProdutos() {
    const lista = document.querySelector("[data-lista]");
    const mensagemListaVazia = lista.querySelector(".secao__produtos__bloco__item__vazio");

    if (!mensagemListaVazia) {
        const listaVazia = document.createElement("span");
        listaVazia.className = "secao__produtos__bloco__item__vazio";
        listaVazia.textContent = "NENHUM PRODUTO FOI CADASTRADO!";
        lista.appendChild(listaVazia);
    }
}

export { criaCard, semProdutos };
