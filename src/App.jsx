import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Careers from './pages/Careers.jsx';
import Blog from './pages/Blog.jsx';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="careers" element={<Careers />} />
        <Route path="blog" element={<Blog />} />
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  );
}
