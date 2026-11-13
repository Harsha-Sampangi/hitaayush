import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Stethoscope, Users, Calendar, TestTube, AlertCircle,
  Clock, ArrowRight, Search, Filter, CheckCircle2, ChevronRight,
  ClipboardList, HeartPulse, Activity
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { PATIENTS, DOCTORS } from '@/data/mockData';

export function DoctorDashboard() {
  const navigate = useNavigate();
  const { progressUpdates, addToast } = useApp();
  const doctor = DOCTORS[0]; // Dr. Rahul Sharma

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredPatients = PATIENTS.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || p.carePlanStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Doctor Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-navy-800 via-navy to-healthcare text-white shadow-xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white text-xl font-bold shadow-inner">
              <Stethoscope size={28} className="text-teal-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/20 text-teal-200">
                  Clinical Continuity Console
                </span>
                <span className="text-xs text-blue-100">{doctor.hospital}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold mt-1">
                {doctor.name}
              </h2>
              <p className="text-sm text-blue-100 mt-0.5">
                Senior Consultant, {doctor.specialty} • Supervising 24 Active Post-Care Cohorts
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/doctor/care-plan')}
              className="px-5 py-3 rounded-2xl bg-teal hover:bg-teal-600 text-white font-semibold text-xs flex items-center gap-2 shadow-lg shadow-teal/20 transition-all"
            >
              <ClipboardList size={16} />
              <span>+ Create Post-Care Plan</span>
            </button>
          </div>
        </div>

        {/* 5 Clinical Metric KPI Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-8 pt-6 border-t border-white/15">
          <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/10">
            <span className="text-[11px] text-blue-100/80 block">Total Patients</span>
            <span className="text-2xl font-bold text-white">24</span>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/10">
            <span className="text-[11px] text-blue-100/80 block">Follow-Up Needed</span>
            <span className="text-2xl font-bold text-teal-300">5</span>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/10">
            <span className="text-[11px] text-blue-100/80 block">Pending Reports</span>
            <span className="text-2xl font-bold text-amber-300">3</span>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/10">
            <span className="text-[11px] text-blue-100/80 block">Appointments</span>
            <span className="text-2xl font-bold text-white">8</span>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 col-span-2 sm:col-span-1">
            <span className="text-[11px] text-blue-100/80 block">Incomplete Tasks</span>
            <span className="text-2xl font-bold text-rose-300">4</span>
          </div>
        </div>
      </div>

      {/* Real-Time Patient Check-In Feed */}
      <div className="p-6 rounded-3xl bg-white border border-gray-100 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-healthcare/10 text-healthcare flex items-center justify-center">
              <HeartPulse size={18} />
            </div>
            <div>
              <h3 className="font-bold text-navy text-base">Incoming Patient Recovery Check-Ins</h3>
              <p className="text-xs text-text-secondary">Direct post-consultation progress reports from patients</p>
            </div>
          </div>
          <span className="text-xs font-bold text-healthcare bg-healthcare/10 px-3 py-1 rounded-full">
            Live Stream
          </span>
        </div>

        <div className="space-y-3">
          {progressUpdates.map(up => (
            <div
              key={up.id}
              className="p-4 rounded-2xl bg-gray-50 border border-gray-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-navy">Ananya Reddy (HT-2026-001)</span>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                    up.feeling === 'better'
                      ? 'bg-success/10 text-success'
                      : up.feeling === 'worse'
                      ? 'bg-error/10 text-error'
                      : 'bg-warning/10 text-warning'
                  }`}>
                    {up.feeling.replace('_', ' ').toUpperCase()}
                  </span>
                </div>
                <p className="text-xs text-navy font-medium italic">
                  "{up.notes}"
                </p>
                <div className="flex items-center gap-4 text-[11px] text-text-secondary">
                  <span>Logged: {up.date}</span>
                  <span>•</span>
                  <span>Test Sample Given: {up.completedTest ? 'Yes' : 'Pending'}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                <button
                  onClick={() => addToast('Acknowledged Ananya’s check-in update', 'info')}
                  className="px-3.5 py-1.5 rounded-xl bg-white border border-gray-200 hover:bg-gray-100 text-navy text-xs font-semibold transition-colors"
                >
                  Acknowledge
                </button>
                <button
                  onClick={() => navigate('/doctor/patients/HT-2026-001')}
                  className="px-3.5 py-1.5 rounded-xl bg-healthcare hover:bg-healthcare-600 text-white text-xs font-semibold transition-colors shadow-xs"
                >
                  View Case
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Patient Management Table */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-gray-100 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-navy">Connected Patient Registry</h3>
            <p className="text-xs text-text-secondary">Search and inspect longitudinal records across visits</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Search */}
            <div className="relative">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search patient name or ID..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-healthcare/30 w-48 sm:w-64"
              />
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="py-2 px-3 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-healthcare/30 text-navy"
            >
              <option value="all">All Care Plan Statuses</option>
              <option value="shared">Shared</option>
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
              <option value="draft">Draft</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-gray-200 text-text-secondary uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4 font-semibold">Patient Name</th>
                <th className="py-3 px-4 font-semibold">Patient ID</th>
                <th className="py-3 px-4 font-semibold">Age / Gender</th>
                <th className="py-3 px-4 font-semibold">Last Consult</th>
                <th className="py-3 px-4 font-semibold">Follow-Up</th>
                <th className="py-3 px-4 font-semibold">Plan Status</th>
                <th className="py-3 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredPatients.map(pt => (
                <tr key={pt.id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-navy">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-healthcare/10 text-healthcare font-bold flex items-center justify-center text-[11px]">
                        {pt.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span>{pt.name}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-text-secondary">{pt.id}</td>
                  <td className="py-3.5 px-4 text-navy">{pt.age} yrs / {pt.gender}</td>
                  <td className="py-3.5 px-4 text-text-secondary">{pt.lastConsultation || 'N/A'}</td>
                  <td className="py-3.5 px-4 font-semibold text-healthcare">{pt.followUpDate || 'Not set'}</td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      pt.carePlanStatus === 'shared'
                        ? 'bg-healthcare/10 text-healthcare'
                        : pt.carePlanStatus === 'approved'
                        ? 'bg-success/10 text-success'
                        : 'bg-warning/10 text-warning'
                    }`}>
                      {pt.carePlanStatus || 'Draft'}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => navigate(`/doctor/patients/${pt.id}`)}
                      className="px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-navy hover:text-white text-navy font-semibold transition-all inline-flex items-center gap-1"
                    >
                      <span>Review Details</span>
                      <ChevronRight size={12} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
