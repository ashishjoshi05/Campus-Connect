import React from 'react';
import { BookOpen, Download, FileText, Video } from 'lucide-react';
import { Badge } from '../../components/common/Badge';

export const StudentResources = () => {
  const resources = [
    { id: 1, title: 'Operating Systems Notes', type: 'PDF', subject: 'CS301', size: '2.4 MB', icon: FileText },
    { id: 2, title: 'Network Topologies Lecture', type: 'Video', subject: 'CS302', size: '145 MB', icon: Video },
    { id: 3, title: 'Data Structures E-Book', type: 'Book', subject: 'CS201', size: '15 MB', icon: BookOpen },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-800">Study Resources</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((res) => {
          const Icon = res.icon;
          return (
            <div key={res.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-brand-50 text-brand-600 rounded-lg">
                  <Icon size={24} />
                </div>
                <Badge>{res.subject}</Badge>
              </div>
              <h3 className="font-semibold text-slate-800 mb-1">{res.title}</h3>
              <div className="flex items-center justify-between mt-6 text-sm text-slate-500">
                <span>{res.type} • {res.size}</span>
                <button className="flex items-center gap-1 text-brand-600 hover:text-brand-700 font-medium">
                  <Download size={16} /> Download
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};