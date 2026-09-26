import React from 'react';
import { Badge } from '../../components/common/Badge';

export const AdminFaculty = () => {
  const faculty = [
    { id: 1, name: 'Dr. Varun Barthwal', empId: 'FAC-101', dept: 'Computer Science', role: 'HOD' },
    { id: 2, name: 'Dr. Vinay Parsad Tamta', empId: 'FAC-102', dept: 'Information Tech', role: 'Professor' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-800">Faculty Directory</h1>
        <button className="bg-brand-600 text-white px-4 py-2 rounded-lg hover:bg-brand-700">Add Faculty</button>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {faculty.map(f => (
          <div key={f.id} className="bg-white p-6 rounded-xl border border-slate-200 flex justify-between items-center shadow-sm">
            <div>
              <h3 className="font-bold text-lg text-slate-800">{f.name}</h3>
              <p className="text-slate-500 text-sm">{f.empId} • {f.dept}</p>
            </div>
            <Badge>{f.role}</Badge>
          </div>
        ))}
      </div>
    </div>
  );
};