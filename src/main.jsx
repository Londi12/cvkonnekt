import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.css';
import './styles/input.css';
import './styles/print.css';
import './utils/printUtils.js';
import './utils/exportUtils.js';

// Initialize error handling
const setupErrorHandling = () => {
  // Handle global errors
  window.onerror = function(message, source, lineno, colno, error) {
    // Only log errors, don't prevent default handling
    console.error("Error:", {
      message,
      source,
      lineno,
      colno,
      error: error?.stack
    });
    return false;
  };

  // Handle unhandled promise rejections
  window.onunhandledrejection = function(event) {
    console.error("Unhandled promise rejection:", event.reason);
  };
};

// Initialize error handling
setupErrorHandling();

// Remove any extra loading indicator (or extra DOM removal) so that the root div is the only child of body.
ReactDOM.createRoot(document.getElementById('root')).render(<App />);
