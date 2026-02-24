import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff, Stethoscope } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('patient');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  // Form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    const success = await login(email, password, activeTab as 'patient' | 'doctor');
    setIsLoading(false);

    if (success) {
      onClose();
      navigate(activeTab === 'doctor' ? '/doctor/dashboard' : '/patient/dashboard');
    }
  };

  const handleClose = () => {
    onClose();
    setEmail('');
    setPassword('');
    setActiveTab('patient');
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md p-0 overflow-hidden">
        <div className="relative">
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: 'url(/images/login_body.jpeg)' }}
          >
            <div className="absolute inset-0 bg-green-900/60 backdrop-blur-sm" />
          </div>

          {/* Content */}
          <div className="relative p-6">
            <DialogHeader className="text-center mb-6">
              <div className="mx-auto w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4">
                <img
                  src="/images/logo.jpg"
                  alt="AyurWell"
                  className="w-12 h-12 rounded-full"
                />
              </div>
              <DialogTitle className="text-white text-2xl">
                Welcome to AyurWell
              </DialogTitle>
              <p className="text-green-100 text-sm">
                Choose your account type
              </p>
            </DialogHeader>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-white/20">
                <TabsTrigger 
                  value="patient" 
                  className="data-[state=active]:bg-white data-[state=active]:text-green-800 text-white"
                >
                  <User className="w-4 h-4 mr-2" />
                  Patient
                </TabsTrigger>
                <TabsTrigger 
                  value="doctor"
                  className="data-[state=active]:bg-white data-[state=active]:text-green-800 text-white"
                >
                  <Stethoscope className="w-4 h-4 mr-2" />
                  Doctor
                </TabsTrigger>
              </TabsList>

              <TabsContent value="patient" className="mt-4">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 bg-white/90 border-0"
                    />
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10 bg-white/90 border-0"
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
                    {isLoading ? 'Signing in...' : 'Sign In as Patient'}
                  </Button>
                </form>
                <p className="text-center text-white/80 text-sm mt-4">
                  New patient?{' '}
                  <button
                    onClick={() => navigate('/signup')}
                    className="text-white font-semibold hover:underline"
                  >
                    Create account
                  </button>
                </p>
              </TabsContent>

              <TabsContent value="doctor" className="mt-4">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      type="email"
                      placeholder="Doctor Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 bg-white/90 border-0"
                    />
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10 bg-white/90 border-0"
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
                    className="w-full bg-amber-600 hover:bg-amber-700 text-white"
                  >
                    {isLoading ? 'Signing in...' : 'Sign In as Doctor'}
                  </Button>
                </form>
                <p className="text-center text-white/80 text-sm mt-4">
                  New doctor?{' '}
                  <button
                    onClick={() => navigate('/signup')}
                    className="text-white font-semibold hover:underline"
                  >
                    Apply to join
                  </button>
                </p>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
