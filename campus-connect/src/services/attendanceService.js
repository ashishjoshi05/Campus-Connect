import { storage } from './storage';

export const attendanceService = {
  async getAttendance() {
    return storage.getCollection('attendance');
  },

  async getStudentAttendance(studentId) {
    const records = storage.getCollection('attendance');
    return records.filter(r => r.studentId === studentId);
  },

  async markAttendanceBatch(records) {
    // records = [{ studentId, courseId, date, status }]
    const existing = storage.getCollection('attendance');
    const updated = [...existing];

    records.forEach(rec => {
      const idx = updated.findIndex(
        e => e.studentId === rec.studentId && e.courseId === rec.courseId && e.date === rec.date
      );
      if (idx !== -1) {
        updated[idx].status = rec.status;
      } else {
        updated.push({
          id: `att-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
          ...rec
        });
      }
    });

    storage.saveCollection('attendance', updated);
    return true;
  }
};