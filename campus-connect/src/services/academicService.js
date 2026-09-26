import { storage } from './storage';

export const academicService = {
  async getDepartments() {
    return storage.getCollection('departments');
  },
  async createDepartment(dept) {
    const depts = storage.getCollection('departments');
    const newDept = { ...dept, id: `dept-${Date.now()}` };
    depts.push(newDept);
    storage.saveCollection('departments', depts);
    return newDept;
  },
  async updateDepartment(id, updates) {
    const depts = storage.getCollection('departments');
    const index = depts.findIndex(d => d.id === id);
    if (index !== -1) {
      depts[index] = { ...depts[index], ...updates };
      storage.saveCollection('departments', depts);
      return depts[index];
    }
    throw new Error("Department not found");
  },
  async deleteDepartment(id) {
    const depts = storage.getCollection('departments').filter(d => d.id !== id);
    storage.saveCollection('departments', depts);
    return true;
  },

  async getCourses() {
    return storage.getCollection('courses');
  },
  async createCourse(course) {
    const courses = storage.getCollection('courses');
    const newCourse = { ...course, id: `crs-${Date.now()}` };
    courses.push(newCourse);
    storage.saveCollection('courses', courses);
    return newCourse;
  },
  async updateCourse(id, updates) {
    const courses = storage.getCollection('courses');
    const index = courses.findIndex(c => c.id === id);
    if (index !== -1) {
      courses[index] = { ...courses[index], ...updates };
      storage.saveCollection('courses', courses);
      return courses[index];
    }
    throw new Error("Course not found");
  },
  async deleteCourse(id) {
    const courses = storage.getCollection('courses').filter(c => c.id !== id);
    storage.saveCollection('courses', courses);
    return true;
  },

  async getSemesters() {
    return storage.getCollection('semesters');
  },
  async getEnrollments() {
    return storage.getCollection('enrollments');
  },
  async enrollStudent(studentId, courseId, semesterId) {
    const enrollments = storage.getCollection('enrollments');
    const newEnrollment = {
      id: `enr-${Date.now()}`,
      studentId,
      courseId,
      semesterId,
      enrollmentDate: new Date().toISOString().split('T')[0],
      status: 'enrolled'
    };
    enrollments.push(newEnrollment);
    storage.saveCollection('enrollments', enrollments);
    return newEnrollment;
  },

  async getTimetable() {
    return storage.getCollection('timetable');
  },
  async createTimetableEntry(entry) {
    const timetable = storage.getCollection('timetable');
    const item = { ...entry, id: `tt-${Date.now()}` };
    timetable.push(item);
    storage.saveCollection('timetable', timetable);
    return item;
  },
  async deleteTimetableEntry(id) {
    const timetable = storage.getCollection('timetable').filter(t => t.id !== id);
    storage.saveCollection('timetable', timetable);
    return true;
  },

  async getExams() {
    return storage.getCollection('exams');
  },
  async getResults() {
    return storage.getCollection('results');
  },
  async recordResult(res) {
    const results = storage.getCollection('results');
    const item = { ...res, id: `res-rec-${Date.now()}` };
    results.push(item);
    storage.saveCollection('results', results);
    return item;
  }
};