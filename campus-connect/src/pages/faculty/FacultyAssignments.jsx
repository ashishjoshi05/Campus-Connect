import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { assignmentService } from '../../services/assignmentService';
import { academicService } from '../../services/academicService';
import { Modal } from '../../components/common/Modal';
import { Badge } from '../../components/common/Badge';

export const FacultyAssignments = () => {
  const { user } = useAuth();
  const [assignments, setAssignments] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [courses, setCourses] = useState([]);
  const [createModal, setCreateModal] = useState(false);
  const [gradeModal, setGradeModal] = useState(null);

  // Form states
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [courseId, setCourseId] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [maxMarks, setMaxMarks] = useState(50);

  // Grading states
  const [marks, setMarks] = useState('');
  const [feedback, setFeedback] = useState('');

  const loadAll = async () => {
    const [allAsn, allSubs, allCrs] = await Promise.all([
      assignmentService.getAssignments(),
      assignmentService.getSubmissions(),
      academicService.getCourses()
    ]);
    const myCourses = allCrs.filter(c => c.facultyId === user.id);
    setCourses(myCourses);
    if (myCourses.length > 0 && !courseId) setCourseId(myCourses[0].id);
    setAssignments(allAsn.filter(a => a.facultyId === user.id));
    setSubmissions(allSubs);
  };

  useEffect(() => {
    loadAll();
  }, [user.id]);

  const handleCreateAssignment = async (e) => {
    e.preventDefault();
    await assignmentService.createAssignment({
      title,
      description: desc,
      courseId,
      facultyId: user.id,
      dueDate,
      maxMarks: Number(maxMarks)
    });
    setCreateModal(false);
    setTitle('');
    setDesc('');
    loadAll();
  };

  const handleGrade = async (e) => {
    e.preventDefault();
    await assignmentService.gradeSubmission(gradeModal.id, marks, feedback);
    setGradeModal(null);
    setMarks('');
    setFeedback('');
    loadAll();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Assignments & Evaluation</h1>
          <p className="text-slate-500 text-xs mt-0.5">Post assessments and score submitted student deliverables</p>
        </div>
        <button
          onClick={() => setCreateModal(true)}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold shadow-sm transition"
        >
          Create Assignment
        </button>
      </div>

      {/* Existing Assignments */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4">
        <h3 className="font-bold text-slate-800 text-sm">Created Assignments</h3>
        <div className="grid grid-cols-1 gap-3">
          {assignments.map(a => (
            <div key={a.id} className="p-4 border border-slate-100 rounded-lg bg-slate-50/60 flex justify-between items-center">
              <div>
                <h4 className="font-semibold text-slate-900 text-sm">{a.title}</h4>
                <p className="text-xs text-slate-500">Due: {a.dueDate} | Max Marks: {a.maxMarks}</p>
              </div>
              <Badge variant="primary">{a.courseId}</Badge>
            </div>
          ))}
        </div>
      </div>

      {/* Submissions Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <h3 className="font-bold text-slate-900 text-sm">Incoming Submissions</h3>
        </div>
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500 font-semibold border-b border-slate-200">
            <tr>
              <th className="px-6 py-3">Student ID</th>
              <th className="px-6 py-3">Submitted At</th>
              <th className="px-6 py-3">Content</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {submissions.map(s => (
              <tr key={s.id} className="hover:bg-slate-50">
                <td className="px-6 py-4 font-mono text-xs">{s.studentId}</td>
                <td className="px-6 py-4 text-xs">{s.submittedAt}</td>
                <td className="px-6 py-4 text-xs text-indigo-600 truncate max-w-xs">{s.content}</td>
                <td className="px-6 py-4">
                  <Badge variant={s.status === 'Graded' ? 'success' : 'warning'}>{s.status}</Badge>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => {
                      setGradeModal(s);
                      setMarks(s.marks || '');
                      setFeedback(s.feedback || '');
                    }}
                    className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs rounded font-medium transition"
                  >
                    {s.status === 'Graded' ? 'Edit Grade' : 'Evaluate'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal: Create Assignment */}
      <Modal isOpen={createModal} onClose={() => setCreateModal(false)} title="Create New Course Assignment">
        <form onSubmit={handleCreateAssignment} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700">Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full border border-slate-300 rounded-lg p-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700">Course</label>
            <select
              value={courseId}
              onChange={(e) => setCourseId(e.target.value)}
              className="mt-1 block w-full border border-slate-300 rounded-lg p-2 text-sm"
            >
              {courses.map(c => (
                <option key={c.id} value={c.id}>{c.courseCode} - {c.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700">Description</label>
            <textarea
              required
              rows={3}
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="mt-1 block w-full border border-slate-300 rounded-lg p-2 text-sm"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700">Due Date</label>
              <input
                type="date"
                required
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="mt-1 block w-full border border-slate-300 rounded-lg p-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700">Max Marks</label>
              <input
                type="number"
                required
                value={maxMarks}
                onChange={(e) => setMaxMarks(e.target.value)}
                className="mt-1 block w-full border border-slate-300 rounded-lg p-2 text-sm"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg text-sm transition"
          >
            Publish Assignment
          </button>
        </form>
      </Modal>

      {/* Modal: Grade Submission */}
      <Modal isOpen={!!gradeModal} onClose={() => setGradeModal(null)} title="Grade Student Submission">
        <form onSubmit={handleGrade} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700">Marks Awarded</label>
            <input
              type="number"
              required
              value={marks}
              onChange={(e) => setMarks(e.target.value)}
              className="mt-1 block w-full border border-slate-300 rounded-lg p-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700">Qualitative Feedback</label>
            <textarea
              rows={3}
              required
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Provide constructive assessment comments..."
              className="mt-1 block w-full border border-slate-300 rounded-lg p-2 text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg text-sm transition"
          >
            Save Grade & Feedback
          </button>
        </form>
      </Modal>
    </div>
  );
};