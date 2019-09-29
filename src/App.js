import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src="assets/basset-150x150.png" className="App-logo" alt="logo" />
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
        <p className="hideme">This may be hidden</p>
      </header>
    </div>
  );
}

export default App;
