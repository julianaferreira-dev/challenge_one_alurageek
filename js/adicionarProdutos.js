import { conectaApi } from "./conectaApi.js";
import { criaCard } from "./mostrarProdutos.js";
import { validarFormulario } from "./validarFormulario.js";

function valorFormatado(valor) {
    return parseFloat(valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

const btnGuardar = document.querySelector("[data-guardar]");

if (btnGuardar) {
    btnGuardar.addEventListener("click", async (evento) => {
        evento.preventDefault();

        const nome = document.querySelector("[data-nome]").value.trim();
        const valor = document.querySelector("[data-valor]").value.trim();
        const imagem = document.querySelector("[data-imagem]").value.trim();

        const formularioValido = validarFormulario(nome, valor, imagem);

        if (!formularioValido) {
            return;
        }

            const produtoNovo = await conectaApi.insereProduto(nome, valorFormatado(valor), imagem);

            criaCard(produtoNovo.nome, produtoNovo.valor, produtoNovo.imagem, produtoNovo.id);

            document.querySelector("[data-formulario]").reset();

            const lista = document.querySelector("[data-lista]");
            const mensagemListaVazia = lista.querySelector(".secao__produtos__bloco__item__vazio");
            if (mensagemListaVazia) {
                mensagemListaVazia.remove();
            }
    });
}
