
import React from 'react';
import GlassCard from './GlassCard';
import { CheckCircle, Clock, Lock, Play } from 'lucide-react';

interface PathNodeProps {
  title: string;
  description: string;
  status: 'completed' | 'in_progress' | 'not_started' | 'locked';
  progress?: number;
  onContinue?: () => void;
}

const PathNode = ({ title, description, status, progress = 0, onContinue }: PathNodeProps) => {
  const getStatusIcon = () => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="text-green-600" size={32} />;
      case 'in_progress':
        return <Clock className="text-blue-600" size={32} />;
      case 'not_started':
        return <Play className="text-gray-600" size={32} />;
      case 'locked':
        return <Lock className="text-gray-400" size={32} />;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'not_started':
        return 'bg-gray-100 text-gray-600';
      case 'locked':
        return 'bg-gray-100 text-gray-600';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'in_progress':
        return 'In Progress';
      case 'not_started':
        return 'Start';
      case 'locked':
        return 'Locked';
    }
  };

  const showProgress = status === 'in_progress' || status === 'completed';

  return (
    <GlassCard className="p-8 hover:scale-105 transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-black mb-2">{title}</h3>
          <p className="text-lg text-black/70 mb-4">{description}</p>
        </div>
        <div className="ml-4">
          {getStatusIcon()}
        </div>
      </div>
      
      {showProgress && (
        <div className="mb-4">
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-blue-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-sm text-black/60 mt-2">{progress}% Complete</p>
        </div>
      )}
      
      <div className="flex items-center justify-between">
        <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor()}`}>
          {getStatusText()}
        </span>
        
        {(status === 'completed' || status === 'in_progress' || status === 'not_started') && (
          <button
            onClick={onContinue}
            className="px-6 py-3 border-2 border-black text-black rounded-xl text-lg font-semibold hover:bg-black hover:text-white transition-all duration-300"
          >
            {status === 'completed' ? 'Review' : status === 'in_progress' ? 'Continue' : 'Start'}
          </button>
        )}
      </div>
    </GlassCard>
  );
};

export default PathNode;
