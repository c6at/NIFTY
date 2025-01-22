// Metadata Extraction Utility
// Handles the extraction of audio file metadata including:
// - Title
// - Artist
// - Duration
// - Cover art
// Uses music-metadata-browser for parsing audio files

import * as musicMetadata from 'music-metadata-browser';
import { Track } from '../types';
import { formatTime } from './time';

export const extractMetadata = async (file: File): Promise<Track> => {
  const url = URL.createObjectURL(file);
  try {
    const metadata = await musicMetadata.parseBlob(file);
    
    // Extract title from metadata or fallback to filename
    const title = metadata.common.title || file.name.replace(/\.[^/.]+$/, "");
    
    // Extract artist name from multiple possible metadata fields
    let artist = "Unknown Artist";
    
    // Try to get artist name from various metadata fields in order of preference
    if (metadata.common.artist) {
      artist = metadata.common.artist;
    } else if (metadata.common.albumartist) {
      artist = metadata.common.albumartist;
    } else if (metadata.common.composer) {
      artist = metadata.common.composer;
    } else if (metadata.common.performers && metadata.common.performers.length > 0) {
      artist = metadata.common.performers[0];
    }
    
    // Extract cover art if available
    let coverUrl = undefined;
    if (metadata.common.picture?.[0]) {
      const blob = new Blob([metadata.common.picture[0].data], { 
        type: metadata.common.picture[0].format 
      });
      coverUrl = URL.createObjectURL(blob);
    }

    return {
      title,
      artist,
      duration: formatTime(metadata.format.duration || 0),
      url,
      coverUrl
    };
  } catch (error) {
    console.error('Error extracting metadata:', error);
    // Fallback values if metadata extraction fails
    return {
      title: file.name.replace(/\.[^/.]+$/, ""),
      artist: "Unknown Artist",
      duration: "00:00",
      url,
      coverUrl: undefined
    };
  }
};