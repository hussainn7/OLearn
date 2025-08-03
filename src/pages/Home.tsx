
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import GlassCard from '@/components/GlassCard';
import { useAuth } from '@/contexts/AuthContext';
import LoginForm from '@/components/auth/LoginForm';
import SignUpForm from '@/components/auth/SignUpForm';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';
import { database } from '@/lib/database';

const Home = () => {
  const { user, signOut } = useAuth();
  const [showLogin, setShowLogin] = useState(true);
  const [debugResults, setDebugResults] = useState<any>({});

  const runDebugTests = async () => {
    console.log('🧪 Running debug tests...');
    const results: any = {};

    try {
      // Test 1: Check authentication
      const { data: { user: authUser } } = await supabase.auth.getUser();
      results.auth = { user: authUser, hasUser: !!authUser };

      // Test 2: Check learning paths (should work without auth)
      try {
        const paths = await database.getLearningPaths();
        results.learningPaths = { success: true, count: paths.length, data: paths };
      } catch (error) {
        results.learningPaths = { success: false, error: error };
      }

      // Test 3: Check user progress (requires auth)
      if (authUser) {
        try {
          const progress = await database.getUserProgress(authUser.id);
          results.userProgress = { success: true, count: progress.length, data: progress };
        } catch (error) {
          results.userProgress = { success: false, error: error };
        }

        // Test 4: Check profile
        try {
          const profile = await database.getProfile(authUser.id);
          results.profile = { success: true, data: profile };
        } catch (error) {
          results.profile = { success: false, error: error };
        }
      } else {
        results.userProgress = { success: false, error: 'No authenticated user' };
        results.profile = { success: false, error: 'No authenticated user' };
      }

      // Test 5: Direct Supabase calls
      try {
        const { data: directPaths, error: directPathsError } = await supabase
          .from('learning_paths')
          .select('*');
        results.directPaths = { success: !directPathsError, data: directPaths, error: directPathsError };
      } catch (error) {
        results.directPaths = { success: false, error: error };
      }

      if (authUser) {
        try {
          const { data: directProgress, error: directProgressError } = await supabase
            .from('user_progress')
            .select('*')
            .eq('user_id', authUser.id);
          results.directProgress = { success: !directProgressError, data: directProgress, error: directProgressError };
        } catch (error) {
          results.directProgress = { success: false, error: error };
        }
      }

    } catch (error) {
      results.generalError = error;
    }

    console.log('🧪 Debug test results:', results);
    setDebugResults(results);
  };

  if (user) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <GlassCard className="p-12">
              <div className="text-center mb-8">
                <h1 className="text-5xl font-bold text-black mb-4">Welcome to OLearn!</h1>
                <p className="text-2xl text-black/70 mb-6">
                  Your journey to digital confidence starts here
                </p>
                <p className="text-lg text-black/60 mb-8">
                  Logged in as: {user.email}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-black mb-4">Start Learning</h2>
                  <p className="text-black/70 mb-6">
                    Choose from our curated learning paths designed specifically for seniors
                  </p>
                  <Button 
                    onClick={() => window.location.href = '/paths'}
                    className="bg-black text-white hover:bg-black/80 px-8 py-4 text-lg"
                  >
                    Browse Paths
                  </Button>
                </div>

                <div className="text-center">
                  <h2 className="text-2xl font-bold text-black mb-4">Track Progress</h2>
                  <p className="text-black/70 mb-6">
                    See how far you've come and celebrate your achievements
                  </p>
                  <Button 
                    onClick={() => window.location.href = '/progress'}
                    className="bg-black text-white hover:bg-black/80 px-8 py-4 text-lg"
                  >
                    View Progress
                  </Button>
                </div>
              </div>

              <div className="border-t border-black/20 pt-8">
                <div className="flex justify-between items-center">
                  <Button 
                    onClick={signOut}
                    variant="outline"
                    className="border-black text-black hover:bg-black hover:text-white"
                  >
                    Sign Out
                  </Button>
                  
                  <Button 
                    onClick={runDebugTests}
                    className="bg-blue-600 text-white hover:bg-blue-700"
                  >
                    🧪 Run Debug Tests
                  </Button>
                </div>
              </div>

              {/* Debug Results */}
              {Object.keys(debugResults).length > 0 && (
                <div className="mt-8 p-6 bg-gray-100 rounded-lg">
                  <h3 className="text-lg font-bold text-black mb-4">Debug Results:</h3>
                  <pre className="text-sm text-black/80 overflow-auto max-h-96">
                    {JSON.stringify(debugResults, null, 2)}
                  </pre>
                </div>
              )}
            </GlassCard>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <GlassCard className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-black mb-4">Welcome to OLearn</h1>
              <p className="text-lg text-black/70">
                Your journey to digital confidence starts here
              </p>
            </div>

            <div className="mb-6">
              <div className="flex border-b border-black/20">
                <button
                  onClick={() => setShowLogin(true)}
                  className={`flex-1 py-3 text-lg font-semibold transition-colors ${
                    showLogin 
                      ? 'text-black border-b-2 border-black' 
                      : 'text-black/60 hover:text-black'
                  }`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => setShowLogin(false)}
                  className={`flex-1 py-3 text-lg font-semibold transition-colors ${
                    !showLogin 
                      ? 'text-black border-b-2 border-black' 
                      : 'text-black/60 hover:text-black'
                  }`}
                >
                  Sign Up
                </button>
              </div>
            </div>

            {showLogin ? <LoginForm /> : <SignUpForm />}
          </GlassCard>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
