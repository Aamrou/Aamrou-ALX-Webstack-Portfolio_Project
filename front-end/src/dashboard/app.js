import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import AdminDashboard from './components/AdminDashboard';
import UserPerformance from './components/UserPerformance';
import AdvancedAnalytics from './components/AdvancedAnalytics';
import { ThemeProvider } from './context/ThemeContext';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Check authentication status
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await fetch('/api/auth/status');
      const data = await response.json();
      setIsAuthenticated(data.isAuthenticated);
      setUserData(data.user);
    } catch (error) {
      console.error('Auth check failed:', error);
    }
  };

  return (
    <ThemeProvider>
      <Router>
        <div className="app">
          <Navbar isAuthenticated={isAuthenticated} userData={userData} />
          <main className="main-content">
            <Routes>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/performance" element={<UserPerformance />} />
              <Route path="/analytics" element={<AdvancedAnalytics />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
