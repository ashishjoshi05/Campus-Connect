import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { academicService } from '../../services/academicService';
import { attendanceService } from '../../services/attendanceService';
import { assignmentService } from '../../services/assignmentService';
import { communityService } from '../../services/communityService';
import { Badge } from '../../components/common/Badge';
import { 
  BookOpen, CheckCircle, Clock, Calendar, AlertCircle, 
  ArrowRight, FileText, Bell 
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const StudentDashboard = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [notices, setNotices] = useState([]);
  const [timetable, setTimetable] = useState([]);

  useEffect(() => {
    async function loadDashboard() {
      const [allCourses, allAtt, allAsn, allSubs, allNotices, allTt] = await Promise.all([
        academicService.getCourses(),
        attendanceService.getStudentAttendance(user.id),
        assignmentService.getAssignments(),
        assignmentService.getSubmissions(),
        communityService.getNotices(),
        academicService.getTimetable(),
      ]);

      setCourses(allCourses);
      setAttendance(allAtt);
      setAssignments(allAsn);
      setSubmissions(allSubs.filter(s => s.studentId === user.id));
      setNotices(allNotices.slice(0, 3));
      setTimetable(allTt.filter(t => t.day === "Monday" || t.day === "Tuesday").slice(0, 3));
    }
    loadDashboard();
  }, [user.id]);

  // Attendance metrics
  const totalAtt = attendance.length;
  const presentCount = attendance.filter(a => a.status === 'Present').length;
  const attPercent = totalAtt > 0 ? Math.round((presentCount / totalAtt) * 100) : 92;

  // Assignment metrics
  const pendingAssignments = assignments.filter(
    a => !submissions.some(s => s.assignmentId === a.id)
  );

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-indigo-700 via-indigo-800 to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="text-xs uppercase tracking-wider bg-indigo-600/60 px-3 py-1 rounded-full font-semibold">
            Spring Term 2026
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold mt-2">Welcome back, {user?.name}!</h1>
          <p className="text-indigo-200 text-sm mt-1">
            Student ID: <span className="font-mono text-white">{user?.studentId}</span> | Computer Science & Engineering
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            to="/student/timetable"
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm font-medium transition backdrop-blur-sm"
          >
            Weekly Schedule
          </Link>
          <Link
            to="/student/courses"
            className="px-4 py-2 bg-indigo-500 hover:bg-indigo-400 text-white rounded-lg text-sm font-medium transition shadow-sm"
          >
            My Enrolled Courses
          </Link>
        </div>
      </div>

      {/* Quick Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase">Overall Attendance</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-1">{attPercent}%</h3>
            <span className="text-xs text-emerald-600 font-medium">Eligible for finals</span>
          </div>
          <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600">
            <CheckCircle className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase">Registered Courses</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-1">{courses.length}</h3>
            <span className="text-xs text-slate-500">14 Total Credits</span>
          </div>
          <div className="p-3 bg-indigo-50 rounded-xl text-indigo-600">
            <BookOpen className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase">Pending Tasks</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-1">{pendingAssignments.length}</h3>
            <span className="text-xs text-amber-600 font-medium">Due this week</span>
          </div>
          <div className="p-3 bg-amber-50 rounded-xl text-amber-600">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase">Upcoming Exams</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-1">2</h3>
            <span className="text-xs text-indigo-600 font-medium">Mid-term season</span>
          </div>
          <div className="p-3 bg-indigo-50 rounded-xl text-indigo-600">
            <Calendar className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Main Grid: Assignments & Today's Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Assignments & Notices */}
        <div className="lg:col-span-2 space-y-6">
          {/* Pending Assignments */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-900 text-base">Assignments Requiring Submission</h3>
              <Link to="/student/assignments" className="text-xs text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1">
                View all <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            {pendingAssignments.length === 0 ? (
              <p className="text-sm text-slate-500 py-4">No assignments currently pending.</p>
            ) : (
              <div className="space-y-3">
                {pendingAssignments.map(item => (
                  <div key={item.id} className="p-4 rounded-lg border border-slate-100 bg-slate-50/50 flex items-center justify-between hover:bg-slate-50 transition">
                    <div>
                      <h4 className="font-semibold text-slate-900 text-sm">{item.title}</h4>
                      <p className="text-xs text-slate-500 mt-0.5">Due: {item.dueDate} | Max Marks: {item.maxMarks}</p>
                    </div>
                    <Link
                      to="/student/assignments"
                      className="px-3 py-1.5 text-xs font-medium bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition"
                    >
                      Submit
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Campus Notices */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-900 text-base">Official Campus Notices</h3>
              <Link to="/student/notices" className="text-xs text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1">
                Archive <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="space-y-3">
              {notices.map(notice => (
                <div key={notice.id} className="p-3.5 border border-slate-100 rounded-lg hover:border-slate-200 transition">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-indigo-600 uppercase">{notice.category}</span>
                    <span className="text-[11px] text-slate-400">{notice.createdAt}</span>
                  </div>
                  <h4 className="text-sm font-semibold text-slate-800 mt-1">{notice.title}</h4>
                  <p className="text-xs text-slate-600 mt-1 line-clamp-2">{notice.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Timetable & Quick Actions */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h3 className="font-bold text-slate-900 text-base mb-4">Upcoming Classes</h3>
            <div className="space-y-3">
              {timetable.map(slot => (
                <div key={slot.id} className="p-3 rounded-lg border-l-4 border-indigo-600 bg-slate-50">
                  <span className="text-xs font-mono font-semibold text-indigo-700">
                    {slot.startTime} - {slot.endTime}
                  </span>
                  <h4 className="text-sm font-bold text-slate-800 mt-0.5">{slot.courseId.toUpperCase()}</h4>
                  <p className="text-xs text-slate-500">{slot.room} ({slot.day})</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-5">
            <h4 className="font-bold text-indigo-950 text-sm">Fee Status</h4>
            <p className="text-xs text-indigo-700 mt-1">
              Outstanding semester balance: <span className="font-bold">$350.00</span>
            </p>
            <Link
              to="/student/fees"
              className="mt-3 inline-block px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded text-xs font-medium shadow-sm transition"
            >
              Review Fee Statement
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};