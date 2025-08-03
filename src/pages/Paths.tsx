
import React from 'react';
import Layout from '@/components/Layout';
import PathNode from '@/components/PathNode';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '@/contexts/ProgressContext';

const Paths = () => {
  const navigate = useNavigate();
  const { getProgressForPath, getPathStatus, isLoading } = useProgress();
  
  // Keep the original hardcoded paths
  const learningPaths = [
    {
      id: "smartphone-basics",
      title: "Smartphone Basics",
      description: "Master your phone's essential features, from making calls to sending messages",
    },
    {
      id: "online-security", 
      title: "Online Security",
      description: "Learn to protect yourself from scams, phishing, and online threats",
    },
    {
      id: "email-essentials",
      title: "Email Essentials", 
      description: "Send, receive, and organize your emails with confidence",
    },
    {
      id: "social-media-safety",
      title: "Social Media Safety",
      description: "Connect with family while staying safe on Facebook and other platforms",
    },
    {
      id: "video-calling",
      title: "Video Calling",
      description: "Stay connected with loved ones through Zoom, FaceTime, and WhatsApp",
    },
    {
      id: "online-shopping",
      title: "Online Shopping",
      description: "Shop safely online and avoid common pitfalls",
    }
  ];

  const handleContinue = (title: string, pathId: string) => {
    navigate('/lesson', { state: { lessonTitle: title, pathId: pathId } });
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">Learning Paths</h1>
          <p className="text-2xl text-white/80">Choose your journey to digital confidence</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {learningPaths.map((path, index) => {
            // Get real progress for this path
            const progress = getProgressForPath(path.id);
            const status = getPathStatus(path.id);
            const progressPercentage = progress?.progress_percentage || 0;

            return (
              <PathNode
                key={path.id}
                title={path.title}
                description={path.description}
                status={status}
                progress={progressPercentage}
                onContinue={() => handleContinue(path.title, path.id)}
              />
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Paths;
