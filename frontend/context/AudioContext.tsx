'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode, useRef, useEffect } from 'react';
import { getAbsoluteAyahNumber, getAudioUrl } from '@/lib/utils';

interface AudioContextType {
  currentPlaying: string | null;
  isPlaying: boolean;
  playAyah: (surahId: number, ayahNumber: number) => void;
  pauseAudio: () => void;
  stopAudio: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: ReactNode }) {
  const [currentPlaying, setCurrentPlaying] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const stopAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    setIsPlaying(false);
    setCurrentPlaying(null);
  }, []);

  const pauseAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, []);

  const playAyah = useCallback((surahId: number, ayahNumber: number) => {
    const verseKey = `${surahId}:${ayahNumber}`;

    if (currentPlaying === verseKey && isPlaying) {
      pauseAudio();
      return;
    }

    stopAudio();

    const absoluteNumber = getAbsoluteAyahNumber(surahId, ayahNumber);
    const audioUrl = getAudioUrl(absoluteNumber);

    const audio = new Audio(audioUrl);
    audioRef.current = audio;

    audio.addEventListener('ended', () => {
      stopAudio();
    });

    audio.addEventListener('error', () => {
      console.error('Audio playback error');
      stopAudio();
    });

    audio.play().catch((error) => {
      console.error('Failed to play audio:', error);
      stopAudio();
    });

    setCurrentPlaying(verseKey);
    setIsPlaying(true);
  }, [currentPlaying, isPlaying, pauseAudio, stopAudio]);

  useEffect(() => {
    return () => {
      stopAudio();
    };
  }, [stopAudio]);

  return (
    <AudioContext.Provider value={{ currentPlaying, isPlaying, playAyah, pauseAudio, stopAudio }}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
}
