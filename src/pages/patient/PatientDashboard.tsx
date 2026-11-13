import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Pill, TestTube, Calendar, Activity, CheckCircle, Clock,
  ArrowRight, Sparkles, User, AlertCircle, HeartPulse, Shield,
  FileText, Check, ChevronRight, Eye
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { useTranslation } from '@/hooks/useTranslation';
import { PATIENTS, DOCTORS, PRESCRIPTIONS, LAB_TESTS, APPOINTMENTS } from '@/data/mockData';
import { AiAssistantModal } from '@/components/shared/AiAssistantModal';
import { SkipMedicineModal } from '@/components/shared/SkipMedicineModal';
import { CheckInModal } from '@/components/shared/CheckInModal';
import { PrescriptionAiModal } from '@/components/shared/PrescriptionAiModal';
import type { PrescriptionMedicine } from '@/types';

export function PatientDashboard() {
  const navigate = useNavigate();
  const { currentLanguage, medicineDoses, markMedicineTaken, markMedicineSkipped, addToast } = useApp();
  const { t } = useTranslation();

  const patient = PATIENTS[0]; // Ananya Reddy
  const doctor = DOCTORS[0]; // Dr. Rahul Sharma
  const primaryRx = PRESCRIPTIONS[0];
  const nextTest = LAB_TESTS[0]; // Complete Blood Count
  const nextAppt = APPOINTMENTS[0]; // 20 Nov 2026

  // Modals state
  const [skipModalDoseId, setSkipModalDoseId] = useState<string | null>(null);
  const [skipModalMedName, setSkipModalMedName] = useState<string>('');
  const [isCheckInOpen, setIsCheckInOpen] = useState(false);
  const [selectedAiMed, setSelectedAiMed] = useState<PrescriptionMedicine | null>(null);

  // Taken doses count
  const takenCount = medicineDoses.filter(d => d.status === 'taken').length;
  const totalDoses = medicineDoses.length;

  const handleTakeDose = (doseId: string, medName: string) => {
    markMedicineTaken(doseId);
    addToast(`Marked ${medName} as taken!`, 'success');
  };

  const handleOpenSkipModal = (doseId: string, medName: string) => {
    setSkipModalDoseId(doseId);
    setSkipModalMedName(medName);
  };

  const handleConfirmSkip = (reason: string) => {
    if (skipModalDoseId) {
      markMedicineSkipped(skipModalDoseId, reason);
      addToast(`Recorded skipped dose: ${reason}`, 'warning');
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Patient Profile & Greeting Card (Apple Liquid Glass Style) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-navy via-healthcare to-teal text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white text-xl font-bold shadow-inner">
              AR
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/20 text-teal-200">
                  {patient.id}
                </span>
                <span className="text-xs text-blue-100">Blood Group: {patient.bloodGroup}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold mt-1">
                Good morning, {patient.name.split(' ')[0]}.
              </h2>
              <p className="text-sm text-blue-100 mt-0.5">
                Let's keep your healthcare journey on track after your 10 Nov consultation.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsCheckInOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 text-white text-xs font-semibold flex items-center gap-2 transition-all shadow-xs"
            >
              <HeartPulse size={16} className="text-teal-300" />
              <span>Daily Health Check-In</span>
            </button>
            <button
              onClick={() => navigate('/patient/prescriptions')}
              className="px-4 py-2.5 rounded-xl bg-white text-navy hover:bg-gray-100 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-md"
            >
              <FileText size={16} />
              <span>View Prescription</span>
            </button>
          </div>
        </div>

        {/* Mini stats bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-white/15 text-xs">
          <div>
            <span className="text-blue-100/80 block">Supervising Doctor</span>
            <span className="font-semibold">{doctor.name}</span>
          </div>
          <div>
            <span className="text-blue-100/80 block">Diagnosis</span>
            <span className="font-semibold">Iron & Vit-D Deficiency</span>
          </div>
          <div>
            <span className="text-blue-100/80 block">Next Milestone</span>
            <span className="font-semibold">Blood Work (15 Nov)</span>
          </div>
          <div>
            <span className="text-blue-100/80 block">Family Caregiver</span>
            <span className="font-semibold">Priya Reddy (Connected)</span>
          </div>
        </div>
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 cols): Today's Schedule & Care Progress */}
        <div className="lg:col-span-2 space-y-6">
          {/* Card 1: Today's Medicine Schedule */}
          <div className="p-6 rounded-3xl bg-white border border-gray-100 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-teal/10 text-teal-600 flex items-center justify-center">
                  <Pill size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-navy text-base">Medicines Today</h3>
                  <p className="text-xs text-text-secondary">Keep consistent to maintain therapeutic recovery</p>
                </div>
              </div>
              <button
                onClick={() => navigate('/patient/medicines')}
                className="text-xs font-semibold text-healthcare hover:text-healthcare-600 flex items-center gap-1"
              >
                <span>View Full Schedule</span>
                <ChevronRight size={14} />
              </button>
            </div>

            <div className="space-y-3">
              {medicineDoses.map(dose => (
                <div
                  key={dose.id}
                  className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    dose.status === 'taken'
                      ? 'bg-success/5 border-success/20'
                      : dose.status === 'skipped'
                      ? 'bg-gray-50 border-gray-200 opacity-60'
                      : 'bg-white border-gray-200/80 hover:border-healthcare/30'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      dose.status === 'taken'
                        ? 'bg-success text-white'
                        : dose.status === 'skipped'
                        ? 'bg-gray-200 text-gray-500'
                        : 'bg-healthcare/10 text-healthcare'
                    }`}>
                      <Pill size={16} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-sm text-navy">{dose.medicineName}</h4>
                        <span className="text-xs font-semibold text-text-secondary">({dose.dosage})</span>
                      </div>
                      <div className="flex items-center gap-3 mt-1 text-xs text-text-secondary">
                        <span className="flex items-center gap-1">
                          <Clock size={12} />
                          {dose.time}
                        </span>
                        <span>•</span>
                        <span className={`font-semibold ${
                          dose.status === 'taken'
                            ? 'text-success'
                            : dose.status === 'skipped'
                            ? 'text-error'
                            : 'text-warning'
                        }`}>
                          {dose.status === 'taken' ? 'Taken' : dose.status === 'skipped' ? `Skipped: ${dose.skipReason || 'Recorded'}` : 'Pending'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    {dose.status === 'pending' ? (
                      <>
                        <button
                          onClick={() => handleTakeDose(dose.id, dose.medicineName)}
                          className="px-3.5 py-1.5 rounded-xl bg-healthcare hover:bg-healthcare-600 text-white text-xs font-medium flex items-center gap-1.5 transition-colors shadow-xs"
                        >
                          <Check size={14} />
                          <span>Mark Taken</span>
                        </button>
                        <button
                          onClick={() => handleOpenSkipModal(dose.id, dose.medicineName)}
                          className="px-3 py-1.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-text-secondary text-xs font-medium transition-colors"
                        >
                          Skip
                        </button>
                      </>
                    ) : (
                      <span className="text-xs font-medium text-text-secondary px-3 py-1 bg-gray-100 rounded-lg">
                        {dose.status === 'taken' ? '✓ Logged' : 'Recorded'}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Card 4: Care Plan Progress */}
          <div className="p-6 rounded-3xl bg-white border border-gray-100 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-healthcare/10 text-healthcare flex items-center justify-center">
                  <Activity size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-navy text-base">Care Plan Progress</h3>
                  <p className="text-xs text-text-secondary">Active post-consultation regimen by Dr. Rahul Sharma</p>
                </div>
              </div>
              <span className="text-xs font-bold text-healthcare bg-healthcare/10 px-2.5 py-1 rounded-full">
                Phase 1 Active
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-text-secondary font-medium">Weekly Adherence Goal</span>
                <span className="text-navy font-bold">3 of 5 Care Milestones Completed (60%)</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                <div className="bg-gradient-to-r from-healthcare to-teal h-full rounded-full transition-all duration-500 w-[60%]" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4 pt-4 border-t border-gray-100 text-xs">
              <div className="flex items-center gap-2">
                <CheckCircle size={16} className="text-success" />
                <span className="text-navy">Prescription Explained</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={16} className="text-success" />
                <span className="text-navy">Daily Dose Routine</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-warning" />
                <span className="text-navy">Lab Tests (15 Nov)</span>
              </div>
            </div>
          </div>

          {/* Quick AI Explanation Preview Card */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-teal-50/60 to-blue-50/40 border border-teal-200/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-2xl bg-teal text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-teal/20">
                <Sparkles size={20} />
              </div>
              <div>
                <h4 className="font-bold text-navy text-sm">Need Help Understanding Your Instructions?</h4>
                <p className="text-xs text-text-secondary mt-1">
                  Hitaayus AI explains what your doctor wrote in simple words, in English, Telugu, and Hindi.
                </p>
              </div>
            </div>
            <button
              onClick={() => setSelectedAiMed(primaryRx.medicines[0])}
              className="px-4 py-2.5 rounded-xl bg-teal hover:bg-teal-600 text-white font-semibold text-xs flex items-center gap-1.5 shadow-sm transition-all flex-shrink-0"
            >
              <span>Explain Medicine</span>
              <Sparkles size={14} />
            </button>
          </div>
        </div>

        {/* Right Column (1 col): Upcoming Tests, Next Appointment, Recent Activity */}
        <div className="space-y-6">
          {/* Card 2: Upcoming Tests */}
          <div className="p-6 rounded-3xl bg-white border border-gray-100 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-healthcare/10 text-healthcare flex items-center justify-center">
                  <TestTube size={16} />
                </div>
                <h3 className="font-bold text-navy text-sm">Upcoming Tests</h3>
              </div>
              <button onClick={() => navigate('/patient/tests')} className="text-xs text-healthcare font-semibold">
                View All
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200/80">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-bold text-navy">{nextTest.name}</span>
                <span className="font-semibold text-healthcare bg-healthcare/10 px-2 py-0.5 rounded-full text-[10px]">
                  Scheduled
                </span>
              </div>
              <p className="text-xs text-text-secondary">Ordered by {nextTest.doctorName}</p>
              <div className="mt-3 pt-2 border-t border-gray-200/60 flex items-center justify-between text-[11px] text-text-secondary">
                <span>Date: <strong className="text-navy">{nextTest.date}</strong></span>
                <button
                  onClick={() => navigate('/patient/tests')}
                  className="text-healthcare hover:underline font-medium"
                >
                  View Details →
                </button>
              </div>
            </div>
          </div>

          {/* Card 3: Next Appointment */}
          <div className="p-6 rounded-3xl bg-white border border-gray-100 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-navy/10 text-navy flex items-center justify-center">
                  <Calendar size={16} />
                </div>
                <h3 className="font-bold text-navy text-sm">Next Appointment</h3>
              </div>
              <button onClick={() => navigate('/patient/appointments')} className="text-xs text-healthcare font-semibold">
                Calendar
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200/80">
              <h4 className="font-bold text-sm text-navy">{nextAppt.doctorName}</h4>
              <p className="text-xs text-text-secondary">{nextAppt.doctorSpecialty} • Follow-up Review</p>
              <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-navy bg-white p-2 rounded-xl border border-gray-200">
                <Calendar size={14} className="text-healthcare" />
                <span>{nextAppt.date} at {nextAppt.time}</span>
              </div>
              <p className="text-[11px] text-text-secondary mt-2">
                Purpose: Review repeat blood panel & vitamin levels
              </p>
            </div>
          </div>

          {/* Card 5: Recent Activity Feed */}
          <div className="p-6 rounded-3xl bg-white border border-gray-100 shadow-xs">
            <h3 className="font-bold text-navy text-sm mb-4">Recent Care Activity</h3>
            <div className="space-y-3">
              {[
                { title: 'Prescription Uploaded', desc: 'Dr. Sharma added post-consult plan', time: '10 Nov', icon: FileText, color: 'text-healthcare' },
                { title: 'Medicine Taken', desc: 'Iron + Folic Acid marked after lunch', time: 'Yesterday', icon: CheckCircle, color: 'text-success' },
                { title: 'Blood Test Scheduled', desc: 'CBC booked at Apollo Diagnostics', time: '12 Nov', icon: TestTube, color: 'text-teal' },
                { title: 'Caregiver Synced', desc: 'Priya Reddy authorized for reminders', time: '11 Nov', icon: User, color: 'text-navy' }
              ].map((act, i) => {
                const Icon = act.icon;
                return (
                  <div key={i} className="flex items-start gap-3 text-xs">
                    <div className={`p-1.5 rounded-lg bg-gray-100 ${act.color} mt-0.5`}>
                      <Icon size={14} />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-navy">{act.title}</p>
                      <p className="text-text-secondary text-[11px]">{act.desc}</p>
                    </div>
                    <span className="text-[10px] text-gray-400 whitespace-nowrap">{act.time}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <SkipMedicineModal
        isOpen={!!skipModalDoseId}
        onClose={() => setSkipModalDoseId(null)}
        medicineName={skipModalMedName}
        onConfirm={handleConfirmSkip}
      />

      <CheckInModal
        isOpen={isCheckInOpen}
        onClose={() => setIsCheckInOpen(false)}
      />

      <PrescriptionAiModal
        isOpen={!!selectedAiMed}
        onClose={() => setSelectedAiMed(null)}
        medicine={selectedAiMed}
      />

      {/* Global AI Assistant Floating Icon */}
      <AiAssistantModal />
    </div>
  );
}
