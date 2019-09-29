import React from 'react';
import logo from './basset.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Basset example
        </p>
        <a
          className="App-link"
          href="https://basset.io"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn more about basset
        </a>
      </header>
    </div>
  );
}

export default App;
