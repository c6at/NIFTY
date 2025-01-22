// MusicPlayer Component
// Main component that orchestrates the entire music player functionality
// Features:
// - File upload handling with drag and drop support
// - Audio playback controls with keyboard shortcuts
// - Interactive progress bar with seeking
// - Playlist management with search and filtering
// - Volume control with mute toggle
// - Track information display with metadata parsing
// - Responsive design with smooth animations
// - Custom scrollbar styling
// - Social links with hover effects

import React from 'react';
import { Music, Github } from 'lucide-react';
import { useAudioPlayer } from '../hooks/useAudioPlayer';
import AudioControls from './AudioControls';
import VolumeControl from './VolumeControl';
import PlaylistSidebar from './PlaylistSidebar';
import TrackInfo from './TrackInfo';

export default function MusicPlayer() {
  const { state, controls, audioRef } = useAudioPlayer();

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
      <img 
        src="https://files.catbox.moe/be7auc.png" 
        alt="nifty"
        className="w-[500px] mb-12 logo-animation social-link"
      />
      
      <div className="w-[550px] bg-[#111111] rounded-xl border border-white/10 player-glow mb-6 
                    hover:border-white/20 transition-colors duration-300">
        <div className="flex">
          <div className="flex-1 p-6">
            <label className={`flex items-center justify-center w-full border border-dashed 
                           border-white/20 rounded-lg cursor-pointer hover:bg-white/5 hover:border-white/30 
                           hover:scale-[1.02] active:scale-[0.98] transition-all duration-200
                           ${state.tracks.length === 0 ? 'p-4' : 'p-4 mb-4'}`}>
              <input
                type="file"
                accept="audio/*"
                multiple
                onChange={controls.handleFileChange}
                className="hidden"
              />
              <Music className="mr-2 text-white" size={20} />
              <span className="text-base text-white/60">choose audio files</span>
            </label>

            {state.currentTrack && (
              <div className="flex flex-col gap-4 mb-6 animate-fadeIn">
                <TrackInfo 
                  track={state.currentTrack} 
                  currentTime={state.currentTime}
                  duration={state.duration}
                  onSeek={controls.handleSeek}
                />
                <div className="flex items-center justify-between">
                  <AudioControls
                    isPlaying={state.isPlaying}
                    onPlayPause={controls.togglePlay}
                    onSkipBack={controls.skipToPrevious}
                    onSkipForward={controls.skipToNext}
                    onRewind={() => controls.handleSeek(state.currentTime - 10)}
                    onFastForward={() => controls.handleSeek(state.currentTime + 10)}
                  />
                  <VolumeControl
                    isMuted={state.isMuted}
                    onToggleMute={controls.toggleMute}
                    onVolumeChange={(e) => {
                      const newVolume = parseFloat(e.target.value);
                      if (audioRef.current) {
                        audioRef.current.volume = newVolume;
                      }
                      controls.setVolume(newVolume);
                    }}
                    volume={state.volume}
                  />
                </div>
              </div>
            )}

            <audio
              ref={audioRef}
              src={state.currentTrack?.url}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />
          </div>

          {state.tracks.length > 0 && (
            <PlaylistSidebar
              tracks={state.tracks}
              currentTrack={state.currentTrack}
              onTrackSelect={controls.handleTrackSelect}
              onTrackRemove={controls.removeTrack}
              onShuffle={controls.shufflePlaylist}
              isShuffled={state.isShuffled}
            />
          )}
        </div>
      </div>

      <div className="flex items-center justify-center gap-12 mt-6">
        <a
          href="https://x.com/c6ats"
          target="_blank"
          rel="noopener noreferrer"
          className="social-link"
        >
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/X_logo_2023_%28white%29.png/600px-X_logo_2023_%28white%29.png?20230728230735"
            alt="X (formerly Twitter)"
            className="w-5 h-5 opacity-50 hover:opacity-100 transition-opacity duration-300"
          />
        </a>
        
        <a
          href="https://github.com/c6at"
          target="_blank"
          rel="noopener noreferrer"
          className="social-link"
        >
          <Github size={28} className="text-white/50 hover:text-white transition-colors duration-300" />
        </a>
      </div>

      <div className="text-white/30 text-sm mt-6">
        project by ary
      </div>
    </div>
  );
}