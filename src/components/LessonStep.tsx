import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, XCircle, ArrowRight, RotateCcw } from 'lucide-react';

interface LessonStepProps {
  step: {
    id: string;
    type: 'text' | 'image' | 'video' | 'interactive' | 'quiz';
    content: string;
    options?: string[];
    correctAnswer?: string;
    explanation?: string;
    imageUrl?: string;
    videoUrl?: string;
  };
  onComplete: (correct: boolean) => void;
  isLastStep: boolean;
}

const LessonStep: React.FC<LessonStepProps> = ({ step, onComplete, isLastStep }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [hasAnswered, setHasAnswered] = useState(false);

  const handleAnswerSelect = (answer: string) => {
    if (hasAnswered) return; // Prevent changing answer after submission
    setSelectedAnswer(answer);
  };

  const handleSubmit = () => {
    if (!selectedAnswer) return;

    const correct = selectedAnswer === step.correctAnswer;
    setIsCorrect(correct);
    setShowResult(true);
    setHasAnswered(true);
    
    // Only auto-advance if correct
    if (correct) {
      setTimeout(() => {
        onComplete(true);
      }, 2000);
    }
  };

  const handleRetry = () => {
    setSelectedAnswer(null);
    setShowResult(false);
    setIsCorrect(false);
    setHasAnswered(false);
  };

  const handleContinue = () => {
    onComplete(true);
  };

  if (step.type === 'text') {
    return (
      <Card className="mb-6">
        <CardContent className="p-6">
          <p className="text-lg leading-relaxed text-black mb-4 select-text">{step.content}</p>
          <Button 
            onClick={handleContinue}
            className="bg-black text-white hover:bg-black/80"
          >
            {isLastStep ? 'Complete Lesson' : 'Continue'}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (step.type === 'interactive' || step.type === 'quiz') {
    return (
      <Card className="mb-6">
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold text-black mb-4 select-text">{step.content}</h3>
          
          {!showResult && (
            <div className="space-y-3 mb-6">
              {step.options?.map((option, index) => (
                <Button
                  key={index}
                  variant={selectedAnswer === option ? "default" : "outline"}
                  className={`w-full justify-start text-left p-4 h-auto ${
                    selectedAnswer === option 
                      ? 'bg-black text-white border-black' 
                      : 'bg-white text-black border-gray-300 hover:bg-gray-50'
                  }`}
                  onClick={() => handleAnswerSelect(option)}
                  disabled={hasAnswered}
                >
                  {option}
                </Button>
              ))}
            </div>
          )}

          {showResult && (
            <div className={`p-4 rounded-lg mb-4 ${
              isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
            }`}>
              <div className="flex items-center space-x-2 mb-2">
                {isCorrect ? (
                  <CheckCircle className="text-green-600 h-5 w-5" />
                ) : (
                  <XCircle className="text-red-600 h-5 w-5" />
                )}
                <span className={`font-medium ${
                  isCorrect ? 'text-green-800' : 'text-red-800'
                }`}>
                  {isCorrect ? 'Correct!' : 'Incorrect'}
                </span>
              </div>
              {step.explanation && (
                <p className={`text-sm ${
                  isCorrect ? 'text-green-700' : 'text-red-700'
                }`}>
                  {step.explanation}
                </p>
              )}
              {!isCorrect && (
                <p className="text-sm text-red-700 mt-2">
                  Correct answer: {step.correctAnswer}
                </p>
              )}
            </div>
          )}

          {!showResult && selectedAnswer && (
            <Button 
              onClick={handleSubmit}
              className="bg-black text-white hover:bg-black/80"
            >
              Check Answer
            </Button>
          )}

          {showResult && !isCorrect && (
            <Button 
              onClick={handleRetry}
              className="bg-blue-600 text-white hover:bg-blue-700"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Try Again
            </Button>
          )}

          {showResult && isCorrect && (
            <div className="text-center">
              <p className="text-sm text-gray-600">
                {isLastStep ? 'Completing lesson...' : 'Moving to next step...'}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <p className="text-lg leading-relaxed text-black mb-4">{step.content}</p>
        <Button 
          onClick={handleContinue}
          className="bg-black text-white hover:bg-black/80"
        >
          Continue
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default LessonStep; 