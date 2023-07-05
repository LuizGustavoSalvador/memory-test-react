const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://mongo:27017/myapp', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conectado no MongoDB');
  } catch (error) {
    console.error('Erro de conexão com o Mongo:', error);
  }
};

module.exports = connectDB;