import React from 'react';
import { TestTube, Calendar, Send, CheckCircle2 } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { LAB_TESTS } from '@/data/mockData';

export function CaregiverTests() {
  const { addToast } = useApp();

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-gray-100 shadow-xs">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal/10 text-teal-700 text-xs font-semibold mb-2">
          <TestTube size={14} />
          <span>Diagnostic Oversight</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-navy">
          Ananya's Tests & Reports
        </h1>
        <p className="text-sm text-text-secondary mt-1">
          Review upcoming laboratory orders and ensure sample collection requirements are fulfilled.
        </p>
      </div>

      <div className="space-y-4">
        {LAB_TESTS.map(test => (
          <div key={test.id} className="p-6 rounded-3xl bg-white border border-gray-100 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-navy text-base">{test.name}</h3>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-teal/10 text-teal-700">
                  {test.status}
                </span>
              </div>
              <p className="text-xs text-text-secondary mt-1">
                Ordered by {test.doctorName} for {test.date}
              </p>
            </div>

            <button
              onClick={() => addToast(`Fasting reminder sent to Ananya for ${test.name}`, 'info')}
              className="px-4 py-2 rounded-xl bg-teal/10 hover:bg-teal text-teal-800 hover:text-white text-xs font-semibold self-start md:self-center transition-all"
            >
              Send Prep Reminder
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
