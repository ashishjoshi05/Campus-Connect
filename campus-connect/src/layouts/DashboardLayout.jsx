import React, { useState, useEffect } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { communityService } from '../services/communityService';
import {
  GraduationCap, LayoutDashboard, UserCheck, BookOpen, Calendar,
  FileText, FolderOpen, Award, Bell, LogOut, Menu, X, Users,
  Layers, Settings, CreditCard, CalendarDays, Clock, Building2, User
} from 'lucide-react';

export const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    if (user?.id) {
      communityService.getNotifications(user.id).then(setNotifications);
    }
  }, [user]);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const navLinksByRole = {
    student: [
      { name: 'Dashboard', path: '/student/dashboard', icon: LayoutDashboard },
      { name: 'My Profile', path: '/student/profile', icon: User },
      { name: 'Courses', path: '/student/courses', icon: BookOpen },
      { name: 'Attendance', path: '/student/attendance', icon: UserCheck },
      { name: 'Assignments', path: '/student/assignments', icon: FileText },
      { name: 'Resources', path: '/student/resources', icon: FolderOpen },
      { name: 'Timetable', path: '/student/timetable', icon: Clock },
      { name: 'Exams & Results', path: '/student/results', icon: Award },
      { name: 'Notices', path: '/student/notices', icon: Bell },
      { name: 'Events', path: '/student/events', icon: CalendarDays },
      { name: 'Fees', path: '/student/fees', icon: CreditCard },
    ],
    faculty: [
      { name: 'Dashboard', path: '/faculty/dashboard', icon: LayoutDashboard },
      { name: 'Profile', path: '/faculty/profile', icon: User },
      { name: 'My Courses', path: '/faculty/courses', icon: BookOpen },
      { name: 'Attendance Marking', path: '/faculty/attendance', icon: UserCheck },
      { name: 'Assignments & Grading', path: '/faculty/assignments', icon: FileText },
      { name: 'Resources', path: '/faculty/resources', icon: FolderOpen },
      { name: 'Notices', path: '/faculty/notices', icon: Bell },
    ],
    admin: [
      { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
      { name: 'Students', path: '/admin/students', icon: Users },
      { name: 'Faculty', path: '/admin/faculty', icon: UserCheck },
      { name: 'Departments', path: '/admin/departments', icon: Building2 },
      { name: 'Courses', path: '/admin/courses', icon: BookOpen },
      { name: 'Semesters', path: '/admin/semesters', icon: Layers },
      { name: 'Timetable', path: '/admin/timetable', icon: Clock },
      { name: 'Notices', path: '/admin/notices', icon: Bell },
      { name: 'Events', path: '/admin/events', icon: CalendarDays },
      { name: 'Fee Records', path: '/admin/fees', icon: CreditCard },
    ]
  };

  const links = navLinksByRole[user?.role] || [];
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Mobile Topbar */}
      <div className="md:hidden bg-indigo-900 text-white flex items-center justify-between px-4 py-3 sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <GraduationCap className="h-6 w-6 text-indigo-300" />
          <span className="font-bold tracking-tight text-lg">Campus Connect</span>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-1 rounded-md text-indigo-200 hover:text-white hover:bg-indigo-800"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside className={`
        ${mobileMenuOpen ? 'block' : 'hidden'} 
        md:block w-full md:w-64 bg-slate-900 text-slate-300 flex-shrink-0 flex flex-col justify-between fixed md:sticky top-0 h-[calc(100vh-56px)] md:h-screen z-30 transition-all
      `}>
        <div className="flex flex-col h-full overflow-y-auto">
          {/* Brand header */}
          <div className="hidden md:flex items-center gap-3 px-6 py-5 border-b border-slate-800">
            <div className="p-2 bg-indigo-600 rounded-lg text-white shadow-sm">
              <GraduationCap className="h-6 w-6" />
            </div>
            <div>
              <h1 className="font-bold text-white text-base tracking-wide leading-tight">Campus Connect</h1>
              <p className="text-xs text-indigo-400 capitalize font-medium">{user?.role} Portal</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5 flex-1">
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path;
              return (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  {link.name}
                </NavLink>
              );
            })}
          </nav>

          {/* Bottom user badge */}
          <div className="p-4 border-t border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3 overflow-hidden">
              <img
                src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100"}
                alt={user?.name}
                className="w-9 h-9 rounded-full object-cover border border-slate-700"
              />
              <div className="truncate">
                <p className="text-sm font-semibold text-white truncate">{user?.name}</p>
                <p className="text-xs text-slate-400 truncate">{user?.email}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              title="Logout"
              className="p-2 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-6 sticky top-0 z-20 shadow-sm">
          <div>
            <h2 className="text-base font-semibold text-slate-800 capitalize">
              {location.pathname.split('/').pop().replace('-', ' ') || 'Dashboard'}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            {/* Notification Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-full transition-colors"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white"></span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in duration-150">
                  <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                    <span className="font-semibold text-xs uppercase tracking-wider text-slate-500">Notifications</span>
                    <span className="text-xs bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full font-medium">{notifications.length}</span>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <p className="text-sm text-slate-400 p-4 text-center">No notifications</p>
                    ) : (
                      notifications.map(n => (
                        <div
                          key={n.id}
                          onClick={() => {
                            communityService.markNotificationRead(n.id);
                            setNotifications(prev => prev.map(item => item.id === n.id ? { ...item, read: true } : item));
                          }}
                          className={`px-4 py-3 hover:bg-slate-50 cursor-pointer border-b border-slate-50 ${n.read ? 'opacity-60' : 'bg-indigo-50/30'}`}
                        >
                          <p className="text-xs font-semibold text-slate-800">{n.title}</p>
                          <p className="text-xs text-slate-500 mt-1 line-clamp-2">{n.message}</p>
                          <span className="text-[10px] text-slate-400 mt-1 inline-block">{n.createdAt}</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="h-6 w-px bg-slate-200"></div>

            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 capitalize">
              Role: {user?.role}
            </span>
          </div>
        </header>

        {/* Dynamic Nested Page Content */}
        <main className="p-6 flex-1 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
};