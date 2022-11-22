import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Layout from './components/Layout';
import Home from './pages/Home';
import Voting from './pages/Voting';
import Breeds from './pages/Breeds';
import Upload from './pages/Upload';
import Likes from './pages/Likes';
import Favourites from './pages/Favourites';
import Dislikes from './pages/Dislikes';
import BreedDetails from './pages/BreedDetails';

function App() {
  const { darkTheme } = useSelector((state) => state);

  return (
    <div className={darkTheme ? 'dark' : ''}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/voting" element={<Voting />} />
          <Route path="/breeds" element={<Breeds />} />
          <Route path="/breeds/:id" element={<BreedDetails />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/likes" element={<Likes />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/dislikes" element={<Dislikes />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
