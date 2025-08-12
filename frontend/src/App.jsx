import { Routes, Route } from 'react-router-dom';
import { useThemeStore } from './store/theme.store';
import { useEffect } from 'react';

// Layouts and Pages
import MainLayout from './components/layouts/MainLayout';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import SubjectPage from './pages/SubjectPage';
import LessonPage from './pages/LessonPage';

function App() {
  const { theme } = useThemeStore();

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      
      {/* Routes with Main Layout (Navbar, Footer) */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route 
          path="/dashboard" 
          element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} 
        />
        <Route 
          path="/subjects/:subjectId" 
          element={<ProtectedRoute><SubjectPage /></ProtectedRoute>} 
        />
        <Route 
          path="/lessons/:lessonId" 
          element={<ProtectedRoute><LessonPage /></ProtectedRoute>} 
        />
      </Route>
    </Routes>
  );
}

export default App;