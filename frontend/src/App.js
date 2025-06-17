import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/App.css';
import BlocklyWorkspace from './components/BlocklyWorkspace';
import Home from './pages/Home';
import NavBar from './components/NavBar';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <header className="App-header">
          <h1>Blockly Accessibility Coding Platform</h1>
          <p>Accessible block-based coding for kids. (Vision, ARIA, keyboard, etc. coming soon!)</p>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blockly" element={<BlocklyWorkspace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
