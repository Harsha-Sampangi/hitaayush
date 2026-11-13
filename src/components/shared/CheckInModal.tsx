import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HeartPulse, Smile, Meh, Frown, AlertCircle, X, Send, CheckCircle2 } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import type { ProgressUpdate } from '@/types';

interface CheckInModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CheckInModal({ isOpen, onClose }: CheckInModalProps) {
  const { addProgressUpdate, addToast } = useApp();
  const [feeling, setFeeling] = useState<ProgressUpdate['feeling']>('better');
  const [completedTest, setCompletedTest] = useState(false);
  const [difficulty, setDifficulty] = useState(false);
  const [needHelp, setNeedHelp] = useState(false);
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newUpdate: ProgressUpdate = {
      id: `UPDATE-${Date.now()}`,
      patientId: 'HT-2026-001',
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
      feeling,
      completedTest,
      difficulty,
      needHelp,
      notes: notes.trim() || 'Patient reported routine progress after breakfast.',
      reviewedByDoctor: false,
    };

    addProgressUpdate(newUpdate);
    addToast('Progress update shared with Dr. Rahul Sharma & Priya Reddy', 'success');
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
          className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden z-10"
        >
          {/* Header */}
          <div className="p-6 bg-gradient-to-r from-navy to-healthcare text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/20">
                <HeartPulse size={20} className="text-teal-300" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Post-Consultation Check-In</h3>
                <p className="text-xs text-blue-100">Keep Dr. Rahul Sharma informed between visits</p>
              </div>
            </div>
            <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white">
              <X size={16} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
            {/* Question 1: How are you feeling today? */}
            <div>
              <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2">
                1. How are you feeling today?
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { key: 'better', label: 'Feeling Better', icon: Smile, color: 'text-success border-success/30 bg-success/5' },
                  { key: 'no_change', label: 'No Change', icon: Meh, color: 'text-warning border-warning/30 bg-warning/5' },
                  { key: 'worse', label: 'Feeling Worse', icon: Frown, color: 'text-error border-error/30 bg-error/5' },
                  { key: 'need_help', label: 'Need Help', icon: AlertCircle, color: 'text-error border-error/30 bg-error/5' }
                ].map(item => {
                  const Icon = item.icon;
                  const isSelected = feeling === item.key;
                  return (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => setFeeling(item.key as ProgressUpdate['feeling'])}
                      className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-center transition-all ${
                        isSelected
                          ? `${item.color} ring-2 ring-healthcare/40 font-semibold shadow-xs`
                          : 'border-gray-200 text-text-secondary hover:bg-gray-50'
                      }`}
                    >
                      <Icon size={24} className="mb-1" />
                      <span className="text-xs">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Question 2: Scheduled test completed? */}
            <div className="space-y-3">
              <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wider">
                2. Quick Care Plan Updates
              </label>

              <label className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 hover:bg-gray-50 cursor-pointer text-xs">
                <input
                  type="checkbox"
                  checked={completedTest}
                  onChange={e => setCompletedTest(e.target.checked)}
                  className="rounded text-healthcare focus:ring-healthcare h-4 w-4"
                />
                <span className="text-navy font-medium">I have given samples for my scheduled blood tests (CBC / Vitamin D).</span>
              </label>

              <label className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 hover:bg-gray-50 cursor-pointer text-xs">
                <input
                  type="checkbox"
                  checked={difficulty}
                  onChange={e => setDifficulty(e.target.checked)}
                  className="rounded text-healthcare focus:ring-healthcare h-4 w-4"
                />
                <span className="text-navy font-medium">I am having mild difficulty following the medicine schedule.</span>
              </label>

              <label className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 hover:bg-gray-50 cursor-pointer text-xs">
                <input
                  type="checkbox"
                  checked={needHelp}
                  onChange={e => setNeedHelp(e.target.checked)}
                  className="rounded text-healthcare focus:ring-healthcare h-4 w-4"
                />
                <span className="text-navy font-medium">I would like my caregiver (Priya) to assist with reminder setup.</span>
              </label>
            </div>

            {/* Question 3: Patient notes */}
            <div>
              <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1.5">
                3. Additional Note for Doctor & Caregiver (Optional)
              </label>
              <textarea
                value={notes}
                onChange={e => setNotes(e.target.value)}
                placeholder="E.g., Took Iron tablet after breakfast today with orange juice. Energy feels slightly improved."
                rows={3}
                className="w-full p-3 text-xs border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-healthcare/30"
              />
            </div>

            {/* Safety banner */}
            <div className="bg-healthcare/5 border border-healthcare/20 rounded-xl p-3 flex items-start gap-2.5 text-[11px] text-text-secondary">
              <CheckCircle2 size={16} className="text-healthcare mt-0.5 flex-shrink-0" />
              <span>
                Your progress log is synchronized with Dr. Rahul Sharma's clinic portal and shared with authorized family caregiver Priya Reddy.
              </span>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl text-xs font-medium text-text-secondary hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-medium bg-healthcare hover:bg-healthcare-600 text-white shadow-md shadow-healthcare/20 transition-all"
              >
                <Send size={14} />
                <span>Share Update</span>
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
