import React from 'react';
import { Badge } from '../../components/common/Badge';

export const StudentResults = () => {
  const results = [
    { id: 1, sem: 'Semester 4', sgpa: '8.4', status: 'Pass', credits: 24 },
    { id: 2, sem: 'Semester 3', sgpa: '8.1', status: 'Pass', credits: 22 }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-800">Exam Results</h1>
      <div className="grid md:grid-cols-2 gap-4">
        {results.map(res => (
          <div key={res.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold text-slate-800">{res.sem}</h3>
              <p className="text-slate-600 text-sm mt-1">{res.credits} Credits Completed</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-brand-600 mb-1">{res.sgpa} SGPA</div>
              <Badge>{res.status}</Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};