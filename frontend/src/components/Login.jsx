import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast, } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import http from '../../modules/http';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await http.post('/login', { email, password });
      const { token } = response.data;
      localStorage.setItem('token', token);

      toast.success('Bem-vindo(a)!');

      setTimeout(() => {
        navigate('/test');
      }, 1000);
    } catch (error) {
      toast.error("Aconteceu um erro interno, por favor tente mais tarde");
      console.error(error);
    }
  };

  return (
    <div className="container login-container">
      <h1 className='title-page'>Login</h1>
      <form className="form-default" onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            placeholder='E-mail'
            required
            onChange={handleEmailChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            placeholder='Senha'
            required
            onChange={handlePasswordChange}
          />
        </div>
        <button className='btn-default' type="submit">Login</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
