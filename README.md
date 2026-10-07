# CRUD de Pessoas — Node.js + Express + JSON Server

Projeto de CRUD (Create, Read, Update, Delete) que demonstra os métodos do protocolo HTTP, com uma página HTML separada para cada operação.

## Estrutura do projeto

```
CRUD-CPF/
├── server.js              # Servidor Express: serve as páginas e a API (/api/pessoas)
├── db.json                # Banco de dados do JSON Server
├── package.json
└── public/
    ├── index.html          # Menu inicial
    ├── create.html         # Página POST
    ├── read.html           # Página GET
    ├── update.html         # Página PUT
    ├── delete.html         # Página DELETE
    ├── css/
    │   └── style.css       # CSS compartilhado por todas as páginas
    ├── post/
    │   └── create.js       # Lógica do POST
    ├── get/
    │   └── read.js         # Lógica do GET
    ├── put/
    │   └── update.js       # Lógica do PUT
    └── delete/
        └── delete.js       # Lógica do DELETE
```

Cada registro de pessoa possui os campos: `nome`, `sobrenome`, `email`, `idade`, `telefone`, `rua`, `bairro`, `cidade`, `estado`, `rg`.

## Rodando localmente

```bash
npm install
npm start
```

O servidor sobe em `http://localhost:3000`. A API fica disponível em `http://localhost:3000/api/pessoas`.

## Publicando no GitHub

```bash
git init
git add .
git commit -m "CRUD de pessoas com Node.js, Express e JSON Server"
git branch -M main
git remote add origin https://github.com/<seu-usuario>/<seu-repositorio>.git
git push -u origin main
```

## Deploy no Render

1. Acesse [render.com](https://render.com) e crie um **New Web Service**.
2. Conecte o repositório do GitHub criado acima.
3. Configure:
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
4. O Render define a porta automaticamente pela variável de ambiente `PORT`, já usada em `server.js`.
5. Clique em **Create Web Service** e aguarde o deploy. O site ficará disponível em uma URL pública (`https://<nome-do-servico>.onrender.com`).

> Observação: o `db.json` no plano gratuito do Render não é persistente entre deploys/reinícios (o disco é efêmero). Para persistência real em produção, considere o plano com disco persistente do Render ou migrar para um banco de dados externo.
