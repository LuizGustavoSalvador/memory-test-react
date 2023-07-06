import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="main-header">
    <div className="header-grid">
      <img src="/public/images/logo-memory-test.png" alt="Logo teste de memória" />
      <div className="menu-wrapper">
        <ul className="menu-principal" role="navigation">
          <li className="menu-item user-link">
            <Link to="/user" className="link-menu">
              Cadastrar Usuário
            </Link>
          </li>
          <li className="menu-item">
            <Link to="/test" className="link-menu">
              Testes
            </Link>
          </li>
          <li className="menu-item">
            <Link to="/result" className="link-menu">
              Resultados
            </Link>
          </li>
        </ul>
      </div>
    </div>
  </header>
  );
};

export default Header;
