// Script responsável exclusivamente pela operação GET (listagem de registros)

const API_URL = '/api/pessoas';

const tabela = document.getElementById('tabela-corpo');
const btnAtualizarLista = document.getElementById('btnAtualizarLista');

function carregarPessoas() {
    fetch(API_URL)
        .then(function (resposta) {
            return resposta.json();
        })
        .then(function (pessoas) {
            tabela.innerHTML = '';

            if (pessoas.length === 0) {
                tabela.innerHTML = '<tr><td colspan="11" class="vazio">Nenhuma pessoa cadastrada.</td></tr>';
                return;
            }

            pessoas.forEach(function (pessoa) {
                const linha = `<tr>
                    <td>${pessoa.id}</td>
                    <td>${pessoa.nome}</td>
                    <td>${pessoa.sobrenome}</td>
                    <td>${pessoa.email}</td>
                    <td>${pessoa.idade}</td>
                    <td>${pessoa.telefone}</td>
                    <td>${pessoa.rua}</td>
                    <td>${pessoa.bairro}</td>
                    <td>${pessoa.cidade}</td>
                    <td>${pessoa.estado}</td>
                    <td>${pessoa.rg}</td>
                </tr>`;
                tabela.innerHTML += linha;
            });
        })
        .catch(function () {
            tabela.innerHTML = '<tr><td colspan="11" class="vazio">Erro ao carregar os dados.</td></tr>';
        });
}

btnAtualizarLista.addEventListener('click', carregarPessoas);

carregarPessoas();
