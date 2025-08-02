
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import GlassCard from '@/components/GlassCard';
import { ArrowLeft, ArrowRight, Play, Pause, Volume2 } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const Lesson = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const lessonTitle = location.state?.lessonTitle || "Sample Lesson";

  const toggleAudio = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <GlassCard className="p-12">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-black mb-4">{lessonTitle}</h1>
              <div className="flex items-center space-x-4">
                <button
                  onClick={toggleAudio}
                  className="flex items-center space-x-2 bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition-all duration-300"
                >
                  {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                  <span className="text-lg">{isPlaying ? 'Pause' : 'Play'} Audio</span>
                </button>
                <Volume2 className="text-black/60" size={24} />
              </div>
            </div>

            <div className="prose prose-xl max-w-none mb-12">
              <div className="bg-gray-100 rounded-xl p-8 mb-8">
                <img 
                  src="/placeholder.svg" 
                  alt="Lesson illustration" 
                  className="w-full h-64 object-cover rounded-lg mb-6"
                />
                <p className="text-xl leading-relaxed text-black mb-6">
                  Welcome to your smartphone basics lesson. Today we'll learn how to make your first phone call safely and confidently.
                </p>
                <p className="text-xl leading-relaxed text-black mb-6">
                  Your smartphone is a powerful tool that can help you stay connected with family and friends. Let's start with the most basic function - making a phone call.
                </p>
                <div className="bg-white rounded-lg p-6 border-2 border-blue-200">
                  <h3 className="text-2xl font-bold text-black mb-4">Step 1: Find the Phone App</h3>
                  <p className="text-lg text-black">
                    Look for the green phone icon on your home screen. It usually looks like an old telephone handset.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <button
                onClick={() => navigate('/paths')}
                className="flex items-center space-x-3 bg-white border-2 border-black text-black px-8 py-4 rounded-xl text-xl font-semibold hover:bg-black hover:text-white transition-all duration-300"
              >
                <ArrowLeft size={24} />
                <span>Back to Paths</span>
              </button>

              <div className="text-black/60 text-lg">
                Lesson 1 of 5
              </div>

              <button
                className="flex items-center space-x-3 bg-black text-white px-8 py-4 rounded-xl text-xl font-semibold hover:bg-gray-800 transition-all duration-300"
              >
                <span>Next Lesson</span>
                <ArrowRight size={24} />
              </button>
            </div>
          </GlassCard>
        </div>
      </div>
    </Layout>
  );
};

export default Lesson;
