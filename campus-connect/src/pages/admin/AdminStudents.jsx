import React from 'react';
import { Users } from 'lucide-react';
import { Badge } from '../../components/common/Badge';

export const AdminStudents = () => {
  const students = [
    { id: 1, name: 'Ashish Joshi', roll: 'CS2026-001', course: 'B.Tech CS', status: 'Active' },
    { id: 2, name: 'Anirudh Bhatt', roll: 'CS2026-002', course: 'B.Tech CS', status: 'Active' },
    { id: 3, name: 'Vaishali Chauhan', roll: 'IT2026-015', course: 'B.Tech IT', status: 'Active' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-800">Student Directory</h1>
        <button className="bg-brand-600 text-white px-4 py-2 rounded-lg hover:bg-brand-700">Add Student</button>
      </div>
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="p-4 font-medium text-slate-600">Name</th>
              <th className="p-4 font-medium text-slate-600">Roll No</th>
              <th className="p-4 font-medium text-slate-600">Course</th>
              <th className="p-4 font-medium text-slate-600">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {students.map(s => (
              <tr key={s.id} className="hover:bg-slate-50">
                <td className="p-4 font-medium text-slate-800 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center font-bold">
                    {s.name.charAt(0)}
                  </div>
                  {s.name}
                </td>
                <td className="p-4 text-slate-600">{s.roll}</td>
                <td className="p-4 text-slate-600">{s.course}</td>
                <td className="p-4"><Badge>{s.status}</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};