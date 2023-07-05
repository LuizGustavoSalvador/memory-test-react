const mongoose = require('mongoose');

const resultDetailSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  id_result: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Result',
    required: true,
  },
  id_question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question',
    required: true,
  },
  id_option_selected: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Option',
    required: true,
  },
  status: {
    type: String,
    enum: ['C', 'E'],
    required: true,
  },
});

const ResultDetail = mongoose.model('ResultDetail', resultDetailSchema);

module.exports = ResultDetail;