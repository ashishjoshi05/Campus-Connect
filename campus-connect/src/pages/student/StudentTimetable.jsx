import React from 'react';
import { Clock, MapPin } from 'lucide-react';
import { Badge } from '../../components/common/Badge';

export const StudentTimetable = () => {
  const schedule = [
    { id: 1, day: 'Monday', time: '09:00 AM - 10:30 AM', subject: 'Operating Systems', type: 'Lecture', room: 'Room 402' },
    { id: 2, day: 'Monday', time: '11:00 AM - 12:30 PM', subject: 'Theory of Computation', type: 'Lecture', room: 'Room 305' },
    { id: 3, day: 'Tuesday', time: '10:00 AM - 12:00 PM', subject: 'Advanced Web Dev (MERN)', type: 'Lab', room: 'Lab 2' },
    { id: 4, day: 'Wednesday', time: '01:00 PM - 02:30 PM', subject: 'Computer Based Numerical Techniques', type: 'Lecture', room: 'Room 201' }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-800">Weekly Timetable</h1>
      <div className="grid gap-4">
        {schedule.map(cls => (
          <div key={cls.id} className="bg-white p-5 rounded-xl border border-slate-200 flex justify-between items-center shadow-sm hover:shadow-md transition-shadow">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h3 className="font-semibold text-lg">{cls.subject}</h3>
                <Badge>{cls.type}</Badge>
              </div>
              <div className="flex gap-4 text-sm text-slate-600">
                <span className="flex items-center gap-1"><Clock size={16}/> {cls.day}, {cls.time}</span>
                <span className="flex items-center gap-1"><MapPin size={16}/> {cls.room}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};