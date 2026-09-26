import React from 'react';
import { Building2, Users } from 'lucide-react';

export const AdminDepartments = () => {
  const depts = [
    { id: 1, name: 'Computer Science & Engineering', code: 'CSE', head: 'Dr. Aamir Khan', students: 450 },
    { id: 2, name: 'Information Technology', code: 'IT', head: 'Prof. Sarah Jenkins', students: 380 }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-800">Departments</h1>
      <div className="grid md:grid-cols-2 gap-6">
        {depts.map(d => (
          <div key={d.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-brand-50 text-brand-600 rounded-lg"><Building2 size={24}/></div>
              <div>
                <h3 className="font-bold text-lg">{d.name} ({d.code})</h3>
                <p className="text-sm text-slate-500">HOD: {d.head}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-slate-600 bg-slate-50 p-3 rounded-lg">
              <Users size={18} /> <span>{d.students} Active Students</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};