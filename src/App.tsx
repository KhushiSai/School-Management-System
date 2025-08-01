import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Login } from './components/Login';
import { StudentDashboard } from './components/student/StudentDashboard';
import { TeacherDashboard } from './components/teacher/TeacherDashboard';
import { AdminDashboard } from './components/admin/AdminDashboard';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return user ? <>{children}</> : <Navigate to="/login" />;
};

const AppRouter: React.FC = () => {
  const { user } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              {user?.role === 'student' && <StudentDashboard />}
              {user?.role === 'teacher' && <TeacherDashboard />}
              {user?.role === 'admin' && <AdminDashboard />}
              {!user && <Navigate to="/login" />}
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}

export default App;