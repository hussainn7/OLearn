
import React from 'react';
import Layout from '@/components/Layout';
import GlassCard from '@/components/GlassCard';
import { ArrowRight, Shield, Smartphone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/3 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/2 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        <GlassCard className="max-w-5xl w-full p-16 text-center relative z-10 animate-fade-in">
          <div className="space-y-8">
            <h1 className="text-7xl md:text-8xl font-bold text-white mb-8 leading-tight animate-fade-in delay-200">
              Master Technology
              <br />
              <span className="text-5xl md:text-6xl text-white/90 animate-fade-in delay-400">
                At Your Own Pace
              </span>
            </h1>
            
            <p className="text-2xl md:text-3xl text-white/80 mb-16 font-medium max-w-4xl mx-auto animate-fade-in delay-600">
              Learn everyday technology with confidence and ease.
              <br />
              Step-by-step guidance designed for your comfort.
            </p>
            
            <div className="animate-fade-in delay-800">
              <Link
                to="/paths"
                className="inline-flex items-center space-x-4 bg-white text-black px-16 py-8 rounded-3xl text-2xl font-bold hover:bg-gray-100 transition-all duration-500 shadow-2xl hover:shadow-white/20 hover:scale-110 group"
              >
                <span>Get Started Today</span>
                <ArrowRight size={32} className="group-hover:translate-x-2 transition-transform duration-300" />
              </Link>
            </div>
            
            <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-12 text-white/80">
              <div className="animate-fade-in delay-1000 hover:scale-105 transition-transform duration-300">
                <div className="bg-white/10 rounded-2xl p-8 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-300">
                  <Shield size={48} className="mx-auto mb-4 text-white" />
                  <h3 className="text-2xl font-semibold mb-3 text-white">Step by Step</h3>
                  <p className="text-lg text-white/70">Learn at your comfortable pace with clear guidance</p>
                </div>
              </div>
              
              <div className="animate-fade-in delay-1200 hover:scale-105 transition-transform duration-300">
                <div className="bg-white/10 rounded-2xl p-8 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-300">
                  <Smartphone size={48} className="mx-auto mb-4 text-white" />
                  <h3 className="text-2xl font-semibold mb-3 text-white">Safe Practice</h3>
                  <p className="text-lg text-white/70">Risk-free environment to explore and learn</p>
                </div>
              </div>
              
              <div className="animate-fade-in delay-1400 hover:scale-105 transition-transform duration-300">
                <div className="bg-white/10 rounded-2xl p-8 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-300">
                  <Mail size={48} className="mx-auto mb-4 text-white" />
                  <h3 className="text-2xl font-semibold mb-3 text-white">Expert Support</h3>
                  <p className="text-lg text-white/70">Always here when you need help</p>
                </div>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>
    </Layout>
  );
};

export default Home;
