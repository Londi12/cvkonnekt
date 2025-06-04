import React, { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import YocoPaymentForm from './YocoPaymentForm';
import { useAuth } from '../../utils/AuthContext';

const SubscriptionModal = ({ isOpen, onClose, plan }) => {
  const { user } = useAuth();
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [error, setError] = useState(null);

  if (!isOpen) return null;

  const handlePaymentSuccess = async (result) => {
    try {
      // Here you would typically send the token to your backend to process the payment
      // and update the user's subscription status
      console.log('Payment successful:', result);
      
      // For now, we'll just show a success message
      setPaymentStatus('success');
      
      // In a real app, you would:
      // 1. Send the token to your backend
      // 2. Update the user's subscription status in your database
      // 3. Show a success message
      // 4. Redirect to a success page or close the modal
      
    } catch (err) {
      console.error('Error processing payment:', err);
      setError('Failed to process payment. Please try again.');
    }
  };

  const handlePaymentError = (error) => {
    console.error('Payment error:', error);
    setError(error);
  };

  const getPlanDetails = () => {
    switch (plan) {
      case 'monthly':
        return { name: 'Monthly', price: 99, description: 'Billed monthly' };
      case 'annual':
        return { name: 'Annual', price: 999, description: 'Billed annually (2 months free!)' };
      default:
        return { name: 'Premium', price: 99, description: 'Monthly subscription' };
    }
  };

  const planDetails = getPlanDetails();

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        {/* Modal panel */}
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="absolute top-0 right-0 pt-4 pr-4">
              <button
                type="button"
                className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                onClick={onClose}
              >
                <span className="sr-only">Close</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            <div className="mt-3 text-center sm:mt-0 sm:text-left">
              <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                {paymentStatus === 'success' ? 'Payment Successful!' : 'Complete Your Subscription'}
              </h3>
              
              {paymentStatus === 'success' ? (
                <div className="mt-4">
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                    <svg
                      className="h-6 w-6 text-green-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div className="mt-3 text-center">
                    <p className="text-sm text-gray-500">
                      Thank you for subscribing to our {planDetails.name} plan!
                    </p>
                    <div className="mt-5">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
                        onClick={onClose}
                      >
                        Start Using CVKonnekt
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mt-4">
                  <div className="bg-blue-50 p-4 rounded-md mb-4">
                    <h4 className="text-lg font-medium text-gray-900">{planDetails.name} Plan</h4>
                    <p className="mt-1 text-gray-600">{planDetails.description}</p>
                    <p className="mt-2 text-2xl font-bold text-blue-600">R{planDetails.price}/month</p>
                    {plan === 'annual' && (
                      <p className="mt-1 text-sm text-gray-500">
                        Billed annually (R{planDetails.price})
                      </p>
                    )}
                  </div>

                  {user ? (
                    <YocoPaymentForm
                      amount={planDetails.price}
                      onSuccess={handlePaymentSuccess}
                      onError={handlePaymentError}
                      onClose={onClose}
                    />
                  ) : (
                    <div className="mt-4 text-center">
                      <p className="text-sm text-gray-600 mb-4">
                        Please sign in or create an account to continue with your subscription.
                      </p>
                      <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                        <button
                          type="button"
                          className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:col-start-2 sm:text-sm"
                          onClick={() => {
                            onClose();
                            // You would typically redirect to sign in here
                            window.location.href = '/signin';
                          }}
                        >
                          Sign In
                        </button>
                        <button
                          type="button"
                          className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                          onClick={onClose}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionModal;
