// Script responsável exclusivamente pela operação DELETE (exclusão de registros)

const API_URL = '/api/pessoas';

const btnBuscar = document.getElementById('btnBuscar');
const btnExcluir = document.getElementById('btnExcluir');
const btnLimpar = document.getElementById('btnLimpar');
const rgBusca = document.getElementById('rgBusca');
const mensagem = document.getElementById('mensagem');

function exibirMensagem(texto, tipo) {
    mensagem.textContent = texto;
    mensagem.className = `mensagem ${tipo}`;
}

function limparCampos() {
    document.getElementById('id').value = '';
    document.getElementById('nome').value = '';
    document.getElementById('sobrenome').value = '';
    document.getElementById('rg').value = '';
    rgBusca.value = '';
    mensagem.className = 'mensagem';
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
                return;
            }

            const pessoa = pessoas[0];
            document.getElementById('id').value = pessoa.id;
            document.getElementById('nome').value = pessoa.nome;
            document.getElementById('sobrenome').value = pessoa.sobrenome;
            document.getElementById('rg').value = pessoa.rg;
            mensagem.className = 'mensagem';
        });
});

btnExcluir.addEventListener('click', function () {
    const id = document.getElementById('id').value;

    if (!id) {
        exibirMensagem('Busque uma pessoa pelo RG antes de excluir.', 'erro');
        return;
    }

    fetch(`${API_URL}/${id}`, { method: 'DELETE' })
        .then(function (resposta) {
            if (!resposta.ok) {
                throw new Error('Falha ao excluir pessoa.');
            }
            exibirMensagem('Pessoa excluída com sucesso!', 'sucesso');
            limparCampos();
        })
        .catch(function (erro) {
            exibirMensagem(erro.message, 'erro');
        });
});

btnLimpar.addEventListener('click', limparCampos);
