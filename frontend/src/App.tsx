import React from 'react';
// import styles from './styles/App.module.css';
import Header from './components/layout/Header/Header';
import ButtonSelector from './components/common/ButtonSelector/ButtonSelector';

// src/App.tsx
function App() {
  return (
    <div className="App">
      <Header/>
      <ButtonSelector/>
    </div>
  );
}

export default App;