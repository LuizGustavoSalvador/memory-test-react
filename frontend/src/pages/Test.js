import React from 'react';

const TestPage = () => {
  return (
    <div className="test-component">
      <h1 className="title-page">Teste</h1>
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
          <button className="btn-default" id="sendButton" type="button">
            Criar teste
          </button>
        </div>
      </form>
      <div className="list-test-wrapper">
        <h2 className="page-subtitle">Lista de testes</h2>
        {/* Renderizar a lista de testes aqui */}
      </div>
    </div>
  );
};

export default TestPage;
