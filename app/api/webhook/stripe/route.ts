import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
})

// Initialize Supabase client with service role key
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature') as string

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err) {
    console.error(`Webhook signature verification failed: ${(err as Error).message}`)
    return NextResponse.json({ error: `Webhook Error: ${(err as Error).message}` }, { status: 400 })
  }

  try {
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session
      const userId = session.client_reference_id
      const subscriptionId = session.subscription as string

      // Retrieve the subscription details
      const subscription = await stripe.subscriptions.retrieve(subscriptionId)

      const { error } = await supabase
        .from('profiles')
        .update({ 
          subscription_id: subscriptionId, 
          subscription_status: subscription.status,
          current_period_end: new Date(subscription.current_period_end * 1000).toISOString()
        })
        .eq('id', userId)

      if (error) {
        console.error('Error updating user profile:', error)
        return NextResponse.json({ error: 'Error updating user profile' }, { status: 500 })
      }
    }

    // Handle subscription updates
    if (event.type === 'customer.subscription.updated' || event.type === 'customer.subscription.deleted') {
      const subscription = event.data.object as Stripe.Subscription
      const userId = subscription.metadata.userId // Make sure to add this metadata when creating the subscription

      const { error } = await supabase
        .from('profiles')
        .update({ 
          subscription_status: subscription.status,
          current_period_end: new Date(subscription.current_period_end * 1000).toISOString()
        })
        .eq('subscription_id', subscription.id)

      if (error) {
        console.error('Error updating subscription status:', error)
        return NextResponse.json({ error: 'Error updating subscription status' }, { status: 500 })
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Error processing webhook:', error)
    return NextResponse.json({ error: 'Error processing webhook' }, { status: 500 })
  }
}