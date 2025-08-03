import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://yajqdfkydxdghuohyaqn.supabase.co"
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlhanFkZmt5ZHhkZ2h1b2h5YXFuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQyMDM5OTksImV4cCI6MjA2OTc3OTk5OX0.LMU_uwiNZI9dSa1sy_gvlgy3d9AOhMqvUdZWBpLoXZw"

console.log('🔧 Supabase: Configuring client...')
console.log('🔧 Supabase: URL:', supabaseUrl)
console.log('🔧 Supabase: Anon Key (first 20 chars):', supabaseAnonKey.substring(0, 20) + '...')
console.log('🔧 Supabase: Environment variables:', {
  VITE_SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL,
  VITE_SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY ? 'SET' : 'NOT SET'
})

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Test the connection
supabase.auth.getSession().then(({ data, error }) => {
  console.log('🔧 Supabase: Connection test result:', { data, error })
}).catch(error => {
  console.error('🔧 Supabase: Connection test failed:', error)
})