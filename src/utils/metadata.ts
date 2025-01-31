// Metadata Extraction Utility
// Handles the extraction of audio file metadata including:
// - Title
// - Duration

import * as musicMetadata from 'music-metadata-browser';
import { Track } from '../types';
import { formatTime } from './time';

export const extractMetadata = async (file: File): Promise<Track> => {
  const url = URL.createObjectURL(file);
  try {
    const metadata = await musicMetadata.parseBlob(file);
    
    // extract title from metadata or fallback to filename
    const title = metadata.common.title || file.name.replace(/\.[^/.]+$/, "");
    
    return {
      title,
      artist,
      duration: formatTime(metadata.format.duration || 0),
      url,
      coverUrl
    };
  } catch (error) {
    console.error('Error extracting metadata:', error);
    // fallback values if metadata extraction fails
    return {
      title: file.name.replace(/\.[^/.]+$/, ""),
      duration: "00:00",
      url,
      coverUrl: undefined
    };
  }
};
