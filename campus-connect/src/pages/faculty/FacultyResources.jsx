import React, { useState } from 'react';
import { Upload, FileText, Video, BookOpen, Plus, Trash2 } from 'lucide-react';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';

export const FacultyResources = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resources, setResources] = useState([
    { id: 1, title: 'Operating Systems - Deadlocks', type: 'Video', subject: 'CS301', size: '245 MB', date: '2026-09-20', icon: Video },
    { id: 2, title: 'Theory of Computation Automata', type: 'PDF', subject: 'CS401', size: '4.2 MB', date: '2026-09-21', icon: FileText },
  ]);

  const [formData, setFormData] = useState({ title: '', type: 'PDF', subject: '', link: '' });

  const handleUpload = (e) => {
    e.preventDefault();
    const newResource = {
      id: Date.now(),
      title: formData.title,
      type: formData.type,
      subject: formData.subject,
      size: formData.type === 'Video' ? '150 MB' : '2.5 MB', // Mock size for now
      date: new Date().toISOString().split('T')[0],
      icon: formData.type === 'Video' ? Video : formData.type === 'PDF' ? FileText : BookOpen
    };
    
    setResources([newResource, ...resources]);
    setIsModalOpen(false);
    setFormData({ title: '', type: 'PDF', subject: '', link: '' });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-800">Resource Management</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-brand-600 text-white px-4 py-2 rounded-lg hover:bg-brand-700 transition-colors"
        >
          <Upload size={20} />
          <span>Upload Lecture/Notes</span>
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-600">
              <th className="p-4 font-medium">Resource Title</th>
              <th className="p-4 font-medium">Subject</th>
              <th className="p-4 font-medium">Type</th>
              <th className="p-4 font-medium">Upload Date</th>
              <th className="p-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {resources.map((res) => {
              const Icon = res.icon;
              return (
                <tr key={res.id} className="hover:bg-slate-50">
                  <td className="p-4 flex items-center gap-3">
                    <div className="p-2 bg-brand-50 text-brand-600 rounded-lg">
                      <Icon size={20} />
                    </div>
                    <span className="font-medium text-slate-800">{res.title}</span>
                  </td>
                  <td className="p-4"><Badge>{res.subject}</Badge></td>
                  <td className="p-4 text-slate-600">{res.type} ({res.size})</td>
                  <td className="p-4 text-slate-600">{res.date}</td>
                  <td className="p-4">
                    <button 
                      onClick={() => setResources(resources.filter(r => r.id !== res.id))}
                      className="text-red-500 hover:text-red-700 p-2"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Upload New Resource"
      >
        <form onSubmit={handleUpload} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Resource Title</label>
            <input 
              type="text" required
              className="w-full p-2 border border-slate-300 rounded-lg"
              value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Subject Code</label>
              <input 
                type="text" required placeholder="e.g. CS301"
                className="w-full p-2 border border-slate-300 rounded-lg"
                value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">File Type</label>
              <select 
                className="w-full p-2 border border-slate-300 rounded-lg"
                value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}
              >
                <option value="PDF">PDF Notes</option>
                <option value="Video">Video Lecture</option>
                <option value="Link">External Link</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">File/Link</label>
            <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center">
              <Upload className="mx-auto text-slate-400 mb-2" size={24} />
              <p className="text-sm text-slate-600">Drag and drop file here, or click to browse</p>
              <p className="text-xs text-slate-500 mt-1">MP4, PDF up to 500MB</p>
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700">Upload File</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};