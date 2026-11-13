import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, FileText, CheckCircle2, AlertTriangle, X, ShieldAlert, Activity } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import type { LabTest } from '@/types';

interface ReportAiModalProps {
  isOpen: boolean;
  onClose: () => void;
  test: LabTest | null;
}

export function ReportAiModal({ isOpen, onClose, test }: ReportAiModalProps) {
  const { currentLanguage, setLanguage } = useApp();

  if (!test) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-navy-900/50 backdrop-blur-md"
          />

          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden z-10 max-h-[90vh] flex flex-col"
          >
            {/* Header */}
            <div className="p-6 bg-gradient-to-r from-navy via-healthcare to-teal text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/20">
                  <Activity size={24} className="text-teal-300" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-white/20 text-teal-200">
                      Hitaayus Insight™
                    </span>
                    <span className="text-xs text-blue-100">Lab Report Breakdown</span>
                  </div>
                  <h3 className="text-xl font-bold mt-0.5">{test.name} Explanation</h3>
                </div>
              </div>
              <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white">
                <X size={16} />
              </button>
            </div>

            {/* Language bar */}
            <div className="px-6 py-2.5 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
              <span className="text-xs text-text-secondary font-medium">Explain In:</span>
              <div className="flex gap-1">
                {(['en', 'te', 'hi'] as const).map(lang => (
                  <button
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                      currentLanguage === lang ? 'bg-healthcare text-white' : 'text-text-secondary hover:text-navy bg-white border border-gray-200'
                    }`}
                  >
                    {lang === 'en' ? 'English' : lang === 'te' ? 'తెలుగు' : 'हिन्दी'}
                  </button>
                ))}
              </div>
            </div>

            {/* Report Parameter Table / Cards */}
            <div className="p-6 overflow-y-auto space-y-4">
              <div className="flex items-center justify-between text-xs text-text-secondary pb-2 border-b border-gray-100">
                <span>Date: <strong className="text-navy">{test.date}</strong></span>
                <span>Ordering Doctor: <strong className="text-navy">{test.doctorName}</strong></span>
              </div>

              {test.results && test.results.length > 0 ? (
                <div className="space-y-3">
                  {test.results.map((res, i) => {
                    const explanationText = res.explanation[currentLanguage] || res.explanation.en;
                    return (
                      <div key={i} className="bg-gray-50/80 rounded-2xl p-4 border border-gray-200/80">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <span className="text-sm font-bold text-navy">{res.parameter}</span>
                            <div className="flex items-center gap-2 mt-1 text-xs text-text-secondary">
                              <span>Observed Value: <strong className="text-navy">{res.value} {res.unit}</strong></span>
                              <span>• Ref: {res.referenceRange} {res.unit}</span>
                            </div>
                          </div>
                          <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                            res.status === 'normal'
                              ? 'bg-success/10 text-success border border-success/20'
                              : res.status === 'low'
                              ? 'bg-warning/10 text-warning border border-warning/20'
                              : 'bg-error/10 text-error border border-error/20'
                          }`}>
                            {res.status.toUpperCase()}
                          </span>
                        </div>

                        <div className="mt-3 pt-3 border-t border-gray-200/60 flex items-start gap-2">
                          <Sparkles size={14} className="text-teal-600 mt-0.5 flex-shrink-0" />
                          <p className="text-xs text-navy-800 leading-relaxed font-medium">
                            {explanationText}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-6 text-sm text-text-secondary">
                  Sample results are processing or waiting for laboratory synchronization.
                </div>
              )}

              {/* Doctor Review & Non-diagnosis Notice */}
              <div className="bg-blue-50/60 rounded-2xl p-4 border border-blue-200 flex items-start gap-3">
                <ShieldAlert size={18} className="text-healthcare mt-0.5 flex-shrink-0" />
                <div className="text-xs text-navy leading-relaxed">
                  <span className="font-semibold block mb-0.5">Clinical Review Notice:</span>
                  This summary is generated for patient educational comprehension only. Hitaayus does not diagnose health conditions from raw test metrics. Please discuss these laboratory findings with <strong>Dr. Rahul Sharma</strong> at your follow-up consultation on 20 November 2026.
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end">
              <button
                onClick={onClose}
                className="px-5 py-2 rounded-xl bg-healthcare hover:bg-healthcare-600 text-white text-xs font-medium transition-colors"
              >
                Close Explanation
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
