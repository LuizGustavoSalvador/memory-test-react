import { Route, Routes } from 'react-router-dom';
import LoginPage from './components/Login';
import TestPage from './pages/Test';
import ResultPage from './pages/Result';
import UserPage from './pages/User';

const RoutesList = () => {
  return (
    <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/results" element={<ResultPage />} />
        <Route path="/user" element={<UserPage />} />
    {/* Adicione outras rotas conforme necessário */}
    </Routes>
  );
};

export default RoutesList;
