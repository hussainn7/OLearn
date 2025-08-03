import React, { createContext, useContext, useEffect, useState } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'

interface AuthContextType {
  user: User | null
  session: Session | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error: any }>
  signUp: (email: string, password: string) => Promise<{ error: any }>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    console.log('🔐 AuthContext: Initializing...')
    
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('🔐 AuthContext: Initial session:', session)
      console.log('🔐 AuthContext: User from session:', session?.user)
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log('🔐 AuthContext: Auth state changed:', _event, session)
      console.log('🔐 AuthContext: User from auth change:', session?.user)
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signIn = async (email: string, password: string) => {
    console.log('🔐 AuthContext: Attempting sign in for:', email)
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    console.log('🔐 AuthContext: Sign in result:', { error })
    return { error }
  }

  const signUp = async (email: string, password: string) => {
    console.log('🔐 AuthContext: Attempting sign up for:', email)
    const { error } = await supabase.auth.signUp({
      email,
      password,
    })
    console.log('🔐 AuthContext: Sign up result:', { error })
    return { error }
  }

  const signOut = async () => {
    console.log('🔐 AuthContext: Signing out...')
    await supabase.auth.signOut()
  }

  const value = {
    user,
    session,
    loading,
    signIn,
    signUp,
    signOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 