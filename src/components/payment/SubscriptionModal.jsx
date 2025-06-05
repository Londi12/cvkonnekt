import React, { useState, useEffect } from 'react';
import { XMarkIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../../utils/AuthContext';
import { createCheckoutSession } from '../../lib/api/yoco';

const SubscriptionModal = ({ isOpen, onClose, plan }) => {
  const { user } = useAuth();
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [error, setError] = useState(null);

  if (!isOpen) return null;

  const handleSubscribe = async () => {
    if (!user) {
      setError('Please sign in to subscribe');
      return;
    }

    setPaymentStatus('processing');
    setError(null);

    try {
      // Create a checkout session with Yoco
      const redirectUrl = await createCheckoutSession({
        plan,
        userId: user.id,
        successUrl: `${window.location.origin}/dashboard?payment=success`,
        cancelUrl: `${window.location.origin}/pricing?payment=cancelled`
      });

      // Redirect to Yoco checkout page
      window.location.href = redirectUrl;
    } catch (err) {
      console.error('Error creating checkout session:', err);
      setError(err.message || 'Failed to initiate payment. Please try again.');
      setPaymentStatus(null);
    }
  };

  const getPlanDetails = () => {
    const plans = {
      monthly: { 
        name: 'Monthly', 
        price: 99, 
        description: 'Billed monthly',
        features: ['Unlimited resume downloads', 'All premium templates', 'Priority support']
      },
      annual: { 
        name: 'Annual', 
        price: 999, 
        description: 'Billed annually (2 months free!)',
        features: ['All monthly features', 'Save 16%', 'Free updates for a year']
      },
      lifetime: {
        name: 'Lifetime',
        price: 1999,
        description: 'One-time payment',
        features: ['All premium features', 'Lifetime access', 'Priority support forever']
      }
    };
    return plans[plan] || { name: 'Premium', price: 99, description: 'Monthly subscription', features: [] };
  };

  const planDetails = getPlanDetails();

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
          &#8203;
        </span>

        {/* Modal panel */}
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full">
          <div className="bg-white px-6 py-6 sm:p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {paymentStatus === 'success' ? 'Payment Successful!' : `Upgrade to ${planDetails.name}`}
                </h3>
                <p className="mt-1 text-gray-500">{planDetails.description}</p>
              </div>
              <button
                type="button"
                className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                onClick={onClose}
              >
                <span className="sr-only">Close</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            {paymentStatus === 'success' ? (
              <div className="mt-6 text-center">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
                  <svg
                    className="h-8 w-8 text-green-600"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">
                  Subscription Successful!
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  Thank you for subscribing to our {planDetails.name} plan. Your account has been upgraded.
                </p>
                <div className="mt-6">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
                    onClick={onClose}
                  >
                    Continue to Dashboard
                  </button>
                </div>
              </div>
            ) : paymentStatus === 'processing' ? (
              <div className="mt-6 text-center">
                <div className="mx-auto flex items-center justify-center h-16 w-16 text-blue-500">
                  <ArrowPathIcon className="h-10 w-10 animate-spin" />
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">Processing Payment</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Please wait while we process your subscription...
                </p>
              </div>
            ) : error ? (
              <div className="mt-6">
                <div className="bg-red-50 border-l-4 border-red-400 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 0L6 8.586 4.707 7.293a1 1 0 00-1.414 1.414L4.586 10l-1.293 1.293a1 1 0 001.414 1.414L6 11.414l1.293 1.293a1 1 0 001.414-1.414L7.414 10l1.293-1.293a1 1 0 000-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-red-700">{error}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <button
                    type="button"
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    onClick={handleSubscribe}
                  >
                    Try Again
                  </button>
                </div>
              </div>
            ) : !user ? (
              <div className="mt-6">
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                        <path
                          fillRule="evenodd"
                          d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-yellow-700">
                        Please sign in or create an account to continue with your subscription.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
                    onClick={() => {
                      onClose();
                      window.location.href = '/signin';
                    }}
                  >
                    Sign In
                  </button>
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
                    onClick={onClose}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="mt-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Plan Details</h4>
                  <ul className="space-y-3">
                    {planDetails.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <svg
                          className="h-5 w-5 text-green-500 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6">
                    <div className="flex items-baseline">
                      <span className="text-3xl font-bold text-gray-900">
                        R{(planDetails.price / 100).toFixed(2)}
                      </span>
                      <span className="ml-1 text-lg text-gray-500">
                        /{plan === 'lifetime' ? 'once' : plan === 'annual' ? 'year' : 'month'}
                      </span>
                    </div>
                    {plan === 'annual' && (
                      <p className="mt-1 text-sm text-gray-500">
                        Save 16% compared to monthly billing
                      </p>
                    )}
                    {plan === 'lifetime' && (
                      <p className="mt-1 text-sm text-gray-500">One-time payment, lifetime access</p>
                    )}
                  </div>
                </div>
                <div className="mt-6">
                  <button
                    type="button"
                    onClick={handleSubscribe}
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Subscribe Now
                  </button>
                  <p className="mt-3 text-center text-xs text-gray-500">
                    You'll be redirected to Yoco's secure payment page to complete your subscription.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionModal;
