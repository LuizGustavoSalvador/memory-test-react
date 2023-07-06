const express = require('express');
const router = express.Router();

const Option = require('../models/option');
const Question = require('../models/question');
const Result = require('../models/result');
const ResultDetail = require('../models/resultDetail');
const Test = require('../models/test');
const User = require('../models/user');

router.get('/tests', async (req, res) => {
  try {
    const tests = await Test.find().populate('created_by', 'name');

    const testsWithUserNames = await Promise.all(
      tests.map(async test => {
        const createdBy = await User.findById(test.created_by);
        return {
          _id: test._id,
          name: test.name,
          createdBy: createdBy.name
        };
      })
    );

    res.json(testsWithUserNames);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao listar os testes.' });
  }
});

router.post('/tests', async (req, res) => {
  try {
    const userId = req.user.id;

    const { name, slug, num_questions, max_options } = req.body;

    const newTest = new Test({
      id_usuario: userId,
      name,
      slug,
      num_questions,
      max_options
    });

    const savedTest = await newTest.save();

    res.status(201).json(savedTest);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao criar o teste.' });
  }
});

router.put('/tests/:id', async (req, res) => {
  try {
    const userId = req.user.id;

    const { id } = req.params;
    const { name, slug, num_questions, max_options } = req.body;

    const test = await Test.findOneAndUpdate(
      { _id: id, id_usuario: userId },
      { name, slug, num_questions, max_options },
      { new: true }
    );

    if (!test) {
      return res.status(404).json({ message: 'Teste não encontrado.' });
    }

    res.json(test);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao alterar o teste.' });
  }
});

router.delete('/tests/:id', async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    // Deleta o teste e todos os documentos relacionados
    const deletedTest = await Test.findOneAndDelete({ _id: id, id_usuario: userId });

    if (!deletedTest) {
      return res.status(404).json({ message: 'Teste não encontrado.' });
    }

    // Deleta todas as questões do teste
    await Question.deleteMany({ id_test: id });

    // Deleta todas as opções das questões do teste
    await Option.deleteMany({ id_question: { $in: deletedTest.questions } });

    // Deleta todos os resultados do teste
    await Result.deleteMany({ id_test: id });

    // Deleta todos os detalhes de resultado do teste
    await ResultDetail.deleteMany({ id_result: { $in: deletedTest.results } });

    res.json({ message: 'Teste deletado com sucesso.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao deletar o teste.' });
  }
});

module.exports = router;