import React from 'react';
import { Calendar, Plus, Clock, MapPin } from 'lucide-react';
import { Badge } from '../../components/common/Badge';

export const AdminTimetable = () => {
  const slots = [
    { id: 1, department: 'CSE - Year 3', subject: 'Operating Systems', faculty: 'Dr. Aamir Khan', time: '09:00 AM - 10:30 AM', room: 'Hall 402' },
    { id: 2, department: 'CSE - Year 3', subject: 'Theory of Computation', faculty: 'Prof. Sarah Jenkins', time: '11:00 AM - 12:30 PM', room: 'Hall 305' },
    { id: 3, department: 'IT - Year 2', subject: 'Full Stack Development', faculty: 'Prof. Sarah Jenkins', time: '02:00 PM - 04:00 PM', room: 'Computer Lab 3' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-800">Master Class Scheduling</h1>
        <button className="flex items-center gap-2 bg-brand-600 text-white px-4 py-2 rounded-lg hover:bg-brand-700 transition-colors">
          <Plus size={18} /> Schedule Slot
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-600">
            <tr>
              <th className="p-4 font-medium">Department & Batch</th>
              <th className="p-4 font-medium">Subject</th>
              <th className="p-4 font-medium">Instructor</th>
              <th className="p-4 font-medium">Timing</th>
              <th className="p-4 font-medium">Location</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-slate-700">
            {slots.map(s => (
              <tr key={s.id} className="hover:bg-slate-50">
                <td className="p-4"><Badge>{s.department}</Badge></td>
                <td className="p-4 font-medium text-slate-800">{s.subject}</td>
                <td className="p-4 text-slate-600">{s.faculty}</td>
                <td className="p-4 text-slate-600 flex items-center gap-1.5"><Clock size={15}/> {s.time}</td>
                <td className="p-4 text-slate-600"><span className="inline-flex items-center gap-1"><MapPin size={15}/> {s.room}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};