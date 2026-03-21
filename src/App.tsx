import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import LessonsPage from './pages/LessonsPage';
import NewLessonPage from './pages/NewLessonPage';
import BuilderPage from './pages/BuilderPage';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Navigate to="/lessons" replace />} />
        <Route path="/lessons" element={<LessonsPage />} />
        <Route path="/lessons/new" element={<NewLessonPage />} />
        <Route path="/builder/:lessonId" element={<BuilderPage />} />
      </Route>
    </Routes>
  );
}