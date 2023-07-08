import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast, } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import http from '../../modules/http';

const TestPage = () => {
  const [tests, setTests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/');
    }

    const fetchTests = async () => {
      try {
        const response = await http.get('/tests');
        const data = response.data;
        setTests(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTests();
  }, [navigate]);

  const handleDeleteTest = async (testId) => {
    try {
      const response = await http.delete(`/tests/${testId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.status === 200) {
        const updatedTests = tests.filter((test) => test._id !== testId);
        setTests(updatedTests);
        toast.success('Teste removido');
      } else {
        toast.error('Ocorreu um erro ao remover o teste');
      }
    } catch (error) {
      toast.error('Ocorreu um erro ao remover o teste');
    }
  };

  const handleCreateTest = async (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const numQuestions = form.numQuestions.value;
    const maxOptions = form.maxOptions.value;

    try {
      const response = await http.post('/tests', {
        name,
        numQuestions,
        maxOptions
      });

      if (response.status === 201) {
        const createdTest = response.data;
        setTests([...tests, createdTest]);
        toast.success('Teste criado com sucesso');
        form.reset();
      } else {
        toast.error('Ocorreu um erro ao criar o teste');
      }
    } catch (error) {
      toast.error('Ocorreu um erro ao criar o teste');
    }
  };

  return (
    <div className="container test-component">
     <h1 className='page-title'>Teste</h1>
      <form id="testRegisterForm" className="form-default">
        <div>
          <label htmlFor="name">Nome:</label>
          <input className="form-control" type="text" id="name" name="name" placeholder="Nome" required />
        </div>
        <div>
          <label htmlFor="numQuestions">Quantidade de questões:</label>
          <input
            className="form-control"
            id="numQuestions"
            name="numQuestions"
            placeholder="Quantidade de questões"
            type="number"
            min="1"
            max="10"
            required
          />
        </div>
        <div>
          <label htmlFor="maxOptions">Quantidade máxima de alternativas por questão:</label>
          <input
            className="form-control"
            id="maxOptions"
            name="maxOptions"
            placeholder="Quantidade máxima de alternativas por questão"
            type="number"
            min="2"
            max="5"
            required
          />
        </div>
        <div className="button">
          <button className="btn-default" id="sendButton" type="button" onClick={handleCreateTest}>
            Criar teste
          </button>
        </div>
      </form>
      <div className="list-test-wrapper">
        <h2 className="page-subtitle">Lista de testes</h2>
        {tests.length === 0 ? (
          <h3 className="no-tests">Nenhum teste cadastrado</h3>
        ) : (
          tests.map((test) => (
            <div className="test" key={test._id}>
              <h3>{test.name}</h3>
              <p>
                Número de questões: {test.registeredQuestions}/{test.num_questions}
              </p>
              <p>Quantidade máxima de alternativas por questão: {test.max_options}</p>
              <div className="actions">
                {/* Adicionar links para as ações (adicionar pergunta e iniciar teste) */}
                <Link to={`/add-question/${test._id}`}>Adicionar Pergunta</Link>
                <Link to={`/start-test/${test._id}`}>Iniciar Teste</Link>
                <button onClick={() => handleDeleteTest(test._id)}>Excluir Teste</button>
              </div>
            </div>
          ))
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default TestPage;
