import { useEffect, useRef } from 'react';
import { forceLogout } from '@/utils/authUtils';

/**
 * Hook to handle authentication timeout and prevent infinite loading
 */
export const useAuthTimeout = (loading, isAuthenticated) => {
  const timeoutRef = useRef(null);
  const startTimeRef = useRef(Date.now());

  useEffect(() => {
    // Reset start time when loading state changes
    if (loading) {
      startTimeRef.current = Date.now();
      
      // Set a timeout to force logout if loading takes too long
      timeoutRef.current = setTimeout(() => {
        console.warn('Authentication loading timeout, forcing logout...');
        forceLogout();
      }, 10000); // 10 seconds timeout
    } else {
      // Clear timeout when loading finishes
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [loading]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);
};