import { Route, Routes } from 'react-router';
import { Home } from './pages/home';
import { NotFound } from './pages/NotFound';
import { MainLayout } from './layouts/MainLayout';
import { Movie } from './pages/movie';

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/movie/:id" element={<Movie />} />
      </Route>
    </Routes>
  );
}

export default App;
