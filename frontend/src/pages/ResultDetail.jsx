// ResultDetailPage.js
import { useEffect, useState } from 'react';
import axios from 'axios';

const ResultDetailPage = ({ match }) => {
  const { idResult, idDetail } = match.params;
  const [resultDetails, setResultDetails] = useState({});
  const [testName, setTestName] = useState('');

  useEffect(() => {
    const fetchResultDetails = async () => {
      try {
        const response = await http.get(`/results/${idResult}/details/${idDetail}`);
        const data = response.data;
        setResultDetails(data);
        setTestName(data.test);
      } catch (error) {
        console.error(error);
      }
    };

    fetchResultDetails();
  }, [idResult, idDetail]);

  return (
    <div className="container result-details-component">
      <h1 className='page-title'>Detalhes do teste: {testName}</h1>

      <div className="details">
        <div className="details-header">
          <h4>Questões respondidas: {resultDetails.answered_questions}/{resultDetails.total_questions}</h4>
          <h4>Quantidade de acertos: {resultDetails.amount_hits}</h4>
          <h4>Quantidade de erros: {resultDetails.amount_errors}</h4>
        </div>
        <div className="questions-details">
          <h3>Questões:</h3>
          <div className="list-questions">
            {resultDetails.questionResults && resultDetails.questionResults.length > 0 ? (
              resultDetails.questionResults.map((questionResult) => (
                <div key={questionResult._id}>
                  <h5>{questionResult.question}</h5>
                  <p>Resposta selecionada: {questionResult.selectedOption}</p>
                  <p>Status: {questionResult.status}</p>
                </div>
              ))
            ) : (
              <p>Nenhum detalhe encontrado</p>
            )}
          </div>
        </div>
      </div>
      <a className="btn-default" href="/result">Voltar</a>
    </div>
  );
};

export default ResultDetailPage;
