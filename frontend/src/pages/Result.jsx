import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ResultPage = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get('/results');
        const data = response.data;
        setResults(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchResults();
  }, []);

  return (
    <div className="result-list-component">
      <h1 className="page-title">Lista de resultados</h1>
      <div className="list">
        {results.length === 0 ? (
            <h3 className="no-tests">Nenhum teste cadastrado</h3>
          ) : (
            results.map((result) => (
          <div className="test" key={result._id}>
            <h3>{result.name}</h3>
            <p>
              Número de questões: {result.registeredQuestions}/{result.numQuestions}
            </p>
            <p>Quantidade máxima de alternativas por questão: {result.maxOptions}</p>
            <div className="actions">
              <Link to={`/results/${result._id}/details/${result.details._id}`}>Detalhes</Link>
            </div>
          </div>
        ))
        )}
      </div>
    </div>
  );
};

export default ResultPage;
