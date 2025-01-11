import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from './supabase';
import type { User } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  role: 'admin' | 'editor' | 'contributor' | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export async function getUserRole(userId: string): Promise<'admin' | 'editor' | 'contributor' | null> {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('role')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error fetching user role:', error);
      return null;
    }

    return data?.role || null;
  } catch (error) {
    console.error('Error in getUserRole:', error);
    return null;
  }
}

export function requireAuth(allowedRoles: string[]) {
  return function withAuth<P extends object>(WrappedComponent: React.ComponentType<P>) {
    return function AuthenticatedComponent(props: P) {
      const { user, role, loading } = useAuth();
      const navigate = useNavigate();

      useEffect(() => {
        if (!loading && (!user || !allowedRoles.includes(role || ''))) {
          navigate('/admin/login');
        }
      }, [user, role, loading, navigate]);

      if (loading) {
        return <div className="text-white">Loading...</div>;
      }

      if (!user || !allowedRoles.includes(role || '')) {
        return null;
      }

      return <WrappedComponent {...props} />;
    };
  };
}