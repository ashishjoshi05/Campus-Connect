import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { communityService } from '../../services/communityService';
import { Badge } from '../../components/common/Badge';

export const StudentFees = () => {
  const { user } = useAuth();
  const [fees, setFees] = useState([]);

  const loadData = async () => {
    const list = await communityService.getFees();
    setFees(list.filter(f => f.studentId === user.id));
  };

  useEffect(() => {
    loadData();
  }, [user.id]);

  const handlePay = async (id) => {
    await communityService.markFeePaid(id);
    loadData();
  };

  const pending = fees.filter(f => f.status === 'Pending').reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Student Fee Account</h1>
          <p className="text-slate-500 text-xs mt-0.5">Semester dues, payments, and generated receipts</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-lg border border-slate-200">
          <span className="text-xs text-slate-500">Outstanding Balance: </span>
          <span className="text-base font-bold text-indigo-600">${pending}.00</span>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500 font-semibold border-b border-slate-200">
            <tr>
              <th className="px-6 py-3">Fee ID</th>
              <th className="px-6 py-3">Amount</th>
              <th className="px-6 py-3">Due Date</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Receipt / Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {fees.map(f => (
              <tr key={f.id} className="hover:bg-slate-50">
                <td className="px-6 py-4 font-mono text-xs">{f.id}</td>
                <td className="px-6 py-4 font-bold text-slate-900">${f.amount}</td>
                <td className="px-6 py-4 text-xs">{f.dueDate}</td>
                <td className="px-6 py-4">
                  <Badge variant={f.status === 'Paid' ? 'success' : 'warning'}>{f.status}</Badge>
                </td>
                <td className="px-6 py-4 text-xs">
                  {f.status === 'Paid' ? (
                    <span className="font-mono text-indigo-600">{f.receiptNumber}</span>
                  ) : (
                    <button
                      onClick={() => handlePay(f.id)}
                      className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded font-medium shadow-sm transition"
                    >
                      Pay Now (Mock)
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};