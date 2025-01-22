// PlaylistSidebar Component
// Features:
// - Displays list of tracks with album art thumbnails
// - Search functionality for filtering tracks
// - Smooth hover effects for track items
// - Remove track functionality with confirmation
// - Current track highlighting
// - Custom scrollbar styling
// - Shuffle playlist functionality
// - Text overflow handling with scrolling animation

import React, { useState } from 'react';
import { ListMusic, Trash2, Music, Shuffle } from 'lucide-react';
import { Track } from '../types';
import ScrollingText from './ScrollingText';
import SearchBar from './SearchBar';

interface PlaylistSidebarProps {
  tracks: Track[];
  currentTrack: Track | null;
  onTrackSelect: (track: Track) => void;
  onTrackRemove: (track: Track) => void;
  onShuffle: () => void;
  isShuffled: boolean;
}

export default function PlaylistSidebar({
  tracks,
  currentTrack,
  onTrackSelect,
  onTrackRemove,
  onShuffle,
  isShuffled
}: PlaylistSidebarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter tracks based on search query
  const filteredTracks = tracks.filter(track => 
    track.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-60 p-6 border-l border-white/10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-white/80 text-sm font-medium flex items-center gap-2">
          <ListMusic size={14} className="opacity-60" />
          playlist
        </h2>
        <button
          onClick={onShuffle}
          className={`p-1 transition-all duration-200 hover:scale-110 ${
            isShuffled ? 'text-white' : 'text-white/60 hover:text-white'
          }`}
          title="Shuffle playlist"
        >
          <Shuffle size={14} />
        </button>
      </div>

      {tracks.length > 0 && (
        <div className="mb-4">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>
      )}

      {tracks.length === 0 ? (
        <div className="text-white/40 text-xs flex flex-col items-center justify-center h-16 text-center">
          <p>no audio files imported yet</p>
        </div>
      ) : (
        <div className="playlist-scroll space-y-2 max-h-[300px] overflow-y-auto pr-2">
          {filteredTracks.map((track) => (
            <div
              key={track.url}
              className={`group flex items-center gap-2 p-2 rounded-md transition-all duration-200 ${
                currentTrack?.url === track.url
                  ? 'bg-white/10'
                  : 'hover:bg-white/5 hover:translate-x-1'
              }`}
            >
              <div className="w-8 h-8 rounded-md overflow-hidden flex-shrink-0">
                {track.coverUrl ? (
                  <img
                    src={track.coverUrl}
                    alt="album art"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-white/5 flex items-center justify-center">
                    <Music size={12} className="text-white/20" />
                  </div>
                )}
              </div>
              
              <button
                onClick={() => onTrackSelect(track)}
                className="flex-1 text-left min-w-0"
              >
                <ScrollingText 
                  text={track.title}
                  className="text-xs font-medium text-white/90"
                />
              </button>
              
              <button
                onClick={() => onTrackRemove(track)}
                className="opacity-0 group-hover:opacity-100 p-1 hover:bg-white/10 
                         rounded-full transition-all duration-200 text-white"
                title="remove track"
              >
                <Trash2 size={12} className="text-white/60 hover:text-white/90" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}