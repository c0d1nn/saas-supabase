'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const sampleCode = `
import React from 'react';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export default async function Dashboard() {
  const supabase = createServerComponentClient({ cookies });
  const { data: { user } } = await supabase.auth.getUser();

  // Check subscription status
  const { data: subscription } = await supabase
    .from('subscriptions')
    .select('status')
    .eq('user_id', user.id)
    .single();

  return (
    <div>
      <h1>Welcome, {user.email}</h1>
      <p>Subscription status: {subscription?.status || 'No active subscription'}</p>
      {/* Add your dashboard content here */}
    </div>
  );
}
`;

export default function CodePreview() {
  const [isCopied, setIsCopied] = useState(false)

  const handleCopyCode = () => {
    navigator.clipboard.writeText(sampleCode)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Sample Code</span>
          <Button onClick={handleCopyCode}>
            {isCopied ? 'Copied!' : 'Copy Code'}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <pre className="bg-muted p-4 rounded-md overflow-x-auto">
          <code>{sampleCode}</code>
        </pre>
      </CardContent>
    </Card>
  )
}