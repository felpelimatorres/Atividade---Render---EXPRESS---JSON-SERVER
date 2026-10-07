// Script responsável exclusivamente pela operação POST (criação de registros)

const API_URL = '/api/pessoas';

const formCriar = document.getElementById('formCriar');
const mensagem = document.getElementById('mensagem');

function exibirMensagem(texto, tipo) {
    mensagem.textContent = texto;
    mensagem.className = `mensagem ${tipo}`;
}

formCriar.addEventListener('submit', function (evento) {
    evento.preventDefault();

    const novaPessoa = {
        nome: document.getElementById('nome').value.trim(),
        sobrenome: document.getElementById('sobrenome').value.trim(),
        email: document.getElementById('email').value.trim(),
        idade: Number(document.getElementById('idade').value),
        telefone: document.getElementById('telefone').value.trim(),
        rua: document.getElementById('rua').value.trim(),
        bairro: document.getElementById('bairro').value.trim(),
        cidade: document.getElementById('cidade').value.trim(),
        estado: document.getElementById('estado').value.trim().toUpperCase(),
        rg: document.getElementById('rg').value.trim()
    };

    fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novaPessoa)
    })
        .then(function (resposta) {
            if (!resposta.ok) {
                throw new Error('Falha ao cadastrar pessoa.');
            }
            return resposta.json();
        })
        .then(function () {
            exibirMensagem('Pessoa cadastrada com sucesso!', 'sucesso');
            formCriar.reset();
        })
        .catch(function (erro) {
            exibirMensagem(erro.message, 'erro');
        });
});
