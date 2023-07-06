import React, { useState } from 'react';
import axios from 'axios';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      //const response = await axios.post('/api/login', { email, password });
     // const { token } = response.data;
      // Armazene o token no localStorage ou em outro local de sua preferência
      // ...
      console.log('Login successful');
      // Redirecionar ou executar outras ações após o login
      // ...
    } catch (error) {
      console.error(error);
      // Tratar erros de login
      // ...
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form class="form" onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
