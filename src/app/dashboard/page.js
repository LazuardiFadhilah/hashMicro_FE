'use client';

import { useState, useEffect } from 'react';
import PrivateRoute from '@/components/PrivateRoute';
import Sidebar from '@/components/layout/Sidebar';
import TopBar from '@/components/layout/TopBar';
import { useAuth } from '@/context/AuthContext';
import { FiUsers, FiBook, FiAward } from 'react-icons/fi';
import { getAll as getStudents } from '@/api/students.api';
import { getAll as getSubjects } from '@/api/subjects.api';
import { getReport } from '@/api/grades.api';

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalSubjects: 0,
    totalGrades: 0,
  });
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [studentsRes, subjectsRes, gradesRes] = await Promise.all([
        getStudents(1, 1),
        getSubjects(),
        getReport(),
      ]);

      setStats({
        totalStudents: studentsRes.data?.total || 0,
        totalSubjects: subjectsRes.data?.subjects?.length || 0,
        // Backend returns data.report
        totalGrades: gradesRes.data?.report?.length || 0,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
      setStats({
        totalStudents: 0,
        totalSubjects: 0,
        totalGrades: 0,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <PrivateRoute>
      <div className="flex h-screen bg-gray-50">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <div className="flex-1 flex flex-col lg:ml-64">
          <TopBar onMenuClick={() => setSidebarOpen(true)} />

          <main className="flex-1 overflow-y-auto p-6">
            <div className="max-w-7xl mx-auto">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  Welcome back, {user?.name || 'User'}!
                </h1>
                <p className="text-gray-600">
                  Here&apos;s what&apos;s happening with your student management system today.
                </p>
              </div>

              {loading ? (
                <div className="flex items-center justify-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Total Students Card */}
                  <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-600">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600 mb-1">
                          Total Students
                        </p>
                        <p className="text-3xl font-bold text-gray-800">
                          {stats.totalStudents}
                        </p>
                      </div>
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <FiUsers className="text-blue-600" size={24} />
                      </div>
                    </div>
                  </div>

                  {/* Total Subjects Card */}
                  <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-600">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600 mb-1">
                          Total Subjects
                        </p>
                        <p className="text-3xl font-bold text-gray-800">
                          {stats.totalSubjects}
                        </p>
                      </div>
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <FiBook className="text-green-600" size={24} />
                      </div>
                    </div>
                  </div>

                  {/* Total Grades Card */}
                  <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-600">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600 mb-1">
                          Total Grades
                        </p>
                        <p className="text-3xl font-bold text-gray-800">
                          {stats.totalGrades}
                        </p>
                      </div>
                      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                        <FiAward className="text-purple-600" size={24} />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Quick Actions */}
              <div className="mt-8 bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Quick Actions
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <a
                    href="/students"
                    className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all text-center"
                  >
                    <FiUsers className="mx-auto mb-2 text-blue-600" size={32} />
                    <p className="font-medium text-gray-800">Manage Students</p>
                  </a>
                  <a
                    href="/grades"
                    className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all text-center"
                  >
                    <FiAward className="mx-auto mb-2 text-purple-600" size={32} />
                    <p className="font-medium text-gray-800">Assign Grades</p>
                  </a>
                  <a
                    href="/grades"
                    className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all text-center"
                  >
                    <FiBook className="mx-auto mb-2 text-green-600" size={32} />
                    <p className="font-medium text-gray-800">View Reports</p>
                  </a>
                  <a
                    href="/checker"
                    className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all text-center"
                  >
                    <FiBook className="mx-auto mb-2 text-orange-600" size={32} />
                    <p className="font-medium text-gray-800">Character Checker</p>
                  </a>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </PrivateRoute>
  );
}
