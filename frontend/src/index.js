import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles/styles.css';
import './styles/styles.less';
import './styles/default.css';

ReactDOM.createRoot(document.getElementById('root'));
  ReactDOM.render(
    <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
