
import React from 'react';
import Layout from '@/components/Layout';
import GlassCard from '@/components/GlassCard';
import { ArrowRight, Shield, Smartphone, Mail, Sparkles, Zap, Users, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 sm:top-20 left-10 sm:left-20 w-48 sm:w-72 h-48 sm:h-72 bg-white/3 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 sm:bottom-20 right-10 sm:right-20 w-64 sm:w-96 h-64 sm:h-96 bg-white/2 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 sm:w-[500px] h-80 sm:h-[500px] bg-white/1 rounded-full blur-3xl animate-pulse" style={{animationDelay: '0.5s'}}></div>
          
          {/* Floating elements */}
          <div className="absolute top-1/4 left-5 sm:left-10 animate-float">
            <div className="w-3 sm:w-4 h-3 sm:h-4 bg-white/20 rounded-full blur-sm"></div>
          </div>
          <div className="absolute top-1/3 right-8 sm:right-16 animate-float" style={{animationDelay: '1s'}}>
            <div className="w-2 sm:w-3 h-2 sm:h-3 bg-white/30 rounded-full blur-sm"></div>
          </div>
          <div className="absolute bottom-1/4 left-1/4 animate-float" style={{animationDelay: '2s'}}>
            <div className="w-2 h-2 bg-white/40 rounded-full blur-sm"></div>
          </div>
          
          {/* Additional mobile-optimized decorations */}
          <div className="absolute top-16 right-8 animate-spin-slow">
            <Star className="text-white/20 w-4 h-4 sm:w-6 sm:h-6" />
          </div>
          <div className="absolute bottom-32 left-8 animate-bounce" style={{animationDelay: '1.5s'}}>
            <div className="w-1 h-1 bg-white/50 rounded-full"></div>
          </div>
        </div>

        <GlassCard className="max-w-5xl w-full p-6 sm:p-8 lg:p-12 text-center relative z-10 animate-fade-in">
          {/* Sparkle decorations - adjusted for mobile */}
          <div className="absolute top-4 sm:top-8 right-4 sm:right-8 animate-pulse">
            <Sparkles className="text-white/30 w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div className="absolute bottom-4 sm:bottom-8 left-4 sm:left-8 animate-pulse" style={{animationDelay: '1s'}}>
            <Zap className="text-white/30 w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          
          <div className="space-y-6 sm:space-y-8">
            <div className="space-y-3 sm:space-y-4 animate-fade-in" style={{animationDelay: '0.2s'}}>
              <div className="flex items-center justify-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
                <div className="w-8 h-8 sm:w-12 sm:h-12 bg-black/10 rounded-full flex items-center justify-center animate-scale-in">
                  <Users className="text-black w-4 h-4 sm:w-6 sm:h-6" />
                </div>
                <div className="h-px w-8 sm:w-16 bg-gradient-to-r from-transparent via-black/20 to-transparent"></div>
                <span className="text-black/60 text-xs sm:text-sm font-medium tracking-wider uppercase">Learn Together</span>
              </div>
              
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-black leading-tight">
                Master Technology
              </h1>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-light text-black/80 relative">
                At Your Own Pace
                <div className="absolute -bottom-1 sm:-bottom-2 left-1/2 transform -translate-x-1/2 w-16 sm:w-24 h-0.5 sm:h-1 bg-gradient-to-r from-transparent via-black/20 to-transparent rounded-full"></div>
              </h2>
            </div>
            
            <div className="animate-fade-in" style={{animationDelay: '0.4s'}}>
              <p className="text-lg sm:text-xl lg:text-2xl text-black/70 max-w-3xl mx-auto leading-relaxed mb-3 sm:mb-4 px-2">
                Learn everyday technology with confidence and ease.
              </p>
              <p className="text-base sm:text-lg text-black/60 max-w-2xl mx-auto px-2">
                Step-by-step guidance designed for your comfort and success.
              </p>
            </div>
            
            <div className="animate-fade-in space-y-4 sm:space-y-6" style={{animationDelay: '0.6s'}}>
              <Link
                to="/paths"
                className="inline-flex items-center space-x-2 sm:space-x-3 bg-black text-white px-8 sm:px-12 py-4 sm:py-5 rounded-full text-lg sm:text-xl font-semibold hover:bg-black/90 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 group relative overflow-hidden touch-manipulation"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                <span className="relative z-10">Get Started Today</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300 relative z-10 sm:w-6 sm:h-6" />
              </Link>
              
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-1 sm:space-y-0 sm:space-x-4 text-black/50 text-sm px-4">
                <div className="flex items-center space-x-2">
                  <span>✓ Free to start</span>
                  <span className="hidden sm:inline">•</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>✓ No experience needed</span>
                  <span className="hidden sm:inline">•</span>
                </div>
                <span>✓ Progress at your pace</span>
              </div>
            </div>
            
            <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              <div className="animate-fade-in hover:scale-105 transition-all duration-300 group" style={{animationDelay: '0.8s'}}>
                <div className="bg-black/5 rounded-xl p-6 sm:p-8 backdrop-blur-sm border border-black/10 hover:bg-black/10 hover:border-black/20 transition-all duration-300 relative overflow-hidden h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <Shield size={40} className="mx-auto mb-4 text-black group-hover:scale-110 transition-transform duration-300 sm:w-12 sm:h-12" />
                  <h3 className="text-lg sm:text-xl font-semibold mb-3 text-black">Step by Step</h3>
                  <p className="text-sm sm:text-base text-black/60 leading-relaxed">Learn at your comfortable pace with clear, easy-to-follow guidance</p>
                </div>
              </div>
              
              <div className="animate-fade-in hover:scale-105 transition-all duration-300 group" style={{animationDelay: '1s'}}>
                <div className="bg-black/5 rounded-xl p-6 sm:p-8 backdrop-blur-sm border border-black/10 hover:bg-black/10 hover:border-black/20 transition-all duration-300 relative overflow-hidden h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <Smartphone size={40} className="mx-auto mb-4 text-black group-hover:scale-110 transition-transform duration-300 sm:w-12 sm:h-12" />
                  <h3 className="text-lg sm:text-xl font-semibold mb-3 text-black">Safe Practice</h3>
                  <p className="text-sm sm:text-base text-black/60 leading-relaxed">Risk-free environment to explore and learn without consequences</p>
                </div>
              </div>
              
              <div className="animate-fade-in hover:scale-105 transition-all duration-300 group sm:col-span-2 lg:col-span-1" style={{animationDelay: '1.2s'}}>
                <div className="bg-black/5 rounded-xl p-6 sm:p-8 backdrop-blur-sm border border-black/10 hover:bg-black/10 hover:border-black/20 transition-all duration-300 relative overflow-hidden h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <Mail size={40} className="mx-auto mb-4 text-black group-hover:scale-110 transition-transform duration-300 sm:w-12 sm:h-12" />
                  <h3 className="text-lg sm:text-xl font-semibold mb-3 text-black">Expert Support</h3>
                  <p className="text-sm sm:text-base text-black/60 leading-relaxed">Always here when you need help, every step of the way</p>
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
