import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={{ display: 'flex', justifyContent: 'space-around', padding: '10px', background: '#f4f4f4' }}>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/analytics">Advanced Analytics</Link>
      <Link to="/performance">Your Performance</Link>
      <Link to="/admin-dashboard">Admin Dashboard</Link>
    </nav>
  );
};

export default Navbar;

