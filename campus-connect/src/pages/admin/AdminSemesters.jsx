import React from 'react';
import { Calendar, CheckCircle } from 'lucide-react';
import { Badge } from '../../components/common/Badge';

export const AdminSemesters = () => {
  const semesters = [
    { id: 1, name: 'Odd Semester 2026-27', code: 'SEM-ODD-26', start: '2026-08-01', end: '2026-12-15', status: 'Active' },
    { id: 2, name: 'Even Semester 2025-26', code: 'SEM-EVEN-26', start: '2026-01-10', end: '2026-05-30', status: 'Completed' },
    { id: 3, name: 'Odd Semester 2025-26', code: 'SEM-ODD-25', start: '2025-08-01', end: '2025-12-15', status: 'Completed' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-800">Academic Semesters</h1>
        <button className="bg-brand-600 text-white px-4 py-2 rounded-lg hover:bg-brand-700 transition-colors">
          Add Semester
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {semesters.map((sem) => (
          <div key={sem.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-bold text-lg text-slate-800">{sem.name}</h3>
                <Badge variant={sem.status === 'Active' ? 'success' : 'default'}>{sem.status}</Badge>
              </div>
              <p className="text-sm text-slate-500 font-mono mb-4">{sem.code}</p>
            </div>
            <div className="border-t border-slate-100 pt-4 text-xs text-slate-600 space-y-1">
              <div className="flex items-center gap-1.5"><Calendar size={14} /> Start: {sem.start}</div>
              <div className="flex items-center gap-1.5"><CheckCircle size={14} /> End: {sem.end}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};