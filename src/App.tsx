import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import LessonsPage from './pages/LessonsPage';
import NewLessonPage from './pages/NewLessonPage';
import BuilderPage from './pages/BuilderPage';
import QuestionsPage from './pages/QuestionsPage';
import WorksheetPage from './pages/WorksheetPage';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Navigate to="/curriculum" replace />} />
        <Route path="/curriculum" element={<LessonsPage />} />
        <Route path="/curriculum/new" element={<NewLessonPage />} />
        <Route path="/builder/:lessonId" element={<BuilderPage />} />
        <Route path="/questions" element={<QuestionsPage />} />
        <Route path="/worksheet/:presentationId" element={<WorksheetPage />} />
      </Route>
    </Routes>
  );
}