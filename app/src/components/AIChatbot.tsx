import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { ChatMessage } from '@/types';

// Pre-defined Ayurvedic knowledge base for responses
const ayurvedicKnowledge: Record<string, string> = {
  'vata': 'Vata dosha is composed of Air and Ether elements. When balanced, Vata types are creative, energetic, and enthusiastic. To balance Vata: maintain a regular routine, eat warm and nourishing foods, stay warm, and practice calming activities like meditation.',
  'pitta': 'Pitta dosha is composed of Fire and Water elements. Balanced Pitta individuals are intelligent, focused, and strong leaders. To balance Pitta: stay cool, avoid excessive heat, favor sweet and bitter foods, and practice moderation.',
  'kapha': 'Kapha dosha is composed of Earth and Water elements. Balanced Kapha types are calm, loving, and grounded. To balance Kapha: engage in regular exercise, eat light and warm foods, and avoid heavy, oily foods.',
  'digestion': 'In Ayurveda, digestion is governed by Agni (digestive fire). Strong Agni leads to good health. Tips: eat warm, cooked foods; avoid cold drinks with meals; eat at regular times; and don\'t overeat.',
  'diet': 'Ayurvedic diet recommendations vary by dosha. Vata benefits from warm, grounding foods. Pitta needs cooling, sweet foods. Kapha thrives on light, spicy foods. Always favor fresh, seasonal, and locally sourced ingredients.',
  'sleep': 'Quality sleep is essential in Ayurveda. Vata types need regular sleep schedules. Pitta should avoid overheating at night. Kapha benefits from waking early. General tips: sleep by 10 PM, avoid screens before bed, and create a calming bedtime routine.',
  'stress': 'Ayurveda views stress as a doshic imbalance. Vata stress shows as anxiety. Pitta stress manifests as anger. Kapha stress leads to withdrawal. Manage stress through meditation, proper diet, and dosha-appropriate exercise.',
  'herbs': 'Popular Ayurvedic herbs include: Ashwagandha (stress relief), Turmeric (anti-inflammatory), Triphala (digestion), Brahmi (mental clarity), and Neem (purification). Always consult a practitioner before starting new herbs.',
  'yoga': 'Yoga complements Ayurveda beautifully. Vata benefits from grounding poses. Pitta needs cooling, relaxing practices. Kapha thrives on vigorous, heating sequences. Practice according to your dosha and current state.',
  'skin': 'Ayurvedic skincare is dosha-specific. Vata skin needs oiling and hydration. Pitta skin requires cooling and soothing. Kapha skin benefits from cleansing and stimulation. Use natural oils and herbs appropriate for your type.',
};

const defaultResponses = [
  'I\'d be happy to help you learn more about Ayurveda! Could you be more specific about what you\'d like to know?',
  'That\'s an interesting question about wellness. While I can share general Ayurvedic principles, please consult a qualified practitioner for personalized advice.',
  'Ayurveda offers holistic approaches to health. Would you like to know about diet, lifestyle, herbs, or dosha balancing?',
  'I can help you understand Ayurvedic concepts better. What specific aspect interests you most?',
];

function generateResponse(input: string): string {
  const lowerInput = input.toLowerCase();
  
  // Check for keywords in knowledge base
  for (const [keyword, response] of Object.entries(ayurvedicKnowledge)) {
    if (lowerInput.includes(keyword)) {
      return response;
    }
  }
  
  // Check for greetings
  if (lowerInput.match(/^(hi|hello|hey|namaste)/)) {
    return 'Namaste! 🙏 Welcome to AyurWell. I\'m your Ayurvedic wellness assistant. How can I help you today? You can ask me about doshas, diet, herbs, or any Ayurvedic concepts!';
  }
  
  // Check for quiz-related queries
  if (lowerInput.includes('quiz') || lowerInput.includes('dosha test') || lowerInput.includes('constitution')) {
    return 'You can take our comprehensive dosha quiz by clicking the "Find Your Dosha" button on our homepage. It will help determine your dominant dosha - Vata, Pitta, or Kapha!';
  }
  
  // Check for product queries
  if (lowerInput.includes('product') || lowerInput.includes('shop') || lowerInput.includes('buy') || lowerInput.includes('herb')) {
    return 'We offer a range of authentic Ayurvedic herbs and products. Each product page shows which dosha it benefits most. Visit our Shop section to explore!';
  }
  
  // Return random default response
  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'model',
      text: 'Namaste! 🙏 I\'m your Ayurvedic wellness assistant. How can I help you today? Ask me about doshas, diet, herbs, or any wellness questions!',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      role: 'user',
      text: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI thinking
    setTimeout(() => {
      const response = generateResponse(input);
      const botMessage: ChatMessage = {
        role: 'model',
        text: response,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickQuestions = [
    'What is my dosha?',
    'How to balance Vata?',
    'Best herbs for stress?',
    'Ayurvedic diet tips?',
  ];

  return (
    <>
      {/* Chat Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full shadow-lg flex items-center justify-center text-white hover:shadow-xl transition-shadow"
      >
        <MessageCircle className="w-6 h-6" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-24 right-6 z-50 w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">AyurWell Assistant</h3>
                  <p className="text-green-100 text-xs flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    Online
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <ScrollArea className="h-80 p-4" ref={scrollRef}>
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-3 ${
                      message.role === 'user' ? 'flex-row-reverse' : ''
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.role === 'user'
                          ? 'bg-green-600'
                          : 'bg-gradient-to-r from-amber-500 to-orange-500'
                      }`}
                    >
                      {message.role === 'user' ? (
                        <User className="w-4 h-4 text-white" />
                      ) : (
                        <Sparkles className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <div
                      className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                        message.role === 'user'
                          ? 'bg-green-600 text-white rounded-br-none'
                          : 'bg-gray-100 text-gray-800 rounded-bl-none'
                      }`}
                    >
                      {message.text}
                    </div>
                  </motion.div>
                ))}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex gap-3"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-gray-100 p-3 rounded-2xl rounded-bl-none">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </ScrollArea>

            {/* Quick Questions */}
            {messages.length < 3 && (
              <div className="px-4 pb-2">
                <p className="text-xs text-gray-500 mb-2">Quick questions:</p>
                <div className="flex flex-wrap gap-2">
                  {quickQuestions.map((question) => (
                    <button
                      key={question}
                      onClick={() => {
                        setInput(question);
                        setTimeout(handleSend, 100);
                      }}
                      className="text-xs px-3 py-1 bg-green-50 text-green-700 rounded-full hover:bg-green-100 transition-colors"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-gray-100">
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about Ayurveda..."
                  className="flex-1"
                />
                <Button
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
