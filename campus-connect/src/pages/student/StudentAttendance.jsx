import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { attendanceService } from '../../services/attendanceService';
import { academicService } from '../../services/academicService';
import { Badge } from '../../components/common/Badge';

export const StudentAttendance = () => {
  const { user } = useAuth();
  const [attendance, setAttendance] = useState([]);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    async function load() {
      const [att, crs] = await Promise.all([
        attendanceService.getStudentAttendance(user.id),
        academicService.getCourses()
      ]);
      setAttendance(att);
      setCourses(crs);
    }
    load();
  }, [user.id]);

  const getCourseName = (id) => courses.find(c => c.id === id)?.name || id;

  const total = attendance.length;
  const present = attendance.filter(a => a.status === 'Present').length;
  const percentage = total > 0 ? Math.round((present / total) * 100) : 100;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Attendance Tracker</h1>
          <p className="text-slate-500 text-xs mt-0.5">Detailed course-wise and date-wise attendance records</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm flex items-center gap-3">
          <span className="text-xs text-slate-500 font-medium">Cumulative Record:</span>
          <span className={`text-sm font-bold ${percentage >= 75 ? 'text-emerald-600' : 'text-rose-600'}`}>
            {percentage}%
          </span>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500 font-semibold border-b border-slate-200">
              <tr>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Course</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {attendance.map(item => (
                <tr key={item.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium text-slate-900">{item.date}</td>
                  <td className="px-6 py-4">{getCourseName(item.courseId)}</td>
                  <td className="px-6 py-4">
                    <Badge variant={item.status === 'Present' ? 'success' : item.status === 'Late' ? 'warning' : 'danger'}>
                      {item.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};