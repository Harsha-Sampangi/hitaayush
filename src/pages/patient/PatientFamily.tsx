import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Users, ShieldCheck, UserCheck, Key, Lock, CheckCircle2,
  AlertTriangle, Phone, Mail, ToggleLeft, ToggleRight, XCircle
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { CAREGIVERS } from '@/data/mockData';
import { AiAssistantModal } from '@/components/shared/AiAssistantModal';
import type { CaregiverPermissions } from '@/types';

export function PatientFamily() {
  const { addToast } = useApp();
  const caregiver = CAREGIVERS[0]; // Priya Reddy
  const [permissions, setPermissions] = useState<CaregiverPermissions>(caregiver.permissions);
  const [isAccessActive, setIsAccessActive] = useState(true);

  const togglePermission = (key: keyof CaregiverPermissions) => {
    setPermissions(prev => {
      const updated = { ...prev, [key]: !prev[key] };
      addToast(`Updated permission: ${String(key)}`, 'info');
      return updated;
    });
  };

  const handleRevoke = () => {
    setIsAccessActive(prev => {
      const nextState = !prev;
      addToast(nextState ? 'Caregiver access re-enabled' : 'Caregiver access paused', nextState ? 'success' : 'warning');
      return nextState;
    });
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      {/* Top Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-gray-100 shadow-xs">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal/10 text-teal-700 text-xs font-semibold mb-2">
          <Users size={14} />
          <span>Patient-Controlled Circle of Care</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-navy">
          Caregiver & Family Access
        </h1>
        <p className="text-sm text-text-secondary mt-1">
          You have full cryptographic and consent-based authority over which family members can view your medical schedules and assist with your recovery.
        </p>
      </div>

      {/* Connected Caregiver Profile Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-gray-100 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-teal text-white flex items-center justify-center font-bold text-lg shadow-md shadow-teal/20">
              PR
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-navy">{caregiver.name}</h3>
                <span className="text-xs font-semibold text-teal-700 bg-teal/10 px-2.5 py-0.5 rounded-full">
                  {caregiver.relation}
                </span>
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                  isAccessActive ? 'bg-success/10 text-success' : 'bg-error/10 text-error'
                }`}>
                  {isAccessActive ? 'Authorized' : 'Access Paused'}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-xs text-text-secondary mt-1">
                <span className="flex items-center gap-1">
                  <Phone size={12} />
                  {caregiver.phone}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Mail size={12} />
                  {caregiver.email}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={handleRevoke}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all border ${
              isAccessActive
                ? 'bg-error/10 text-error border-error/20 hover:bg-error hover:text-white'
                : 'bg-success/10 text-success border-success/20 hover:bg-success hover:text-white'
            }`}
          >
            {isAccessActive ? 'Pause Caregiver Access' : 'Restore Caregiver Access'}
          </button>
        </div>

        {/* Permissions Toggles List */}
        <div>
          <h4 className="text-sm font-bold text-navy mb-3">Consent Permissions</h4>
          <p className="text-xs text-text-secondary mb-4">
            Fine-grained toggles for data visibility. You can modify these settings at any time without notifying external clinics.
          </p>

          <div className="space-y-3">
            {[
              { key: 'viewPrescriptions' as const, title: 'View Digital Prescriptions', desc: 'Allows caregiver to inspect medication dosages and simplified explanations.' },
              { key: 'viewMedicineSchedules' as const, title: 'View Daily Medicine Schedules', desc: 'Allows caregiver to see pending and taken doses.' },
              { key: 'viewTestReports' as const, title: 'View Laboratory Investigations', desc: 'Allows caregiver to view upcoming tests and uploaded blood reports.' },
              { key: 'viewAppointments' as const, title: 'View Appointments & Follow-Ups', desc: 'Allows caregiver to check follow-up dates and assist with clinic travel.' },
              { key: 'receiveReminders' as const, title: 'Send Dose Reminders & Receive Alerts', desc: 'Allows caregiver to trigger notification alerts when a dose is pending.' },
            ].map(perm => {
              const isEnabled = permissions[perm.key] && isAccessActive;
              return (
                <div
                  key={perm.key}
                  className="p-4 rounded-2xl bg-gray-50/80 border border-gray-200/80 flex items-center justify-between gap-4"
                >
                  <div>
                    <h5 className="font-bold text-sm text-navy">{perm.title}</h5>
                    <p className="text-xs text-text-secondary mt-0.5">{perm.desc}</p>
                  </div>

                  <button
                    onClick={() => togglePermission(perm.key)}
                    disabled={!isAccessActive}
                    className={`p-1 rounded-full transition-colors ${
                      isEnabled ? 'text-healthcare' : 'text-gray-400'
                    }`}
                  >
                    {isEnabled ? <ToggleRight size={32} /> : <ToggleLeft size={32} />}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Privacy Standard Callout */}
        <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-200/70 flex items-start gap-3 text-xs text-navy">
          <ShieldCheck size={18} className="text-teal mt-0.5 flex-shrink-0" />
          <div>
            <strong className="block mb-0.5">Privacy & Consent Integrity:</strong>
            Caregivers can only view and assist with tasks. They cannot alter dosages, modify doctor instructions, or approve care plans.
          </div>
        </div>
      </div>

      {/* Global AI Assistant Floating Icon */}
      <AiAssistantModal />
    </div>
  );
}
