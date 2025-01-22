// useAudioPlayer Hook
// Core hook that manages the audio player state and functionality
// Features:
// - Audio playback state management
// - Track list management with shuffle support
// - Progress tracking and seeking
// - Volume control with mute support
// - Metadata handling
// - Error handling and recovery
// - Event listeners cleanup

import { useState, useRef, useEffect } from 'react';
import { Track } from '../types';
import { extractMetadata } from '../utils/metadata';

export function useAudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isShuffled, setIsShuffled] = useState(false);
  const [shuffledIndices, setShuffledIndices] = useState<number[]>([]);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  
  const audioRef = useRef<HTMLAudioElement>(null);

  // Update duration when a new track is loaded
  useEffect(() => {
    if (audioRef.current) {
      const audio = audioRef.current;

      const handleLoadedMetadata = () => {
        setDuration(audio.duration);
      };

      const handleTimeUpdate = () => {
        setCurrentTime(audio.currentTime);
      };

      const handleEnded = () => {
        skipToNext();
      };

      // Add event listeners
      audio.addEventListener('loadedmetadata', handleLoadedMetadata);
      audio.addEventListener('timeupdate', handleTimeUpdate);
      audio.addEventListener('ended', handleEnded);

      // Cleanup
      return () => {
        audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
        audio.removeEventListener('timeupdate', handleTimeUpdate);
        audio.removeEventListener('ended', handleEnded);
      };
    }
  }, [currentTrack]);

  // Handle seeking
  const handleSeek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  // Shuffle the playlist
  const shufflePlaylist = () => {
    setIsShuffled(!isShuffled);
    if (!isShuffled) {
      const indices = Array.from({ length: tracks.length }, (_, i) => i);
      for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
      }
      setShuffledIndices(indices);
    }
  };

  // Handle file selection
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const newTracks = await Promise.all(files.map(extractMetadata));
    setTracks(prev => [...prev, ...newTracks]);
    
    if (!currentTrack) {
      setCurrentTrack(newTracks[0]);
      setCurrentTrackIndex(tracks.length);
      setIsPlaying(true);
    }
  };

  // Get next track index based on shuffle state
  const getNextTrackIndex = (currentIndex: number, direction: 'next' | 'prev' = 'next') => {
    if (isShuffled) {
      const currentShuffleIndex = shuffledIndices.indexOf(currentIndex);
      const nextShuffleIndex = direction === 'next'
        ? (currentShuffleIndex + 1) % tracks.length
        : (currentShuffleIndex - 1 + tracks.length) % tracks.length;
      return shuffledIndices[nextShuffleIndex];
    }
    return direction === 'next'
      ? (currentIndex + 1) % tracks.length
      : (currentIndex - 1 + tracks.length) % tracks.length;
  };

  // Playback controls
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(console.error);
      }
      setIsPlaying(!isPlaying);
    }
  };

  const skipToNext = () => {
    if (tracks.length === 0) return;
    const nextIndex = getNextTrackIndex(currentTrackIndex);
    setCurrentTrackIndex(nextIndex);
    setCurrentTrack(tracks[nextIndex]);
    setIsPlaying(true);
  };

  const skipToPrevious = () => {
    if (tracks.length === 0) return;
    const prevIndex = getNextTrackIndex(currentTrackIndex, 'prev');
    setCurrentTrackIndex(prevIndex);
    setCurrentTrack(tracks[prevIndex]);
    setIsPlaying(true);
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTrackSelect = (track: Track) => {
    const index = tracks.findIndex(t => t.url === track.url);
    setCurrentTrackIndex(index);
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  const removeTrack = (track: Track) => {
    const newTracks = tracks.filter(t => t.url !== track.url);
    setTracks(newTracks);
    if (currentTrack?.url === track.url) {
      setCurrentTrack(newTracks[0] || null);
      setCurrentTrackIndex(0);
    }
  };

  return {
    state: {
      isPlaying,
      isMuted,
      volume,
      tracks,
      currentTrack,
      currentTrackIndex,
      isShuffled,
      currentTime,
      duration
    },
    controls: {
      handleFileChange,
      togglePlay,
      skipToNext,
      skipToPrevious,
      toggleMute,
      handleSeek,
      handleTrackSelect,
      removeTrack,
      setVolume,
      shufflePlaylist
    },
    audioRef
  };
}