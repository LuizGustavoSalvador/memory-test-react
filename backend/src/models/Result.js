const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  id_test: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Test',
    required: true,
  },
  answered_questions: {
    type: Number,
    required: true,
  },
  total_questions: {
    type: Number,
    required: true,
  },
  amount_hits: {
    type: Number,
    required: true,
  },
  amount_errors: {
    type: Number,
    required: true,
  },
});

const Result = mongoose.model('Result', resultSchema);

module.exports = Result;