import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Suspense } from 'react'
import { FileCode2, Book, Download, Github, Youtube } from 'lucide-react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CodePreview from './starter-kit/code-preview'
import DocumentationViewer from './starter-kit/documentation-viewer'

const starterKit = {
  name: 'SaaS Starter Kit',
  description: 'A comprehensive SaaS starter with authentication, subscription handling, and essential features',
  features: ['User Authentication', 'Dashboard', 'Profile Management', 'Subscription Handling', 'API Integration'],
  technologies: ['React', 'Next.js', 'Tailwind CSS', 'Supabase', 'Stripe'],
  githubRepo: 'https://github.com/example/saas-starter-kit',
  documentationUrl: '/docs/saas-starter-kit',
  videoTutorialUrl: 'https://www.youtube.com/watch?v=example',
}



export default async function Dashboard() {
  const supabase = createServerComponentClient({ cookies })
  
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/sign-in')
  }

  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (error) {
    console.error('Error fetching user profile:', error)
    // Instead of returning an error div, let's handle it gracefully
    return (
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
          <h1 className="text-4xl font-bold mb-4">Dashboard</h1>
          <p className="mb-4">Welcome, {user.email}!</p>
          <p className="text-red-600 mb-4">Unable to load subscription information. Please try again later.</p>
          <Button asChild>
            <Link href="/pricing">View Pricing Plans</Link>
          </Button>
        </main>
      </div>
    )
  }

  const isSubscriptionActive = profile?.subscription_status === 'active' || profile?.subscription_status === 'trialing'

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">
          Dashboard
        </h1>
        <p className="mb-4">
          Welcome, {user.email}!
        </p>
        {isSubscriptionActive ? (
          <div className="w-full max-w-4xl">
            <p className="text-green-600 mb-4">Your subscription is active.</p>
            <p className="mb-4">Subscription ends on: {new Date(profile.current_period_end).toLocaleDateString()}</p>
            <Button asChild className="mb-8">
              <Link href="/app">Go to App</Link>
            </Button>

            <div className="container mx-auto px-4 py-8">
              <h2 className="text-2xl sm:text-3xl font-bold mb-8">{starterKit.name}</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                <Card>
                  <CardHeader>
                    <CardTitle>Features</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5">
                      {starterKit.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Technologies</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5">
                      {starterKit.technologies.map((tech, index) => (
                        <li key={index}>{tech}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Links</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-4">
                    <Button asChild>
                      <Link href={starterKit.githubRepo}>
                        <Github className="mr-2 h-4 w-4" /> GitHub Repository
                      </Link>
                    </Button>
                    <Button asChild variant="outline">
                      <Link href={starterKit.documentationUrl}>
                        <Book className="mr-2 h-4 w-4" /> Documentation
                      </Link>
                    </Button>
                    <Button asChild variant="outline">
                      <Link href={starterKit.videoTutorialUrl}>
                        <Youtube className="mr-2 h-4 w-4" /> Video Tutorial
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <Tabs defaultValue="code" className="w-full">
                <TabsList className="mb-4">
                  <TabsTrigger value="code">Code</TabsTrigger>
                  <TabsTrigger value="docs">Documentation</TabsTrigger>
                </TabsList>
                <TabsContent value="code">
                  <Suspense fallback={<div>Loading code preview...</div>}>
                    <CodePreview />
                  </Suspense>
                </TabsContent>
                <TabsContent value="docs">
                  <Suspense fallback={<div>Loading documentation...</div>}>
                    <DocumentationViewer />
                  </Suspense>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        ) : (
          <div>
            <p className="text-yellow-600 mb-4">You don't have an active subscription.</p>
            <Button asChild>
              <Link href="/pricing">View Pricing Plans</Link>
            </Button>
          </div>
        )}
      </main>
    </div>
  )
}