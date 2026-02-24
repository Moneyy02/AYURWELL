import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, Lock, Eye, EyeOff, User, Stethoscope, ArrowLeft, 
  Moon, Sun, GraduationCap, Briefcase, DollarSign, FileText,
  ChevronRight, Check
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { toast } from 'sonner';
import type { UserRole } from '@/types';

export default function SignupPage() {
  const navigate = useNavigate();
  const { signupPatient, signupDoctor, isLoading } = useAuth();
  const { toggleTheme, isDark } = useTheme();
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1);
  
  // Common form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  
  // Patient specific
  const [age, setAge] = useState('');
  const [gender, setGender] = useState<'male' | 'female' | 'other'>('male');
  
  // Doctor specific
  const [specialization, setSpecialization] = useState('');
  const [experience, setExperience] = useState('');
  const [qualifications, setQualifications] = useState('');
  const [about, setAbout] = useState('');
  const [consultationFee, setConsultationFee] = useState('');

  const handleNext = () => {
    if (step === 1) {
      if (!name || !email || !password) {
        toast.error('Please fill in all required fields');
        return;
      }
      if (password.length < 6) {
        toast.error('Password must be at least 6 characters');
        return;
      }
    }
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedRole === 'patient') {
      const success = await signupPatient({
        name,
        email,
        password,
        phone: phone || undefined,
        age: age ? parseInt(age) : undefined,
        gender,
      });
      if (success) {
        navigate('/patient/dashboard');
      }
    } else {
      if (!specialization || !experience || !qualifications || !about || !consultationFee) {
        toast.error('Please fill in all required fields');
        return;
      }
      
      const success = await signupDoctor({
        name,
        email,
        password,
        phone: phone || undefined,
        specialization,
        experience: parseInt(experience),
        qualifications: qualifications.split(',').map(q => q.trim()),
        about,
        consultationFee: parseInt(consultationFee),
      });
      if (success) {
        navigate('/doctor/dashboard');
      }
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
            <h1 className="text-3xl font-bold text-green-900 dark:text-green-100">Create Account</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Choose your account type to get started</p>
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
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Join as a practitioner</p>
            </motion.button>
          </div>

          <p className="text-center mt-6 text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
            <button onClick={() => navigate('/login')} className="text-green-600 dark:text-green-400 font-semibold hover:underline">
              Sign in
            </button>
          </p>
        </motion.div>
      </div>
    );
  }

  const totalSteps = selectedRole === 'patient' ? 2 : 3;

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
        className="max-w-lg w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6">
          <div className="flex items-center justify-between">
            <button
              onClick={() => step === 1 ? setSelectedRole(null) : handleBack()}
              className="text-white/80 hover:text-white"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-1">
              {Array.from({ length: totalSteps }).map((_, i) => (
                <div
                  key={i}
                  className={`w-8 h-1 rounded-full ${
                    i + 1 <= step ? 'bg-white' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
            <div className="w-5" />
          </div>
          <div className="text-center mt-4">
            <h2 className="text-2xl font-bold text-white">
              {selectedRole === 'doctor' ? 'Doctor Registration' : 'Patient Registration'}
            </h2>
            <p className="text-green-100 text-sm mt-1">
              Step {step} of {totalSteps}
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="p-6">
          <form onSubmit={handleSubmit}>
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Basic Information</h3>
                  
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="Full Name *"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="pl-10 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                  
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      type="email"
                      placeholder="Email Address *"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                  
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Password * (min 6 characters)"
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
                  
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">+91</span>
                    <Input
                      type="tel"
                      placeholder="Phone Number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="pl-12 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>

                  <Button
                    type="button"
                    onClick={handleNext}
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                  >
                    Next
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </motion.div>
              )}

              {step === 2 && selectedRole === 'patient' && (
                <motion.div
                  key="step2-patient"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Additional Information</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Age</label>
                    <Input
                      type="number"
                      placeholder="Your age"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Gender</label>
                    <div className="flex gap-3">
                      {(['male', 'female', 'other'] as const).map((g) => (
                        <button
                          key={g}
                          type="button"
                          onClick={() => setGender(g)}
                          className={`flex-1 py-2 px-4 rounded-lg border capitalize transition-all ${
                            gender === g
                              ? 'bg-green-600 text-white border-green-600'
                              : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600'
                          }`}
                        >
                          {g}
                        </button>
                      ))}
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                  >
                    {isLoading ? 'Creating Account...' : 'Create Account'}
                  </Button>
                </motion.div>
              )}

              {step === 2 && selectedRole === 'doctor' && (
                <motion.div
                  key="step2-doctor"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Professional Information</h3>
                  
                  <div className="relative">
                    <Stethoscope className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="Specialization * (e.g., Ayurvedic Medicine)"
                      value={specialization}
                      onChange={(e) => setSpecialization(e.target.value)}
                      className="pl-10 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                  
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      type="number"
                      placeholder="Years of Experience *"
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                      className="pl-10 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                  
                  <div className="relative">
                    <GraduationCap className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <Textarea
                      placeholder="Qualifications * (comma separated, e.g., BAMS, MD Ayurveda)"
                      value={qualifications}
                      onChange={(e) => setQualifications(e.target.value)}
                      className="pl-10 min-h-[80px] dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>

                  <Button
                    type="button"
                    onClick={handleNext}
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                  >
                    Next
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </motion.div>
              )}

              {step === 3 && selectedRole === 'doctor' && (
                <motion.div
                  key="step3-doctor"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Final Details</h3>
                  
                  <div className="relative">
                    <FileText className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <Textarea
                      placeholder="About You * (brief description of your practice)"
                      value={about}
                      onChange={(e) => setAbout(e.target.value)}
                      className="pl-10 min-h-[100px] dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                  
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      type="number"
                      placeholder="Consultation Fee (₹) *"
                      value={consultationFee}
                      onChange={(e) => setConsultationFee(e.target.value)}
                      className="pl-10 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>

                  <div className="p-4 bg-amber-50 dark:bg-amber-900/30 rounded-lg">
                    <p className="text-sm text-amber-700 dark:text-amber-400 flex items-start gap-2">
                      <Check className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      Your account will be verified by our team before you can start accepting appointments.
                    </p>
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                  >
                    {isLoading ? 'Creating Account...' : 'Create Account'}
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </form>

          <p className="text-center mt-4 text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
            <button onClick={() => navigate('/login')} className="text-green-600 dark:text-green-400 font-semibold hover:underline">
              Sign in
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
