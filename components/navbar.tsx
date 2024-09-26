'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useEffect, useState } from 'react'
import type { User } from '@supabase/auth-helpers-nextjs'

export default function Navbar() {
  const pathname = usePathname()
  const [user, setUser] = useState<User | null>(null)
  const supabase = createClientComponentClient()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }
    getUser()
  }, [supabase.auth])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
  }

  return (
    <nav className="flex items-center justify-between  bg-background p-6">
      <div className="flex items-center flex-shrink-0 text-foreground mr-6">
        <Link href="/" className="font-semibold text-xl tracking-tight">Supastar</Link>
      </div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow">
          {/* Add any additional nav items here */}
        </div>
        <div className="flex justify-end">
          {user ? (
            <>
              <Link href="/dashboard" className={`block mt-4 lg:inline-block lg:mt-0 text-blue-200 hover:text-white mr-4 ${pathname === '/dashboard' ? 'font-bold' : ''}`}>
                Dashboard
              </Link>
              <button onClick={handleSignOut} className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-blue-500 hover:bg-white mt-4 lg:mt-0">Log Out</button>
            </>
          ) : (
            <>
              <Link href="/auth/sign-in" className={`block mt-4 lg:inline-block lg:mt-0 text-blue-200 hover:text-white mr-4 ${pathname === '/auth/sign-in' ? 'font-bold' : ''}`}>
                Sign In
              </Link>
              <Link href="/auth/sign-up" className={`inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-blue-500 hover:bg-white mt-4 lg:mt-0 ${pathname === '/auth/sign-up' ? 'font-bold' : ''}`}>
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}