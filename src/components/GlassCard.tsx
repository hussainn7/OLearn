
import React from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

const GlassCard = ({ children, className }: GlassCardProps) => {
  return (
    <div className={cn(
      "bg-white/80 backdrop-blur-2xl rounded-2xl border border-white/20 shadow-2xl",
      className
    )}>
      {children}
    </div>
  );
};

export default GlassCard;
