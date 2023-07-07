import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const User = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/api/user');
        const { name, email } = response.data;

        setName(name);
        setEmail(email);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, []);

  const handleNameChange = e => {
    setName(e.target.value);
  };

  const handleEmailChange = e => {
    setEmail(e.target.value);
  };

  const handleNewPasswordChange = e => {
    setNewPassword(e.target.value);
  };

  const handleRepeatPasswordChange = e => {
    setRepeatPassword(e.target.value);
  };

  const handleUser = async e => {
    e.preventDefault();

    try {
      const response = await axios.put(`/api/users/${userId}`, {
        name,
        email,
        newPassword,
        repeatPassword
      });

      toast.success('Usuário atualizado com sucesso!');
      navigate('/profile');
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Erro ao atualizar o usuário.');
      }
      console.error(error);
    }
  };

  return (
    <div className="edit-user-container">
      <h2>Editar Usuário</h2>
      <form className="form" onSubmit={handleUser}>
        <div>
          <label htmlFor="name">Nome:</label>
          <input
            type="text"
            id="name"
            value={name}
            required
            onChange={handleNameChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            required
            onChange={handleEmailChange}
          />
        </div>
        <div>
          <label htmlFor="newPassword">Nova Senha:</label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={handleNewPasswordChange}
          />
        </div>
        <div>
          <label htmlFor="repeatPassword">Repetir Senha:</label>
          <input
            type="password"
            id="repeatPassword"
            value={repeatPassword}
            onChange={handleRepeatPasswordChange}
          />
        </div>
        <button type="submit">Salvar Alterações</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default User;
