// VolumeControl Component
// Features:
// - Volume adjustment with slider
// - Mute toggle functionality
// - Visual feedback for current volume level
// - Smooth transitions and hover effects
// - Accessible controls with proper ARIA labels
// - Responsive design that works across devices

import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface VolumeControlProps {
  isMuted: boolean;
  onToggleMute: () => void;
  onVolumeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  volume: number;
}

export default function VolumeControl({
  isMuted,
  onToggleMute,
  onVolumeChange,
  volume
}: VolumeControlProps) {
  return (
    <div className="flex items-center gap-2">
      <button
        className="p-1 text-white/60 hover:text-white transition-colors"
        onClick={onToggleMute}
        aria-label={isMuted ? "Unmute" : "Mute"}
      >
        {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
      </button>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        className="w-20"
        onChange={onVolumeChange}
        aria-label="Volume"
      />
    </div>
  );
}