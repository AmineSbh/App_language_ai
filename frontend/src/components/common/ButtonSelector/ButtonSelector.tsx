// src/components/ButtonSelector/ButtonSelector.tsx
import React, { useState } from 'react';
import { useSpeechRecognition } from '../../hooks/useSpeechRecognition';

const ButtonSelector: React.FC = () => {
  const [selectedButton, setSelectedButton] = useState<number | null>(null);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [audioURL, setAudioURL] = useState<string | null>(null);

  // Fonction qui sera appelée quand l'enregistrement est terminé
  const handleRecordingComplete = (file: File) => {
    setAudioFile(file);
    const url = URL.createObjectURL(file);
    setAudioURL(url);
    
    // Ici, vous pourriez envoyer le fichier à votre API pour traduction
    // sendAudioForTranslation(file);
  };

  const { isRecording, toggleRecording } = useSpeechRecognition(handleRecordingComplete);

  const buttons = [
    { id: 1, text: "Option 1" },
    { id: 2, text: "Option 2" },
    { id: 3, text: "Option 3" }
  ];

  const handleButtonClick = (id: number) => {
    setSelectedButton(id);
  };

  return (
    <div className="flex flex-col items-center gap-6 p-6">
      <div className="flex gap-4">
        {buttons.map((button) => (
          <button
            key={button.id}
            className={`
              px-6 py-3 
              rounded-lg 
              border-2 
              transition-all 
              duration-300 
              hover:shadow-lg
              ${
                selectedButton === button.id
                  ? 'bg-blue-500 text-white border-blue-500 hover:bg-blue-600'
                  : 'bg-white text-blue-500 border-blue-500 hover:bg-blue-50'
              }
            `}
            onClick={() => handleButtonClick(button.id)}
          >
            {button.text}
          </button>
        ))}
      </div>

      {selectedButton && (
        <div className="flex flex-col items-center gap-4">
          <button 
            className={`
              px-6 py-3 
              ${isRecording ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}
              text-white 
              rounded-lg 
              transition-all 
              duration-300
              hover:shadow-lg
              transform hover:scale-105
              flex items-center gap-2
            `}
            onClick={toggleRecording}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
            {isRecording ? "Arrêter l'enregistrement" : "Enregistrer Audio"}
          </button>
          
          {isRecording && (
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-75"></div>
              <div className="relative flex items-center justify-center w-16 h-16 bg-red-600 rounded-full">
                <div className="w-4 h-4 bg-white rounded-sm"></div>
              </div>
            </div>
          )}
          
          {audioURL && (
            <div className="mt-4 w-full max-w-md">
              <p className="text-sm text-gray-600 mb-2">Votre enregistrement :</p>
              <audio controls src={audioURL} className="w-full rounded-lg" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ButtonSelector;