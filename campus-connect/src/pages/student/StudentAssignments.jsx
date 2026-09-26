import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { assignmentService } from '../../services/assignmentService';
import { Modal } from '../../components/common/Modal';
import { Badge } from '../../components/common/Badge';

export const StudentAssignments = () => {
  const { user } = useAuth();
  const [assignments, setAssignments] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [activeModal, setActiveModal] = useState(null);
  const [submissionLink, setSubmissionLink] = useState('');
  const [fileName, setFileName] = useState('');

  const loadData = async () => {
    const [asn, subs] = await Promise.all([
      assignmentService.getAssignments(),
      assignmentService.getSubmissions()
    ]);
    setAssignments(asn);
    setSubmissions(subs.filter(s => s.studentId === user.id));
  };

  useEffect(() => {
    loadData();
  }, [user.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await assignmentService.submitAssignment(activeModal.id, user.id, {
      content: submissionLink,
      fileName: fileName || 'assignment_submission.pdf'
    });
    setActiveModal(null);
    setSubmissionLink('');
    setFileName('');
    loadData();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Course Assignments</h1>
        <p className="text-slate-500 text-xs mt-0.5">Submit coursework, inspect graded marks, and read feedback</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {assignments.map(item => {
          const sub = submissions.find(s => s.assignmentId === item.id);
          return (
            <div key={item.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-slate-900 text-base">{item.title}</h3>
                  {sub ? (
                    <Badge variant={sub.status === 'Graded' ? 'success' : 'primary'}>{sub.status}</Badge>
                  ) : (
                    <Badge variant="warning">Pending Submission</Badge>
                  )}
                </div>
                <p className="text-xs text-slate-600 max-w-xl">{item.description}</p>
                <p className="text-[11px] text-slate-400">Due: {item.dueDate} | Max Marks: {item.maxMarks}</p>
                {sub && sub.status === 'Graded' && (
                  <div className="mt-2 p-2 bg-emerald-50 rounded border border-emerald-100 text-xs text-emerald-800">
                    <span className="font-bold">Score: {sub.marks} / {item.maxMarks}</span> — Feedback: "{sub.feedback}"
                  </div>
                )}
              </div>

              <div>
                <button
                  onClick={() => setActiveModal(item)}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold shadow-sm transition"
                >
                  {sub ? 'Update Submission' : 'Submit Assignment'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Submission Modal */}
      <Modal
        isOpen={!!activeModal}
        onClose={() => setActiveModal(null)}
        title={`Submit: ${activeModal?.title}`}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700">Project / Report URL</label>
            <input
              type="text"
              required
              placeholder="e.g. https://github.com/username/project"
              value={submissionLink}
              onChange={(e) => setSubmissionLink(e.target.value)}
              className="mt-1 block w-full border border-slate-300 rounded-lg p-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700">Attached File Descriptor</label>
            <input
              type="text"
              placeholder="e.g. Report_Final_V2.pdf"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              className="mt-1 block w-full border border-slate-300 rounded-lg p-2 text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg text-sm transition"
          >
            Confirm & Save Submission
          </button>
        </form>
      </Modal>
    </div>
  );
};