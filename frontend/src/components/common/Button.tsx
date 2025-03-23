import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, disabled, className = '' }) => {
  // Classes de base pour tous les boutons
  let buttonClasses = "py-2 px-5 text-base text-white bg-blue-500 border-none rounded cursor-pointer transition-colors duration-300";
  
  // Ajout des classes spécifiques selon le type de bouton
  if (!disabled) {
    buttonClasses += " hover:bg-blue-700 active:bg-blue-800";
  }
  
  // Classes pour l'état désactivé
  if (disabled) {
    buttonClasses += " opacity-60 cursor-not-allowed";
  }
  
  return (
    <button 
      className={`${buttonClasses} ${className}`} 
      onClick={onClick} 
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;