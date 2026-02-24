import { useState } from 'react';
import { Moon, Sun, User, Stethoscope } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/context/ThemeContext';
import { useNavigate } from 'react-router-dom';

// Import sections
import Hero from '@/sections/Hero';
import About from '@/sections/About';
import Doshas from '@/sections/Doshas';
import Products from '@/sections/Products';
import Articles from '@/sections/Articles';
import FAQ from '@/sections/FAQ';
import Footer from '@/sections/Footer';

// Import components
import AIChatbot from '@/components/AIChatbot';
import CartDrawer from '@/components/CartDrawer';
import QuizModal from '@/components/QuizModal';

export default function LandingPage() {
  const navigate = useNavigate();
  const { toggleTheme, isDark } = useTheme();
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src="/images/logo.jpg" alt="AyurWell" className="w-10 h-10 rounded-full" />
              <span className="text-xl font-bold text-green-800 dark:text-green-400">AyurWell</span>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                {isDark ? <Sun className="w-5 h-5 text-amber-500" /> : <Moon className="w-5 h-5 text-gray-600" />}
              </button>
              
              <div className="hidden sm:flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate('/login')}
                  className="dark:border-gray-600 dark:text-gray-300"
                >
                  <User className="w-4 h-4 mr-2" />
                  Patient Login
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate('/login')}
                  className="dark:border-amber-600 dark:text-amber-400"
                >
                  <Stethoscope className="w-4 h-4 mr-2" />
                  Doctor Login
                </Button>
              </div>
              
              <Button
                size="sm"
                onClick={() => navigate('/signup')}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-16">
        <Hero onStartQuiz={() => setIsQuizOpen(true)} />
        <About />
        <Doshas />
        <Products />
        <Articles />
        <FAQ />
      </main>
      
      <Footer />
      
      <AIChatbot />
      <CartDrawer />
      <QuizModal isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} />
    </div>
  );
}
