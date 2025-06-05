import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import { supabase } from '../lib/supabase';
import YocoPaymentForm from '../components/payment/YocoPaymentForm';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';

const SubscribePage = () => {
  const { planId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [subscriptionStatus, setSubscriptionStatus] = useState(null);
  const [error, setError] = useState(null);
  const [plan, setPlan] = useState(null);

  // Define available plans
  const plans = {
    premium: {
      name: 'Premium',
      price: { monthly: 99, annually: 999 },
      description: 'For professionals who need polished applications',
      features: [
        'Up to 10 CV Generations',
        'Up to 10 Cover Letters',
        'All Premium Templates',
        'PDF & Word Downloads',
        'Cover Letter Builder',
        'Priority Support',
      ],
      featured: true,
    },
    pro: {
      name: 'Pro',
      price: { monthly: 199, annually: 1999 },
      description: 'Unlimited tools for career-driven users',
      features: [
        'Unlimited CV Generations',
        'Unlimited Cover Letters',
        'Priority Template Access',
        'Advanced Formatting Options',
        'VIP Support (fastest response time)',
      ],
    },
  };

  useEffect(() => {
    // Check if user is authenticated
    if (!user) {
      navigate('/signin', { state: { from: `/subscribe/${planId}` } });
      return;
    }

    // Set the selected plan
    if (plans[planId]) {
      setPlan({
        ...plans[planId],
        id: planId,
        price: plans[planId].price.monthly, // Default to monthly
        billing: 'monthly',
      });
    } else {
      // Redirect to pricing if invalid plan
      navigate('/pricing');
    }
    setLoading(false);
  }, [planId, user, navigate]);

  const handlePaymentSuccess = async (result) => {
    try {
      setLoading(true);
      
      // Update user's subscription in the database
      const { error } = await supabase
        .from('profiles')
        .update({
          subscription_plan: plan.id,
          subscription_status: 'active',
          subscription_start: new Date().toISOString(),
          // Set subscription end date (e.g., 1 month from now)
          subscription_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        })
        .eq('id', user.id);

      if (error) throw error;

      setSubscriptionStatus('success');
      
      // Redirect to dashboard after 3 seconds
      setTimeout(() => {
        navigate('/dashboard', { 
          state: { 
            subscriptionSuccess: true,
            plan: plan.name 
          } 
        });
      }, 3000);
      
    } catch (err) {
      console.error('Error updating subscription:', err);
      setError('Failed to update your subscription. Please contact support.');
    } finally {
      setLoading(false);
    }
  };

  const handleBillingChange = (billing) => {
    setPlan({
      ...plan,
      price: plan.price[billing],
      billing,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading subscription details...</p>
        </div>
      </div>
    );
  }

  if (!plan) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <XMarkIcon className="h-12 w-12 text-red-500 mx-auto" />
          <h2 className="mt-4 text-lg font-medium text-gray-900">Invalid Plan</h2>
          <p className="mt-2 text-gray-600">The selected plan is not available.</p>
          <button
            onClick={() => navigate('/pricing')}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            View Available Plans
          </button>
        </div>
      </div>
    );
  }

  if (subscriptionStatus === 'success') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
            <CheckIcon className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="mt-4 text-2xl font-bold text-gray-900">Subscription Successful!</h2>
          <p className="mt-2 text-gray-600">You've successfully subscribed to {plan.name}.</p>
          <p className="text-gray-600">Redirecting to your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Complete Your {plan.name} Subscription
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            One last step to unlock all {plan.name} features
          </p>
        </div>

        <div className="bg-white shadow overflow-hidden rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex flex-col md:flex-row justify-between">
              <div className="md:w-1/2 pr-8">
                <h2 className="text-2xl font-bold text-gray-900">{plan.name} Plan</h2>
                <p className="mt-2 text-gray-600">{plan.description}</p>
                
                <div className="mt-6">
                  <h3 className="text-lg font-medium text-gray-900">Billing Cycle</h3>
                  <div className="mt-2 flex rounded-md shadow-sm">
                    <button
                      type="button"
                      onClick={() => handleBillingChange('monthly')}
                      className={`flex-1 py-2 px-4 border ${
                        plan.billing === 'monthly'
                          ? 'bg-indigo-600 text-white border-indigo-600'
                          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                      } rounded-l-md`}
                    >
                      Monthly
                    </button>
                    <button
                      type="button"
                      onClick={() => handleBillingChange('annually')}
                      className={`flex-1 py-2 px-4 border ${
                        plan.billing === 'annually'
                          ? 'bg-indigo-600 text-white border-indigo-600'
                          : 'bg-white text-gray-700 border-l-0 border-gray-300 hover:bg-gray-50'
                      } rounded-r-md`}
                    >
                      Annually (Save 15%)
                    </button>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-medium text-gray-900">Plan Includes</h3>
                  <ul className="mt-2 space-y-2">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="md:w-1/2 mt-8 md:mt-0 md:pl-8 border-l border-gray-200">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="text-center">
                    <p className="text-4xl font-extrabold text-gray-900">
                      R{plan.price}
                      <span className="text-base font-medium text-gray-500">
                        /{plan.billing === 'monthly' ? 'month' : 'year'}
                      </span>
                    </p>
                    {plan.billing === 'annually' && (
                      <p className="mt-2 text-sm text-green-600">
                        Save 15% with annual billing
                      </p>
                    )}
                  </div>

                  <div className="mt-6">
                    <YocoPaymentForm
                      amount={plan.price * 100} // Convert to cents
                      onSuccess={handlePaymentSuccess}
                      onError={(err) => setError(err.message)}
                    />
                    {error && (
                      <p className="mt-2 text-sm text-red-600">{error}</p>
                    )}
                  </div>

                  <p className="mt-4 text-xs text-gray-500 text-center">
                    Your subscription will automatically renew. You can cancel anytime.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscribePage;
