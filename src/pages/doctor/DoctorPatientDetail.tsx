import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, User, Stethoscope, FileText, Pill, TestTube,
  Calendar, Activity, CheckCircle2, Clock, MessageSquare, AlertCircle,
  ClipboardList
} from 'lucide-react';
import { PATIENTS, DOCTORS, PRESCRIPTIONS, MEDICINES, LAB_TESTS, TIMELINE_EVENTS } from '@/data/mockData';
import { useApp } from '@/context/AppContext';

export function DoctorPatientDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { progressUpdates, addToast } = useApp();

  const patient = PATIENTS.find(p => p.id === id) || PATIENTS[0];
  const primaryRx = PRESCRIPTIONS[0];
  const [activeTab, setActiveTab] = useState<'timeline' | 'meds' | 'labs' | 'updates'>('timeline');

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Top Navigation */}
      <button
        onClick={() => navigate('/doctor')}
        className="flex items-center gap-2 text-xs font-semibold text-text-secondary hover:text-navy px-3 py-1.5 rounded-xl hover:bg-white transition-colors"
      >
        <ArrowLeft size={16} />
        <span>Back to Registry</span>
      </button>

      {/* Patient Header Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-gray-100 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-healthcare text-white flex items-center justify-center font-bold text-xl shadow-md shadow-healthcare/20">
            {patient.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-extrabold text-navy">{patient.name}</h2>
              <span className="text-xs font-mono bg-gray-100 px-2 py-0.5 rounded-lg text-text-secondary">
                {patient.id}
              </span>
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-healthcare/10 text-healthcare">
                {patient.carePlanStatus}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-xs text-text-secondary mt-1">
              <span>{patient.age} Years • {patient.gender}</span>
              <span>•</span>
              <span>Blood Group: <strong className="text-navy">{patient.bloodGroup}</strong></span>
              <span>•</span>
              <span>Caregiver: <strong>Priya Reddy (Sister)</strong></span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/doctor/care-plan')}
            className="px-4 py-2.5 rounded-xl bg-healthcare hover:bg-healthcare-600 text-white font-semibold text-xs flex items-center gap-2 transition-all shadow-xs"
          >
            <ClipboardList size={15} />
            <span>Update Care Plan</span>
          </button>
        </div>
      </div>

      {/* Post-Consultation Situation Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
        <div className="p-4 rounded-2xl bg-white border border-gray-100 shadow-xs">
          <span className="text-text-secondary block">Last Consult</span>
          <span className="font-bold text-navy text-sm">{patient.lastConsultation}</span>
          <span className="text-[11px] text-teal block mt-1">Iron & Vit-D Deficiency</span>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-gray-100 shadow-xs">
          <span className="text-text-secondary block">Next Follow-Up</span>
          <span className="font-bold text-healthcare text-sm">{patient.followUpDate}</span>
          <span className="text-[11px] text-text-secondary block mt-1">10:30 AM • OPD 204</span>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-gray-100 shadow-xs">
          <span className="text-text-secondary block">Medicine Adherence</span>
          <span className="font-bold text-success text-sm">88% (Logged)</span>
          <span className="text-[11px] text-text-secondary block mt-1">1 Dose skipped (noted)</span>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-gray-100 shadow-xs">
          <span className="text-text-secondary block">Pending Lab Order</span>
          <span className="font-bold text-amber-600 text-sm">CBC & Vit D</span>
          <span className="text-[11px] text-text-secondary block mt-1">Sample 15 Nov</span>
        </div>
      </div>

      {/* Detail Tabs */}
      <div className="flex items-center gap-2 border-b border-gray-200 pb-2">
        {[
          { key: 'timeline', label: 'Continuous Health Timeline', icon: Activity },
          { key: 'meds', label: 'Medicine Regimen', icon: Pill },
          { key: 'labs', label: 'Diagnostic Reports', icon: TestTube },
          { key: 'updates', label: 'Patient Check-Ins', icon: MessageSquare },
        ].map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === tab.key
                  ? 'bg-navy text-white shadow-xs'
                  : 'text-text-secondary hover:bg-gray-100 hover:text-navy'
              }`}
            >
              <Icon size={14} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Timeline */}
      {activeTab === 'timeline' && (
        <div className="p-6 rounded-3xl bg-white border border-gray-100 shadow-xs space-y-4">
          <h3 className="font-bold text-navy text-sm">Chronological Post-Consultation Trajectory</h3>
          <div className="space-y-4 border-l-2 border-gray-200 pl-6 ml-3">
            {TIMELINE_EVENTS.map(evt => (
              <div key={evt.id} className="relative">
                <span className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-healthcare ring-4 ring-white" />
                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200/60">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-navy">{evt.title}</span>
                    <span className="text-text-secondary text-[11px]">{evt.date} • {evt.time}</span>
                  </div>
                  <p className="text-xs text-text-secondary mt-1">{evt.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Medicines */}
      {activeTab === 'meds' && (
        <div className="space-y-4">
          {primaryRx.medicines.map((m, i) => (
            <div key={i} className="p-5 rounded-2xl bg-white border border-gray-100 shadow-xs">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-navy text-base">{m.name}</h4>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-gray-100 text-text-secondary">
                  {m.dosage}
                </span>
              </div>
              <p className="text-xs text-text-secondary mt-1">
                Frequency: <strong>{m.frequency}</strong> • Duration: <strong>{m.duration}</strong>
              </p>
              <div className="mt-2 text-xs font-mono text-navy bg-gray-50 p-2.5 rounded-xl border border-gray-200">
                Rx Instruction: "{m.originalInstruction}"
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Labs */}
      {activeTab === 'labs' && (
        <div className="space-y-4">
          {LAB_TESTS.map(t => (
            <div key={t.id} className="p-5 rounded-2xl bg-white border border-gray-100 shadow-xs">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-navy text-sm">{t.name}</h4>
                <span className="text-xs font-semibold text-healthcare">{t.status}</span>
              </div>
              <p className="text-xs text-text-secondary mt-0.5">Date: {t.date}</p>
            </div>
          ))}
        </div>
      )}

      {/* Tab 4: Updates */}
      {activeTab === 'updates' && (
        <div className="space-y-4">
          {progressUpdates.map(up => (
            <div key={up.id} className="p-5 rounded-2xl bg-white border border-gray-100 shadow-xs space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-navy">Feeling: {up.feeling.toUpperCase()}</span>
                <span className="text-text-secondary">{up.date}</span>
              </div>
              <p className="text-xs text-navy font-medium italic bg-gray-50 p-3 rounded-xl border border-gray-200">
                "{up.notes}"
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
