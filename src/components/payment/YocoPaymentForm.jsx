import React, { useState, useEffect, useRef } from 'react';
import YOCO_CONFIG from "../../../config/yoco.config";

const YocoPaymentForm = ({ amount, onSuccess, onError, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [yocoSDK, setYocoSDK] = useState(null);
  const yocoRef = useRef(null);

  useEffect(() => {
    // Load Yoco Web SDK script
    const script = document.createElement('script');
    script.src = 'https://js.yoco.com/sdk/v1/yoco-sdk-web.js';
    script.async = true;
    script.onload = () => {
      // Initialize Yoco SDK once script is loaded
      setYocoSDK(new window.YocoSDK({
        publicKey: YOCO_CONFIG.publicKey,
      }));
    };
    document.body.appendChild(script);

    return () => {
      // Cleanup
      if (script.parentNode) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const handlePayment = async (event) => {
    event.preventDefault();
    
    if (!yocoSDK) {
      setError('Payment processor not initialized');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Show Yoco payment popup
      const result = await yocoSDK.createToken({
        amountInCents: amount * 100, // Convert to cents
        currency: YOCO_CONFIG.currency,
        name: 'CVKonnekt Subscription',
        description: 'Premium subscription',
        callback: function (result) {
          // This function gets called when the popup closes
          if (result.error) {
            const errorMessage = result.error.message || 'Payment failed';
            setError(errorMessage);
            onError?.(errorMessage);
          } else {
            // Payment successful
            onSuccess?.(result);
          }
          setIsLoading(false);
        },
      });
    } catch (err) {
      console.error('Payment error:', err);
      const errorMessage = err.message || 'An error occurred during payment';
      setError(errorMessage);
      onError?.(errorMessage);
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Complete Your Subscription</h2>
      
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-600">Plan:</span>
          <span className="font-semibold">Premium Subscription</span>
        </div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-600">Amount:</span>
          <span className="text-xl font-bold text-blue-600">R{amount.toFixed(2)}</span>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handlePayment}>
        <div id="yoco-card-container" className="mb-4">
          {/* Yoco will inject the card input fields here */}
        </div>

        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {isLoading ? 'Processing...' : 'Pay Now'}
          </button>
        </div>
      </form>

      <div className="mt-6 text-center text-sm text-gray-500">
        <p>Secure payment processed by Yoco</p>
        <div className="mt-2 flex justify-center">
          <img 
            src="https://www.yoco.com/za/wp-content/uploads/2021/04/Yoco-logo-2021.svg" 
            alt="Yoco" 
            className="h-6"
          />
        </div>
      </div>
    </div>
  );
};

export default YocoPaymentForm;
