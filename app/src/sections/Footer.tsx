import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Leaf, Instagram, Youtube, Linkedin, Mail, Phone, MapPin, Heart } from 'lucide-react';

const quickLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Doshas', href: '#doshas' },
  { label: 'Shop', href: '#shop' },
  { label: 'Articles', href: '#articles' },
  { label: 'FAQ', href: '#faq' },
];

const features = [
  'Personalized Quiz',
  'Diet Charts',
  'Lifestyle Tips',
  'Herbal Shop',
  'AI Consultation',
];

const quotes = [
  "Health is the greatest gift, contentment the greatest wealth, faithfulness the best relationship.",
  "To keep the body in good health is a duty... otherwise we shall not be able to keep our mind strong and clear.",
  "The greatest medicine of all is teaching people how not to need it.",
];

const testimonials = [
  "This quiz was spot on! The diet tips have made a huge difference.",
  "Finally, a simple way to understand Ayurveda. Highly recommend!",
  "I feel more energetic and balanced since following my dosha plan.",
  "The AI chatbot helped me understand my symptoms so clearly!",
];

export default function Footer() {
  const [currentQuote, setCurrentQuote] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const quoteInterval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 8000);
    return () => clearInterval(quoteInterval);
  }, []);

  useEffect(() => {
    const testimonialInterval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(testimonialInterval);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-green-900 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 sm:px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/images/logo.jpg"
                alt="AyurWell"
                className="w-12 h-12 rounded-full border-2 border-green-400"
              />
              <span className="text-2xl font-bold">AyurWell</span>
            </div>
            <p className="text-green-200 mb-6 max-w-sm">
              Your modern guide to ancient wellness. Discover your dosha, get personalized diet charts, and live in harmony.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-green-800 flex items-center justify-center hover:bg-green-700 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-green-800 flex items-center justify-center hover:bg-green-700 transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-green-800 flex items-center justify-center hover:bg-green-700 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className="text-green-200 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Features */}
          <div>
            <h4 className="font-bold text-lg mb-4">Features</h4>
            <ul className="space-y-2">
              {features.map((feature) => (
                <li key={feature} className="text-green-200 flex items-center gap-2">
                  <Leaf className="w-4 h-4 text-green-400" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li>
                <a href="mailto:hello@ayurwell.com" className="text-green-200 hover:text-white transition-colors flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  hello@ayurwell.com
                </a>
              </li>
              <li>
                <a href="tel:+911234567890" className="text-green-200 hover:text-white transition-colors flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  +91 123 456 7890
                </a>
              </li>
              <li className="text-green-200 flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-1" />
                Mumbai, India
              </li>
            </ul>
          </div>
        </div>

        {/* Quote of the Day */}
        <div className="mt-12 pt-8 border-t border-green-800">
          <div className="text-center max-w-2xl mx-auto">
            <h4 className="text-sm font-medium text-green-400 mb-2">Quote of the Day</h4>
            <motion.p
              key={currentQuote}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-green-200 italic"
            >
              "{quotes[currentQuote]}"
            </motion.p>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mt-8 pt-8 border-t border-green-800">
          <div className="text-center max-w-2xl mx-auto">
            <h4 className="text-sm font-medium text-green-400 mb-2">What Our Users Say</h4>
            <motion.p
              key={currentTestimonial}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-green-200 italic"
            >
              "{testimonials[currentTestimonial]}"
            </motion.p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-green-800">
        <div className="container mx-auto px-4 sm:px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <p className="text-green-300 text-sm">
                © {new Date().getFullYear()} AyurWell. All rights reserved.
              </p>
              <p className="text-green-400 text-xs mt-1">
                Disclaimer: Not a substitute for professional medical advice.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-green-300 text-sm">
                <span className="tooltip" title="Vata">💨</span>
                <span className="tooltip" title="Pitta">🔥</span>
                <span className="tooltip" title="Kapha">💧</span>
              </div>
              <select className="bg-green-800 border border-green-700 rounded-md px-3 py-1 text-sm text-green-200">
                <option>English</option>
                <option>Hindi</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Made with Love */}
      <div className="bg-green-950 py-3">
        <div className="container mx-auto px-4 text-center">
          <p className="text-green-400 text-sm flex items-center justify-center gap-1">
            Made with <Heart className="w-4 h-4 text-red-400 fill-red-400" /> for Hackathon
          </p>
        </div>
      </div>
    </footer>
  );
}
