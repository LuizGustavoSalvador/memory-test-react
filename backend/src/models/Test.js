const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  num_questions: {
    type: Number,
    required: true,
  },
  max_options: {
    type: Number,
    required: true,
  },
  id_user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Test = mongoose.model('Test', testSchema);

Test.createCollection().then(() => {
  console.log('model criado');
});

module.exports = Test;