const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const modelsPath = path.join(__dirname, 'models');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://mongo:27017/myapp', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const modelFiles = fs.readdirSync(modelsPath);
    modelFiles.forEach((file) => {
      const modelPath = path.join(modelsPath, file);
      const model = require(modelPath);
      if (model.init) {
        model.init();
      }
    });

    console.log('Conectado no MongoDB');
  } catch (error) {
    console.error('Erro de conexão com o Mongo:', error);
  }
};

module.exports = connectDB;
