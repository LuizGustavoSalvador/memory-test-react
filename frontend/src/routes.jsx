import { Route, Routes } from 'react-router-dom';
import LoginPage from './components/Login';
import TestPage from './pages/Test';
import ResultPage from './pages/Result';

const RoutesList = () => {
  return (
    <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/tests" element={<TestPage />} />
        <Route path="/results" element={<ResultPage />} />
    {/* Adicione outras rotas conforme necessário */}
    </Routes>
  );
};

export default RoutesList;
