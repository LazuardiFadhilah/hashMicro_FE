'use client';

import { useState, useEffect } from 'react';

export default function LoadingScreen({ message = "Loading application..." }) {
  const [dots, setDots] = useState('');
  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    // Animate dots
    const dotsInterval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 500);

    // Track time elapsed
    const timeInterval = setInterval(() => {
      setTimeElapsed(prev => prev + 1);
    }, 1000);

    return () => {
      clearInterval(dotsInterval);
      clearInterval(timeInterval);
    };
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="flex flex-col items-center max-w-md mx-auto p-6">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
        <p className="text-gray-600 font-medium text-center">
          {message}{dots}
        </p>
        {timeElapsed > 5 && (
          <p className="text-gray-400 text-sm mt-2 text-center">
            This is taking longer than usual. If the problem persists, try refreshing the page.
          </p>
        )}
        {timeElapsed > 8 && (
          <button 
            onClick={() => window.location.reload()} 
            className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
          >
            Refresh Page
          </button>
        )}
      </div>
    </div>
  );
}