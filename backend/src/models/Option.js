const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
  id_question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question',
    required: true,
  },
});

const Option = mongoose.model('Option', optionSchema);

module.exports = Option;