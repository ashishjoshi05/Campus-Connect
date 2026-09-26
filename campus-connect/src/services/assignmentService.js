import { storage } from './storage';

export const assignmentService = {
  async getAssignments() {
    return storage.getCollection('assignments');
  },

  async createAssignment(assignment) {
    const list = storage.getCollection('assignments');
    const item = {
      ...assignment,
      id: `asn-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    list.push(item);
    storage.saveCollection('assignments', list);
    return item;
  },

  async getSubmissions() {
    return storage.getCollection('submissions');
  },

  async submitAssignment(assignmentId, studentId, { content, fileName }) {
    const submissions = storage.getCollection('submissions');
    const existingIndex = submissions.findIndex(s => s.assignmentId === assignmentId && s.studentId === studentId);

    const submissionData = {
      id: existingIndex !== -1 ? submissions[existingIndex].id : `sub-${Date.now()}`,
      assignmentId,
      studentId,
      submittedAt: new Date().toISOString().split('T')[0],
      content,
      fileName: fileName || 'assignment_submission.pdf',
      status: 'Submitted',
      marks: null,
      feedback: null
    };

    if (existingIndex !== -1) {
      submissions[existingIndex] = submissionData;
    } else {
      submissions.push(submissionData);
    }

    storage.saveCollection('submissions', submissions);
    return submissionData;
  },

  async gradeSubmission(submissionId, marks, feedback) {
    const submissions = storage.getCollection('submissions');
    const idx = submissions.findIndex(s => s.id === submissionId);
    if (idx === -1) throw new Error("Submission not found");

    submissions[idx].marks = Number(marks);
    submissions[idx].feedback = feedback;
    submissions[idx].status = 'Graded';

    storage.saveCollection('submissions', submissions);
    return submissions[idx];
  },

  async getResources() {
    return storage.getCollection('resources');
  },

  async createResource(resource) {
    const resources = storage.getCollection('resources');
    const item = {
      ...resource,
      id: `res-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    resources.push(item);
    storage.saveCollection('resources', resources);
    return item;
  },

  async deleteResource(id) {
    const resources = storage.getCollection('resources').filter(r => r.id !== id);
    storage.saveCollection('resources', resources);
    return true;
  }
};