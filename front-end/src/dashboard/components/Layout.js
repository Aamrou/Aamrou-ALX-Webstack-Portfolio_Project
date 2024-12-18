import React from 'react';
import './styles.css';

const Layout = ({ children }) => {
  return (
    <div style={{ margin: '0 auto', maxWidth: '1200px', padding: '10px' }}>
      {children}
    </div>
  );
};

export default Layout;

