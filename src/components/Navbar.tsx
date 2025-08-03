
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Home, Map, TrendingUp, HelpCircle, Settings } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const Navbar = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  
  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/paths', label: 'Paths', icon: Map },
    { path: '/progress', label: 'Progress', icon: TrendingUp },
    { path: '/quiz', label: 'Quiz', icon: HelpCircle },
    { path: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 px-4 w-full max-w-md">
      <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl px-2 py-2 sm:px-3 sm:py-3">
        <div className="flex items-center justify-between sm:justify-center sm:space-x-1">
          {navItems.map(({ path, label, icon: Icon }) => {
            const isActive = location.pathname === path;
            return (
              <Link
                key={path}
                to={path}
                className={`flex items-center justify-center px-2 py-2 sm:px-3 sm:py-2 rounded-xl text-sm font-medium transition-all duration-300 min-h-[44px] min-w-[44px] ${
                  isActive
                    ? 'bg-white text-black shadow-lg'
                    : 'text-white/80 hover:text-white hover:bg-white/10 active:bg-white/20'
                }`}
              >
                <Icon size={isMobile ? 20 : 18} />
                {!isMobile && <span className="ml-2 hidden sm:block">{label}</span>}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
