import { useState, useCallback } from 'react';
import { useAudio } from './useAudio';

export const useAudioManager = () => {
  const audioRef = useAudio(undefined);
  const [isPlaying, setIsPlaying] = useState(false);

  const playAudio = useCallback(async (audioSrc: string) => {
    if (!audioSrc || !audioRef.current) return;

    try {
      audioRef.current.pause();
      audioRef.current.src = '';
      audioRef.current.src = audioSrc;
      await audioRef.current.play();
      setIsPlaying(true);
    } catch (err) {
      console.error("Error playing audio:", err);
      setIsPlaying(false);
    }
  }, [audioRef]);

  return {
    audioRef,
    isPlaying,
    setIsPlaying,
    playAudio
  };
};