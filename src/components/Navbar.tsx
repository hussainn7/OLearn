
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Home, Map, TrendingUp, HelpCircle, Settings } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/paths', label: 'Paths', icon: Map },
    { path: '/progress', label: 'Progress', icon: TrendingUp },
    { path: '/quiz', label: 'Quiz', icon: HelpCircle },
    { path: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 animate-fade-in">
      <div className="bg-white/10 backdrop-blur-2xl rounded-3xl border border-white/20 shadow-2xl px-2 py-2 hover:bg-white/15 transition-all duration-500">
        <div className="flex space-x-1">
          {navItems.map(({ path, label, icon: Icon }) => {
            const isActive = location.pathname === path;
            return (
              <Link
                key={path}
                to={path}
                className={`flex items-center space-x-3 px-6 py-3 rounded-2xl text-lg font-medium transition-all duration-300 relative group ${
                  isActive
                    ? 'bg-white text-black shadow-lg scale-105'
                    : 'text-white hover:bg-white/20 hover:scale-105'
                }`}
              >
                <Icon size={22} className="transition-transform duration-300 group-hover:scale-110" />
                <span className="hidden sm:block">{label}</span>
                {isActive && (
                  <div className="absolute inset-0 bg-white rounded-2xl animate-scale-in"></div>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
