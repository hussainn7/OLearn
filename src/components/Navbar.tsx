
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Home, Map, TrendingUp, HelpCircle, Settings, LogOut, User, LogIn } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const Navbar = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const { user, signOut } = useAuth();
  
  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/paths', label: 'Paths', icon: Map },
    { path: '/progress', label: 'Progress', icon: TrendingUp },
    { path: '/quiz', label: 'Quiz', icon: HelpCircle },
    { path: '/settings', label: 'Settings', icon: Settings },
  ];

  const handleSignOut = async () => {
    await signOut();
  };

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
          
          {/* User Menu or Auth Buttons */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      {user?.email?.charAt(0).toUpperCase() || <User className="h-4 w-4" />}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user?.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="sm"
                className="text-white/80 hover:text-white hover:bg-white/10"
                onClick={() => window.location.href = '/'}
              >
                <LogIn size={isMobile ? 16 : 14} />
                {!isMobile && <span className="ml-1 text-xs">Login</span>}
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
