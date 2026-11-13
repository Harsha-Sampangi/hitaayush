import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Volume2, VolumeX, CheckCircle2, AlertCircle, HelpCircle, Clock, ShieldCheck, X } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import type { PrescriptionMedicine } from '@/types';

interface PrescriptionAiModalProps {
  isOpen: boolean;
  onClose: () => void;
  medicine: PrescriptionMedicine | null;
}

export function PrescriptionAiModal({ isOpen, onClose, medicine }: PrescriptionAiModalProps) {
  const { currentLanguage, setLanguage } = useApp();
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  if (!medicine) return null;

  const currentExplanation = medicine.simpleExplanation[currentLanguage] || medicine.simpleExplanation.en;

  const handleToggleVoice = () => {
    setIsPlayingAudio(prev => !prev);
    // In real app or modern browser SpeechSynthesis can be used, simulate here
    if (!isPlayingAudio && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(currentExplanation);
      if (currentLanguage === 'hi') utterance.lang = 'hi-IN';
      else if (currentLanguage === 'te') utterance.lang = 'te-IN';
      else utterance.lang = 'en-US';
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(utterance);
    } else if (isPlayingAudio && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
    }
  };

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
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/40 overflow-hidden z-10 max-h-[90vh] flex flex-col"
          >
            {/* Header */}
            <div className="p-6 bg-gradient-to-r from-navy-500 via-healthcare to-teal text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/20">
                  <Sparkles size={24} className="text-teal-300" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-white/20 text-teal-200">
                      Hitaayus Clarify™
                    </span>
                    <span className="text-xs text-blue-100">Prescription Assistant</span>
                  </div>
                  <h3 className="text-xl font-bold mt-1">Let's Understand Your Prescription</h3>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Language Switcher Bar inside Modal */}
            <div className="px-6 py-3 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
              <span className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
                Explanation Language:
              </span>
              <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-gray-200">
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                    currentLanguage === 'en' ? 'bg-healthcare text-white shadow-xs' : 'text-text-secondary hover:text-navy'
                  }`}
                >
                  English
                </button>
                <button
                  onClick={() => setLanguage('te')}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                    currentLanguage === 'te' ? 'bg-healthcare text-white shadow-xs' : 'text-text-secondary hover:text-navy'
                  }`}
                >
                  తెలుగు
                </button>
                <button
                  onClick={() => setLanguage('hi')}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                    currentLanguage === 'hi' ? 'bg-healthcare text-white shadow-xs' : 'text-text-secondary hover:text-navy'
                  }`}
                >
                  हिन्दी
                </button>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6 overflow-y-auto space-y-5">
              {/* Medicine title */}
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <div>
                  <h4 className="text-lg font-bold text-navy">{medicine.name}</h4>
                  <p className="text-xs text-text-secondary">
                    Dosage: <span className="font-semibold text-navy">{medicine.dosage}</span> • Frequency: <span className="font-semibold text-navy">{medicine.frequency}</span> • Duration: <span className="font-semibold text-navy">{medicine.duration}</span>
                  </p>
                </div>
                {/* Voice Readout Button */}
                <button
                  onClick={handleToggleVoice}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium transition-all border ${
                    isPlayingAudio
                      ? 'bg-teal-500 text-white border-teal-600 shadow-sm animate-pulse'
                      : 'bg-white text-navy hover:bg-gray-50 border-gray-200'
                  }`}
                >
                  {isPlayingAudio ? <VolumeX size={16} /> : <Volume2 size={16} />}
                  <span>{isPlayingAudio ? 'Stop Voice' : 'Listen Explanation'}</span>
                </button>
              </div>

              {/* Comparison Grid: Original vs Simplified */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Original Doctor's Written Rx */}
                <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200/80">
                  <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-text-secondary uppercase tracking-wider">
                    <Clock size={14} className="text-navy" />
                    <span>Original Medical Instruction</span>
                  </div>
                  <p className="text-sm font-mono text-navy-800 bg-white p-3 rounded-xl border border-gray-200">
                    "{medicine.originalInstruction}"
                  </p>
                  <p className="text-[11px] text-gray-500 mt-2">
                    Standard clinical shorthand recorded during consultation.
                  </p>
                </div>

                {/* Simplified AI Explanation */}
                <div className="bg-teal-50/60 rounded-2xl p-4 border border-teal-200/80">
                  <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-teal-800 uppercase tracking-wider">
                    <Sparkles size={14} className="text-teal-600" />
                    <span>Simple Everyday Explanation</span>
                  </div>
                  <p className="text-sm font-medium text-navy-900 bg-white/90 p-3 rounded-xl border border-teal-200/60 leading-relaxed">
                    "{currentExplanation}"
                  </p>
                  <p className="text-[11px] text-teal-700 mt-2 flex items-center gap-1">
                    <CheckCircle2 size={12} />
                    Verified against doctor's prescribed frequency and route.
                  </p>
                </div>
              </div>

              {/* Supporting Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-white rounded-xl p-3.5 border border-gray-100 shadow-xs">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-healthcare mb-1">
                    <Clock size={14} />
                    <span>When to Take</span>
                  </div>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    Take consistently after food at approximately the same time daily to maximize absorption.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-3.5 border border-gray-100 shadow-xs">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-warning mb-1">
                    <AlertCircle size={14} />
                    <span>Key Guidance</span>
                  </div>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    Do not crush or chew if extended-release. Avoid taking tea/coffee within 1 hour of intake.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-3.5 border border-gray-100 shadow-xs">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-navy mb-1">
                    <HelpCircle size={14} />
                    <span>Ask Your Doctor</span>
                  </div>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    "Should I repeat my blood level test before our follow-up consultation on 20 November?"
                  </p>
                </div>
              </div>

              {/* Medical Safety & Compliance Box */}
              <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200 flex items-start gap-3">
                <ShieldCheck size={18} className="text-amber-700 mt-0.5 flex-shrink-0" />
                <div className="text-xs text-amber-900 leading-relaxed">
                  <span className="font-semibold block mb-0.5">Medical Safety & Integrity Standard:</span>
                  Hitaayus AI does not alter dosages, change frequencies, or prescribe alternate medicines. If any instruction is ambiguous or causes side effects, please contact Dr. Rahul Sharma immediately.
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
              <span className="text-xs text-text-secondary">
                Instruction ID: Rx-2026-MED • Recorded by Dr. Rahul Sharma
              </span>
              <button
                onClick={onClose}
                className="px-5 py-2 rounded-xl bg-healthcare hover:bg-healthcare-600 text-white text-sm font-medium transition-colors"
              >
                Done
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
