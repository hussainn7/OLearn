
import React from 'react';
import Layout from '@/components/Layout';
import GlassCard from '@/components/GlassCard';
import { ArrowRight, Shield, Smartphone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white/3 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-white/2 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/1 rounded-full blur-3xl animate-pulse" style={{animationDelay: '0.5s'}}></div>
        </div>

        <GlassCard className="max-w-4xl w-full p-12 text-center relative z-10 animate-fade-in">
          <div className="space-y-8">
            <div className="space-y-4 animate-fade-in" style={{animationDelay: '0.2s'}}>
              <h1 className="text-6xl md:text-7xl font-bold text-black leading-tight">
                Master Technology
              </h1>
              <h2 className="text-4xl md:text-5xl font-light text-black/80">
                At Your Own Pace
              </h2>
            </div>
            
            <p className="text-xl md:text-2xl text-black/70 max-w-3xl mx-auto leading-relaxed animate-fade-in" style={{animationDelay: '0.4s'}}>
              Learn everyday technology with confidence and ease.
              <br />
              Step-by-step guidance designed for your comfort.
            </p>
            
            <div className="animate-fade-in" style={{animationDelay: '0.6s'}}>
              <Link
                to="/paths"
                className="inline-flex items-center space-x-3 bg-black text-white px-10 py-4 rounded-full text-xl font-semibold hover:bg-black/90 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 group"
              >
                <span>Get Started Today</span>
                <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
            
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="animate-fade-in hover:scale-105 transition-transform duration-300" style={{animationDelay: '0.8s'}}>
                <div className="bg-black/5 rounded-xl p-6 backdrop-blur-sm border border-black/10 hover:bg-black/10 transition-all duration-300">
                  <Shield size={40} className="mx-auto mb-3 text-black" />
                  <h3 className="text-xl font-semibold mb-2 text-black">Step by Step</h3>
                  <p className="text-black/60">Learn at your comfortable pace with clear guidance</p>
                </div>
              </div>
              
              <div className="animate-fade-in hover:scale-105 transition-transform duration-300" style={{animationDelay: '1s'}}>
                <div className="bg-black/5 rounded-xl p-6 backdrop-blur-sm border border-black/10 hover:bg-black/10 transition-all duration-300">
                  <Smartphone size={40} className="mx-auto mb-3 text-black" />
                  <h3 className="text-xl font-semibold mb-2 text-black">Safe Practice</h3>
                  <p className="text-black/60">Risk-free environment to explore and learn</p>
                </div>
              </div>
              
              <div className="animate-fade-in hover:scale-105 transition-transform duration-300" style={{animationDelay: '1.2s'}}>
                <div className="bg-black/5 rounded-xl p-6 backdrop-blur-sm border border-black/10 hover:bg-black/10 transition-all duration-300">
                  <Mail size={40} className="mx-auto mb-3 text-black" />
                  <h3 className="text-xl font-semibold mb-2 text-black">Expert Support</h3>
                  <p className="text-black/60">Always here when you need help</p>
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
