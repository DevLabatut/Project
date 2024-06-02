const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Adicionar o pacote cors
const path = require('path');
const usersRouter = require('./routes/users');

const app = express();
const port = 3000;

app.use(cors()); // Habilitar CORS para todas as rotas
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, '../')));

app.use('/users', usersRouter);

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
