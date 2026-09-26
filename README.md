# 🎓 CampusConnect - Academic Management System

A robust, full-stack university portal designed to streamline academic operations. The platform features completely isolated, role-based workflows for Students, Faculty, and Administrators, ensuring secure and efficient campus management.

## 🌟 Key Features

### 👨‍🎓 Student Portal
* **Dashboard & Analytics:** Overview of current semester progress, recent grades, and upcoming deadlines.
* **Course Management:** Track syllabus progress, attendance percentages, and enrolled credits.
* **Academic Resources:** Download lecture notes, assignments, and study materials.
* **Timetable & Fees:** View weekly schedules and track fee payment status.

### 👨‍🏫 Faculty Portal
* **Course Administration:** Manage assigned courses, student rosters, and syllabi.
* **Attendance & Grading:** Mark daily student attendance and grade assignments.
* **Notice Board:** Broadcast important circulars and department announcements.
* **Resource Sharing:** Upload and manage course materials for students.

### 👨‍💼 Admin Portal
* **User Management:** Onboard, edit, and manage Student and Faculty accounts.
* **Master Scheduling:** Manage academic semesters and generate master timetables.
* **Financial Administration:** Track institution-wide fee collections and generate invoices.
* **Department Oversight:** Monitor cross-department metrics and activities.

## 🛠️ Tech Stack

**Frontend:**
* React (Vite)
* Tailwind CSS (Styling & UI)
* React Router DOM (Role-based protected routing)
* Lucide React (Icons)

**Backend:**
* Node.js & Express.js (REST API)
* MongoDB & Mongoose (Database & ODM)
* JSON Web Tokens (JWT Authentication)
* Bcrypt.js (Password Hashing)

## 📁 Project Structure

This project is structured as a monorepo containing both the client and server code:

```text
campus_connect/
├── frontend/          # React + Vite client
│   ├── src/
│   │   ├── components/  # Reusable UI components (Badges, Layouts)
│   │   ├── pages/       # Role-specific pages (Admin, Faculty, Student)
│   │   ├── routes/      # RBAC routing logic
│   │   └── services/    # API calls and mock storage
└── backend/           # Node.js + Express server
    ├── src/
    │   ├── config/      # DB connection and environment setup
    │   ├── controllers/ # Business logic
    │   ├── middleware/  # JWT auth & Role verification
    │   ├── models/      # Mongoose schemas
    │   └── routes/      # Express API routes
