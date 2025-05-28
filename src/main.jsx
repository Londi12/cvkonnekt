import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/input.css';
import './styles/print.css';
import './utils/printUtils.js';
import './utils/exportUtils.js';

// Initialize error handling
const setupErrorHandling = () => {
  console.log("Initializing CVKonnekt Resume Builder error handling...");
  
  // Handle global errors
  window.onerror = function(message, source, lineno, colno, error) {
    console.error("Global error caught:", error);
    console.error("Message:", message);
    console.error("URL:", source);
    console.error("Line:", lineno, "Column:", colno);
    console.error("Stack:", error?.stack);
    
    // Don't show error for resource loading failures
    if (message.includes('Failed to load resource')) {
      return true; // Prevent default error handling
    }
    
    return false; // Allow default error handling for other errors
  };

  // Handle unhandled promise rejections
  window.onunhandledrejection = function(event) {
    console.error("Unhandled promise rejection:", event.reason);
    
    // Don't show error for resource loading failures
    if (event.reason?.message?.includes('Failed to load resource')) {
      event.preventDefault();
      return;
    }
  };

  // Handle resource loading errors
  window.addEventListener('error', function(event) {
    if (event.target.tagName === 'IMG' || event.target.tagName === 'SCRIPT' || event.target.tagName === 'LINK') {
      console.warn(`Resource loading failed: ${event.target.src || event.target.href}`);
      event.preventDefault();
    }
  }, true);
};

// Initialize error handling
setupErrorHandling();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
