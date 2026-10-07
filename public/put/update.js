// Script responsável exclusivamente pela operação PUT (atualização de registros)

const API_URL = '/api/pessoas';

const btnBuscar = document.getElementById('btnBuscar');
const rgBusca = document.getElementById('rgBusca');
const formAtualizar = document.getElementById('formAtualizar');
const mensagem = document.getElementById('mensagem');

function exibirMensagem(texto, tipo) {
    mensagem.textContent = texto;
    mensagem.className = `mensagem ${tipo}`;
}

function preencherFormulario(pessoa) {
    document.getElementById('id').value = pessoa.id;
    document.getElementById('nome').value = pessoa.nome;
    document.getElementById('sobrenome').value = pessoa.sobrenome;
    document.getElementById('email').value = pessoa.email;
    document.getElementById('idade').value = pessoa.idade;
    document.getElementById('telefone').value = pessoa.telefone;
    document.getElementById('rg').value = pessoa.rg;
    document.getElementById('rua').value = pessoa.rua;
    document.getElementById('bairro').value = pessoa.bairro;
    document.getElementById('cidade').value = pessoa.cidade;
    document.getElementById('estado').value = pessoa.estado;
}

btnBuscar.addEventListener('click', function () {
    const rg = rgBusca.value.trim();

    if (!rg) {
        exibirMensagem('Informe um RG para buscar.', 'erro');
        return;
    }

    fetch(`${API_URL}?rg=${encodeURIComponent(rg)}`)
        .then(function (resposta) {
            return resposta.json();
        })
        .then(function (pessoas) {
            if (pessoas.length === 0) {
                exibirMensagem('Nenhuma pessoa encontrada com esse RG.', 'erro');
                formAtualizar.reset();
                return;
            }
            preencherFormulario(pessoas[0]);
            mensagem.className = 'mensagem';
        });
});

formAtualizar.addEventListener('submit', function (evento) {
    evento.preventDefault();

    const id = document.getElementById('id').value;

    if (!id) {
        exibirMensagem('Busque uma pessoa pelo RG antes de atualizar.', 'erro');
        return;
    }

    const pessoaAtualizada = {
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

    fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pessoaAtualizada)
    })
        .then(function (resposta) {
            if (!resposta.ok) {
                throw new Error('Falha ao atualizar pessoa.');
            }
            return resposta.json();
        })
        .then(function () {
            exibirMensagem('Pessoa atualizada com sucesso!', 'sucesso');
            formAtualizar.reset();
            rgBusca.value = '';
        })
        .catch(function (erro) {
            exibirMensagem(erro.message, 'erro');
        });
});
