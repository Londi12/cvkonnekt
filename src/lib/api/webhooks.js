import { supabase } from './supabase';

/**
 * Handle Yoco webhook events
 * @param {Object} event - Webhook event from Yoco
 * @returns {Promise<Object>} Response object
 */
export const handleYocoWebhook = async (event) => {
  try {
    const { type, data } = event;
    
    // Verify the webhook signature (you'll need to implement this)
    // const isValid = verifyWebhookSignature(event, signature, secret);
    // if (!isValid) {
    //   throw new Error('Invalid webhook signature');
    // }


    // Handle different event types
    switch (type) {
      case 'payment.succeeded':
        return await handleSuccessfulPayment(data);
      // Add more event types as needed
      default:
        console.log(`Unhandled event type: ${type}`);
        return { success: true };
    }
  } catch (error) {
    console.error('Webhook error:', error);
    throw error;
  }
};

/**
 * Handle successful payment event
 * @param {Object} payment - Payment data from Yoco
 */
async function handleSuccessfulPayment(payment) {
  const { metadata } = payment;
  
  if (!metadata || !metadata.checkoutId) {
    console.error('Missing metadata in payment:', payment);
    throw new Error('Missing checkout ID in payment metadata');
  }

  // Update the checkout session in our database
  const { data: checkoutSession, error: checkoutError } = await supabase
    .from('checkout_sessions')
    .update({ 
      status: 'succeeded',
      payment_id: payment.id,
      payment_status: 'succeeded',
      payment_data: payment,
      updated_at: new Date().toISOString()
    })
    .eq('id', metadata.checkoutId)
    .select()
    .single();

  if (checkoutError) {
    console.error('Error updating checkout session:', checkoutError);
    throw new Error('Failed to update checkout session');
  }

  // Update user's subscription status
  if (metadata.userId) {
    const { error: userError } = await supabase
      .from('profiles')
      .update({ 
        subscription_status: 'active',
        subscription_plan: metadata.plan || 'monthly',
        subscription_start: new Date().toISOString(),
        subscription_end: getSubscriptionEndDate(metadata.plan || 'monthly'),
        updated_at: new Date().toISOString()
      })
      .eq('id', metadata.userId);

    if (userError) {
      console.error('Error updating user subscription:', userError);
      throw new Error('Failed to update user subscription');
    }
  }

  return { success: true };
}

/**
 * Calculate subscription end date based on plan
 * @param {string} plan - Subscription plan
 * @returns {string} ISO date string
 */
function getSubscriptionEndDate(plan) {
  const date = new Date();
  
  switch (plan) {
    case 'annual':
      date.setFullYear(date.getFullYear() + 1);
      break;
    case 'lifetime':
      // 100 years is effectively lifetime
      date.setFullYear(date.getFullYear() + 100);
      break;
    case 'monthly':
    default:
      date.setMonth(date.getMonth() + 1);
  }
  
  return date.toISOString();
}
