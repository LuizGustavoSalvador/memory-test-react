import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import http from '../../modules/http';

const UpdateUser = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [userId, setUserId] = useState(''); // Definindo a variável userId
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await http.get(`user`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const { name, email, _id } = response.data;

        setName(name);
        setEmail(email);
        setUserId(_id);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, []);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleRepeatPasswordChange = (e) => {
    setRepeatPassword(e.target.value);
  };

  const handleUser = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      await http.put(`/users/${userId}`, {
        name,
        email,
        newPassword,
        repeatPassword,
      }, {
        headers: { Authorization: `Bearer ${token}` },
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
      <h1 className='page-title'>Editar Usuário</h1>
      <form className="form-default" onSubmit={handleUser}>
        <div>
          <label htmlFor="name">Nome:</label>
          <input
            type="text"
            id="name"
            value={name}
            placeholder='Nome'
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
            placeholder='Email'
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
            placeholder='Nova senha'
            onChange={handleNewPasswordChange}
          />
        </div>
        <div>
          <label htmlFor="repeatPassword">Repetir Senha:</label>
          <input
            type="password"
            id="repeatPassword"
            value={repeatPassword}
            placeholder='Repetir senha'
            onChange={handleRepeatPasswordChange}
          />
        </div>
        <button className='btn-default' type="submit">Salvar Alterações</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default UpdateUser;
