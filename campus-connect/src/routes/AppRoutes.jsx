import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { ProtectedRoute } from './ProtectedRoute';
import { Login } from '../pages/auth/Login';

// Student Views
import { StudentDashboard } from '../pages/student/StudentDashboard';
import { StudentAttendance } from '../pages/student/StudentAttendance';
import { StudentAssignments } from '../pages/student/StudentAssignments';
import { StudentFees } from '../pages/student/StudentFees';
import { StudentResources } from '../pages/student/StudentResources';
import { StudentTimetable } from '../pages/student/StudentTimetable';
import { StudentResults } from '../pages/student/StudentResults';
import { StudentNotices } from '../pages/student/StudentNotices';
import { StudentEvents } from '../pages/student/StudentEvents';
import { StudentCourses } from '../pages/student/StudentCourses';

// Faculty Views
import { FacultyDashboard } from '../pages/faculty/FacultyDashboard';
import { FacultyAttendance } from '../pages/faculty/FacultyAttendance';
import { FacultyAssignments } from '../pages/faculty/FacultyAssignments';
import { FacultyResources } from '../pages/faculty/FacultyResources';
import { FacultyCourses } from '../pages/faculty/FacultyCourses';
import { FacultyNotices } from '../pages/faculty/FacultyNotices';

// Admin Views
import { AdminDashboard } from '../pages/admin/AdminDashboard';
import { AdminCourses } from '../pages/admin/AdminCourses';
import { AdminStudents } from '../pages/admin/AdminStudents';
import { AdminFaculty } from '../pages/admin/AdminFaculty';
import { AdminDepartments } from '../pages/admin/AdminDepartments';
import { AdminNotices } from '../pages/admin/AdminNotices';
import { AdminEvents } from '../pages/admin/AdminEvents';
import { AdminSemesters } from '../pages/admin/AdminSemesters';
import { AdminTimetable } from '../pages/admin/AdminTimetable';
import { AdminFees } from '../pages/admin/AdminFees';

// Common
import { Profile } from '../pages/common/Profile';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />

      {/* Student Protected Hierarchy */}
      <Route
        path="/student"
        element={
          <ProtectedRoute allowedRoles={['student']}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<StudentDashboard />} />
        <Route path="profile" element={<Profile />} />
        <Route path="attendance" element={<StudentAttendance />} />
        <Route path="assignments" element={<StudentAssignments />} />
        <Route path="fees" element={<StudentFees />} />
        <Route path="courses" element={<StudentCourses />} />
       <Route path="timetable" element={<StudentTimetable />} />
        <Route path="results" element={<StudentResults />} />
       <Route path="notices" element={<StudentNotices />} />
       <Route path="events" element={<StudentEvents />} />
        <Route path="resources" element={<StudentResources />} />

        




      </Route>

      {/* Faculty Protected Hierarchy */}
      <Route
        path="/faculty"
        element={
          <ProtectedRoute allowedRoles={['faculty']}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<FacultyDashboard />} />
        <Route path="profile" element={<Profile />} />
        <Route path="attendance" element={<FacultyAttendance />} />
        <Route path="assignments" element={<FacultyAssignments />} />
        <Route path="courses" element={<FacultyCourses />} />
        <Route path="resources" element={<FacultyResources />} />
        <Route path="notices" element={<FacultyNotices />} />
      </Route>

      {/* Admin Protected Hierarchy */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="courses" element={<AdminCourses />} />
        <Route path="students" element={<AdminStudents />} />
        <Route path="faculty" element={<AdminFaculty />} />
        <Route path="departments" element={<AdminDepartments />} />
        <Route path="semesters" element={<AdminSemesters />} />
        <Route path="timetable" element={<AdminTimetable />} />
        <Route path="notices" element={<AdminNotices />} />
        <Route path="events" element={<AdminEvents />} />
        <Route path="fees" element={<AdminFees />} />
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};