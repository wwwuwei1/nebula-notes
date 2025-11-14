import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { PostsPage } from './pages/PostsPage';
import { PostDetailPage } from './pages/PostDetailPage';
import { StudioPage } from './pages/StudioPage';
import { AboutPage } from './pages/AboutPage';

const App = () => (
  <Layout>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/posts" element={<PostsPage />} />
      <Route path="/posts/:slug" element={<PostDetailPage />} />
      <Route path="/studio" element={<StudioPage />} />
      <Route path="/about" element={<AboutPage />} />
    </Routes>
  </Layout>
);

export default App;

