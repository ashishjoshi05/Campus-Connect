import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { GraduationCap, Lock, Mail, ShieldAlert } from 'lucide-react';

export const Login = () => {
  const [email, setEmail] = useState('student@example.com');
  const [password, setPassword] = useState('student123');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e?.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const user = await login(email, password);
      navigate(`/${user.role}/dashboard`);
    } catch (err) {
      setError(err.message || 'Login failed.');
    } finally {
      setSubmitting(false);
    }
  };

  const fillCredentials = (roleEmail, rolePass) => {
    setEmail(roleEmail);
    setPassword(rolePass);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="p-3 bg-indigo-600 rounded-2xl shadow-md text-white">
            <GraduationCap className="w-10 h-10" />
          </div>
        </div>
        <h2 className="mt-4 text-center text-3xl font-extrabold text-slate-900 tracking-tight">
          Campus Connect
        </h2>
        <p className="mt-1 text-center text-sm text-slate-600">
          Integrated University Management & Learning Platform
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-sm rounded-2xl sm:px-10 border border-slate-200/80">
          {error && (
            <div className="mb-4 bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-lg text-sm flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form className="space-y-5" onSubmit={handleLogin}>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Email Address
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 text-slate-400" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-slate-400" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors disabled:opacity-50"
            >
              {submitting ? 'Authenticating...' : 'Sign In to Portal'}
            </button>
          </form>

          {/* Instant 1-Click Demo Logins */}
          <div className="mt-6 border-t border-slate-200 pt-5">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider text-center mb-3">
              One-Click Demo Accounts
            </p>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => fillCredentials('student@example.com', 'student123')}
                className="py-1.5 px-2 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 rounded text-xs font-medium text-slate-700 text-center transition-colors border border-slate-200"
              >
                Student
              </button>
              <button
                type="button"
                onClick={() => fillCredentials('faculty@example.com', 'faculty123')}
                className="py-1.5 px-2 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 rounded text-xs font-medium text-slate-700 text-center transition-colors border border-slate-200"
              >
                Faculty
              </button>
              <button
                type="button"
                onClick={() => fillCredentials('admin@example.com', 'admin123')}
                className="py-1.5 px-2 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 rounded text-xs font-medium text-slate-700 text-center transition-colors border border-slate-200"
              >
                Admin
              </button>
            </div>
            <p className="mt-3 text-[11px] text-slate-400 text-center">
              Prototype environment using persistent local storage.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};