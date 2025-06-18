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
          {/* Add this empty header element for the green separator */}
          <header className="App-header"></header>
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