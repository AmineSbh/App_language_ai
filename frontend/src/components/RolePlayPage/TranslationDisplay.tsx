import React, { useState } from 'react';

const TranslationDisplay = ({ germanText, englishText }) => {
  const [selectedLanguage, setSelectedLanguage] = useState('german');

  return (
    <div className="translation-display">
      <div className="translation-content">
        <p className="translation-text">
          {selectedLanguage === 'german' ? germanText : englishText}
        </p>
      </div>

      <div className="language-toggle">
        <button
          onClick={() => setSelectedLanguage('german')}
          className={`toggle-button ${selectedLanguage === 'german' ? 'active' : ''}`}
        >
          DE
        </button>
        <button
          onClick={() => setSelectedLanguage('english')}
          className={`toggle-button ${selectedLanguage === 'english' ? 'active' : ''}`}
        >
          EN
        </button>
      </div>
    </div>
  );
};

export default TranslationDisplay;