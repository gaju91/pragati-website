import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      {/* Crystal background with enhanced effects - removed border */}
      <div className="absolute inset-0 bg-black backdrop-blur-xl">
        <div className="absolute inset-0 overflow-hidden">
          {/* Multiple layered gradients for depth */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_50%)] animate-pulse-slow"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(255,255,255,0.05),transparent_50%)] animate-pulse-slower"></div>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05),transparent_100%)]"></div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Rest of the navbar content remains the same */}
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link 
              to="/" 
              className="text-white font-bold text-xl relative group"
            >
              <span className="relative z-10 group-hover:text-shadow-glow transition-all duration-300">
                Pragati Digital
              </span>
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 rounded-lg -m-2 transition-all duration-300 blur"></div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {[
              { path: '/', label: 'Home' },
              { path: '/portfolio', label: 'Portfolio' },
              { path: '/contact', label: 'Contact' }
            ].map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className={`relative group px-6 py-2 text-white font-medium transition-all duration-300
                           overflow-hidden rounded-lg ${
                             isActive(path) 
                               ? 'bg-white/10 shadow-[0_0_15px_rgba(255,255,255,0.1)]' 
                               : 'bg-white/5 hover:bg-white/10'
                           }`}
              >
                {/* Button background effects */}
                <div className="absolute inset-0 border border-white/10 group-hover:border-white/20 rounded-lg transition-colors duration-300"></div>
                <div className="absolute inset-[1px] rounded-lg bg-black/20 backdrop-blur-sm"></div>
                
                {/* Shine effect */}
                <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] 
                              bg-gradient-to-r from-transparent via-white/10 to-transparent duration-1000 ease-out">
                </div>
                
                {/* Text with glow effect */}
                <span className="relative z-10 group-hover:text-shadow-glow">{label}</span>
                
                {/* Active indicator */}
                {isActive(path) && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/20 shadow-[0_0_8px_rgba(255,255,255,0.5)]"></div>
                )}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative p-2 text-white/80 hover:text-white rounded-lg
                         bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20
                         transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="relative md:hidden py-4 space-y-2 animate-fade-in">
            {[
              { path: '/', label: 'Home' },
              { path: '/portfolio', label: 'Portfolio' },
              { path: '/contact', label: 'Contact' }
            ].map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-4 py-2 text-white rounded-lg transition-all duration-300
                           relative overflow-hidden group ${
                             isActive(path)
                               ? 'bg-white/10 shadow-[0_0_15px_rgba(255,255,255,0.1)]'
                               : 'hover:bg-white/10'
                           }`}
              >
                <div className="absolute inset-0 border border-white/10 group-hover:border-white/20 rounded-lg"></div>
                <div className="absolute inset-[1px] rounded-lg bg-black/20 backdrop-blur-sm"></div>
                <span className="relative z-10 group-hover:text-shadow-glow">{label}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;