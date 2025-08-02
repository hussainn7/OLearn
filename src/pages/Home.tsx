
import React from 'react';
import Layout from '@/components/Layout';
import GlassCard from '@/components/GlassCard';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center px-4">
        <GlassCard className="max-w-4xl w-full p-12 text-center">
          <h1 className="text-6xl md:text-7xl font-bold text-black mb-6 leading-tight">
            Master Technology
            <br />
            <span className="text-5xl md:text-6xl">At Your Own Pace</span>
          </h1>
          
          <p className="text-2xl md:text-3xl text-black/80 mb-12 font-medium">
            SilverLinQ helps seniors master everyday technology
            <br />
            with confidence and ease
          </p>
          
          <Link
            to="/paths"
            className="inline-flex items-center space-x-3 bg-white text-black px-12 py-6 rounded-2xl text-2xl font-bold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          >
            <span>Get Started Today</span>
            <ArrowRight size={28} />
          </Link>
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-black/70">
            <div>
              <h3 className="text-xl font-semibold mb-2">Step by Step</h3>
              <p className="text-lg">Learn at your comfortable pace</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Safe Practice</h3>
              <p className="text-lg">Risk-free environment to explore</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Expert Support</h3>
              <p className="text-lg">Always here when you need help</p>
            </div>
          </div>
        </GlassCard>
      </div>
    </Layout>
  );
};

export default Home;
