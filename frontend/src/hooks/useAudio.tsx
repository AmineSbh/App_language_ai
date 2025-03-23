import { useEffect, useRef } from 'react';

export const useAudio = (audioSrc: string | undefined) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio && audioSrc) {
      audio.src = audioSrc;
      audio.play().catch(() => {
        console.log("Autoplay was prevented. Please interact with the page to play audio.");
      });
    }
  }, [audioSrc]);

  return audioRef;
};