import React from 'react';
import logo from './logo.svg';
import './App.css';
import Random from './Random.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      <Random />
      </header>
    </div>
  );
}

export default App;
