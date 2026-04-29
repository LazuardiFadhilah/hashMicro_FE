'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { login as loginApi } from '@/api/auth.api';
import { clearAuthData, isTokenValid, forceLogout } from '@/utils/authUtils';
import { useAuthTimeout } from '@/hooks/useAuthTimeout';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Use timeout hook to prevent infinite loading
  useAuthTimeout(loading, isAuthenticated);

  useEffect(() => {
    // Check for token on mount
    const initAuth = () => {
      try {
        const token = localStorage.getItem('token');
        if (token && isTokenValid(token)) {
          const decoded = jwtDecode(token);
          setUser(decoded);
          setIsAuthenticated(true);
        } else {
          // Token is invalid or expired
          if (token) {
            console.warn('Token expired or invalid, clearing...');
            clearAuthData();
          }
          setUser(null);
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        clearAuthData();
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        // Ensure loading is set to false regardless of success or failure
        setLoading(false);
      }
    };

    // Add a small delay to prevent flash of loading state
    const timeoutId = setTimeout(initAuth, 50);
    return () => clearTimeout(timeoutId);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await loginApi(email, password);
      // Handle different response structures: { token } or { data: { token } }
      const token = response.token || response.data?.token;
      
      if (!token) {
        throw new Error('No token received from server');
      }

      localStorage.setItem('token', token);
      const decoded = jwtDecode(token);
      setUser(decoded);
      setIsAuthenticated(true);
      return { success: true };
    } catch (err) {
      console.error('Login error:', err);
      return { 
        success: false, 
        error: err.response?.data?.message || err.message || 'Login failed' 
      };
    }
  };

  const logout = () => {
    try {
      forceLogout();
    } catch (error) {
      console.error('Logout error:', error);
      // Fallback: still clear state even if forceLogout fails
      setUser(null);
      setIsAuthenticated(false);
      clearAuthData();
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
