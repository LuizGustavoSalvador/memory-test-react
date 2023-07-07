const express = require('express');
const cors = require("cors");
const connectDB = require('./db');
const bodyParser = require('body-parser')

const user = require('./routes/user');
const test = require('./routes/test');
const question = require('./routes/question');
const result = require('./routes/result');

const PORT = 3333;
const HOST = '0.0.0.0';
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());
app.use(user);
app.use(test);
app.use(question);
app.use(result);
app.use(express.static('frontend'));

connectDB();

  app.listen(PORT, HOST, () => {
    console.log(`Servidor rodando em ${HOST}:${PORT}`);
  });

