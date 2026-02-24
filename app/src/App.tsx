import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/context/ThemeContext';
import { CartProvider } from '@/context/CartContext';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { QuizProvider } from '@/context/QuizContext';
import { AppointmentProvider } from '@/context/AppointmentContext';

// Pages
import LandingPage from '@/pages/LandingPage';
import LoginPage from '@/pages/LoginPage';
import SignupPage from '@/pages/SignupPage';
import PatientDashboard from '@/pages/PatientDashboard';
import DoctorDashboard from '@/pages/DoctorDashboard';

import './App.css';

// Protected route component
function ProtectedRoute({ children, allowedRole }: { children: React.ReactNode; allowedRole?: 'patient' | 'doctor' }) {
  const { user, isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (allowedRole && user?.role !== allowedRole) {
    return <Navigate to={user?.role === 'doctor' ? '/doctor/dashboard' : '/patient/dashboard'} replace />;
  }
  
  return <>{children}</>;
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <QuizProvider>
            <AppointmentProvider>
              <Router>
                <Toaster position="top-center" richColors />
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/signup" element={<SignupPage />} />
                  
                  {/* Patient Routes */}
                  <Route 
                    path="/patient/dashboard" 
                    element={
                      <ProtectedRoute allowedRole="patient">
                        <PatientDashboard />
                      </ProtectedRoute>
                    } 
                  />
                  
                  {/* Doctor Routes */}
                  <Route 
                    path="/doctor/dashboard" 
                    element={
                      <ProtectedRoute allowedRole="doctor">
                        <DoctorDashboard />
                      </ProtectedRoute>
                    } 
                  />
                  
                  {/* Fallback */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </Router>
            </AppointmentProvider>
          </QuizProvider>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
