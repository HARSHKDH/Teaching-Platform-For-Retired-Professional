import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';

import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import StudentDashboard from './pages/StudentDashboard';
import MentorDashboard from './pages/MentorDashboard';
import MentorProfile from './pages/MentorProfile';
import AdminPanel from './pages/AdminPanel';
import PendingVerification from './pages/PendingVerification';
import SahayakPage from './pages/SahayakPage';
import LegacyProjectsPage from './pages/LegacyProjectsPage';
import ReverseMentorPage from './pages/ReverseMentorPage';

const ProtectedRoute = ({ children, requireRole }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="flex items-center justify-center h-screen"><div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" /></div>;
  if (!user) return <Navigate to="/login" replace />;
  if (requireRole && user.user_type !== requireRole) {
    if (user.user_type === 'mentor' && user.verification_status === 'pending') return <Navigate to="/pending-verification" replace />;
    return <Navigate to={`/${user.user_type}/dashboard`} replace />;
  }
  if (user.user_type === 'mentor' && user.verification_status === 'pending' && requireRole !== 'pending') {
    return <Navigate to="/pending-verification" replace />;
  }
  return children;
};

const AppRoutes = () => {
  const { user } = useAuth();
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={!user ? <LoginPage /> : <Navigate to={user.user_type === 'mentor' && user.verification_status === 'pending' ? '/pending-verification' : `/${user.user_type}/dashboard`} replace />} />
      <Route path="/signup" element={!user ? <SignupPage /> : <Navigate to="/login" replace />} />
      <Route path="/pending-verification" element={<PendingVerification />} />

      <Route path="/student/dashboard" element={
        <ProtectedRoute requireRole="student"><StudentDashboard /></ProtectedRoute>
      } />
      <Route path="/mentor/dashboard" element={
        <ProtectedRoute requireRole="mentor"><MentorDashboard /></ProtectedRoute>
      } />
      <Route path="/admin/dashboard" element={
        <ProtectedRoute requireRole="admin"><AdminPanel /></ProtectedRoute>
      } />
      <Route path="/mentor/:id" element={<ProtectedRoute><MentorProfile /></ProtectedRoute>} />
      <Route path="/sahayak" element={<ProtectedRoute requireRole="student"><SahayakPage /></ProtectedRoute>} />
      <Route path="/legacy-projects" element={<ProtectedRoute><LegacyProjectsPage /></ProtectedRoute>} />
      <Route path="/reverse-mentor" element={<ProtectedRoute><ReverseMentorPage /></ProtectedRoute>} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster
          position="top-right"
          toastOptions={{
            className: 'toast',
            duration: 4000,
          }}
        />
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
