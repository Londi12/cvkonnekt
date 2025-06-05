import { handleYocoWebhook } from '../../../lib/api/webhooks';

/**
 * API route handler for Yoco webhooks
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // In a production environment, you should verify the webhook signature here
    // const signature = req.headers['x-yoco-signature'];
    // const secret = process.env.YOCO_WEBHOOK_SECRET;
    
    // Process the webhook event
    await handleYocoWebhook(req.body);
    
    // Return a 200 response to acknowledge receipt of the webhook
    res.status(200).json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(400).json({ 
      error: 'Webhook error',
      message: error.message 
    });
  }
}

// Disable body parsing, we need the raw body for signature verification
export const config = {
  api: {
    bodyParser: false,
  },
};
