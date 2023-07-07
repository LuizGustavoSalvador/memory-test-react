import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import http from '../../modules/http';

const QuestionPage = () => {
  const navigate = useNavigate();
  const { idteste } = useParams();
  const [questions, setQuestions] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await http.get(`/questions/${idteste}`);
        setQuestions(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchQuestions();
  }, [idteste]);

  const renderStep = () => {
    if (questions.length === 0) {
      return <p>Não há perguntas disponíveis.</p>;
    }

    const question = questions[currentStep];

    return (
      <div id={`step-${question._id}`} className="question-card">
        <h3 className="question">
          <span>{question.numQuestion})</span> {question.question}
        </h3>
        <input id={`question-${question._id}`} type="hidden" value={question.idQuestion} />
        <p>Alternativas:</p>
        <div className="options-list">
          {question.options.map((option) => (
            <div className="option" key={option._id}>
              <input
                className="radio"
                type="radio"
                name={`optionQuestion-${question._id}`}
                value={option.value}
                onChange={(e) => handleAnswerChange(question.idQuestion, e.target.value)}
              />
              <label htmlFor={`optionQuestion-${question._id}`}>{option.text}</label>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const handleNextStep = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prevStep) => prevStep - 1);
    }
  };

  const handleAnswerChange = (questionId, value) => {
    const updatedAnswers = [...answers];
    const existingAnswerIndex = updatedAnswers.findIndex((answer) => answer.id_question === questionId);

    if (existingAnswerIndex !== -1) {
      updatedAnswers[existingAnswerIndex].selectedOption = value;
    } else {
      updatedAnswers.push({
        id_question: questionId,
        selectedOption: value,
      });
    }

    setAnswers(updatedAnswers);
  };

  const handleSubmit = async () => {
    try {
      const response = await http.post('/attempt', {
        testId: idteste,
        userId: 'your_user_id', // Substitua pelo ID do usuário logado
        answers,
      });

      toast.success('Teste realizado com sucesso!');

      setTimeout(() => {
        navigate(`/results/${response.data._id}/details`);
      }, 2000);
    } catch (error) {
      toast.error('Ocorreu um erro ao tentar realizar o teste');

      console.error(error);
    }
  };

  return (
    <div className="container perform-test-component">
      <h1 className='page-title'>Teste: {idteste}</h1>
      <form method="POST" id="performTestForm" className="form-default">
        <input type="hidden" id="testId" name="test_id" value={idteste} />
        {renderStep()}
        <div className="button">
          <button id="prevQuestion" className="btn-default" type="button" onClick={handlePrevStep}>
            Anterior
          </button>
          {currentStep < questions.length - 1 && (
            <button id="nextQuestion" className="btn-default" type="button" onClick={handleNextStep}>
              Próxima
            </button>
          )}
          {currentStep === questions.length - 1 && (
            <button id="sendButton" className="btn-default" type="button" onClick={handleSubmit}>
              Finalizar teste
            </button>
          )}
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default QuestionPage;
