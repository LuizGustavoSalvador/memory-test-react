const express = require('express');
const router = express.Router();

const Result = require('../models/result');
const ResultDetail = require('../models/resultDetail');

router.get('/results', async (req, res) => {
  try {
    const results = await Result.find();
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao listar os resultados.' });
  }
});

router.get('/results/:resultId/details', async (req, res) => {
  try {
    const { resultId } = req.params;

    const details = await ResultDetail.find({ id_result: resultId });
    res.json(details);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao listar os detalhes do resultado.' });
  }
});

// Rota para salvar uma tentativa de teste
router.post('/attempt', async (req, res) => {
  try {
    const { testId, userId, answers } = req.body;

    // Cria um novo objeto de resultado
    const newResult = new Result({
      id_test: testId,
      id_user: userId,
      answered_questions: answers.length,
      total_questions: 0,
      amount_hits: 0,
      amount_errors: 0
    });

    // Salva o resultado no banco de dados
    const savedResult = await newResult.save();

    // Calcula a quantidade total de questões
    const totalQuestions = answers.length;

    // Inicializa a quantidade de acertos
    let amountHits = 0;

    // Salva os detalhes do resultado para cada resposta
    const resultDetails = answers.map(answer => {
      const { questionId, optionId } = answer;
      const isCorrect = true; // Adicione a lógica para verificar se a resposta está correta ou não

      if (isCorrect) {
        amountHits++;
      }

      return new ResultDetail({
        id_result: savedResult._id,
        id_question: questionId,
        id_option_selected: optionId,
        status: isCorrect ? 'C' : 'E'
      });
    });

    // Salva os detalhes do resultado no banco de dados
    await ResultDetail.insertMany(resultDetails);

    // Atualiza os campos de quantidade total de questões e quantidade de acertos no resultado
    savedResult.total_questions = totalQuestions;
    savedResult.amount_hits = amountHits;
    savedResult.amount_errors = totalQuestions - amountHits;
    await savedResult.save();

    res.status(201).json(savedResult);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao salvar a tentativa de teste.' });
  }
});

module.exports = router;
