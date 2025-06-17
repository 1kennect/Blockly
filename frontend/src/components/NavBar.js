import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => (
  <nav style={{ background: '#222', padding: '1rem' }}>
    <Link to="/" style={{ color: '#fff', marginRight: '1rem' }}>Home</Link>
    <Link to="/blockly" style={{ color: '#fff' }}>Blockly</Link>
  </nav>
);

export default NavBar; 