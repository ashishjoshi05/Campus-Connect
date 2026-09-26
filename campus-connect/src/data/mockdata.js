export const INITIAL_DATA = {
  users: [
    {
      id: "usr-admin-1",
      name: "Dr. Varun Barthwal",
      email: "admin@example.com",
      password: "admin123",
      role: "admin",
      adminId: "ADM-2024-01",
      phone: "+1 (555) 019-2831",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
      createdAt: "2024-01-10"
    },
    {
      id: "usr-fac-1",
      name: "Dr. Vinay Prasad Tamta",
      email: "faculty@example.com",
      password: "faculty123",
      role: "faculty",
      facultyId: "FAC-CS-101",
      department: "dept-cs",
      designation: "Associate Professor",
      phone: "+1 (555) 014-9921",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80",
      joiningDate: "2021-08-15",
      createdAt: "2024-01-15"
    },
    {
      id: "usr-stu-1",
      name: "Ashish Joshi",
      email: "student@example.com",
      password: "student123",
      role: "student",
      studentId: "STU-2024-089",
      department: "dept-cs",
      semester: "sem-4",
      year: 2,
      phone: "+1 (555) 012-3456",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      enrollmentDate: "2023-08-01",
      createdAt: "2024-01-20"
    },
    {
      id: "usr-stu-2",
      name: "Anirudh Bhatt",
      email: "maya.patel@example.com",
      password: "student123",
      role: "student",
      studentId: "STU-2024-090",
      department: "dept-cs",
      semester: "sem-4",
      year: 2,
      phone: "+1 (555) 018-7744",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
      enrollmentDate: "2023-08-01",
      createdAt: "2024-01-20"
    }
  ],
  departments: [
    { id: "dept-cs", name: "Computer Science & Engineering", code: "CSE", head: "Dr. Varun Barthwal", description: "Department of software, AI systems, and computing theory." },
    { id: "dept-it", name: "Information Technology", code: "IT", head: "Dr. Vinay Parsad Tamta", description: "Information systems, networking, and cloud architectures." },
    { id: "dept-ece", name: "Electronics & Communication", code: "ECE", head: "Dr. Rajeev Singh", description: "Embedded circuits, signals, and communication." }
  ],
  semesters: [
    { id: "sem-3", name: "Semester 3 (Fall 2025)", academicYear: "2025-2026", startDate: "2025-08-01", endDate: "2025-12-15", status: "completed" },
    { id: "sem-4", name: "Semester 4 (Spring 2026)", academicYear: "2025-2026", startDate: "2026-01-10", endDate: "2026-05-30", status: "active" }
  ],
  courses: [
    { id: "crs-101", courseCode: "CS401", name: "Database Management Systems", departmentId: "dept-cs", semesterId: "sem-4", credits: 4, facultyId: "usr-fac-1", type: "Theory" },
    { id: "crs-102", courseCode: "CS402", name: "Operating Systems Principles", departmentId: "dept-cs", semesterId: "sem-4", credits: 4, facultyId: "usr-fac-1", type: "Theory" },
    { id: "crs-103", courseCode: "CS403", name: "Web Application Architecture", departmentId: "dept-cs", semesterId: "sem-4", credits: 3, facultyId: "usr-fac-1", type: "Practical" },
    { id: "crs-104", courseCode: "CS404", name: "Computer Networks", departmentId: "dept-cs", semesterId: "sem-4", credits: 3, facultyId: "usr-fac-1", type: "Theory" }
  ],
  enrollments: [
    { id: "enr-1", studentId: "usr-stu-1", courseId: "crs-101", semesterId: "sem-4", enrollmentDate: "2026-01-10", status: "enrolled" },
    { id: "enr-2", studentId: "usr-stu-1", courseId: "crs-102", semesterId: "sem-4", enrollmentDate: "2026-01-10", status: "enrolled" },
    { id: "enr-3", studentId: "usr-stu-1", courseId: "crs-103", semesterId: "sem-4", enrollmentDate: "2026-01-10", status: "enrolled" },
    { id: "enr-4", studentId: "usr-stu-1", courseId: "crs-104", semesterId: "sem-4", enrollmentDate: "2026-01-10", status: "enrolled" },
    { id: "enr-5", studentId: "usr-stu-2", courseId: "crs-101", semesterId: "sem-4", enrollmentDate: "2026-01-10", status: "enrolled" }
  ],
  attendance: [
    { id: "att-1", studentId: "usr-stu-1", courseId: "crs-101", date: "2026-03-01", status: "Present" },
    { id: "att-2", studentId: "usr-stu-1", courseId: "crs-101", date: "2026-03-03", status: "Present" },
    { id: "att-3", studentId: "usr-stu-1", courseId: "crs-101", date: "2026-03-05", status: "Absent" },
    { id: "att-4", studentId: "usr-stu-1", courseId: "crs-102", date: "2026-03-02", status: "Present" },
    { id: "att-5", studentId: "usr-stu-1", courseId: "crs-102", date: "2026-03-04", status: "Present" },
    { id: "att-6", studentId: "usr-stu-1", courseId: "crs-103", date: "2026-03-01", status: "Present" },
    { id: "att-7", studentId: "usr-stu-1", courseId: "crs-103", date: "2026-03-04", status: "Late" },
    { id: "att-8", studentId: "usr-stu-2", courseId: "crs-101", date: "2026-03-01", status: "Present" }
  ],
  assignments: [
    { id: "asn-1", title: "SQL Query Optimization & Normalization", description: "Design 3NF relational schemas and provide indexed query execution plans.", courseId: "crs-101", facultyId: "usr-fac-1", dueDate: "2026-04-10", maxMarks: 50, createdAt: "2026-03-01" },
    { id: "asn-2", title: "Multi-threaded IPC Shell Simulator", description: "Implement shared memory pipelines and condition variables in POSIX threads.", courseId: "crs-102", facultyId: "usr-fac-1", dueDate: "2026-04-18", maxMarks: 100, createdAt: "2026-03-05" },
    { id: "asn-3", title: "RESTful Service with React Client", description: "Develop an authenticated full-stack portal with client-side routing.", courseId: "crs-103", facultyId: "usr-fac-1", dueDate: "2026-03-25", maxMarks: 40, createdAt: "2026-02-28" }
  ],
  submissions: [
    { id: "sub-1", assignmentId: "asn-3", studentId: "usr-stu-1", submittedAt: "2026-03-20", content: "GitHub Repository: https://github.com/campus-connect/submission-aarav", fileName: "project_report.pdf", status: "Graded", marks: 38, feedback: "Clean layout, robust routing and responsive design!" }
  ],
  resources: [
    { id: "res-1", title: "Database Normalization Quick Cheatsheet", courseId: "crs-101", facultyId: "usr-fac-1", type: "PDF", url: "https://example.com/db-cheatsheet.pdf", createdAt: "2026-02-15" },
    { id: "res-2", title: "Lecture Recording: Virtual Memory & Page Tables", courseId: "crs-102", facultyId: "usr-fac-1", type: "Video", url: "https://example.com/vm-lecture", createdAt: "2026-03-02" },
    { id: "res-3", title: "React Component Lifecycle & Hooks Cheatsheet", courseId: "crs-103", facultyId: "usr-fac-1", type: "Document", url: "https://example.com/react-hooks.pdf", createdAt: "2026-02-20" }
  ],
  timetable: [
    { id: "tt-1", courseId: "crs-101", facultyId: "usr-fac-1", day: "Monday", startTime: "09:00", endTime: "10:30", room: "Hall B-201", semesterId: "sem-4" },
    { id: "tt-2", courseId: "crs-102", facultyId: "usr-fac-1", day: "Monday", startTime: "11:00", endTime: "12:30", room: "Hall C-104", semesterId: "sem-4" },
    { id: "tt-3", courseId: "crs-103", facultyId: "usr-fac-1", day: "Tuesday", startTime: "10:00", endTime: "12:00", room: "Computing Lab 4", semesterId: "sem-4" },
    { id: "tt-4", courseId: "crs-104", facultyId: "usr-fac-1", day: "Wednesday", startTime: "13:30", endTime: "15:00", room: "Hall A-102", semesterId: "sem-4" },
    { id: "tt-5", courseId: "crs-101", facultyId: "usr-fac-1", day: "Thursday", startTime: "09:00", endTime: "10:30", room: "Hall B-201", semesterId: "sem-4" },
    { id: "tt-6", courseId: "crs-102", facultyId: "usr-fac-1", day: "Friday", startTime: "11:00", endTime: "12:30", room: "Hall C-104", semesterId: "sem-4" }
  ],
  exams: [
    { id: "ex-1", courseId: "crs-101", semesterId: "sem-4", title: "Mid-Term: DBMS", date: "2026-04-20", startTime: "09:30", endTime: "12:00", room: "Auditorium West", maxMarks: 100 },
    { id: "ex-2", courseId: "crs-102", semesterId: "sem-4", title: "Mid-Term: Operating Systems", date: "2026-04-22", startTime: "09:30", endTime: "12:00", room: "Auditorium West", maxMarks: 100 }
  ],
  results: [
    { id: "res-rec-1", studentId: "usr-stu-1", courseId: "crs-101", examId: "ex-1", marks: 88, maxMarks: 100, grade: "A", gradePoint: 9.0 },
    { id: "res-rec-2", studentId: "usr-stu-1", courseId: "crs-102", examId: "ex-2", marks: 92, maxMarks: 100, grade: "A+", gradePoint: 10.0 }
  ],
  notices: [
    { id: "not-1", title: "Spring 2026 Mid-Semester Examination Schedule Published", content: "The examination branch has released the timetable for Mid-Term examinations. Hall tickets can be collected next week.", author: "Office of the Registrar", category: "Examination", priority: "Urgent", targetAudience: "All", createdAt: "2026-03-10" },
    { id: "not-2", title: "Annual Innovation Hackathon & Tech Fest 2026", content: "Registrations are now open for the campus-wide 36-hour hackathon. Prizes include seed grants and incubation support.", author: "Dean of Student Affairs", category: "Event", priority: "General", targetAudience: "Students", createdAt: "2026-03-08" }
  ],
  events: [
    { id: "ev-1", title: "TechConvergence 2026: Campus Hackathon", description: "36-hour continuous build sprint covering web, systems, and hardware prototypes.", date: "2026-04-05", time: "09:00 AM", location: "Innovation Center", organizer: "ACM Student Chapter", category: "Technical" },
    { id: "ev-2", title: "Guest Lecture: High-Performance Computing", description: "Industry keynote on distributed consensus protocols and low-latency networks.", date: "2026-04-12", time: "02:00 PM", location: "Main Auditorium", organizer: "CSE Department", category: "Academic" }
  ],
  fees: [
    { id: "fee-1", studentId: "usr-stu-1", semesterId: "sem-4", amount: 2450, dueDate: "2026-02-15", status: "Paid", paidDate: "2026-02-10", receiptNumber: "REC-2026-089-01" },
    { id: "fee-2", studentId: "usr-stu-1", semesterId: "sem-4", amount: 350, dueDate: "2026-04-01", status: "Pending", paidDate: null, receiptNumber: null },
    { id: "fee-3", studentId: "usr-stu-2", semesterId: "sem-4", amount: 2450, dueDate: "2026-02-15", status: "Paid", paidDate: "2026-02-12", receiptNumber: "REC-2026-090-01" }
  ],
  notifications: [
    { id: "ntf-1", userId: "usr-stu-1", title: "Assignment Graded", message: "Your submission for RESTful Service with React Client was graded: 38/40.", read: false, createdAt: "2026-03-21" },
    { id: "ntf-2", userId: "usr-stu-1", title: "Fee Due Reminder", message: "Laboratory fee balance of $350 is due by April 1, 2026.", read: false, createdAt: "2026-03-20" }
  ]
};