
import React from 'react';
import Layout from '@/components/Layout';
import PathNode from '@/components/PathNode';
import { useNavigate } from 'react-router-dom';

const Paths = () => {
  const navigate = useNavigate();
  
  const learningPaths = [
    {
      title: "Smartphone Basics",
      description: "Master your phone's essential features, from making calls to sending messages",
      status: 'current' as const,
      progress: 65
    },
    {
      title: "Online Security",
      description: "Learn to protect yourself from scams, phishing, and online threats",
      status: 'completed' as const,
      progress: 100
    },
    {
      title: "Email Essentials",
      description: "Send, receive, and organize your emails with confidence",
      status: 'current' as const,
      progress: 30
    },
    {
      title: "Social Media Safety",
      description: "Connect with family while staying safe on Facebook and other platforms",
      status: 'locked' as const,
      progress: 0
    },
    {
      title: "Video Calling",
      description: "Stay connected with loved ones through Zoom, FaceTime, and WhatsApp",
      status: 'locked' as const,
      progress: 0
    },
    {
      title: "Online Shopping",
      description: "Shop safely online and avoid common pitfalls",
      status: 'locked' as const,
      progress: 0
    }
  ];

  const handleContinue = (title: string) => {
    navigate('/lesson', { state: { lessonTitle: title } });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">Learning Paths</h1>
          <p className="text-2xl text-white/80">Choose your journey to digital confidence</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {learningPaths.map((path, index) => (
            <PathNode
              key={index}
              title={path.title}
              description={path.description}
              status={path.status}
              progress={path.progress}
              onContinue={() => handleContinue(path.title)}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Paths;
