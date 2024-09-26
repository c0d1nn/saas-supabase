'use client'

import { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Button } from "@/components/ui/button"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function PricingPage() {
  const [isLoading, setIsLoading] = useState(false)

  const handleSubscribe = async (plan: string) => {
    setIsLoading(true)

    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ plan }),
      })

      const { sessionId, error } = await response.json()

      if (error) {
        console.error('Error:', error)
        setIsLoading(false)
        return
      }

      const stripe = await stripePromise
      const { error: stripeError } = await stripe!.redirectToCheckout({ sessionId })

      if (stripeError) {
        console.error('Stripe error:', stripeError)
      }
    } catch (error) {
      console.error('Error:', error)
    }

    setIsLoading(false)
  }


  return (
    <div className="py-12 bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl">
            Starter Kit Subscription
          </h2>
          <p className="mt-4 text-xl text-muted-foreground">
            Get access to our powerful starter kit and receive lifetime updates
          </p>
        </div>
        <div className="mt-12">
          <div className="bg-card rounded-lg shadow-lg overflow-hidden">
            <div className="px-6 py-8">
              <h3 className="text-2xl font-semibold text-card-foreground">Basic Plan</h3>
              <p className="mt-4 text-muted-foreground">Everything you need to kickstart your SaaS project</p>
              <p className="mt-8">
                <span className="text-4xl font-extrabold text-card-foreground">$9.99</span>
                <span className="text-base font-medium text-muted-foreground">/mo</span>
              </p>
              <Button
                onClick={() => handleSubscribe('basic')}
                disabled={isLoading}
                className="mt-8 block w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 px-4 rounded-md transition duration-150 ease-in-out"
              >
                {isLoading ? 'Processing...' : 'Subscribe Now'}
              </Button>
            </div>
            <div className="px-6 pt-6 pb-8 bg-muted">
              <h4 className="text-sm font-medium text-card-foreground uppercase tracking-wide">Whats included</h4>
              <ul className="mt-6 space-y-4">
                <li className="flex space-x-3">
                  <svg className="flex-shrink-0 h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-muted-foreground">Full access to the starter kit</span>
                </li>
                <li className="flex space-x-3">
                  <svg className="flex-shrink-0 h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-muted-foreground">Lifetime updates</span>
                </li>
                <li className="flex space-x-3">
                  <svg className="flex-shrink-0 h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-muted-foreground">Community support</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}