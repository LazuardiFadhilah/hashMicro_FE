'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import LoadingScreen from '@/components/LoadingScreen';

export default function Home() {
  const router = useRouter();
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    // Wait for auth to finish loading
    if (!loading) {
      // Use replace to avoid back button issues
      if (isAuthenticated) {
        router.replace('/dashboard');
      } else {
        router.replace('/login');
      }
    }
  }, [isAuthenticated, loading, router]);

  // Show loading only when actually loading
  if (loading) {
    return <LoadingScreen message="Checking authentication" />;
  }

  // Return null while redirecting to prevent flash
  return null;
}
