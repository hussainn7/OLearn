
import React from 'react';
import { Heart, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative bg-black/95 backdrop-blur-xl border-t border-white/10 mt-20">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute bottom-0 left-20 w-64 h-64 bg-white/2 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-20 w-48 h-48 bg-white/3 rounded-full blur-2xl"></div>
      </div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand Section */}
          <div className="space-y-4 animate-fade-in">
            <h3 className="text-2xl font-bold text-white">Tech Learning</h3>
            <p className="text-white/70 leading-relaxed">
              Empowering everyone to master technology at their own pace with confidence and ease.
            </p>
            <div className="flex items-center space-x-2 text-white/60">
              <span>Made with</span>
              <Heart size={16} className="text-red-400 animate-pulse" />
              <span>for learners everywhere</span>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="space-y-4 animate-fade-in" style={{animationDelay: '0.2s'}}>
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <ul className="space-y-3">
              {['Learning Paths', 'Practice Quiz', 'Progress Tracker', 'Settings', 'Help & Support'].map((link, index) => (
                <li key={link}>
                  <a 
                    href="#" 
                    className="text-white/70 hover:text-white transition-all duration-300 hover:translate-x-1 inline-block"
                    style={{animationDelay: `${0.3 + index * 0.1}s`}}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Info */}
          <div className="space-y-4 animate-fade-in" style={{animationDelay: '0.4s'}}>
            <h4 className="text-lg font-semibold text-white">Get In Touch</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-white/70">
                <Mail size={18} />
                <span>support@techlearning.com</span>
              </div>
              <div className="flex items-center space-x-3 text-white/70">
                <Phone size={18} />
                <span>1-800-TECH-HELP</span>
              </div>
              <div className="flex items-center space-x-3 text-white/70">
                <MapPin size={18} />
                <span>Available Worldwide</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-white/50 text-sm">
            © 2024 Tech Learning Platform. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm text-white/50">
            <a href="#" className="hover:text-white transition-colors duration-300">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors duration-300">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors duration-300">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
