// AudioControls Component
// Features:
// - Play/Pause toggle
// - Skip forward/backward
// - Fast forward/rewind
// - Visual feedback on hover and active states
// - Smooth transitions and animations
// - Accessible controls with proper labels

import React from 'react';
import { Play, Pause, SkipForward, SkipBack, Rewind, FastForward } from 'lucide-react';

interface AudioControlsProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  onSkipBack: () => void;
  onSkipForward: () => void;
  onRewind: () => void;
  onFastForward: () => void;
}

export default function AudioControls({
  isPlaying,
  onPlayPause,
  onSkipBack,
  onSkipForward,
  onRewind,
  onFastForward
}: AudioControlsProps) {
  return (
    <div className="flex items-center gap-1.5">
      <button
        className="p-1 text-white/60 hover:text-white hover:scale-110 transition-all duration-200"
        onClick={onRewind}
        title="Rewind 10 seconds"
        aria-label="Rewind 10 seconds"
      >
        <Rewind size={14} />
      </button>
      
      <button
        className="p-1 text-white/60 hover:text-white hover:scale-110 transition-all duration-200"
        onClick={onSkipBack}
        aria-label="Previous track"
      >
        <SkipBack size={16} />
      </button>

      <button
        className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-all duration-200 
                 text-white hover:scale-110 hover:shadow-glow active:scale-95"
        onClick={onPlayPause}
        aria-label={isPlaying ? "Pause" : "Play"}
      >
        {isPlaying ? <Pause size={16} /> : <Play size={16} />}
      </button>

      <button
        className="p-1 text-white/60 hover:text-white hover:scale-110 transition-all duration-200"
        onClick={onSkipForward}
        aria-label="Next track"
      >
        <SkipForward size={16} />
      </button>

      <button
        className="p-1 text-white/60 hover:text-white hover:scale-110 transition-all duration-200"
        onClick={onFastForward}
        title="Forward 10 seconds"
        aria-label="Forward 10 seconds"
      >
        <FastForward size={14} />
      </button>
    </div>
  );
}