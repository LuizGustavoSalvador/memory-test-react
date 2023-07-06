const express = require('express');
const cors = require("cors");
const connectDB = require('./db');

const user = require('./routes/user');
const test = require('./routes/test');

const PORT = 3333;
const HOST = '0.0.0.0';
const app = express();

app.use(cors());
app.use(user);
app.use(test);

connectDB().then(() => {
  app.listen(PORT, HOST, () => {
    console.log(`Servidor rodando em ${HOST}:${PORT}`);
  });
}).catch(error => {
  console.error('Erro ao conectar ao banco de dados:', error);
});

