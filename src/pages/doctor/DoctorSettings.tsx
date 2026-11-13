import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, Stethoscope, Building2, LogOut, CheckCircle2 } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { DOCTORS } from '@/data/mockData';

export function DoctorSettings() {
  const navigate = useNavigate();
  const { setRole } = useApp();
  const doctor = DOCTORS[0];

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-16">
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-gray-100 shadow-xs">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-navy/10 text-navy text-xs font-semibold mb-2">
          <Settings size={14} />
          <span>Doctor Profile & System</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-navy">
          Physician Settings
        </h1>
        <p className="text-sm text-text-secondary mt-1">
          Review institutional affiliation, clinical department credentials, and consultation routing.
        </p>
      </div>

      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-gray-100 shadow-xs space-y-4">
        <h3 className="font-bold text-navy text-base">Practitioner Identity</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <span className="block text-text-secondary font-semibold uppercase mb-1">Physician Name</span>
            <div className="p-3 bg-gray-50 border border-gray-200 rounded-xl text-navy font-medium">
              {doctor.name}
            </div>
          </div>
          <div>
            <span className="block text-text-secondary font-semibold uppercase mb-1">Specialty</span>
            <div className="p-3 bg-gray-50 border border-gray-200 rounded-xl text-navy font-medium">
              {doctor.specialty}
            </div>
          </div>
          <div>
            <span className="block text-text-secondary font-semibold uppercase mb-1">Affiliated Hospital</span>
            <div className="p-3 bg-gray-50 border border-gray-200 rounded-xl text-navy font-medium">
              {doctor.hospital}
            </div>
          </div>
          <div>
            <span className="block text-text-secondary font-semibold uppercase mb-1">Clinic Contact</span>
            <div className="p-3 bg-gray-50 border border-gray-200 rounded-xl text-navy font-medium">
              {doctor.phone} • {doctor.email}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <button
          onClick={() => { setRole(null); navigate('/roles'); }}
          className="flex items-center gap-2 text-xs font-semibold text-error hover:bg-error/10 px-4 py-2.5 rounded-xl transition-colors"
        >
          <LogOut size={16} />
          <span>Switch Role or Log Out</span>
        </button>
      </div>
    </div>
  );
}
