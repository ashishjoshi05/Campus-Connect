import React, { useState, useEffect } from 'react';
import { Trash2 } from 'lucide-react';
import { communityService } from '../../services/communityService';

export const AdminNotices = () => {
  const [notices, setNotices] = useState([]);
  const [newNotice, setNewNotice] = useState({ title: '', content: '' });

  const loadNotices = async () => setNotices(await communityService.getNotices());
  useEffect(() => { loadNotices(); }, []);

  const handlePublish = async (e) => {
    e.preventDefault();
    await communityService.createNotice(newNotice);
    setNewNotice({ title: '', content: '' });
    loadNotices();
  };

  const handleDelete = async (id) => {
    await communityService.deleteNotice(id);
    loadNotices();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1 bg-white p-6 rounded-xl border border-slate-200 h-fit">
        <h2 className="text-lg font-bold mb-4">Publish Notice</h2>
        <form onSubmit={handlePublish} className="space-y-4">
          <input required type="text" placeholder="Notice Title" className="w-full p-2 border rounded-lg" value={newNotice.title} onChange={e => setNewNotice({...newNotice, title: e.target.value})} />
          <textarea required rows="4" placeholder="Notice Content..." className="w-full p-2 border rounded-lg" value={newNotice.content} onChange={e => setNewNotice({...newNotice, content: e.target.value})} />
          <button type="submit" className="w-full bg-brand-600 text-white py-2 rounded-lg hover:bg-brand-700">Publish</button>
        </form>
      </div>
      <div className="lg:col-span-2 space-y-4">
        <h2 className="text-lg font-bold text-slate-800">Active Notices</h2>
        {notices.map(notice => (
          <div key={notice.id} className="bg-white p-5 rounded-xl border flex justify-between">
            <div>
              <h3 className="font-bold">{notice.title}</h3>
              <p className="text-sm text-slate-500 mb-1">{notice.createdAt}</p>
              <p className="text-slate-700">{notice.content}</p>
            </div>
            <button onClick={() => handleDelete(notice.id)} className="text-red-500 hover:bg-red-50 p-2 rounded-lg h-fit"><Trash2 size={18}/></button>
          </div>
        ))}
      </div>
    </div>
  );
};