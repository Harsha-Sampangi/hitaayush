import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TestTube, Upload, Sparkles, CheckCircle2, Clock, Calendar,
  AlertCircle, FileText, ChevronRight, Eye, ShieldAlert, Download, Loader2
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { LAB_TESTS } from '@/data/mockData';
import { ReportAiModal } from '@/components/shared/ReportAiModal';
import { AiAssistantModal } from '@/components/shared/AiAssistantModal';
import type { LabTest } from '@/types';

export function PatientTests() {
  const { addToast } = useApp();
  const [selectedReport, setSelectedReport] = useState<LabTest | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleSimulateReportUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadSuccess(false);

    setTimeout(() => {
      setIsUploading(false);
      setUploadSuccess(true);
      addToast('Lab report uploaded. Sent to Dr. Rahul Sharma for clinical review!', 'success');
    }, 2000);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Top Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-gray-100 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-healthcare/10 text-healthcare text-xs font-semibold mb-2">
            <TestTube size={14} />
            <span>Diagnostic Investigations</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy">
            Lab Tests & Medical Reports
          </h1>
          <p className="text-sm text-text-secondary mt-1 max-w-xl">
            Keep track of required laboratory investigations before your next consultation with Dr. Rahul Sharma on 20 November.
          </p>
        </div>

        {/* Upload Lab Report */}
        <label className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-healthcare hover:bg-healthcare-600 text-white font-medium text-xs cursor-pointer shadow-md shadow-healthcare/20 transition-all self-start md:self-center">
          <Upload size={16} />
          <span>Upload Lab Report (PDF/Scan)</span>
          <input
            type="file"
            accept="image/*,.pdf"
            onChange={handleSimulateReportUpload}
            className="hidden"
          />
        </label>
      </div>

      {/* Upload Progress Simulation */}
      <AnimatePresence>
        {(isUploading || uploadSuccess) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-5 rounded-2xl bg-blue-50/70 border border-healthcare/20"
          >
            {isUploading && (
              <div className="flex items-center gap-3 text-xs text-navy font-semibold">
                <Loader2 size={16} className="animate-spin text-healthcare" />
                <span>Synchronizing laboratory PDF with Dr. Sharma's review portal...</span>
              </div>
            )}
            {uploadSuccess && (
              <div className="flex items-center justify-between text-xs text-success font-medium">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} />
                  <span>Report uploaded successfully (Simulated). Status changed to "Doctor Review Pending".</span>
                </div>
                <button onClick={() => setUploadSuccess(false)} className="text-text-secondary hover:text-navy text-[11px]">
                  Dismiss
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Test List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {LAB_TESTS.map(test => {
          const isCompleted = test.status === 'completed';
          return (
            <div
              key={test.id}
              className="p-6 rounded-3xl bg-white border border-gray-100 shadow-xs flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                    isCompleted
                      ? 'bg-success/10 text-success'
                      : 'bg-healthcare/10 text-healthcare'
                  }`}>
                    {test.status.replace('_', ' ').toUpperCase()}
                  </span>
                  <span className="text-xs text-text-secondary flex items-center gap-1">
                    <Calendar size={13} />
                    {test.date}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-navy">{test.name}</h3>
                <p className="text-xs text-text-secondary mt-0.5">
                  Ordered by: <strong className="text-navy">{test.doctorName}</strong>
                </p>

                {/* Parameters Preview if completed */}
                {test.results && test.results.length > 0 && (
                  <div className="mt-4 p-3 rounded-2xl bg-gray-50 border border-gray-200/60 space-y-2">
                    <span className="text-[11px] font-semibold text-text-secondary block">
                      Observed Markers ({test.results.length})
                    </span>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {test.results.slice(0, 4).map((r, i) => (
                        <div key={i} className="flex items-center justify-between bg-white p-2 rounded-xl border border-gray-100">
                          <span className="text-text-secondary truncate pr-1">{r.parameter}</span>
                          <span className="font-bold text-navy whitespace-nowrap">{r.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs text-text-secondary">
                  {isCompleted ? 'Report Available' : 'Fasting: 8-10 Hours Required'}
                </span>

                {isCompleted ? (
                  <button
                    onClick={() => setSelectedReport(test)}
                    className="px-4 py-2 rounded-xl bg-teal/10 hover:bg-teal text-teal-800 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-all"
                  >
                    <Sparkles size={14} />
                    <span>Explain Report</span>
                  </button>
                ) : (
                  <span className="text-xs font-medium text-healthcare px-3 py-1.5 bg-healthcare/5 rounded-xl">
                    Scheduled for 15 Nov
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Safety Banner */}
      <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200 flex items-start gap-3 text-xs text-navy">
        <ShieldAlert size={18} className="text-healthcare mt-0.5 flex-shrink-0" />
        <div>
          <strong className="block mb-0.5">Important Healthcare Standard:</strong>
          All laboratory summaries generated by Hitaayus AI are designed for educational readability only. They do not classify conditions or issue diagnoses. Always review your official clinical report with Dr. Rahul Sharma at your follow-up appointment.
        </div>
      </div>

      {/* Report AI Explanation Modal */}
      <ReportAiModal
        isOpen={!!selectedReport}
        onClose={() => setSelectedReport(null)}
        test={selectedReport}
      />

      {/* Global AI Assistant Floating Icon */}
      <AiAssistantModal />
    </div>
  );
}
