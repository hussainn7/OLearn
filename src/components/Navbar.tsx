
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
    <nav className="fixed top-4 left-4 right-4 z-50 bg-white/70 backdrop-blur-md rounded-2xl border border-white/20 shadow-lg">
      <div className="flex items-center justify-center px-6 py-3">
        <div className="flex space-x-2">
          {navItems.map(({ path, label, icon: Icon }) => {
            const isActive = location.pathname === path;
            return (
              <Link
                key={path}
                to={path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full text-lg font-medium transition-all duration-300 ${
                  isActive
                    ? 'bg-black text-white shadow-lg'
                    : 'text-black hover:bg-white/50'
                }`}
              >
                <Icon size={20} />
                <span>{label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
