const express = require('express');
const router = express.Router();

const Option = require('../models/option');
const Question = require('../models/question');
const Test = require('../models/test');

router.post('/questions', async (req, res) => {
  try {
    const { questions } = req.body;

    // Verifica se foi fornecido pelo menos uma pergunta
    if (!questions || questions.length === 0) {
      return res.status(400).json({ message: 'É necessário fornecer pelo menos uma pergunta.' });
    }

    // Verifica a quantidade máxima de questões permitida pelo teste
    const testId = questions[0].id_test; // Assume que todas as questões pertencem ao mesmo teste
    const test = await Test.findById(testId);
    if (!test) {
      return res.status(404).json({ message: 'Teste não encontrado.' });
    }

    // Verifica a quantidade máxima de questões permitida
    const maxQuestions = test.qtd_questions;
    if (questions.length > maxQuestions) {
      return res.status(400).json({ message: `O teste permite no máximo ${maxQuestions} questões.` });
    }

    const savedQuestions = [];

    for (const questionData of questions) {
      const { question, answer, id_test, options } = questionData;

      // Verifica se a quantidade de opções excede o max_options
      const maxOptions = test.max_options;
      if (options.length > maxOptions) {
        return res.status(400).json({ message: `A questão permite no máximo ${maxOptions} opções.` });
      }

      const newQuestion = new Question({
        question,
        answer,
        id_test
      });

      const savedQuestion = await newQuestion.save();

      const optionsToInsert = options.map(option => ({
        text: option.text,
        value: option.value,
        id_question: savedQuestion._id
      }));

      // Insere as opções no banco de dados
      const savedOptions = await Option.insertMany(optionsToInsert);

      // Adiciona as IDs das opções salvas à pergunta
      savedQuestion.options = savedOptions.map(option => option._id);
      await savedQuestion.save();

      savedQuestions.push(savedQuestion);
    }

    res.status(201).json(savedQuestions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao criar a(s) pergunta(s).' });
  }
});

router.put('/questions/:id', async (req, res) => {
  try {
    const { id } = req.params; // Obtém o ID da pergunta a ser editada
    const { question, answer, optionsToAdd, optionsToRemove } = req.body; // Obtém os dados atualizados da pergunta

    // Encontra a pergunta existente pelo ID
    const existingQuestion = await Question.findById(id);

    if (!existingQuestion) {
      return res.status(404).json({ message: 'Pergunta não encontrada.' });
    }

    // Atualiza os campos da pergunta existente
    existingQuestion.question = question;
    existingQuestion.answer = answer;

    // Remove as opções que foram marcadas para remoção
    if (optionsToRemove && optionsToRemove.length > 0) {
      await Option.deleteMany({ _id: { $in: optionsToRemove } });
      existingQuestion.options = existingQuestion.options.filter(option => !optionsToRemove.includes(option));
    }

    // Adiciona as novas opções
    if (optionsToAdd && optionsToAdd.length > 0) {
      const newOptions = optionsToAdd.map(option => ({
        text: option.text,
        value: option.value,
        id_question: id
      }));

      const savedOptions = await Option.insertMany(newOptions);
      existingQuestion.options.push(...savedOptions.map(option => option._id));
    }

    // Salva as alterações da pergunta no banco de dados
    const updatedQuestion = await existingQuestion.save();

    res.json(updatedQuestion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao editar a pergunta.' });
  }
});

router.delete('/questions/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const question = await Question.findById(id);

    if (!question) {
      return res.status(404).json({ message: 'Pergunta não encontrada.' });
    }

    // Remove as opções associadas à pergunta
    await Option.deleteMany({ id_question: id });

    // Remove a pergunta
    await Question.findByIdAndDelete(id);

    res.json({ message: 'Pergunta removida com sucesso.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao remover a pergunta.' });
  }
});

router.get('/questions', async (req, res) => {
  try {
    const questions = await Question.find().populate('options', 'text value');
    const tests = await Test.find();

    const questionData = questions.map(question => {
      const test = tests.find(test => test._id.toString() === question.id_test.toString());
      return {
        _id: question._id,
        question: question.question,
        options: question.options,
        max_options: test.max_options,
        qtd_questions: test.qtd_questions,
        testSlug: test.slug
      };
    });

    res.json(questionData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao listar as perguntas.' });
  }
});

module.exports = router;