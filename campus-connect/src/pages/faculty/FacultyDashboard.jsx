import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { academicService } from '../../services/academicService';
import { assignmentService } from '../../services/assignmentService';
import { Link } from 'react-router-dom';
import { BookOpen, Users, FileCheck, Plus, CheckCircle } from 'lucide-react';

export const FacultyDashboard = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    async function loadData() {
      const [allCourses, allAsn, allSubs] = await Promise.all([
        academicService.getCourses(),
        assignmentService.getAssignments(),
        assignmentService.getSubmissions()
      ]);
      setCourses(allCourses.filter(c => c.facultyId === user.id));
      setAssignments(allAsn.filter(a => a.facultyId === user.id));
      setSubmissions(allSubs);
    }
    loadData();
  }, [user.id]);

  const pendingGrading = submissions.filter(s => s.status === 'Submitted');

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Faculty Dashboard</h1>
          <p className="text-slate-500 text-sm mt-0.5">
            {user?.name} | {user?.designation} - Dept. of Computer Science
          </p>
        </div>
        <div className="flex gap-2">
          <Link
            to="/faculty/attendance"
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition shadow-sm"
          >
            Mark Daily Attendance
          </Link>
          <Link
            to="/faculty/assignments"
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-medium transition"
          >
            Post Assignment
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs font-semibold text-slate-500 uppercase">Assigned Courses</p>
          <h3 className="text-2xl font-bold text-slate-900 mt-1">{courses.length}</h3>
          <span className="text-xs text-slate-400">Current Semester</span>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs font-semibold text-slate-500 uppercase">Active Assignments</p>
          <h3 className="text-2xl font-bold text-slate-900 mt-1">{assignments.length}</h3>
          <span className="text-xs text-slate-400">Created by you</span>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs font-semibold text-slate-500 uppercase">Pending Submissions to Grade</p>
          <h3 className="text-2xl font-bold text-amber-600 mt-1">{pendingGrading.length}</h3>
          <span className="text-xs text-slate-400">Requires evaluation</span>
        </div>
      </div>

      {/* Courses List */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
          <h3 className="font-bold text-slate-900">Your Current Teaching Allotments</h3>
        </div>
        <div className="divide-y divide-slate-100">
          {courses.map(course => (
            <div key={course.id} className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono font-bold text-indigo-600">{course.courseCode}</span>
                <h4 className="font-semibold text-slate-900 text-base">{course.name}</h4>
                <p className="text-xs text-slate-500 mt-1">{course.type} | {course.credits} Credits</p>
              </div>
              <div className="flex gap-2">
                <Link
                  to="/faculty/attendance"
                  className="px-3 py-1.5 text-xs font-medium border border-slate-200 rounded-md hover:bg-slate-50"
                >
                  Roster
                </Link>
                <Link
                  to="/faculty/assignments"
                  className="px-3 py-1.5 text-xs font-medium bg-indigo-50 text-indigo-600 rounded-md hover:bg-indigo-100"
                >
                  Grade Submissions
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};