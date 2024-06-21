async function listaProdutos() {
    const conexao = await fetch("https://6671c1c1e083e62ee43cfbdf.mockapi.io/produtos"); 
    const conexaoConvertida = await conexao.json();
    return conexaoConvertida;
}

async function insereProduto(nome, valor, imagem) {
    const conexao = await fetch("https://6671c1c1e083e62ee43cfbdf.mockapi.io/produtos", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            nome: nome,
            valor: valor,
            imagem: imagem
        })
    });

    const conexaoConvertida = await conexao.json();
    return conexaoConvertida;
}

async function excluiProduto(id) {
    const conexao = await fetch(`https://6671c1c1e083e62ee43cfbdf.mockapi.io/produtos/${id}`, {
        method: "DELETE",
        headers: {
            "Content-type": "application/json"
        }
    });
    return conexao;
}

export const conectaApi = {
    listaProdutos,
    insereProduto,
    excluiProduto
}
