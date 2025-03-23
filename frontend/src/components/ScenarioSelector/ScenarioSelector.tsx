import React, { useState } from 'react';
import { FaShoppingCart, FaUtensils, FaTrain } from 'react-icons/fa';
import { startConversationWithText } from '../../services/apiService';
import RolePlayPage from '../RolePlayPage/RolePlayPage';
import Button from '../common/Button';
import Icon from '../common/Icon';

const ScenarioSelector = () => {
  const [selectedScenario, setSelectedScenario] = useState<string>('');
  const [audioSrc, setAudioSrc] = useState<string | null>(null);
  const [frenchText, setFrenchText] = useState('');
  const [englishText, setEnglishText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showRolePlayPage, setShowRolePlayPage] = useState(false);
  const logoPath = '../../assets/images/logo.png';

  const scenarios = [
    { name: 'supermarket', icon: <FaShoppingCart /> },
    { name: 'restaurant', icon: <FaUtensils /> },
    { name: 'train station', icon: <FaTrain /> },
  ];

  const handleScenarioSelect = (scenario) => {
    setSelectedScenario(scenario);
  };

  const handleStartRolePlay = async () => {
    if (!selectedScenario) {
      alert('Please select a scenario first.');
      return;
    }

    setIsLoading(true);

    try {
      //Get audio and texts from the API
      const { audio, frenchText, englishText } = await startConversationWithText(selectedScenario);
      const audioUrl = URL.createObjectURL(audio);

      //Store texts in state
      setAudioSrc(audioUrl);
      setFrenchText(frenchText);
      setEnglishText(englishText);

      setShowRolePlayPage(true);
    } catch (error) {
      console.error('Error starting role play:', error);
      alert('Failed to start role play. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-50">
      <div className="mb-8">
      <img 
        src={new URL(logoPath, import.meta.url).href} 
        alt="Logo" 
        className="h-16 w-auto" 
      />
      </div>
      
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Choose your scenario</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-3xl mb-8">
        {scenarios.map((scenario, index) => (
          <Button
            key={index}
            className={`flex flex-col items-center justify-center p-4 h-32 ${
              selectedScenario === scenario.name ? 'selected ring-2 ring-[#FF4081]' : ''
            }`}
            onClick={() => handleScenarioSelect(scenario.name)}
          >
            <Icon 
              icon={scenario.icon} 
              color={selectedScenario === scenario.name ? '#FF4081' : '#007bff'} 
              className="text-3xl mb-3"
            />
            <span className="capitalize">{scenario.name}</span>
          </Button>
        ))}
      </div>

      <Button 
        className="start-button w-64 py-3 text-lg font-medium" 
        onClick={handleStartRolePlay} 
        disabled={isLoading}
      >
        {isLoading ? 'Loading...' : 'Start Role-play'}
      </Button>

      {showRolePlayPage && (
        <div className="w-full mt-8">
          <RolePlayPage
            selectedScenario={selectedScenario}
            audioSrc={audioSrc || undefined}
            french={frenchText}
            english={englishText}
          />
        </div>
      )}
    </div>
  );
};

export default ScenarioSelector;