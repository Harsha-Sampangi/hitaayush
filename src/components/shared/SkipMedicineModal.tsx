import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X, Check } from 'lucide-react';

interface SkipMedicineModalProps {
  isOpen: boolean;
  onClose: () => void;
  medicineName: string;
  onConfirm: (reason: string) => void;
}

const COMMON_REASONS = [
  'Experienced stomach discomfort',
  'Medicine was out of stock',
  'Forgot dose time',
  'Fasting or unable to eat food',
  'Doctor advised temporary pause',
  'Other personal reason'
];

export function SkipMedicineModal({ isOpen, onClose, medicineName, onConfirm }: SkipMedicineModalProps) {
  const [selectedReason, setSelectedReason] = useState(COMMON_REASONS[0]);
  const [customNote, setCustomNote] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalReason = selectedReason === 'Other personal reason' && customNote.trim()
      ? customNote.trim()
      : selectedReason;
    onConfirm(finalReason);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-navy-900/40 backdrop-blur-sm"
        />

        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 15 }}
          className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-gray-100 p-6 z-10"
        >
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div className="flex items-center gap-2.5 text-warning">
              <AlertTriangle size={20} />
              <h3 className="font-semibold text-navy text-base">Record Skipped Dose</h3>
            </div>
            <button onClick={onClose} className="p-1 rounded-lg hover:bg-gray-100 text-text-secondary">
              <X size={18} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <p className="text-sm text-text-secondary">
              Skipping scheduled dose of <strong className="text-navy">{medicineName}</strong>. Please select a reason for your clinical continuity record:
            </p>

            <div className="space-y-2">
              {COMMON_REASONS.map(r => (
                <label
                  key={r}
                  className={`flex items-center gap-3 p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                    selectedReason === r
                      ? 'border-healthcare bg-healthcare/5 text-healthcare font-medium'
                      : 'border-gray-200 text-text-secondary hover:bg-gray-50'
                  }`}
                >
                  <input
                    type="radio"
                    name="skipReason"
                    value={r}
                    checked={selectedReason === r}
                    onChange={() => setSelectedReason(r)}
                    className="text-healthcare focus:ring-healthcare"
                  />
                  <span>{r}</span>
                </label>
              ))}
            </div>

            {selectedReason === 'Other personal reason' && (
              <textarea
                value={customNote}
                onChange={e => setCustomNote(e.target.value)}
                placeholder="Provide a brief note for your doctor..."
                rows={2}
                className="w-full p-3 text-xs border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-healthcare/30"
              />
            )}

            <div className="bg-gray-50 rounded-xl p-3 text-[11px] text-text-secondary border border-gray-100">
              Disclaimer: Skipping prescribed doses repeatedly can affect recovery. If you feel unwell, message Dr. Rahul Sharma or visit the clinic.
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-medium text-text-secondary hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl text-xs font-medium bg-warning hover:bg-warning/90 text-white shadow-sm transition-colors"
              >
                Confirm Skip
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
