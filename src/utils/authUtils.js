/**
 * Authentication utilities for session management
 */

/**
 * Clear all authentication data and cached state
 */
export const clearAuthData = () => {
  try {
    // Clear localStorage
    localStorage.removeItem('token');
    
    // Clear sessionStorage
    sessionStorage.clear();
    
    // Clear any other auth-related data
    const keysToRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && (key.includes('auth') || key.includes('user') || key.includes('token'))) {
        keysToRemove.push(key);
      }
    }
    
    keysToRemove.forEach(key => localStorage.removeItem(key));
    
    console.log('Auth data cleared successfully');
  } catch (error) {
    console.error('Error clearing auth data:', error);
  }
};

/**
 * Check if token exists and is valid
 */
export const isTokenValid = (token) => {
  if (!token) return false;
  
  try {
    // Import jwtDecode dynamically to avoid SSR issues
    if (typeof window === 'undefined') return false;
    
    const { jwtDecode } = require('jwt-decode');
    const decoded = jwtDecode(token);
    return decoded.exp * 1000 > Date.now();
  } catch (error) {
    console.error('Error validating token:', error);
    return false;
  }
};

/**
 * Force logout with complete cleanup
 */
export const forceLogout = () => {
  clearAuthData();
  
  // Force page reload to clear any cached state
  if (typeof window !== 'undefined') {
    window.location.replace('/login');
  }
};