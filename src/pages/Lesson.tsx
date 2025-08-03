
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import GlassCard from '@/components/GlassCard';
import { ArrowLeft, ArrowRight, Play, Pause, Volume2, CheckCircle, Clock } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useProgress } from '@/contexts/ProgressContext';
import { useAuth } from '@/contexts/AuthContext';
import LessonStep from '@/components/LessonStep';
import { getLessonsForPath, getLessonById, getNextLesson, getPreviousLesson } from '@/lib/lessons';
import { useToast } from '@/hooks/use-toast';
import TextToSpeech from '@/components/TextToSpeech';
import HelpChatbot from '@/components/HelpChatbot';

const Lesson = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { completeLessonWithScore, getLessonProgress } = useProgress();
  const { toast } = useToast();
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [lessonCompleted, setLessonCompleted] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [isCompleting, setIsCompleting] = useState(false);

  // Get lesson info from URL or state
  const lessonTitle = location.state?.lessonTitle || "Sample Lesson";
  const pathId = location.state?.pathId || "smartphone-basics";
  
  // Get the first lesson for this path (you can enhance this to pass specific lesson ID)
  const lessons = getLessonsForPath(pathId);
  const currentLesson = lessons[0]; // For now, always show first lesson
  const lessonProgress = currentLesson ? getLessonProgress(currentLesson.id) : null;

  useEffect(() => {
    if (currentLesson) {
      // Count total questions for scoring
      const questions = currentLesson.steps.filter(step => 
        step.type === 'interactive' || step.type === 'quiz'
      );
      setTotalQuestions(questions.length);
    }
  }, [currentLesson]);

  // Check if lesson was already completed
  useEffect(() => {
    if (lessonProgress?.completed) {
      setLessonCompleted(true);
      setCorrectAnswers(lessonProgress.score || 0);
      setTotalQuestions(lessonProgress.score || 0);
    }
  }, [lessonProgress]);

  const toggleAudio = () => {
    setIsPlaying(!isPlaying);
  };

  const handleStepComplete = (correct: boolean) => {
    if (correct) {
      setCorrectAnswers(prev => prev + 1);
    }

    if (currentStepIndex < (currentLesson?.steps.length || 0) - 1) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      // Lesson completed
      completeLesson();
    }
  };

  const completeLesson = async () => {
    if (!currentLesson || !user || isCompleting) return;

    setIsCompleting(true);
    const score = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 100;
    
    try {
      await completeLessonWithScore(currentLesson.id, pathId, score);
      setLessonCompleted(true);
      
      toast({
        title: "Lesson Completed!",
        description: `Great job! You scored ${score}% on this lesson.`,
      });
    } catch (error) {
      console.error('Error completing lesson:', error);
      toast({
        title: "Error",
        description: "Failed to save lesson progress.",
        variant: "destructive",
      });
    } finally {
      setIsCompleting(false);
    }
  };

  const handleNextLesson = () => {
    if (!currentLesson) return;
    
    const nextLesson = getNextLesson(currentLesson.id);
    if (nextLesson) {
      navigate('/lesson', { 
        state: { 
          lessonTitle: nextLesson.title,
          pathId: nextLesson.pathId,
          lessonId: nextLesson.id
        } 
      });
    } else {
      // No more lessons in this path
      navigate('/paths');
    }
  };

  const handlePreviousLesson = () => {
    if (!currentLesson) return;
    
    const prevLesson = getPreviousLesson(currentLesson.id);
    if (prevLesson) {
      navigate('/lesson', { 
        state: { 
          lessonTitle: prevLesson.title,
          pathId: prevLesson.pathId,
          lessonId: prevLesson.id
        } 
      });
    } else {
      navigate('/paths');
    }
  };

  if (!currentLesson) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-4">Lesson Not Found</h1>
            <button 
              onClick={() => navigate('/paths')}
              className="bg-black text-white px-6 py-3 rounded-lg hover:bg-black/80"
            >
              Back to Paths
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  const currentStep = currentLesson.steps[currentStepIndex];
  const progress = ((currentStepIndex + 1) / currentLesson.steps.length) * 100;
  const isLastStep = currentStepIndex === currentLesson.steps.length - 1;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <GlassCard className="p-12">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-4xl font-bold text-black">{currentLesson.title}</h1>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={toggleAudio}
                    className="flex items-center space-x-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-all duration-300"
                  >
                    {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                    <span className="text-sm">{isPlaying ? 'Pause' : 'Play'} Audio</span>
                  </button>
                  <Volume2 className="text-black/60" size={20} />
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                <div 
                  className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              
              <div className="flex justify-between text-sm text-black/60">
                <span>Step {currentStepIndex + 1} of {currentLesson.steps.length}</span>
                <span>{Math.round(progress)}% Complete</span>
              </div>
            </div>

            {/* Lesson content */}
            <div className="mb-8">
              {lessonCompleted ? (
                <div className="text-center py-12">
                  <CheckCircle className="mx-auto text-green-600 mb-4" size={64} />
                  <h2 className="text-3xl font-bold text-black mb-4">Lesson Completed!</h2>
                  <p className="text-lg text-black/70 mb-6">
                    Great job! You've completed "{currentLesson.title}"
                  </p>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
                    <p className="text-lg font-semibold text-green-800">
                      Score: {totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 100}%
                    </p>
                    <p className="text-sm text-green-600">
                      {correctAnswers} out of {totalQuestions} questions correct
                    </p>
                  </div>
                </div>
              ) : (
                <TextToSpeech>
                  <LessonStep
                    step={currentStep}
                    onComplete={handleStepComplete}
                    isLastStep={isLastStep}
                  />
                </TextToSpeech>
              )}
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center">
              <button
                onClick={() => navigate('/paths')}
                className="flex items-center space-x-3 bg-white border-2 border-black text-black px-8 py-4 rounded-xl text-xl font-semibold hover:bg-black hover:text-white transition-all duration-300"
              >
                <ArrowLeft size={24} />
                <span>Back to Paths</span>
              </button>

              <div className="text-black/60 text-lg">
                {lessonProgress?.completed && (
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="text-green-600" size={20} />
                    <span>Completed</span>
                  </div>
                )}
                {isCompleting && (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black"></div>
                    <span>Saving progress...</span>
                  </div>
                )}
              </div>

              {lessonCompleted ? (
                <button
                  onClick={handleNextLesson}
                  className="flex items-center space-x-3 bg-black text-white px-8 py-4 rounded-xl text-xl font-semibold hover:bg-gray-800 transition-all duration-300"
                >
                  <span>Next Lesson</span>
                  <ArrowRight size={24} />
                </button>
              ) : (
                <div className="text-black/60 text-lg">
                  Estimated time: {currentLesson.estimatedMinutes} minutes
                </div>
              )}
            </div>
          </GlassCard>
        </div>
      </div>
      <HelpChatbot 
        lessonTitle={currentLesson?.title}
        lessonContext={currentLesson?.description}
      />
    </Layout>
  );
};

export default Lesson;
