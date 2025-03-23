import React, { useEffect, useCallback, useState } from 'react';
import { startConversationWithAudio } from '../../services/apiService';
import { useSpeechRecognition } from '../../hooks/useSpeechRecognition';
import { useAudioManager } from '../../hooks/useAudioManager';
import { saveAudioLocally } from '../../services/audioService';
import SpeechWave from './SpeechWave';
import ControlButtons from './ControlButtons';
import TranslationDisplay from './TranslationDisplay';

interface RolePlayPageProps {
  selectedScenario: string;
  audioSrc?: string;
  french: string;
  english: string;
}

const RolePlayPage: React.FC<RolePlayPageProps> = ({ selectedScenario, audioSrc, french, english }) => {
  const { audioRef, isPlaying, setIsPlaying, playAudio } = useAudioManager();
  const [recordingFile, setRecordingFile] = useState<File | null>(null);
  const [frenchText, setFrenchText] = useState(french);
  const [englishText, setEnglishText] = useState(english);
  const [toggleTranslation, setToggleTranslation] = useState(false);

  useEffect(() => {
    setFrenchText(french);
  }, [french]);

  useEffect(() => {
    setEnglishText(english);
  }, [english]);

  // SUPPRIMEZ OU COMMENTEZ CE USEEFFECT S'IL EXISTE DANS VOTRE CODE
  // useEffect(() => {
  //   initializeMicrophone(); // Cette ligne initialise automatiquement le micro au chargement
  // }, []);

  const { isRecording, toggleRecording } = useSpeechRecognition((file) => {
    if (file && file.size > 0) {
      setRecordingFile(file);
    } else {
      console.error('Error: Recorded file is empty.');
    }
  });

  const handleSaveLocally = useCallback(() => {
    if (recordingFile) {
      saveAudioLocally(recordingFile);
    }
  }, [recordingFile]);

  const sendMessageToEndpoint = useCallback(async (file: File) => {
    if (!file || file.size === 0) {
      console.error('Error: Attempted to send an empty file.');
      return;
    }

    try {
      const { audio, frenchText, englishText } = await startConversationWithAudio(selectedScenario, file);
      const newAudioUrl = URL.createObjectURL(audio);
      await playAudio(newAudioUrl);

      setFrenchText(frenchText);
      setEnglishText(englishText);
    } catch (error) {
      console.error('Error sending message to endpoint:', error);
    }
  }, [selectedScenario, playAudio]);

  useEffect(() => {
    if (audioSrc) {
      playAudio(audioSrc); // Cette ligne joue l'audio initial automatiquement
    }
  }, [audioSrc, playAudio]);

  useEffect(() => {
    if (recordingFile && !isRecording) {
      sendMessageToEndpoint(recordingFile);
    }
  }, [recordingFile, isRecording, sendMessageToEndpoint]);

  return (
    <div className="role-play-page">
      <SpeechWave isPlaying={isPlaying} />

      <audio
        ref={audioRef}
        autoPlay
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      >
        Your browser does not support the audio element.
      </audio>

      <ControlButtons
        isRecording={isRecording}
        isPlaying={isPlaying}
        onToggleRecording={toggleRecording}
        onSaveLocally={handleSaveLocally}
        onToggleTranslation={() => setToggleTranslation(!toggleTranslation)}
      />

      {toggleTranslation && (
        <TranslationDisplay
          germanText={frenchText}
          englishText={englishText}
        />
      )}
    </div>
  );
};

export default RolePlayPage;