import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Search, ChevronRight, Stethoscope } from 'lucide-react';
import { PATIENTS } from '@/data/mockData';

export function DoctorPatients() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const filtered = PATIENTS.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-gray-100 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-navy/10 text-navy text-xs font-semibold mb-2">
            <Users size={14} />
            <span>Outpatient Panel</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy">
            Patient Management Directory
          </h1>
          <p className="text-sm text-text-secondary mt-1">
            Access longitudinal health timelines and care plan status for all assigned patients.
          </p>
        </div>

        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search patient..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-9 pr-4 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-healthcare/30 w-64"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(p => (
          <div key={p.id} className="p-6 rounded-3xl bg-white border border-gray-100 shadow-xs flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-healthcare/10 text-healthcare font-bold flex items-center justify-center text-xs">
                    {p.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="font-bold text-navy text-sm">{p.name}</h3>
                    <p className="text-xs text-text-secondary font-mono">{p.id}</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-healthcare/10 text-healthcare">
                  {p.carePlanStatus}
                </span>
              </div>

              <div className="space-y-1.5 text-xs text-text-secondary pt-2 border-t border-gray-100">
                <p>Age / Blood: <strong className="text-navy">{p.age} yrs / {p.bloodGroup}</strong></p>
                <p>Last Consult: <strong className="text-navy">{p.lastConsultation || 'N/A'}</strong></p>
                <p>Next Follow-Up: <strong className="text-healthcare">{p.followUpDate || 'Not Scheduled'}</strong></p>
              </div>
            </div>

            <button
              onClick={() => navigate(`/doctor/patients/${p.id}`)}
              className="w-full py-2.5 rounded-xl bg-gray-50 hover:bg-navy hover:text-white text-navy font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <span>View Case & Timeline</span>
              <ChevronRight size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
