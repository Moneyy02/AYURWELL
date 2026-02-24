import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Sparkles, Check, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { quizQuestions } from '@/data/quizData';
import { doshaDetails, dietCharts } from '@/data/doshaData';
import { products } from '@/data/products';
import { useQuiz } from '@/context/QuizContext';
import type { DoshaType, DoshaScores, QuizResult } from '@/types';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function QuizModal({ isOpen, onClose }: QuizModalProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState<DoshaScores>({ Vata: 0, Pitta: 0, Kapha: 0 });
  const [answers, setAnswers] = useState<DoshaType[]>([]);
  const [showResults, setShowResults] = useState(false);
  const { saveResult } = useQuiz();

  const handleAnswer = (dosha: DoshaType) => {
    const newScores = { ...scores, [dosha]: scores[dosha] + 1 };
    setScores(newScores);
    setAnswers([...answers, dosha]);

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResults(newScores);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      const lastAnswer = answers[answers.length - 1];
      setScores({ ...scores, [lastAnswer]: scores[lastAnswer] - 1 });
      setAnswers(answers.slice(0, -1));
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateResults = (finalScores: DoshaScores) => {
    const total = Object.values(finalScores).reduce((a, b) => a + b, 0);
    const percentages: DoshaScores = {
      Vata: Math.round((finalScores.Vata / total) * 100),
      Pitta: Math.round((finalScores.Pitta / total) * 100),
      Kapha: Math.round((finalScores.Kapha / total) * 100),
    };

    const dominantDosha = (Object.keys(percentages) as DoshaType[]).reduce((a, b) =>
      percentages[a] > percentages[b] ? a : b
    );

    const result: QuizResult = { dominantDosha, percentages };
    saveResult(result);
    setShowResults(true);
    toast.success('Quiz completed! Check your results.');
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScores({ Vata: 0, Pitta: 0, Kapha: 0 });
    setAnswers([]);
    setShowResults(false);
  };

  const handleClose = () => {
    resetQuiz();
    onClose();
  };

  const downloadDietChart = () => {
    const result = { dominantDosha: (Object.keys(scores) as DoshaType[]).reduce((a, b) =>
      scores[a] > scores[b] ? a : b
    ) };
    const chart = dietCharts[result.dominantDosha];
    let content = `Your 7-Day Diet Chart for ${result.dominantDosha} Dosha\n\n`;
    
    Object.entries(chart).forEach(([day, meals]) => {
      content += `${day.toUpperCase()}\n`;
      content += `  Breakfast: ${meals.B}\n`;
      content += `  Lunch: ${meals.L}\n`;
      content += `  Dinner: ${meals.D}\n\n`;
    });

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${result.dominantDosha}_Diet_Chart.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Diet chart downloaded!');
  };

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        {!showResults ? (
          <div className="py-4">
            {/* Progress */}
            <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-500 mb-2">
                <span>Question {currentQuestion + 1} of {quizQuestions.length}</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            {/* Question */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestion}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-6">
                  {quizQuestions[currentQuestion].question}
                </h3>

                <div className="space-y-3">
                  {quizQuestions[currentQuestion].options.map((option, index) => (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => handleAnswer(option.dosha)}
                      className="w-full p-4 text-left bg-gray-50 hover:bg-green-50 border-2 border-transparent hover:border-green-300 rounded-xl transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full border-2 border-gray-300 group-hover:border-green-500 flex items-center justify-center">
                          <div className="w-3 h-3 rounded-full bg-green-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <span className="text-gray-700 group-hover:text-gray-900">{option.text}</span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex justify-between mt-6">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentQuestion === 0}
                className="flex items-center gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </Button>
              <Button
                variant="ghost"
                onClick={handleClose}
                className="text-gray-500"
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <QuizResults
            scores={scores}
            onClose={handleClose}
            onRetake={resetQuiz}
            onDownload={downloadDietChart}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}

interface QuizResultsProps {
  scores: DoshaScores;
  onClose: () => void;
  onRetake: () => void;
  onDownload: () => void;
}

function QuizResults({ scores, onClose, onRetake, onDownload }: QuizResultsProps) {
  const total = Object.values(scores).reduce((a, b) => a + b, 0);
  const percentages = {
    Vata: Math.round((scores.Vata / total) * 100),
    Pitta: Math.round((scores.Pitta / total) * 100),
    Kapha: Math.round((scores.Kapha / total) * 100),
  };

  const dominantDosha = (Object.keys(percentages) as DoshaType[]).reduce((a, b) =>
    percentages[a] > percentages[b] ? a : b
  );

  const details = doshaDetails[dominantDosha];
  const recommendedProducts = products.filter(p =>
    details.products.some(name => p.name.toLowerCase().includes(name.toLowerCase()))
  );

  return (
    <div className="py-4">
      <DialogHeader>
        <DialogTitle className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles className="w-6 h-6 text-amber-500" />
            <span>Your Ayurvedic Profile</span>
          </div>
        </DialogTitle>
      </DialogHeader>

      {/* Dominant Dosha */}
      <div className="text-center mb-8">
        <p className="text-gray-600 mb-4">Based on your answers, your dominant energy is:</p>
        <div className="relative inline-block">
          <div className={`absolute inset-0 bg-gradient-to-r ${
            dominantDosha === 'Vata' ? 'from-blue-400 to-cyan-400' :
            dominantDosha === 'Pitta' ? 'from-amber-400 to-orange-400' :
            'from-emerald-400 to-teal-400'
          } rounded-full blur-xl opacity-30`} />
          <img
            src={details.image}
            alt={dominantDosha}
            className="relative w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg mx-auto"
          />
        </div>
        <h2 className={`text-3xl font-bold mt-4 ${
          dominantDosha === 'Vata' ? 'text-blue-600' :
          dominantDosha === 'Pitta' ? 'text-amber-600' :
          'text-emerald-600'
        }`}>
          {dominantDosha}
        </h2>
        <p className="text-gray-500">{details.elements}</p>
        <p className="text-gray-600 mt-2 max-w-md mx-auto">{details.description}</p>
      </div>

      {/* Dosha Breakdown */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {(['Vata', 'Pitta', 'Kapha'] as DoshaType[]).map((dosha) => (
          <div key={dosha} className="text-center p-4 bg-gray-50 rounded-xl">
            <img
              src={doshaDetails[dosha].image}
              alt={dosha}
              className="w-16 h-16 rounded-full object-cover mx-auto mb-2"
            />
            <p className={`text-2xl font-bold ${
              dosha === 'Vata' ? 'text-blue-500' :
              dosha === 'Pitta' ? 'text-amber-500' :
              'text-emerald-500'
            }`}>
              {percentages[dosha]}%
            </p>
            <p className="text-sm text-gray-600">{dosha}</p>
          </div>
        ))}
      </div>

      {/* Lifestyle Recommendations */}
      <div className="mb-6 p-4 bg-green-50 rounded-xl">
        <h4 className="font-bold text-green-800 mb-3">Lifestyle Recommendations</h4>
        <ul className="space-y-2">
          {details.lifestyle.map((tip, index) => (
            <li key={index} className="flex items-start gap-2 text-gray-700">
              <Check className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
              {tip}
            </li>
          ))}
        </ul>
      </div>

      {/* Recommended Products */}
      {recommendedProducts.length > 0 && (
        <div className="mb-6">
          <h4 className="font-bold text-gray-900 mb-3">Recommended Products</h4>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {recommendedProducts.map((product) => (
              <div key={product.id} className="flex-shrink-0 w-32 text-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-20 h-20 object-cover rounded-lg mx-auto mb-2"
                />
                <p className="text-sm font-medium text-gray-900">{product.name}</p>
                <p className="text-sm text-green-600">₹{product.price}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button onClick={onDownload} variant="outline" className="flex-1">
          <Download className="w-4 h-4 mr-2" />
          Download Diet Chart
        </Button>
        <Button onClick={onRetake} variant="outline" className="flex-1">
          Retake Quiz
        </Button>
        <Button onClick={onClose} className="flex-1 bg-green-600 hover:bg-green-700">
          Done
        </Button>
      </div>
    </div>
  );
}
