import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './components/Login';
import TestPage from './pages/Test';

const RoutesList = () => {
  return (
    <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/test" element={<TestPage />} />
    {/* Adicione outras rotas conforme necessário */}
    </Routes>
  );
};

export default RoutesList;
