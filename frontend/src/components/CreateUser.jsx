import { useState } from 'react';
import http from '../../modules/http';

const CreateUser = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await http.post('/user', { name, email, password });
      console.log('User created:', response.data);
      // Aqui você pode redirecionar o usuário para outra página, exibir uma mensagem de sucesso, etc.
    } catch (error) {
      console.error('Error creating user:', error.response.data);
      setError('Erro ao criar o usuário. Verifique os dados e tente novamente.');
    }
  };

  return (
    <div>
      <h1 className='page-title'>Criar Usuário</h1>
      <form className='form-default' onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nome:</label>
          <input 
            type="text" 
            id="name" 
            value={name} 
            placeholder='Nome'
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
            onChange={handleEmailChange} 
          />
        </div>
        <div>
          <label htmlFor="password">Senha:</label>
          <input 
            type="password" 
            id="password" 
            value={password} 
            placeholder='Senha'
            onChange={handlePasswordChange} 
          />
        </div>
        <button className='btn-default' type="submit">Criar</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default CreateUser;
