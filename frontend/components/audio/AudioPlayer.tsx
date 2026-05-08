'use client';

import { useAudio } from '@/context/AudioContext';

interface AudioPlayerProps {
  surahId: number;
  ayahNumber: number;
}

export default function AudioPlayer({ surahId, ayahNumber }: AudioPlayerProps) {
  const { currentPlaying, isPlaying, playAyah, pauseAudio } = useAudio();

  const verseKey = `${surahId}:${ayahNumber}`;
  const isThisPlaying = currentPlaying === verseKey && isPlaying;

  const handleClick = () => {
    if (isThisPlaying) {
      pauseAudio();
    } else {
      playAyah(surahId, ayahNumber);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200 hover:bg-[#2a3a5e] text-[#a0a0a0] hover:text-[#c9a84c]"
      aria-label={isThisPlaying ? 'Pause audio' : 'Play audio'}
    >
      {isThisPlaying ? (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
        </svg>
      ) : (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z" />
        </svg>
      )}
    </button>
  );
}
