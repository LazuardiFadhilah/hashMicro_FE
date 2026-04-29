'use client';

import { useState } from 'react';
import PrivateRoute from '@/components/PrivateRoute';
import Sidebar from '@/components/layout/Sidebar';
import TopBar from '@/components/layout/TopBar';
import Toast from '@/components/ui/Toast';
import { check } from '@/api/checker.api';

export default function CheckerPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [type, setType] = useState('sensitive');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const response = await check(input1, input2, type);
      // Backend returns response.data with: matched, total, percentage
      setResult(response.data);
    } catch (error) {
      console.error('Error checking characters:', error);
      setToast({ 
        message: error.response?.data?.message || 'Error checking characters', 
        type: 'error' 
      });
    } finally {
      setLoading(false);
    }
  };

  const highlightMatches = () => {
    if (!result) return input1;

    // Get unique characters from input1
    const compareInput1 = type === 'insensitive' ? input1.toLowerCase() : input1;
    const compareInput2 = type === 'insensitive' ? input2.toLowerCase() : input2;
    
    const chars = input1.split('');
    return chars.map((char, index) => {
      const compareChar = type === 'insensitive' ? char.toLowerCase() : char;
      const isMatched = compareInput2.includes(compareChar);
      
      return (
        <span
          key={index}
          className={isMatched ? 'bg-yellow-300 font-semibold' : ''}
        >
          {char}
        </span>
      );
    });
  };

  return (
    <PrivateRoute>
      <div className="flex h-screen bg-gray-50">
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
        
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <div className="flex-1 flex flex-col lg:ml-64">
          <TopBar onMenuClick={() => setSidebarOpen(true)} />

          <main className="flex-1 overflow-y-auto p-6">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-3xl font-bold text-gray-800 mb-6">
                Character Checker
              </h1>

              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Input 1
                    </label>
                    <textarea
                      value={input1}
                      onChange={(e) => setInput1(e.target.value)}
                      required
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                      placeholder="Enter first text..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Input 2
                    </label>
                    <textarea
                      value={input2}
                      onChange={(e) => setInput2(e.target.value)}
                      required
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                      placeholder="Enter second text..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Case Sensitivity
                    </label>
                    <div className="flex space-x-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          value="sensitive"
                          checked={type === 'sensitive'}
                          onChange={(e) => setType(e.target.value)}
                          className="mr-2"
                        />
                        <span className="text-sm text-gray-700">Sensitive Case</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          value="insensitive"
                          checked={type === 'insensitive'}
                          onChange={(e) => setType(e.target.value)}
                          className="mr-2"
                        />
                        <span className="text-sm text-gray-700">Non-sensitive Case</span>
                      </label>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                  >
                    {loading ? 'Checking...' : 'Check Characters'}
                  </button>
                </form>
              </div>

              {/* Results */}
              {result && (
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Results</h2>

                  {/* Percentage */}
                  <div className="text-center mb-6">
                    <div className="text-6xl font-bold text-blue-600 mb-2">
                      {result.percentage}%
                    </div>
                    <p className="text-gray-600">Match Percentage</p>
                  </div>

                  {/* Breakdown */}
                  <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <p className="text-center text-lg text-gray-700">
                      <span className="font-semibold text-blue-600">
                        {result.matched}
                      </span>{' '}
                      out of{' '}
                      <span className="font-semibold text-gray-800">
                        {result.total}
                      </span>{' '}
                      characters matched
                    </p>
                  </div>

                  {/* Highlighted Text */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">
                      Matched Characters (highlighted in yellow):
                    </h3>
                    <div className="bg-gray-50 rounded-lg p-4 font-mono text-lg leading-relaxed break-words">
                      {highlightMatches()}
                    </div>
                  </div>

                  {/* Additional Info */}
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-600">
                      Case Sensitivity: <span className="font-medium">{type === 'sensitive' ? 'Case Sensitive' : 'Case Insensitive'}</span>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </PrivateRoute>
  );
}
