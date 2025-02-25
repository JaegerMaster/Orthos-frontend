import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';

// Layouts
import MainLayout from './components/layouts/MainLayout';
import DashboardLayout from './components/layouts/DashboardLayout';

// Public pages
import LandingPage from './components/public/LandingPage';
import AboutProject from './components/public/AboutProject';
import Features from './components/public/Features';

// Auth pages
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ForgotPassword from './components/auth/ForgotPassword';

// User pages
import UserDashboard from './components/dashboard/UserDashboard';
import PredictionForm from './components/predictions/PredictionForm';
import PredictionHistory from './components/predictions/PredictionHistory';
import UserProfile from './components/user/UserProfile';

// Admin pages
import AdminDashboard from './components/dashboard/AdminDashboard';
import TrainingDataManagement from './components/admin/TrainingDataManagement';
import ModelManagement from './components/admin/ModelManagement';
import UserManagement from './components/admin/UserManagement';
import DataUpload from './components/admin/DataUpload';

// Protected route wrapper
const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { isAuthenticated, isAdmin, loading } = useAuth();

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (requireAdmin && !isAdmin) {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes with MainLayout */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<LandingPage />} />
        <Route path="about" element={<AboutProject />} />
        <Route path="features" element={<Features />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
      </Route>

      {/* User dashboard routes */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      }>
        <Route index element={<UserDashboard />} />
        <Route path="predict" element={<PredictionForm />} />
        <Route path="history" element={<PredictionHistory />} />
        <Route path="profile" element={<UserProfile />} />
      </Route>

      {/* Admin routes */}
      <Route path="/admin" element={
        <ProtectedRoute requireAdmin={true}>
          <DashboardLayout isAdmin={true} />
        </ProtectedRoute>
      }>
        <Route index element={<AdminDashboard />} />
        <Route path="training-data" element={<TrainingDataManagement />} />
        <Route path="models" element={<ModelManagement />} />
        <Route path="users" element={<UserManagement />} />
        <Route path="upload" element={<DataUpload />} />
      </Route>

      {/* Catch-all route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
