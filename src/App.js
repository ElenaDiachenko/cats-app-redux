import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Layout from './components/Layout';
import Home from './pages/Home';
import Voting from './pages/Voting';
import Breeds from './pages/Breeds';

function App() {
  const { darkTheme } = useSelector((state) => state);

  return (
    <div className={darkTheme ? 'dark' : ''}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/voting" element={<Voting />} />
          <Route path="/breeds" element={<Breeds />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
