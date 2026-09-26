import React from 'react';
import { BookOpen, Users, Calendar, ArrowRight } from 'lucide-react';
import { Badge } from '../../components/common/Badge';

export const FacultyCourses = () => {
  const assignedCourses = [
    {
      id: 'CS301',
      name: 'Operating Systems',
      department: 'CSE',
      semester: 'Semester 5',
      enrolledCount: 64,
      schedule: 'Mon, Wed (09:00 AM - 10:30 AM)',
    },
    {
      id: 'CS401',
      name: 'Theory of Computation',
      department: 'CSE',
      semester: 'Semester 6',
      enrolledCount: 58,
      schedule: 'Tue, Thu (11:00 AM - 12:30 PM)',
    },
    {
      id: 'CS305',
      name: 'Computer Networks Lab',
      department: 'CSE',
      semester: 'Semester 5',
      enrolledCount: 32,
      schedule: 'Fri (02:00 PM - 05:00 PM)',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">My Assigned Courses</h1>
          <p className="text-slate-500 text-sm mt-1">Review active classes, student roster, and schedules</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {assignedCourses.map((course) => (
          <div
            key={course.id}
            className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between mb-3">
                <div className="p-3 bg-brand-50 text-brand-600 rounded-lg">
                  <BookOpen size={22} />
                </div>
                <Badge>{course.id}</Badge>
              </div>
              <h3 className="font-bold text-lg text-slate-800 mb-1">{course.name}</h3>
              <p className="text-xs text-slate-500 font-medium mb-4">{course.department} • {course.semester}</p>

              <div className="space-y-2 text-sm text-slate-600 border-t border-slate-100 pt-3">
                <div className="flex items-center gap-2">
                  <Users size={16} className="text-slate-400" />
                  <span>{course.enrolledCount} Enrolled Students</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-slate-400" />
                  <span className="text-xs">{course.schedule}</span>
                </div>
              </div>
            </div>

            <button className="mt-5 w-full flex items-center justify-center gap-2 bg-slate-50 hover:bg-slate-100 text-brand-600 font-medium py-2 rounded-lg text-sm border border-slate-200 transition-colors">
              <span>View Class Roster</span>
              <ArrowRight size={15} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};