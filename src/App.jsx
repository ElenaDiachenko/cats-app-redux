import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { lazy } from 'react';
import Layout from './components/Layout';
const Home = lazy(() => import('./pages/Home'));
const Voting = lazy(() => import('./pages/Voting'));
const Breeds = lazy(() => import('./pages/Breeds'));
const Upload = lazy(() => import('./pages/Upload'));
const Likes = lazy(() => import('./pages/Likes'));
const Favourites = lazy(() => import('./pages/Favourites'));
const Dislikes = lazy(() => import('./pages/Dislikes'));
const BreedDetails = lazy(() => import('./pages/BreedDetails'));

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
