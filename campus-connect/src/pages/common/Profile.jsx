import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { User, Phone, Mail, Shield, Check } from 'lucide-react';

export const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [avatar, setAvatar] = useState(user?.avatar || '');
  const [saved, setSaved] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateProfile({ name, phone, avatar });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">User Profile</h1>
        <p className="text-slate-500 text-xs mt-0.5">Manage your contact details and visual avatar</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <div className="flex items-center gap-5 pb-6 border-b border-slate-100">
          <img
            src={avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120"}
            alt="Profile Avatar"
            className="w-16 h-16 rounded-full object-cover border-2 border-indigo-600"
          />
          <div>
            <h2 className="text-lg font-bold text-slate-900">{user?.name}</h2>
            <p className="text-xs text-slate-500 capitalize">{user?.role} Account — ID: {user?.studentId || user?.facultyId || user?.adminId}</p>
          </div>
        </div>

        {saved && (
          <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs rounded-lg flex items-center gap-2">
            <Check className="w-4 h-4" /> Profile credentials updated successfully.
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700">Full Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full border border-slate-300 rounded-lg p-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700">Email Address (Read-only)</label>
            <input
              type="email"
              disabled
              value={user?.email || ''}
              className="mt-1 block w-full bg-slate-50 border border-slate-200 text-slate-400 rounded-lg p-2 text-sm cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700">Phone Number</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1 block w-full border border-slate-300 rounded-lg p-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700">Avatar Image URL</label>
            <input
              type="url"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              className="mt-1 block w-full border border-slate-300 rounded-lg p-2 text-sm"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg text-sm transition shadow-sm"
          >
            Save Profile Changes
          </button>
        </form>
      </div>
    </div>
  );
};