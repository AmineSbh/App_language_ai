import { useEffect, useRef } from 'react';

export const useAudio = (audioSrc) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio && audioSrc) {
      audio.src = audioSrc;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      audio.play().catch((error) => {
        console.log("Autoplay was prevented. Please interact with the page to play audio.");
      });
    }
  }, [audioSrc]);

  return audioRef;
};