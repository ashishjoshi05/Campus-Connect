import React, { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';
import { communityService } from '../../services/communityService';

export const StudentNotices = () => {
  const [notices, setNotices] = useState([]);
  
  useEffect(() => {
    communityService.getNotices().then(setNotices);
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-800">Campus Notices</h1>
      <div className="space-y-4">
        {notices.map(notice => (
          <div key={notice.id} className="bg-white p-5 rounded-xl border border-slate-200 flex gap-4 shadow-sm">
            <div className="p-3 bg-brand-50 text-brand-600 rounded-lg h-fit"><Bell size={24}/></div>
            <div>
              <h3 className="font-semibold text-lg">{notice.title}</h3>
              <p className="text-sm text-slate-500 mb-2">Posted: {notice.createdAt}</p>
              <p className="text-slate-700">{notice.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};