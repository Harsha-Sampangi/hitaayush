import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Pill, Clock, Check, AlertCircle, Calendar, Sparkles,
  ShieldAlert, ChevronRight, RotateCcw, Info
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { MEDICINES } from '@/data/mockData';
import { SkipMedicineModal } from '@/components/shared/SkipMedicineModal';
import { PrescriptionAiModal } from '@/components/shared/PrescriptionAiModal';
import { AiAssistantModal } from '@/components/shared/AiAssistantModal';
import type { PrescriptionMedicine } from '@/types';

export function PatientMedicines() {
  const { medicineDoses, markMedicineTaken, markMedicineSkipped, addToast } = useApp();
  const [activeTab, setActiveTab] = useState<'today' | 'active' | 'completed'>('today');
  const [skipModalDoseId, setSkipModalDoseId] = useState<string | null>(null);
  const [skipModalMedName, setSkipModalMedName] = useState<string>('');
  const [selectedAiMed, setSelectedAiMed] = useState<PrescriptionMedicine | null>(null);

  const activeMedicines = MEDICINES.filter(m => m.status === 'active');
  const completedMedicines = MEDICINES.filter(m => m.status === 'completed');

  const handleTakeDose = (doseId: string, medName: string) => {
    markMedicineTaken(doseId);
    addToast(`Logged ${medName} as taken!`, 'success');
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
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-gray-100 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal/10 text-teal-700 text-xs font-semibold mb-2">
            <Pill size={14} />
            <span>Prescription Regimen</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy">
            Medicine Management
          </h1>
          <p className="text-sm text-text-secondary mt-1">
            Track daily dosages, log taken medicines, and manage reminders set by Dr. Rahul Sharma.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex items-center gap-1 bg-gray-100 p-1.5 rounded-2xl self-start sm:self-center">
          <button
            onClick={() => setActiveTab('today')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'today' ? 'bg-white text-navy shadow-xs' : 'text-text-secondary hover:text-navy'
            }`}
          >
            Today's Schedule
          </button>
          <button
            onClick={() => setActiveTab('active')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'active' ? 'bg-white text-navy shadow-xs' : 'text-text-secondary hover:text-navy'
            }`}
          >
            Active Courses ({activeMedicines.length})
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'completed' ? 'bg-white text-navy shadow-xs' : 'text-text-secondary hover:text-navy'
            }`}
          >
            Past / Completed
          </button>
        </div>
      </div>

      {/* Tab 1: Today's Schedule */}
      {activeTab === 'today' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {medicineDoses.map(dose => (
              <div
                key={dose.id}
                className={`p-6 rounded-3xl border transition-all flex flex-col justify-between ${
                  dose.status === 'taken'
                    ? 'bg-success/5 border-success/30'
                    : dose.status === 'skipped'
                    ? 'bg-gray-50 border-gray-200 opacity-60'
                    : 'bg-white border-gray-200/80 shadow-xs hover:border-healthcare/30'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-healthcare bg-healthcare/10 px-3 py-1 rounded-full flex items-center gap-1.5">
                      <Clock size={13} />
                      {dose.time}
                    </span>
                    <span className={`text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      dose.status === 'taken'
                        ? 'bg-success/15 text-success'
                        : dose.status === 'skipped'
                        ? 'bg-error/15 text-error'
                        : 'bg-warning/15 text-warning'
                    }`}>
                      {dose.status}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-navy">{dose.medicineName}</h3>
                  <p className="text-xs text-text-secondary mt-1">Dosage: <strong className="text-navy">{dose.dosage}</strong></p>
                  
                  {dose.status === 'taken' && (
                    <p className="text-xs text-success font-medium mt-3 flex items-center gap-1">
                      <Check size={14} />
                      <span>Taken at {dose.takenAt || dose.time}</span>
                    </p>
                  )}

                  {dose.status === 'skipped' && (
                    <p className="text-xs text-error font-medium mt-3 flex items-center gap-1">
                      <AlertCircle size={14} />
                      <span>Skipped: {dose.skipReason}</span>
                    </p>
                  )}
                </div>

                {dose.status === 'pending' && (
                  <div className="flex items-center gap-2 mt-6 pt-4 border-t border-gray-100">
                    <button
                      onClick={() => handleTakeDose(dose.id, dose.medicineName)}
                      className="flex-1 py-2 rounded-xl bg-healthcare hover:bg-healthcare-600 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                    >
                      <Check size={14} />
                      <span>Mark Taken</span>
                    </button>
                    <button
                      onClick={() => handleOpenSkipModal(dose.id, dose.medicineName)}
                      className="px-3.5 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-text-secondary text-xs font-medium transition-colors"
                    >
                      Skip
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Active Medicines List */}
      {activeTab === 'active' && (
        <div className="space-y-4">
          {activeMedicines.map(med => (
            <div
              key={med.id}
              className="p-6 rounded-3xl bg-white border border-gray-100 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-teal/10 text-teal-600 flex items-center justify-center font-bold">
                    <Pill size={20} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-navy">{med.name}</h3>
                    <p className="text-xs text-text-secondary">
                      Dosage: <strong className="text-navy">{med.dosage}</strong> • Frequency: <strong className="text-navy">{med.frequency}</strong>
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-text-secondary pt-2">
                  <div>
                    <span className="block text-gray-400">Start Date</span>
                    <span className="font-semibold text-navy">{med.startDate}</span>
                  </div>
                  <div>
                    <span className="block text-gray-400">End Date</span>
                    <span className="font-semibold text-navy">{med.endDate}</span>
                  </div>
                  <div>
                    <span className="block text-gray-400">Prescribing Doctor</span>
                    <span className="font-semibold text-navy">{med.prescribedBy}</span>
                  </div>
                </div>

                <div className="bg-gray-50 p-3 rounded-xl border border-gray-200/60 text-xs text-navy font-medium">
                  Doctor's Note: "{med.instructions}"
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-2">
                <button
                  onClick={() => {
                    // Create mock prescription medicine format for AI modal
                    setSelectedAiMed({
                      name: med.name,
                      dosage: med.dosage,
                      frequency: med.frequency,
                      duration: `${med.startDate} to ${med.endDate}`,
                      instructions: med.instructions,
                      originalInstruction: `${med.dosage} ${med.frequency} ${med.instructions}`,
                      simpleExplanation: {
                        en: `Take ${med.name} ${med.instructions} exactly as prescribed by Dr. Sharma.`,
                        te: `${med.name}ను డాక్టర్ శర్మ సూచించిన విధంగా ఖచ్చితంగా తీసుకోండి.`,
                        hi: `${med.name} को डॉक्टर शर्मा के निर्देशानुसार समय पर लें।`
                      }
                    });
                  }}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-teal/10 hover:bg-teal text-teal-800 hover:text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
                >
                  <Sparkles size={14} />
                  <span>Explain with AI</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Completed Medicines */}
      {activeTab === 'completed' && (
        <div className="space-y-4">
          {completedMedicines.length > 0 ? (
            completedMedicines.map(med => (
              <div key={med.id} className="p-6 rounded-3xl bg-white border border-gray-100 shadow-xs opacity-75">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-navy">{med.name}</h3>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-gray-100 text-text-secondary">
                    Completed Course
                  </span>
                </div>
                <p className="text-xs text-text-secondary mt-1">Course ended on {med.endDate}</p>
              </div>
            ))
          ) : (
            <div className="p-8 rounded-3xl bg-white border border-gray-100 text-center text-text-secondary text-sm">
              No completed courses yet. All current prescriptions are active for post-consultation recovery.
            </div>
          )}
        </div>
      )}

      {/* Medical Safety Disclaimer */}
      <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/70 flex items-start gap-3 text-xs text-amber-900">
        <ShieldAlert size={18} className="text-amber-700 mt-0.5 flex-shrink-0" />
        <div>
          <strong className="block mb-0.5">Clinical Disclaimer:</strong>
          Medication schedules are strictly based on Dr. Rahul Sharma’s recorded instructions. Never modify dosages or stop taking prescribed antibiotics/supplements without consulting your doctor or pharmacist.
        </div>
      </div>

      {/* Modals */}
      <SkipMedicineModal
        isOpen={!!skipModalDoseId}
        onClose={() => setSkipModalDoseId(null)}
        medicineName={skipModalMedName}
        onConfirm={handleConfirmSkip}
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
