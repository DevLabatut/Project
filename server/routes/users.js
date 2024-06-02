const express = require('express');
const mysql = require('mysql');
const router = express.Router();
require('dotenv').config(); // Carrega as variáveis de ambiente do arquivo .env

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

db.connect(err => {
    if (err) {
        throw err;
    }
    console.log('Conectado ao banco de dados MySQL');
});

router.post('/create', (req, res) => {
    console.log('Dados recebidos:', req.body); // Log dos dados recebidos

    const { name, email, password, cep, address, neighborhood, state, complement, number, 'profile-type': profileType } = req.body;

    const query = 'INSERT INTO users (name, email, password, cep, address, neighborhood, state, complement, number, profile_type) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [name, email, password, cep, address, neighborhood, state, complement, number, profileType], (err, result) => {
        if (err) {
            console.error('Erro ao criar conta:', err); // Log de erro
            return res.status(500).send('Erro ao criar conta'); // Mensagem de erro
        }
        console.log('Conta criada com sucesso!'); // Log de sucesso
        res.status(200).send('Conta criada com sucesso!'); // Mensagem de sucesso
    });
});

// Nova rota para login
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
    db.query(query, [email, password], (err, results) => {
        if (err) {
            console.error('Erro ao fazer login:', err); // Log de erro
            return res.status(500).send('Erro ao fazer login'); // Mensagem de erro
        }
        if (results.length > 0) {
            const user = results[0];
            console.log('Login bem-sucedido'); // Log de sucesso
            res.status(200).json({ name: user.name, email: user.email }); // Retornar dados do usuário
        } else {
            console.log('Email ou senha incorretos'); // Log de erro
            res.status(401).send('Email ou senha incorretos'); // Mensagem de erro
        }
    });
});

// Nova rota para obter perfil do usuário
router.get('/profile', (req, res) => {
    const { email } = req.query;

    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], (err, results) => {
        if (err) {
            console.error('Erro ao obter perfil:', err); // Log de erro
            return res.status(500).send('Erro ao obter perfil'); // Mensagem de erro
        }
        if (results.length > 0) {
            const user = results[0];
            res.status(200).json(user); // Retornar dados do usuário
        } else {
            res.status(404).send('Usuário não encontrado'); // Mensagem de erro
        }
    });
});

// Nova rota para atualizar perfil do usuário
router.put('/profile', (req, res) => {
    const { email, name, cep, address, neighborhood, state, complement, number, password } = req.body;

    const query = 'UPDATE users SET name = ?, cep = ?, address = ?, neighborhood = ?, state = ?, complement = ?, number = ?, password = ? WHERE email = ?';
    db.query(query, [name, cep, address, neighborhood, state, complement, number, password, email], (err, result) => {
        if (err) {
            console.error('Erro ao atualizar perfil:', err); // Log de erro
            return res.status(500).send('Erro ao atualizar perfil'); // Mensagem de erro
        }
        res.status(200).send('Perfil atualizado com sucesso!'); // Mensagem de sucesso
    });
});

module.exports = router;
