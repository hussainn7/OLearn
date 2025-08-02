
import React from 'react';
import Layout from '@/components/Layout';
import GlassCard from '@/components/GlassCard';
import { Share2, Trophy, Target, Calendar } from 'lucide-react';

const Progress = () => {
  const progressData = [
    { topic: 'Smartphone Basics', completed: 13, total: 20, percentage: 65 },
    { topic: 'Online Security', completed: 8, total: 8, percentage: 100 },
    { topic: 'Email Essentials', completed: 3, total: 10, percentage: 30 },
    { topic: 'Social Media Safety', completed: 0, total: 12, percentage: 0 },
    { topic: 'Video Calling', completed: 0, total: 6, percentage: 0 },
    { topic: 'Online Shopping', completed: 0, total: 15, percentage: 0 },
  ];

  const totalCompleted = progressData.reduce((acc, item) => acc + item.completed, 0);
  const totalLessons = progressData.reduce((acc, item) => acc + item.total, 0);
  const overallPercentage = Math.round((totalCompleted / totalLessons) * 100);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-white mb-4">Your Progress</h1>
            <p className="text-2xl text-white/80">Track your learning journey</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <GlassCard className="p-8 text-center">
              <Trophy className="mx-auto text-yellow-500 mb-4" size={48} />
              <h3 className="text-3xl font-bold text-black mb-2">{totalCompleted}</h3>
              <p className="text-lg text-black/70">Lessons Completed</p>
            </GlassCard>

            <GlassCard className="p-8 text-center">
              <Target className="mx-auto text-blue-500 mb-4" size={48} />
              <h3 className="text-3xl font-bold text-black mb-2">{overallPercentage}%</h3>
              <p className="text-lg text-black/70">Overall Progress</p>
            </GlassCard>

            <GlassCard className="p-8 text-center">
              <Calendar className="mx-auto text-green-500 mb-4" size={48} />
              <h3 className="text-3xl font-bold text-black mb-2">12</h3>
              <p className="text-lg text-black/70">Days Active</p>
            </GlassCard>
          </div>

          <GlassCard className="p-12">
            <h2 className="text-3xl font-bold text-black mb-8">Progress by Topic</h2>
            
            <div className="space-y-8">
              {progressData.map((item, index) => (
                <div key={index} className="bg-white/50 rounded-xl p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-black">{item.topic}</h3>
                    <span className="text-lg font-medium text-black">
                      {item.completed} / {item.total} lessons
                    </span>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-blue-600 h-4 rounded-full transition-all duration-500"
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-black/60">{item.percentage}% Complete</span>
                    {item.percentage === 100 && (
                      <span className="text-green-600 font-medium">✓ Completed</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <button className="flex items-center space-x-3 bg-white border-2 border-black text-black px-8 py-4 rounded-xl text-xl font-bold hover:bg-black hover:text-white transition-all duration-300 mx-auto">
                <Share2 size={24} />
                <span>Share Progress with Buddy</span>
              </button>
              <p className="text-black/60 mt-4 text-lg">
                Let your learning partner know about your achievements!
              </p>
            </div>
          </GlassCard>
        </div>
      </div>
    </Layout>
  );
};

export default Progress;
