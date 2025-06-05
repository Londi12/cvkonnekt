import { supabase } from '../supabase';

const YOCO_API_URL = 'https://payments.yoco.com/api';

/**
 * Creates a Yoco checkout session
 * @param {Object} params - Parameters for checkout
 * @param {string} params.plan - Subscription plan (monthly/annual)
 * @param {string} params.userId - User ID
 * @param {string} [params.successUrl] - Success redirect URL
 * @param {string} [params.cancelUrl] - Cancel redirect URL
 * @returns {Promise<string>} Checkout URL
 */
export const createCheckoutSession = async ({ plan, userId, successUrl, cancelUrl }) => {
  try {
    // Get plan details
    const planDetails = getPlanDetails(plan);
    if (!planDetails) {
      throw new Error('Invalid plan');
    }

    // Create a checkout session in our database
    const { data: checkoutSession, error } = await supabase
      .from('checkout_sessions')
      .insert([
        {
          user_id: userId,
          status: 'created',
          amount: planDetails.amount,
          currency: 'ZAR',
          plan,
          metadata: { plan, userId }
        }
      ])
      .select()
      .single();

    if (error) throw error;

    // Create Yoco checkout session
    const response = await fetch(`${YOCO_API_URL}/checkouts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_YOCO_SECRET_KEY}`,
      },
      body: JSON.stringify({
        amount: planDetails.amount,
        currency: 'ZAR',
        successUrl: successUrl || `${import.meta.env.VITE_SITE_URL}/dashboard?payment=success`,
        cancelUrl: cancelUrl || `${import.meta.env.VITE_SITE_URL}/pricing?payment=cancelled`,
        metadata: {
          checkoutId: checkoutSession.id,
          plan,
          userId,
          type: 'subscription'
        }
      })
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to create Yoco checkout: ${error}`);
    }

    const yocoCheckout = await response.json();

    // Update the checkout session with Yoco's ID
    await supabase
      .from('checkout_sessions')
      .update({ 
        yoco_checkout_id: yocoCheckout.id,
        status: 'pending',
        metadata: { ...checkoutSession.metadata, yocoCheckout }
      })
      .eq('id', checkoutSession.id);

    return yocoCheckout.redirectUrl;

  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw error;
  }
};

// Helper functions
function getPlanDetails(plan) {
  const plans = {
    monthly: { 
      id: 'monthly',
      name: 'Monthly',
      amount: 9900, // R99.00 in cents
      interval: 'month',
      intervalCount: 1
    },
    annual: { 
      id: 'annual',
      name: 'Annual',
      amount: 99900, // R999.00 in cents
      interval: 'year',
      intervalCount: 1
    },
    lifetime: { 
      id: 'lifetime',
      name: 'Lifetime',
      amount: 199900, // R1,999.00 in cents
      interval: 'lifetime'
    }
  };
  return plans[plan];
}
