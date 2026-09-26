import React, { useState, useEffect } from 'react';
import { CreditCard, CheckCircle2, Clock } from 'lucide-react';
import { Badge } from '../../components/common/Badge';
import { communityService } from '../../services/communityService';

export const AdminFees = () => {
  const [fees, setFees] = useState([]);

  useEffect(() => {
    communityService.getFees().then(setFees);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Fee Administration</h1>
          <p className="text-slate-500 text-sm mt-1">Review student payments and fee status logs</p>
        </div>
        <button className="bg-brand-600 text-white px-4 py-2 rounded-lg hover:bg-brand-700 transition-colors">
          Create Invoice Batch
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-600">
            <tr>
              <th className="p-4 font-medium">Receipt #</th>
              <th className="p-4 font-medium">Fee Title</th>
              <th className="p-4 font-medium">Amount</th>
              <th className="p-4 font-medium">Due Date</th>
              <th className="p-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {fees.map(f => (
              <tr key={f.id} className="hover:bg-slate-50">
                <td className="p-4 font-mono text-sm text-slate-500">{f.receiptNumber || 'PENDING'}</td>
                <td className="p-4 font-medium text-slate-800">{f.title}</td>
                <td className="p-4 font-semibold text-slate-900">₹{f.amount?.toLocaleString()}</td>
                <td className="p-4 text-slate-600">{f.dueDate}</td>
                <td className="p-4">
                  <Badge variant={f.status === 'Paid' ? 'success' : 'warning'}>
                    {f.status}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};