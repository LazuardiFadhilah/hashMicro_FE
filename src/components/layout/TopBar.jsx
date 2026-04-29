'use client';

import { FiMenu } from 'react-icons/fi';
import { useAuth } from '@/context/AuthContext';

export default function TopBar({ onMenuClick }) {
  const { user } = useAuth();

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-30">
      <div className="flex items-center justify-between px-6 py-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden text-gray-600 hover:text-gray-800"
        >
          <FiMenu size={24} />
        </button>

        <div className="hidden lg:block">
          <h2 className="text-lg font-semibold text-gray-800">
            Student Management System
          </h2>
        </div>

        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-sm font-medium text-gray-800">
              {user?.name || 'User'}
            </p>
            <p className="text-xs text-gray-500">{user?.email || ''}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
            {user?.name?.charAt(0).toUpperCase() || 'U'}
          </div>
        </div>
      </div>
    </header>
  );
}
