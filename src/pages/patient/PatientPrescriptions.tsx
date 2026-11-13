import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Upload, FileText, Sparkles, CheckCircle2, Clock, Calendar,
  Stethoscope, AlertCircle, Eye, ArrowRight, Loader2, Download,
  Volume2
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { PRESCRIPTIONS } from '@/data/mockData';
import { PrescriptionAiModal } from '@/components/shared/PrescriptionAiModal';
import { AiAssistantModal } from '@/components/shared/AiAssistantModal';
import type { PrescriptionMedicine } from '@/types';

export function PatientPrescriptions() {
  const { currentLanguage, addToast } = useApp();
  const [selectedMed, setSelectedMed] = useState<PrescriptionMedicine | null>(null);

  // Upload simulation state
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isProcessingAi, setIsProcessingAi] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [activeRxId, setActiveRxId] = useState(PRESCRIPTIONS[0].id);

  const activeRx = PRESCRIPTIONS.find(p => p.id === activeRxId) || PRESCRIPTIONS[0];

  const handleSimulateUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadProgress(0);
    setUploadSuccess(false);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setIsProcessingAi(true);

          // Simulate AI Optical Extraction
          setTimeout(() => {
            setIsProcessingAi(false);
            setUploadSuccess(true);
            addToast('Prescription digitized and added to care plan (Simulated)', 'success');
          }, 2000);

          return 100;
        }
        return prev + 25;
      });
    }, 300);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Top Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-gray-100 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-healthcare/10 text-healthcare text-xs font-semibold mb-2">
            <FileText size={14} />
            <span>Verified Clinical Documents</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy">
            Prescriptions & Instructions
          </h1>
          <p className="text-sm text-text-secondary mt-1 max-w-xl">
            Review prescriptions issued by Dr. Rahul Sharma. Use Hitaayus AI to convert clinical shorthand into simple, understandable everyday instructions.
          </p>
        </div>

        {/* Upload Trigger Area */}
        <label className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-healthcare hover:bg-healthcare-600 text-white font-medium text-xs cursor-pointer shadow-md shadow-healthcare/20 transition-all self-start md:self-center">
          <Upload size={16} />
          <span>Upload New Prescription</span>
          <input
            type="file"
            accept="image/*,.pdf"
            onChange={handleSimulateUpload}
            className="hidden"
          />
        </label>
      </div>

      {/* Simulated Upload Animation / Processing Overlay */}
      <AnimatePresence>
        {(isUploading || isProcessingAi || uploadSuccess) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-6 rounded-3xl bg-gradient-to-r from-blue-50 to-teal-50 border border-healthcare/20 shadow-sm"
          >
            {isUploading && (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-navy font-semibold">
                  <span className="flex items-center gap-2">
                    <Loader2 size={16} className="animate-spin text-healthcare" />
                    Uploading prescription document...
                  </span>
                  <span>{uploadProgress}%</span>
                </div>
                <div className="w-full bg-white rounded-full h-2 overflow-hidden border border-gray-200">
                  <div
                    className="bg-healthcare h-full rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}

            {isProcessingAi && (
              <div className="flex items-center gap-3 py-2 text-xs text-teal-800">
                <Sparkles size={18} className="animate-pulse text-teal-600" />
                <div>
                  <p className="font-bold">Simulating Hitaayus AI Clinical Digitization...</p>
                  <p className="text-text-secondary text-[11px]">
                    Translating medical terms, timing intervals, and dosage schedules into your active profile.
                  </p>
                </div>
              </div>
            )}

            {uploadSuccess && (
              <div className="flex items-center justify-between text-xs text-success">
                <div className="flex items-center gap-2 font-semibold">
                  <CheckCircle2 size={18} />
                  <span>Prescription processed successfully (Demonstration Simulation). Added to active timeline.</span>
                </div>
                <button
                  onClick={() => setUploadSuccess(false)}
                  className="text-text-secondary hover:text-navy text-[11px]"
                >
                  Dismiss
                </button>
              </div>
            )}

            <p className="text-[10px] text-gray-500 mt-2 italic">
              Notice: Document OCR and extraction are simulated for prototype demonstration. No external server upload is executed.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Prescription Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {PRESCRIPTIONS.map(rx => (
          <button
            key={rx.id}
            onClick={() => setActiveRxId(rx.id)}
            className={`px-4 py-2.5 rounded-2xl text-xs font-medium transition-all whitespace-nowrap flex items-center gap-2 border ${
              activeRxId === rx.id
                ? 'bg-navy text-white border-navy shadow-sm'
                : 'bg-white text-text-secondary hover:bg-gray-50 border-gray-200'
            }`}
          >
            <FileText size={14} />
            <span>{rx.date} — {rx.doctorName}</span>
            <span className={`text-[10px] px-2 py-0.5 rounded-full ${
              activeRxId === rx.id ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600'
            }`}>
              {rx.status.toUpperCase()}
            </span>
          </button>
        ))}
      </div>

      {/* Main Prescription Detail View */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-gray-100 shadow-xs space-y-6">
        {/* Prescription Metadata */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-healthcare/10 text-healthcare flex items-center justify-center">
              <Stethoscope size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-navy text-base">{activeRx.doctorName}</h3>
                <span className="text-[11px] text-healthcare bg-healthcare/10 px-2 py-0.5 rounded-full font-medium">
                  General Medicine
                </span>
              </div>
              <p className="text-xs text-text-secondary mt-0.5">
                Consultation Date: <strong className="text-navy">{activeRx.date}</strong> • Hospital: Hitaayus Demo Hospital
              </p>
            </div>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-xs text-text-secondary block">Clinical Diagnosis</span>
            <span className="font-bold text-navy text-sm">{activeRx.diagnosis}</span>
          </div>
        </div>

        {/* Medicines List with "Understand My Prescription" Action */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-bold text-navy text-sm">Prescribed Medications ({activeRx.medicines.length})</h4>
            <span className="text-xs text-text-secondary">Click "Understand Instruction" for simple language</span>
          </div>

          <div className="space-y-4">
            {activeRx.medicines.map((med, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl border border-gray-200/80 hover:border-healthcare/30 bg-white transition-all shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-teal/10 text-teal-700 font-bold text-xs flex items-center justify-center">
                      {i + 1}
                    </span>
                    <h5 className="font-bold text-navy text-base">{med.name}</h5>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-gray-100 text-text-secondary">
                      {med.dosage}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-text-secondary pt-1">
                    <span>Frequency: <strong className="text-navy">{med.frequency}</strong></span>
                    <span>•</span>
                    <span>Duration: <strong className="text-navy">{med.duration}</strong></span>
                    <span>•</span>
                    <span>Timing: <strong className="text-navy">{med.instructions}</strong></span>
                  </div>

                  {/* Doctor's raw prescription instruction */}
                  <div className="mt-2 text-xs font-mono text-gray-600 bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-200/60 inline-block">
                    Rx: "{med.originalInstruction}"
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start md:self-center">
                  <button
                    onClick={() => setSelectedMed(med)}
                    className="px-4 py-2.5 rounded-xl bg-teal/10 hover:bg-teal text-teal-800 hover:text-white text-xs font-semibold flex items-center gap-2 transition-all border border-teal-200/60 shadow-xs"
                  >
                    <Sparkles size={15} />
                    <span>Understand Instruction</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Doctor Instructions */}
        <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200/80">
          <h5 className="text-xs font-bold text-navy uppercase tracking-wider mb-1">
            General Lifestyle & Diet Instructions
          </h5>
          <p className="text-xs text-text-secondary leading-relaxed">
            {activeRx.instructions}
          </p>
          <div className="mt-3 flex items-center gap-2 text-xs text-healthcare font-semibold">
            <Clock size={14} />
            <span>Recommended Follow-up: 20 November 2026 (In 10 days)</span>
          </div>
        </div>
      </div>

      {/* AI Explanation Modal */}
      <PrescriptionAiModal
        isOpen={!!selectedMed}
        onClose={() => setSelectedMed(null)}
        medicine={selectedMed}
      />

      {/* Global AI Assistant Floating Icon */}
      <AiAssistantModal />
    </div>
  );
}
