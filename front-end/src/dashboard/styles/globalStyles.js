import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  :root {
    --primary-color: #6200ee;
    --secondary-color: #03dac6;
    --success-color: #00c853;
    --warning-color: #ffd600;
    --error-color: #b00020;
    --background-light: #f5f5f5;
    --background-dark: #121212;
    --text-light: #333333;
    --text-dark: #ffffff;
    --card-shadow-light: 8px 8px 16px #d1d1d1, -8px -8px 16px #ffffff;
    --card-shadow-dark: 8px 8px 16px #0a0a0a, -8px -8px 16px #1e1e1e;
    --transition-speed: 0.3s;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Poppins', sans-serif;
    line-height: 1.6;
    transition: all var(--transition-speed) ease;
  }

  .dashboard-layout {
    display: grid;
    grid-template-columns: auto 1fr;
    min-height: 100vh;
  }

  .dashboard-container {
    display: flex;
    flex: 1;
  }

  .dashboard-content {
    flex: 1;
    padding: 2rem;
    overflow-y: auto;
  }

  .chart-card {
    background: var(--background-light);
    border-radius: 15px;
    padding: 1.5rem;
    margin: 1rem;
    transition: all var(--transition-speed) ease;
    
    &:hover {
      transform: translateY(-5px);
    }
  }

  .charts-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 2rem;
    padding: 1rem;
  }

  @media (max-width: 768px) {
    .dashboard-layout {
      grid-template-columns: 1fr;
    }
    
    .charts-grid {
      grid-template-columns: 1fr;
    }
  }

  // Animations
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes slideIn {
    from { transform: translateX(-100%); }
    to { transform: translateX(0); }
  }

  .fade-in {
    animation: fadeIn 0.5s ease-out;
  }

  .slide-in {
    animation: slideIn 0.3s ease-out;
  }
`;
