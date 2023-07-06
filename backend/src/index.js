const express = require('express');
const cors = require("cors");
const connectDB = require('./src/db');

const user = require('./src/routes/user');

const PORT = 3333;
const HOST = '0.0.0.0';
const app = express();

app.use(cors());
app.use(user);

connectDB();

app.listen(PORT, HOST, () => {
  console.log(`Servidor rodando em ${HOST}:${PORT}`);
});