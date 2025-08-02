
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
    <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-white/10 backdrop-blur-xl rounded-full border border-white/20 shadow-2xl px-3 py-3">
        <div className="flex items-center space-x-2">
          {navItems.map(({ path, label, icon: Icon }) => {
            const isActive = location.pathname === path;
            return (
              <Link
                key={path}
                to={path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? 'bg-white text-black shadow-lg'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon size={18} />
                <span className="hidden sm:block">{label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
