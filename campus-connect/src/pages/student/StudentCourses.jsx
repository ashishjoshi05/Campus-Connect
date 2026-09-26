import React from 'react';

import { BookOpen, User, Calendar, Award, CheckCircle2 } from 'lucide-react';

import { Badge } from '../../components/common/Badge';

export const StudentCourses = () => {
  const enrolledCourses = [
    {
      id: 1,
      code: 'CS301',
      name: 'Operating Systems',
      instructor: 'Dr. Vinay Parsad Tamta',
      credits: 4,
      attendance: 88,
      schedule: 'Mon, Wed (09:00 - 10:30 AM)',
      room: 'Hall 402',
      completedModules: 7,
      totalModules: 10,
    },
    {
      id: 2,
      code: 'CS302',
      name: 'Theory of Computation',
      instructor: 'Dr. Varun Barthwal',
      credits: 4,
      attendance: 92,
      schedule: 'Tue, Thu (11:00 - 12:30 PM)',
      room: 'Hall 305',
      completedModules: 6,
      totalModules: 8,
    },
    {
      id: 3,
      code: 'IT305',
      name: 'Full Stack Web Development',
      instructor: 'Mr. Arvid Kumar',
      credits: 3,
      attendance: 95,
      schedule: 'Fri (02:00 - 05:00 PM)',
      room: 'Lab 3',
      completedModules: 9,
      totalModules: 12,
    },
    {
      id: 4,
      code: 'MA301',
      name: 'Numerical Techniques & Optimization',
      instructor: 'Mr. Sagar ',
      credits: 4,
      attendance: 82,
      schedule: 'Mon, Thu (02:00 - 03:30 PM)',
      room: 'Hall 201',
      completedModules: 5,
      totalModules: 9,
    },
  ];

  return (
    <div className="min-h-full bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">

        {/* Page Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              My Courses
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              View your enrolled courses, attendance, schedule, and progress.
            </p>
          </div>

          {/* Course Count */}
          <div className="flex w-fit items-center gap-2 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3">
            <BookOpen className="h-5 w-5 text-blue-600" />

            <span className="text-sm font-semibold text-blue-700">
              {enrolledCourses.length} Courses
            </span>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          {enrolledCourses.map((course) => {
            const progress = Math.round(
              (course.completedModules / course.totalModules) * 100
            );

            const attendanceColor =
              course.attendance >= 90
                ? 'text-emerald-600'
                : course.attendance >= 75
                  ? 'text-amber-600'
                  : 'text-red-600';

            const attendanceBarColor =
              course.attendance >= 90
                ? 'bg-emerald-500'
                : course.attendance >= 75
                  ? 'bg-amber-500'
                  : 'bg-red-500';

            const attendanceStatus =
              course.attendance >= 90
                ? 'Excellent'
                : course.attendance >= 75
                  ? 'Good'
                  : 'Needs Attention';

            return (
              <div
                key={course.id}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
              >
                {/* Card Header */}
                <div className="border-b border-slate-100 bg-white px-6 py-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      {/* Course Icon */}
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                        <BookOpen className="h-6 w-6" />
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-blue-600">
                          {course.code}
                        </p>

                        <h2 className="mt-1 text-lg font-bold text-slate-900">
                          {course.name}
                        </h2>
                      </div>
                    </div>

                    {/* Credits */}
                    <span className="shrink-0 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600">
                      {course.credits} Credits
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="space-y-6 px-6 py-6">

                  {/* Instructor */}
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                      <User className="h-5 w-5" />
                    </div>

                    <div>
                      <p className="text-xs font-medium text-slate-400">
                        Instructor
                      </p>

                      <p className="mt-0.5 text-sm font-semibold text-slate-800">
                        {course.instructor}
                      </p>
                    </div>
                  </div>

                  {/* Schedule */}
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                      <Calendar className="h-5 w-5" />
                    </div>

                    <div>
                      <p className="text-xs font-medium text-slate-400">
                        Schedule
                      </p>

                      <p className="mt-0.5 text-sm font-semibold text-slate-800">
                        {course.schedule}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        {course.room}
                      </p>
                    </div>
                  </div>

                  {/* Attendance */}
                  <div>
                    <div className="mb-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Award className="h-5 w-5 text-amber-500" />

                        <span className="text-sm font-semibold text-slate-700">
                          Attendance
                        </span>
                      </div>

                      <span
                        className={`text-sm font-bold ${attendanceColor}`}
                      >
                        {course.attendance}%
                      </span>
                    </div>

                    {/* Attendance Bar */}
                    <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${attendanceBarColor}`}
                        style={{
                          width: `${course.attendance}%`,
                        }}
                      />
                    </div>

                    <p
                      className={`mt-2 text-xs font-medium ${attendanceColor}`}
                    >
                      {attendanceStatus}
                    </p>
                  </div>

                  {/* Course Progress */}
                  <div>
                    <div className="mb-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-blue-500" />

                        <span className="text-sm font-semibold text-slate-700">
                          Course Progress
                        </span>
                      </div>

                      <span className="text-sm font-bold text-blue-600">
                        {progress}%
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-blue-500 transition-all duration-500"
                        style={{
                          width: `${progress}%`,
                        }}
                      />
                    </div>

                    <p className="mt-2 text-xs font-medium text-slate-500">
                      {course.completedModules} of {course.totalModules}{' '}
                      modules completed
                    </p>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="border-t border-slate-100 bg-slate-50 px-6 py-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-slate-400">
                      Course Code
                    </span>

                    <span className="rounded-md bg-white px-2.5 py-1 text-xs font-bold text-slate-600 shadow-sm ring-1 ring-slate-200">
                      {course.code}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};