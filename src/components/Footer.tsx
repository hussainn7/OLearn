
import React from 'react';
import { Heart, Github, Twitter, Mail, ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-black/5 backdrop-blur-sm border-t border-white/10 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-8 sm:mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start space-x-3 mb-4">
              <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                <Heart className="text-white w-5 h-5" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">TechLearn</h3>
            </div>
            <p className="text-white/70 text-sm sm:text-base leading-relaxed mb-4 max-w-md mx-auto sm:mx-0">
              Empowering everyone to master technology at their own pace. 
              Join thousands learning with confidence every day.
            </p>
            <div className="flex justify-center sm:justify-start space-x-4">
              <a href="#" className="text-white/60 hover:text-white transition-colors duration-200 p-2 hover:bg-white/10 rounded-full">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/60 hover:text-white transition-colors duration-200 p-2 hover:bg-white/10 rounded-full">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/60 hover:text-white transition-colors duration-200 p-2 hover:bg-white/10 rounded-full">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center sm:text-left">
            <h4 className="text-white font-semibold mb-4 text-sm sm:text-base">Learn</h4>
            <ul className="space-y-2 sm:space-y-3">
              <li><a href="/paths" className="text-white/60 hover:text-white transition-colors duration-200 text-sm sm:text-base">Learning Paths</a></li>
              <li><a href="/quiz" className="text-white/60 hover:text-white transition-colors duration-200 text-sm sm:text-base">Practice Quiz</a></li>
              <li><a href="/progress" className="text-white/60 hover:text-white transition-colors duration-200 text-sm sm:text-base">Track Progress</a></li>
            </ul>
          </div>

          {/* Support */}
          <div className="text-center sm:text-left">
            <h4 className="text-white font-semibold mb-4 text-sm sm:text-base">Support</h4>
            <ul className="space-y-2 sm:space-y-3">
              <li><a href="#" className="text-white/60 hover:text-white transition-colors duration-200 text-sm sm:text-base">Help Center</a></li>
              <li><a href="#" className="text-white/60 hover:text-white transition-colors duration-200 text-sm sm:text-base">Contact Us</a></li>
              <li><a href="#" className="text-white/60 hover:text-white transition-colors duration-200 text-sm sm:text-base">Community</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-6 sm:pt-8 border-t border-white/10">
          <div className="text-white/60 text-xs sm:text-sm mb-4 sm:mb-0 text-center sm:text-left">
            © 2024 TechLearn. Made with <Heart className="inline w-3 h-3 mx-1 text-red-400" /> for lifelong learners.
          </div>
          
          <button
            onClick={scrollToTop}
            className="flex items-center space-x-2 text-white/60 hover:text-white transition-all duration-200 hover:bg-white/10 px-3 py-2 rounded-full text-sm group touch-manipulation"
          >
            <span>Back to top</span>
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform duration-200" />
          </button>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-32 sm:w-48 h-px bg-gradient-to-r from-white/20 to-transparent"></div>
      <div className="absolute top-0 right-0 w-32 sm:w-48 h-px bg-gradient-to-l from-white/20 to-transparent"></div>
    </footer>
  );
};

export default Footer;
