import { useState, useRef } from "react";

export const useSpeechRecognition = (onRecordingComplete: (file: File) => void) => {
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);

  const toggleRecording = async () => {
    if (isRecording) {
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stop();
      }
      streamRef.current?.getTracks().forEach((track) => track.stop());
      setIsRecording(false);
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        streamRef.current = stream;
        const tracks = stream.getAudioTracks();
        tracks.forEach(track => track.getSettings());

        const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
        const supportedType = isSafari ? "audio/mp4" : "audio/webm;codecs=opus";
        const mediaRecorder = new MediaRecorder(stream, { mimeType: supportedType });

        mediaRecorderRef.current = mediaRecorder;
        audioChunksRef.current = [];

        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            audioChunksRef.current.push(event.data);
          }
        };

        mediaRecorder.onstop = () => {
          const audioBlob = new Blob(audioChunksRef.current, { type: supportedType });
          if (audioBlob.size > 0) {
            const file = new File([audioBlob], "recording.webm", { type: supportedType });
            onRecordingComplete(file);
          }
        };

        mediaRecorder.start();
        setIsRecording(true);
      } catch (error) {
        console.error("Erreur d'accès au microphone:", error);
        setIsRecording(false);
        // Informer l'utilisateur de l'erreur
      }
    }
  };

  return { isRecording, toggleRecording };
};