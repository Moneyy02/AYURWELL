import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import type { QuizResult } from '@/types';

interface QuizContextType {
  result: QuizResult | null;
  saveResult: (result: QuizResult) => void;
  clearResult: () => void;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export function QuizProvider({ children }: { children: React.ReactNode }) {
  const [result, setResult] = useState<QuizResult | null>(null);

  useEffect(() => {
    const savedResult = localStorage.getItem('ayurwell_dosha_result');
    if (savedResult) {
      setResult(JSON.parse(savedResult));
    }
  }, []);

  const saveResult = useCallback((newResult: QuizResult) => {
    setResult(newResult);
    localStorage.setItem('ayurwell_dosha_result', JSON.stringify(newResult));
  }, []);

  const clearResult = useCallback(() => {
    setResult(null);
    localStorage.removeItem('ayurwell_dosha_result');
  }, []);

  return (
    <QuizContext.Provider
      value={{
        result,
        saveResult,
        clearResult
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
}
