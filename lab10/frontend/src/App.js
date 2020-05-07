import React, {Component } from 'react'
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
         render() {
          const rand = Math.random();
            return (
            <div> {rand} </div>
            );
          }
      </header>
    </div>
  );
}

export default App;
