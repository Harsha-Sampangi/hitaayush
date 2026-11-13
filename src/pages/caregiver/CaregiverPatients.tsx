import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Heart, ArrowRight, UserCheck, Phone, Mail, Calendar } from 'lucide-react';
import { PATIENTS } from '@/data/mockData';

export function CaregiverPatients() {
  const navigate = useNavigate();
  const primaryPatient = PATIENTS[0]; // Ananya Reddy

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-gray-100 shadow-xs">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal/10 text-teal-700 text-xs font-semibold mb-2">
          <Users size={14} />
          <span>Connected Care Network</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-navy">
          Connected Patients
        </h1>
        <p className="text-sm text-text-secondary mt-1">
          Review the profiles of loved ones who have authorized you as their designated caregiver.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Ananya's Card */}
        <div className="p-6 rounded-3xl bg-white border border-teal-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-teal text-white font-bold flex items-center justify-center">
                  AR
                </div>
                <div>
                  <h3 className="font-bold text-navy text-base">{primaryPatient.name}</h3>
                  <p className="text-xs text-text-secondary">{primaryPatient.id} • Sister</p>
                </div>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-success/10 text-success">
                Active Care
              </span>
            </div>

            <div className="space-y-2 text-xs bg-gray-50 p-4 rounded-2xl border border-gray-100">
              <div className="flex justify-between">
                <span className="text-text-secondary">Blood Group:</span>
                <span className="font-semibold text-navy">{primaryPatient.bloodGroup}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Last Consultation:</span>
                <span className="font-semibold text-navy">{primaryPatient.lastConsultation}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Upcoming Review:</span>
                <span className="font-semibold text-navy">{primaryPatient.followUpDate}</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => navigate('/caregiver')}
            className="mt-6 w-full py-2.5 rounded-xl bg-teal hover:bg-teal-600 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2"
          >
            <span>Open Ananya's Care Board</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
