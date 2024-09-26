'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { loadStripe } from '@stripe/stripe-js'
import { Button } from "@/components/ui/button"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function Checkout({ params }: { params: { plan: string } }) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClientComponentClient()

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/auth/sign-in')
      }
    }
    checkUser()
  }, [router, supabase])

  const handleCheckout = async () => {
    setLoading(true)
    const { data: { user } } = await supabase.auth.getUser()

    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        plan: params.plan,
        userId: user?.id,
      }),
    })

    const session = await response.json()

    const stripe = await stripePromise
    const { error } = await stripe!.redirectToCheckout({
      sessionId: session.id,
    })

    if (error) {
      console.error('Error:', error)
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-4">Checkout for {params.plan} Plan</h1>
      <Button onClick={handleCheckout} disabled={loading}>
        {loading ? 'Processing...' : 'Proceed to Payment'}
      </Button>
    </div>
  )
}