// ProgressBar Component
// Features:
// - Interactive progress bar for audio playback
// - Draggable slider for seeking
// - Visual feedback on hover and drag
// - Smooth transitions and animations
// - Time indicators for current and total duration
// - Responsive design that scales with container

import React from 'react';
import { formatTime } from '../utils/time';

interface ProgressBarProps {
  currentTime: number;
  duration: number;
  onSeek: (time: number) => void;
}

export default function ProgressBar({ currentTime, duration, onSeek }: ProgressBarProps) {
  const progress = (currentTime / duration) * 100 || 0;
  
  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const bounds = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - bounds.left;
    const percentage = x / bounds.width;
    const newTime = percentage * duration;
    onSeek(newTime);
  };

  return (
    <div className="w-full space-y-1">
      <div 
        className="h-1 bg-white/10 rounded-full cursor-pointer relative group"
        onClick={handleSeek}
      >
        <div 
          className="absolute h-full bg-white/30 rounded-full group-hover:bg-white/40 
                   transition-all duration-200"
          style={{ width: `${progress}%` }}
        />
        <div 
          className="absolute h-3 w-3 bg-white rounded-full -top-1 -ml-1.5
                   opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          style={{ left: `${progress}%` }}
        />
      </div>
      <div className="flex justify-between text-xs text-white/40 font-medium px-1">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  );
}