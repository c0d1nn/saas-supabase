import './globals.css'
import Navbar from '../components/navbar'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Bricolage_Grotesque } from 'next/font/google'
import { cn } from '@/lib/utils'

export const dynamic = 'force-dynamic'

const fontHeading = Bricolage_Grotesque({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-heading',
})

const fontBody = Bricolage_Grotesque({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
})

export const metadata = {
  title: 'Supastar - Your SaaS Starter Kit',
  description: 'Get started with your SaaS project in minutes, not months.',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {


  return (
    <html lang="en">
      <body 
        className={cn(
          'antialiased',
          fontHeading.variable,
          fontBody.variable
        )}
      >
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  )
}