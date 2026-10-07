// Servidor Node.js + Express que serve as páginas do CRUD
// e expõe a API do JSON Server (banco de dados em db.json)

const path = require('path');
const express = require('express');
const jsonServer = require('json-server');

const app = express();

// Serve todos os arquivos estáticos (HTML, CSS, JS do cliente) da pasta "public"
app.use(express.static(path.join(__dirname, 'public')));

// Cria o roteador do JSON Server a partir do db.json
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();

// Toda a API de dados fica disponível em /api (ex: /api/pessoas)
app.use('/api', middlewares, router);

// Render define a porta via variável de ambiente PORT
const porta = process.env.PORT || 3000;

app.listen(porta, () => {
    console.log(`Servidor rodando em http://localhost:${porta}`);
});
