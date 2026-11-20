import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Destinations from './pages/Destinations';
import Packages from './pages/Packages';
import Favorites from './pages/Favorites';
import Inquiry from './pages/Inquiry';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/inquiry" element={<Inquiry />} />
      </Route>
    </Routes>
  );
}
