import React from 'react';
// import styles from './styles/App.module.css';
import Header from './components/layout/Header/Header';
import ScenarioSelector from './components/ScenarioSelector/ScenarioSelector';

// src/App.tsx
function App() {
  return (
    <div className="App">
      <Header/>
      <ScenarioSelector/>
    </div>
  );
}

export default App;