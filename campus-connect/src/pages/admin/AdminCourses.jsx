import React, { useState, useEffect } from 'react';
import { academicService } from '../../services/academicService';
import { storage } from '../../services/storage';
import { Modal } from '../../components/common/Modal';
import { Trash2, Edit3, Plus, Search } from 'lucide-react';

export const AdminCourses = () => {
  const [courses, setCourses] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [faculty, setFaculty] = useState([]);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    courseCode: '',
    name: '',
    departmentId: 'dept-cs',
    credits: 3,
    type: 'Theory',
    facultyId: ''
  });

  const loadData = async () => {
    const [c, d] = await Promise.all([
      academicService.getCourses(),
      academicService.getDepartments()
    ]);
    const users = storage.getCollection('users');
    setCourses(c);
    setDepartments(d);
    const fac = users.filter(u => u.role === 'faculty');
    setFaculty(fac);
    if (fac.length > 0 && !formData.facultyId) {
      setFormData(prev => ({ ...prev, facultyId: fac[0].id }));
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenCreate = () => {
    setEditingCourse(null);
    setFormData({
      courseCode: '',
      name: '',
      departmentId: departments[0]?.id || 'dept-cs',
      credits: 3,
      type: 'Theory',
      facultyId: faculty[0]?.id || ''
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (course) => {
    setEditingCourse(course);
    setFormData({
      courseCode: course.courseCode,
      name: course.name,
      departmentId: course.departmentId,
      credits: course.credits,
      type: course.type,
      facultyId: course.facultyId
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to remove this course?")) {
      await academicService.deleteCourse(id);
      loadData();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingCourse) {
      await academicService.updateCourse(editingCourse.id, formData);
    } else {
      await academicService.createCourse(formData);
    }
    setIsModalOpen(false);
    loadData();
  };

  const filteredCourses = courses.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.courseCode.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Academic Course Catalog</h1>
          <p className="text-slate-500 text-xs mt-0.5">Manage course offerings, faculty instructors, and credit hours</p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold shadow-sm transition flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" /> Add New Course
        </button>
      </div>

      <div className="bg-white p-3 rounded-xl border border-slate-200 flex items-center gap-2">
        <Search className="w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Filter courses by name or code..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full text-sm outline-none"
        />
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500 font-semibold border-b border-slate-200">
            <tr>
              <th className="px-6 py-3">Code</th>
              <th className="px-6 py-3">Course Name</th>
              <th className="px-6 py-3">Credits</th>
              <th className="px-6 py-3">Type</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredCourses.map(c => (
              <tr key={c.id} className="hover:bg-slate-50">
                <td className="px-6 py-4 font-mono font-bold text-indigo-600">{c.courseCode}</td>
                <td className="px-6 py-4 font-semibold text-slate-800">{c.name}</td>
                <td className="px-6 py-4">{c.credits}</td>
                <td className="px-6 py-4">{c.type}</td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button
                    onClick={() => handleOpenEdit(c)}
                    className="p-1.5 text-slate-400 hover:text-indigo-600 rounded transition"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(c.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 rounded transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Course Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingCourse ? "Edit Course" : "Add New Course"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700">Course Code</label>
              <input
                type="text"
                required
                value={formData.courseCode}
                onChange={(e) => setFormData({ ...formData, courseCode: e.target.value })}
                className="mt-1 block w-full border border-slate-300 rounded-lg p-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700">Credits</label>
              <input
                type="number"
                required
                value={formData.credits}
                onChange={(e) => setFormData({ ...formData, credits: Number(e.target.value) })}
                className="mt-1 block w-full border border-slate-300 rounded-lg p-2 text-sm"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700">Course Title</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-1 block w-full border border-slate-300 rounded-lg p-2 text-sm"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700">Department</label>
              <select
                value={formData.departmentId}
                onChange={(e) => setFormData({ ...formData, departmentId: e.target.value })}
                className="mt-1 block w-full border border-slate-300 rounded-lg p-2 text-sm"
              >
                {departments.map(d => (
                  <option key={d.id} value={d.id}>{d.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700">Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="mt-1 block w-full border border-slate-300 rounded-lg p-2 text-sm"
              >
                <option value="Theory">Theory</option>
                <option value="Practical">Practical</option>
                <option value="Elective">Elective</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700">Assigned Faculty</label>
            <select
              value={formData.facultyId}
              onChange={(e) => setFormData({ ...formData, facultyId: e.target.value })}
              className="mt-1 block w-full border border-slate-300 rounded-lg p-2 text-sm"
            >
              {faculty.map(f => (
                <option key={f.id} value={f.id}>{f.name} ({f.designation})</option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg text-sm transition"
          >
            {editingCourse ? "Update Course" : "Create Course"}
          </button>
        </form>
      </Modal>
    </div>
  );
};