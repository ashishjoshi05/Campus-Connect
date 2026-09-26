import React, { useState, useEffect } from 'react';
import { Bell, Send } from 'lucide-react';
import { communityService } from '../../services/communityService';

export const FacultyNotices = () => {
  const [notices, setNotices] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const fetchNotices = async () => {
    const list = await communityService.getNotices();
    setNotices(list);
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  const handlePostNotice = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    await communityService.createNotice({
      title,
      content,
      author: 'Faculty Member',
    });

    setTitle('');
    setContent('');
    fetchNotices();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1 bg-white p-6 rounded-xl border border-slate-200 h-fit shadow-sm">
        <h2 className="text-lg font-bold text-slate-800 mb-2">Post Class Announcement</h2>
        <p className="text-xs text-slate-500 mb-4">Announce lab updates, schedule changes, or deadlines</p>

        <form onSubmit={handlePostNotice} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Title</label>
            <input
              type="text"
              required
              placeholder="e.g. Lab 3 Submission Extended"
              className="w-full p-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-brand-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Content</label>
            <textarea
              rows="4"
              required
              placeholder="Provide clear details for your students..."
              className="w-full p-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-brand-500"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-medium py-2.5 rounded-lg text-sm transition-colors"
          >
            <Send size={16} />
            <span>Post Announcement</span>
          </button>
        </form>
      </div>

      <div className="lg:col-span-2 space-y-4">
        <h2 className="text-lg font-bold text-slate-800">Campus & Department Bulletin</h2>
        {notices.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-xl border border-slate-200 text-slate-500">
            No active notices available.
          </div>
        ) : (
          notices.map((notice) => (
            <div key={notice.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex gap-4">
              <div className="p-3 bg-brand-50 text-brand-600 rounded-lg h-fit">
                <Bell size={22} />
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 text-base">{notice.title}</h3>
                <p className="text-xs text-slate-400 mb-2">Posted on {notice.createdAt}</p>
                <p className="text-sm text-slate-600 leading-relaxed">{notice.content}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};