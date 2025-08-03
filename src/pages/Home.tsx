
import React from 'react';
import Layout from '@/components/Layout';
import GlassCard from '@/components/GlassCard';
import { ArrowRight, Shield, Smartphone, Mail, Sparkles, Zap, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
        {/* Enhanced Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white/3 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-white/2 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/1 rounded-full blur-3xl animate-pulse" style={{animationDelay: '0.5s'}}></div>
          
          {/* Floating elements */}
          <div className="absolute top-1/4 left-10 animate-float">
            <div className="w-4 h-4 bg-white/20 rounded-full blur-sm"></div>
          </div>
          <div className="absolute top-1/3 right-16 animate-float" style={{animationDelay: '1s'}}>
            <div className="w-3 h-3 bg-white/30 rounded-full blur-sm"></div>
          </div>
          <div className="absolute bottom-1/4 left-1/4 animate-float" style={{animationDelay: '2s'}}>
            <div className="w-2 h-2 bg-white/40 rounded-full blur-sm"></div>
          </div>
        </div>

        <GlassCard className="max-w-5xl w-full p-12 text-center relative z-10 animate-fade-in">
          {/* Sparkle decoration */}
          <div className="absolute top-8 right-8 animate-pulse">
            <Sparkles className="text-white/30" size={24} />
          </div>
          <div className="absolute bottom-8 left-8 animate-pulse" style={{animationDelay: '1s'}}>
            <Zap className="text-white/30" size={20} />
          </div>
          
          <div className="space-y-8">
            <div className="space-y-4 animate-fade-in" style={{animationDelay: '0.2s'}}>
              <div className="flex items-center justify-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-black/10 rounded-full flex items-center justify-center animate-scale-in">
                  <Users className="text-black" size={24} />
                </div>
                <div className="h-px w-16 bg-gradient-to-r from-transparent via-black/20 to-transparent"></div>
                <span className="text-black/60 text-sm font-medium tracking-wider uppercase">Learn Together</span>
              </div>
              
              <h1 className="text-6xl md:text-7xl font-bold text-black leading-tight">
                Master Technology
              </h1>
              <h2 className="text-4xl md:text-5xl font-light text-black/80 relative">
                At Your Own Pace
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-black/20 to-transparent rounded-full"></div>
              </h2>
            </div>
            
            <div className="animate-fade-in" style={{animationDelay: '0.4s'}}>
              <p className="text-xl md:text-2xl text-black/70 max-w-3xl mx-auto leading-relaxed mb-4">
                Learn everyday technology with confidence and ease.
              </p>
              <p className="text-lg text-black/60 max-w-2xl mx-auto">
                Step-by-step guidance designed for your comfort and success.
              </p>
            </div>
            
            <div className="animate-fade-in space-y-6" style={{animationDelay: '0.6s'}}>
              <Link
                to="/paths"
                className="inline-flex items-center space-x-3 bg-black text-white px-12 py-5 rounded-full text-xl font-semibold hover:bg-black/90 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                <span className="relative z-10">Get Started Today</span>
                <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform duration-300 relative z-10" />
              </Link>
              
              <div className="flex items-center justify-center space-x-4 text-black/50 text-sm">
                <span>✓ Free to start</span>
                <span>•</span>
                <span>✓ No experience needed</span>
                <span>•</span>
                <span>✓ Progress at your pace</span>
              </div>
            </div>
            
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="animate-fade-in hover:scale-105 transition-all duration-300 group" style={{animationDelay: '0.8s'}}>
                <div className="bg-black/5 rounded-xl p-8 backdrop-blur-sm border border-black/10 hover:bg-black/10 hover:border-black/20 transition-all duration-300 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <Shield size={48} className="mx-auto mb-4 text-black group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-xl font-semibold mb-3 text-black">Step by Step</h3>
                  <p className="text-black/60">Learn at your comfortable pace with clear, easy-to-follow guidance</p>
                </div>
              </div>
              
              <div className="animate-fade-in hover:scale-105 transition-all duration-300 group" style={{animationDelay: '1s'}}>
                <div className="bg-black/5 rounded-xl p-8 backdrop-blur-sm border border-black/10 hover:bg-black/10 hover:border-black/20 transition-all duration-300 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <Smartphone size={48} className="mx-auto mb-4 text-black group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-xl font-semibold mb-3 text-black">Safe Practice</h3>
                  <p className="text-black/60">Risk-free environment to explore and learn without consequences</p>
                </div>
              </div>
              
              <div className="animate-fade-in hover:scale-105 transition-all duration-300 group" style={{animationDelay: '1.2s'}}>
                <div className="bg-black/5 rounded-xl p-8 backdrop-blur-sm border border-black/10 hover:bg-black/10 hover:border-black/20 transition-all duration-300 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <Mail size={48} className="mx-auto mb-4 text-black group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-xl font-semibold mb-3 text-black">Expert Support</h3>
                  <p className="text-black/60">Always here when you need help, every step of the way</p>
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
