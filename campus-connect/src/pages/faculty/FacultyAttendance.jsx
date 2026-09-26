import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { academicService } from '../../services/academicService';
import { attendanceService } from '../../services/attendanceService';
import { storage } from '../../services/storage';

export const FacultyAttendance = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [students, setStudents] = useState([]);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [statusMap, setStatusMap] = useState({});
  const [savedMessage, setSavedMessage] = useState('');

  useEffect(() => {
    async function init() {
      const crs = await academicService.getCourses();
      const myCourses = crs.filter(c => c.facultyId === user.id);
      setCourses(myCourses);
      if (myCourses.length > 0) setSelectedCourse(myCourses[0].id);

      const allUsers = storage.getCollection('users');
      setStudents(allUsers.filter(u => u.role === 'student'));
    }
    init();
  }, [user.id]);

  const handleStatusChange = (studentId, status) => {
    setStatusMap(prev => ({ ...prev, [studentId]: status }));
  };

  const handleSave = async () => {
    const batch = students.map(s => ({
      studentId: s.id,
      courseId: selectedCourse,
      date,
      status: statusMap[s.id] || 'Present'
    }));
    await attendanceService.markAttendanceBatch(batch);
    setSavedMessage('Attendance records persisted successfully!');
    setTimeout(() => setSavedMessage(''), 3000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Class Attendance Management</h1>
        <p className="text-slate-500 text-xs mt-0.5">Select a course and record student presence for the date</p>
      </div>

      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-wrap gap-4 items-center">
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">Select Course</label>
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="border border-slate-300 rounded-lg px-3 py-1.5 text-sm"
          >
            {courses.map(c => (
              <option key={c.id} value={c.id}>{c.courseCode} - {c.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border border-slate-300 rounded-lg px-3 py-1.5 text-sm"
          >
          </input>
        </div>

        <div className="ml-auto flex items-center gap-3">
          {savedMessage && <span className="text-xs text-emerald-600 font-medium">{savedMessage}</span>}
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-semibold shadow-sm transition"
          >
            Save Attendance
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500 font-semibold border-b border-slate-200">
            <tr>
              <th className="px-6 py-3">Student Name</th>
              <th className="px-6 py-3">Student ID</th>
              <th className="px-6 py-3">Status Option</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {students.map(s => {
              const currentStatus = statusMap[s.id] || 'Present';
              return (
                <tr key={s.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-semibold text-slate-800">{s.name}</td>
                  <td className="px-6 py-4 font-mono text-xs">{s.studentId}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      {['Present', 'Absent', 'Late'].map(st => (
                        <button
                          key={st}
                          onClick={() => handleStatusChange(s.id, st)}
                          className={`px-3 py-1 text-xs rounded-md font-medium border transition ${
                            currentStatus === st
                              ? 'bg-indigo-600 text-white border-indigo-600'
                              : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          {st}
                        </button>
                      ))}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};