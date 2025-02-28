import { useEffect, useRef } from 'react';

export const useAudio = (audioSrc) => {
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio && audioSrc) {
      audio.src = audioSrc;
      audio.play().catch((error) => {
        console.log("Autoplay was prevented. Please interact with the page to play audio.");
      });
    }
  }, [audioSrc]);

  return audioRef;
};