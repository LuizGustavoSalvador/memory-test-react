const express = require('express');
const router = express.Router();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

router.use(cors());

// Rota de login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Busca o usuário pelo email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Email inválido' });
    }

    const isPasswordValid = await user.checkPassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Senha incorreta' });
    }

    // Cria o payload do token com os dados do usuário
    const payload = {
      email: user.email,
      role: 'user',
    };

    // Gera o token de acesso com a chave secreta
    const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1h' });

    // Retorna o token de acesso para o cliente
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ocorreu um erro interno, tente mais tarde.' });
  }
});

// Rota de registro
router.post('/register', (req, res) => {
  // Lógica de registro de usuário
  // ...

  // Retorna a resposta para o cliente
  res.json({ message: 'User registered successfully' });
});

module.exports = router;