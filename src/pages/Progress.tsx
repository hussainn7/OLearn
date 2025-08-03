
import React from 'react';
import Layout from '@/components/Layout';
import GlassCard from '@/components/GlassCard';
import { Share2, Trophy, Target, Calendar } from 'lucide-react';
import { useProgress } from '@/contexts/ProgressContext';
import { useAuth } from '@/contexts/AuthContext';

const Progress = () => {
  const { userProgress, isLoading } = useProgress();
  const { user } = useAuth();

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
        </div>
      </Layout>
    );
  }

  const totalCompleted = userProgress.reduce((acc, item) => acc + item.completed_lessons, 0);
  const totalLessons = userProgress.reduce((acc, item) => acc + item.total_lessons, 0);
  const overallPercentage = totalLessons > 0 ? Math.round((totalCompleted / totalLessons) * 100) : 0;

  // Calculate days active (simplified - you can enhance this)
  const daysActive = user ? Math.ceil((Date.now() - new Date(user.created_at).getTime()) / (1000 * 60 * 60 * 24)) : 0;

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
              <h3 className="text-3xl font-bold text-black mb-2">{daysActive}</h3>
              <p className="text-lg text-black/70">Days Active</p>
            </GlassCard>
          </div>

          <GlassCard className="p-12">
            <h2 className="text-3xl font-bold text-black mb-8">Progress by Topic</h2>
            
            {userProgress.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-lg text-black/60 mb-4">No progress yet. Start your first learning path!</p>
                <button 
                  onClick={() => window.location.href = '/paths'}
                  className="bg-black text-white px-6 py-3 rounded-lg hover:bg-black/80 transition-colors"
                >
                  Explore Learning Paths
                </button>
              </div>
            ) : (
              <div className="space-y-8">
                {userProgress.map((item, index) => (
                  <div key={index} className="bg-white/50 rounded-xl p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl font-semibold text-black">{item.path_title}</h3>
                      <span className="text-lg font-medium text-black">
                        {item.completed_lessons} / {item.total_lessons} lessons
                      </span>
                    </div>
                    
                    <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-blue-600 h-4 rounded-full transition-all duration-500"
                        style={{ width: `${item.progress_percentage}%` }}
                      ></div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-black/60">{item.progress_percentage}% Complete</span>
                      {item.status === 'completed' && (
                        <span className="text-green-600 font-medium">✓ Completed</span>
                      )}
                      {item.status === 'in_progress' && (
                        <span className="text-blue-600 font-medium">In Progress</span>
                      )}
                      {item.status === 'not_started' && (
                        <span className="text-gray-600 font-medium">Not Started</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="text-center mt-12">
              <button className="flex items-center space-x-3 bg-white border-2 border-black text-black px-8 py-4 rounded-xl text-xl font-bold hover:bg-black hover:text-white transition-all duration-300 mx-auto">
                <Share2 size={24} />
                <span>Share Progress</span>
              </button>
            </div>
          </GlassCard>
        </div>
      </div>
    </Layout>
  );
};

export default Progress;
