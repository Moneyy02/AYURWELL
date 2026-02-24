import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, User, Stethoscope, ArrowLeft, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { toast } from 'sonner';
import type { UserRole } from '@/types';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();
  const { toggleTheme, isDark } = useTheme();
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  
  // Form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole) {
      toast.error('Please select your role');
      return;
    }
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    const success = await login(email, password, selectedRole);
    if (success) {
      navigate(selectedRole === 'doctor' ? '/doctor/dashboard' : '/patient/dashboard');
    }
  };

  const handleDemoLogin = async (role: UserRole) => {
    const demoEmail = role === 'doctor' ? 'anjali.sharma@ayurwell.com' : 'patient@demo.com';
    const success = await login(demoEmail, 'password', role);
    if (success) {
      navigate(role === 'doctor' ? '/doctor/dashboard' : '/patient/dashboard');
    }
  };

  if (!selectedRole) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
        <div className="absolute top-4 right-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-md"
          >
            {isDark ? <Sun className="w-5 h-5 text-amber-500" /> : <Moon className="w-5 h-5 text-gray-600" />}
          </button>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full"
        >
          <div className="text-center mb-8">
            <img src="/images/logo.jpg" alt="AyurWell" className="w-20 h-20 rounded-full mx-auto mb-4 shadow-lg" />
            <h1 className="text-3xl font-bold text-green-900 dark:text-green-100">Welcome Back</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Choose your account type to continue</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedRole('patient')}
              className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all border-2 border-transparent hover:border-green-500"
            >
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">I'm a Patient</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Book appointments & shop</p>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedRole('doctor')}
              className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all border-2 border-transparent hover:border-green-500"
            >
              <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <Stethoscope className="w-8 h-8 text-amber-600 dark:text-amber-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">I'm a Doctor</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage appointments</p>
            </motion.button>
          </div>

          <p className="text-center mt-6 text-gray-600 dark:text-gray-400">
            Don't have an account?{' '}
            <button onClick={() => navigate('/signup')} className="text-green-600 dark:text-green-400 font-semibold hover:underline">
              Sign up
            </button>
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="absolute top-4 right-4">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-md"
        >
          {isDark ? <Sun className="w-5 h-5 text-amber-500" /> : <Moon className="w-5 h-5 text-gray-600" />}
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
      >
        <div className="relative">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: 'url(/images/login_body.jpeg)' }}
          >
            <div className="absolute inset-0 bg-green-900/70 backdrop-blur-sm" />
          </div>
          
          <div className="relative p-6">
            <button
              onClick={() => setSelectedRole(null)}
              className="absolute top-4 left-4 text-white/80 hover:text-white"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            
            <div className="text-center">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                selectedRole === 'doctor' ? 'bg-amber-500' : 'bg-green-500'
              }`}>
                {selectedRole === 'doctor' ? (
                  <Stethoscope className="w-8 h-8 text-white" />
                ) : (
                  <User className="w-8 h-8 text-white" />
                )}
              </div>
              <h2 className="text-2xl font-bold text-white">
                {selectedRole === 'doctor' ? 'Doctor Login' : 'Patient Login'}
              </h2>
              <p className="text-green-100 text-sm mt-1">
                Sign in to access your account
              </p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 pr-10 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-green-600 hover:bg-green-700 text-white"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <div className="mt-4">
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-3">Or try demo account</p>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleDemoLogin(selectedRole)}
              className="w-full dark:border-gray-600 dark:text-gray-300"
            >
              {selectedRole === 'doctor' ? 'Demo Doctor Account' : 'Demo Patient Account'}
            </Button>
          </div>

          <p className="text-center mt-4 text-sm text-gray-600 dark:text-gray-400">
            Don't have an account?{' '}
            <button onClick={() => navigate('/signup')} className="text-green-600 dark:text-green-400 font-semibold hover:underline">
              Sign up
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
