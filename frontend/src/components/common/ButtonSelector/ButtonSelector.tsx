// src/components/ButtonSelector/ButtonSelector.tsx
import React, { useState } from 'react';
import AudioRecorder from '../../AudioRecorder/AudioRecorder';

const ButtonSelector: React.FC = () => {
  const [selectedButton, setSelectedButton] = useState<number | null>(null);
  const [showRecorder, setShowRecorder] = useState<boolean>(false);

  const buttons = [
    { id: 1, text: "Option 1" },
    { id: 2, text: "Option 2" },
    { id: 3, text: "Option 3" }
  ];

  const handleButtonClick = (id: number) => {
    setSelectedButton(id);
  };

  const handleShowRecorder = () => {
    setShowRecorder(true);
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
        <button 
          className="
            px-6 py-3 
            bg-green-500 
            text-white 
            rounded-lg 
            transition-all 
            duration-300
            hover:bg-green-600 
            hover:shadow-lg
            transform hover:scale-105
            flex items-center gap-2
          "
          onClick={handleShowRecorder}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
          </svg>
          Enregistrer Audio
        </button>
      )}

      {showRecorder && <AudioRecorder />}
    </div>
  );
};

export default ButtonSelector;