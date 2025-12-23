import React, { useEffect, useState } from 'react';
import { type AuthContextType, type User } from '../models';
import { AuthContext } from './auth';

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check authentication state on mount
  useEffect(() => {
    const initAuth = () => {
      const savedToken = localStorage.getItem('authToken');
      const savedUser = localStorage.getItem('userData');

      if (savedToken && savedUser) {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
      }

      setIsLoading(false);
    };

    initAuth();
  }, []);

  const login = async () => {
    throw new Error('Use useLogin hook for login functionality');
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    setToken(null);
    setUser(null);
  };

  // Update context when localStorage changes (e.g., after successful login)
  useEffect(() => {
    const handleStorageChange = () => {
      const savedToken = localStorage.getItem('authToken');
      const savedUser = localStorage.getItem('userData');

      if (savedToken && savedUser) {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
      } else {
        setToken(null);
        setUser(null);
      }
    };

    // Listen for storage changes
    window.addEventListener('storage', handleStorageChange);

    // Also listen for custom events (for same-tab updates)
    window.addEventListener('authStateChange', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('authStateChange', handleStorageChange);
    };
  }, []);

  const value: AuthContextType = {
    user,
    token,
    isAuthenticated: !!(token && user),
    login,
    logout,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
