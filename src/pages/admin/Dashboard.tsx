import React, { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { LogOut, Image, FolderKanban, Home, Menu, X, ChevronRight } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../lib/auth';

export default function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, role, loading } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/admin/login');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  const menuItems = [
    { path: '/admin/dashboard', icon: Home, label: 'Dashboard' },
    { path: '/admin/carousel', icon: Image, label: 'Carousel' },
    { path: '/admin/projects', icon: FolderKanban, label: 'Projects' }
  ];

  return (
    <div className="admin-panel">
      <nav className="admin-nav">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-white/60 hover:text-white rounded-lg hover:bg-white/5"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>

              <h1 className="text-xl font-bold text-white ml-2 md:ml-0">Admin Dashboard</h1>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-4 ml-8">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`nav-button ${
                        location.pathname === item.path ? 'bg-white/20' : ''
                      }`}
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Link to="/" className="nav-button">
                <Home className="w-4 h-4 mr-2" />
                View Site
              </Link>
              <button onClick={handleLogout} className="nav-button">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-white/10">
            <div className="px-4 py-3 space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center px-3 py-2 rounded-lg text-white hover:bg-white/5 ${
                      location.pathname === item.path ? 'bg-white/10' : ''
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    {item.label}
                    <ChevronRight className="w-4 h-4 ml-auto" />
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </nav>

      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
}