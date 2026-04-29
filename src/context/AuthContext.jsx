'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { login as loginApi } from '@/api/auth.api';

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

  useEffect(() => {
    // Check for token on mount
    const initAuth = () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const decoded = jwtDecode(token);
          // Check if token is expired
          if (decoded.exp * 1000 > Date.now()) {
            setUser(decoded);
            setIsAuthenticated(true);
          } else {
            console.warn('Token expired, removing...');
            localStorage.removeItem('token');
          }
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        localStorage.removeItem('token');
      } finally {
        // Ensure loading is set to false regardless of success or failure
        setLoading(false);
      }
    };

    initAuth();
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
    localStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
