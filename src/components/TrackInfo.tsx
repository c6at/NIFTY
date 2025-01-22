// TrackInfo Component
// Features:
// - Displays current track information with album art
// - Shows track title with scrolling animation for long text
// - Interactive progress bar for seeking
// - Handles missing album art with fallback icon
// - Smooth animations and transitions
// - Responsive layout with proper spacing

import React from 'react';
import { Track } from '../types';
import { Music } from 'lucide-react';
import ScrollingText from './ScrollingText';
import ProgressBar from './ProgressBar';

interface TrackInfoProps {
  track: Track;
  currentTime: number;
  duration: number;
  onSeek: (time: number) => void;
}

export default function TrackInfo({ track, currentTime, duration, onSeek }: TrackInfoProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-md overflow-hidden flex-shrink-0">
          {track.coverUrl ? (
            <img
              src={track.coverUrl}
              alt="album art"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-white/5 flex items-center justify-center">
              <Music size={16} className="text-white/20" />
            </div>
          )}
        </div>
        <div className="min-w-0 flex-1 max-w-[200px]">
          <ScrollingText 
            text={track.title}
            className="text-xs font-medium text-white/90 truncate"
          />
        </div>
      </div>
      <ProgressBar 
        currentTime={currentTime}
        duration={duration}
        onSeek={onSeek}
      />
    </div>
  );
}