const express = require('express');
const router = express.Router();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

router.use(cors());

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Email inválido' });
    }

    const isPasswordValid = await user.checkPassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Senha incorreta' });
    }

    const payload = {
      email: user.email,
      role: 'user',
    };

    const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1h' });

    user.token = token;
    await user.save();

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ocorreu um erro interno, tente mais tarde.' });
  }
});

router.post('/logout', async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    user.token = undefined;
    await user.save();

    res.json({ message: 'Logout realizado com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ocorreu um erro interno, tente mais tarde.' });
  }
});

router.post('/users', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Verifica se o email já está em uso
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'O email fornecido já está em uso.' });
    }

    // Verifica se a senha possui no mínimo 4 caracteres
    if (password.length < 4) {
      return res.status(400).json({ message: 'A senha deve conter no mínimo 4 caracteres.' });
    }

    // Criptografa a senha em base64
    const encryptedPassword = await bcrypt.hash(password, 10);

    // Cria um novo objeto de usuário
    const newUser = new User({
      name,
      email,
      password: encryptedPassword
    });

    // Salva o usuário no banco de dados
    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao criar o usuário.' });
  }
});

router.put('/users/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { name, email, newPassword, repeatPassword } = req.body;

    // Verifica se o usuário existe
    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    // Atualiza o nome e email do usuário
    existingUser.name = name;
    existingUser.email = email;

    // Verifica se a nova senha foi informada
    if (newPassword) {
      // Verifica se a nova senha é igual à antiga senha
      if (newPassword === existingUser.password) {
        return res.status(400).json({ message: 'A nova senha não pode ser igual à senha atual.' });
      }

      // Verifica se a nova senha possui no mínimo 4 caracteres
      if (newPassword.length < 4) {
        return res.status(400).json({ message: 'A nova senha deve conter no mínimo 4 caracteres.' });
      }

      // Verifica se a nova senha e a repetição da senha são iguais
      if (newPassword !== repeatPassword) {
        return res.status(400).json({ message: 'A nova senha e a repetição da senha não coincidem.' });
      }

      // Criptografa a nova senha em base64
      const encryptedPassword = await bcrypt.hash(newPassword, 10);
      existingUser.password = encryptedPassword;
    }

    // Salva as alterações no usuário
    const updatedUser = await existingUser.save();

    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao editar o usuário.' });
  }
});


module.exports = router;