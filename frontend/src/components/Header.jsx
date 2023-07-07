import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast, } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import http from '../../modules/http';

const Header = () => {
  const navigate = useNavigate();
  const [showSubMenu, setShowSubMenu] = useState(false);

  const handleLogout = () => {
    http.post('/logout', {}, { withCredentials: true })
      .then(response => {
        if (response.status === 200) {
          toast.success('Até logo!');

          navigate('/login');
        } else {
          toast.success('Erro ao fazer logout');
        }
      })
      .catch(error => {
        // Tratar erro de conexão ou erro de logout
        console.error(error);
      });
  }
  const isLoggedIn = localStorage.getItem('token');

  const toggleSubMenu = () => {
    setShowSubMenu(!showSubMenu);
  };

  return (
    <header className="main-header">
      <div className="header-grid">
        <img src="/images/logo-memory-test.png" alt="Logo teste de memória" />
        <div className="menu-wrapper">
          <ul className="menu-principal" role="navigation">
            <li className="menu-item">
              <Link to="/tests" className="link-menu">
                Testes
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/results" className="link-menu">
                Resultados
              </Link>
            </li>
            {!isLoggedIn && (
              <li className="menu-item user-link">
                <Link to="/user" className="link-menu">
                  Cadastrar Usuário
                </Link>
              </li>
            )}
            {isLoggedIn && (
              <li className="menu-item" onClick={toggleSubMenu}>
                <span className="link-menu">Configurações</span>
                {showSubMenu && (
                  <ul className="submenu">
                    <li className="submenu-item">
                      <Link to="/user" className="link-menu">
                        Editar Usuário
                      </Link>
                    </li>
                    <li className="submenu-item">
                      <button className="link-menu" onClick={handleLogout}>
                        Logout
                      </button>
                    </li>
                  </ul>
                )}
              </li>
            )}
          </ul>
        </div>
      </div>
      <ToastContainer />
    </header>
  );
};

export default Header;
