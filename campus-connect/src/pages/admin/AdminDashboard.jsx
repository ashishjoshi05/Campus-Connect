import React, { useState, useEffect } from 'react';
import { storage } from '../../services/storage';
import { Users, UserCheck, BookOpen, Layers, CreditCard, Building2 } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export const AdminDashboard = () => {
  const [stats, setStats] = useState({
    students: 0,
    faculty: 0,
    departments: 0,
    courses: 0,
    semesters: 0
  });

  useEffect(() => {
    const users = storage.getCollection('users');
    const departments = storage.getCollection('departments');
    const courses = storage.getCollection('courses');
    const semesters = storage.getCollection('semesters');

    setStats({
      students: users.filter(u => u.role === 'student').length,
      faculty: users.filter(u => u.role === 'faculty').length,
      departments: departments.length,
      courses: courses.length,
      semesters: semesters.length
    });
  }, []);

  const chartData = [
    { name: 'Students', count: stats.students },
    { name: 'Faculty', count: stats.faculty },
    { name: 'Departments', count: stats.departments },
    { name: 'Courses', count: stats.courses },
    { name: 'Semesters', count: stats.semesters },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">University Operations Center</h1>
        <p className="text-slate-500 text-sm mt-0.5">High-level administration and system telemetry</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs text-slate-500 font-medium">Total Students</p>
          <h3 className="text-2xl font-bold text-slate-900 mt-1">{stats.students}</h3>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs text-slate-500 font-medium">Total Faculty</p>
          <h3 className="text-2xl font-bold text-slate-900 mt-1">{stats.faculty}</h3>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs text-slate-500 font-medium">Departments</p>
          <h3 className="text-2xl font-bold text-slate-900 mt-1">{stats.departments}</h3>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs text-slate-500 font-medium">Active Courses</p>
          <h3 className="text-2xl font-bold text-slate-900 mt-1">{stats.courses}</h3>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs text-slate-500 font-medium">Semesters</p>
          <h3 className="text-2xl font-bold text-slate-900 mt-1">{stats.semesters}</h3>
        </div>
      </div>

      {/* Analytics Chart */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h3 className="font-bold text-slate-900 mb-4">Institutional Roster Summary</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} />
              <YAxis stroke="#64748b" fontSize={12} tickLine={false} allowDecimals={false} />
              <Tooltip cursor={{ fill: '#f8fafc' }} />
              <Bar dataKey="count" fill="#4f46e5" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};