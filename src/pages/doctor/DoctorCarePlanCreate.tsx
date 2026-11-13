import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  ClipboardList, Plus, Trash2, CheckCircle2, ArrowRight,
  ShieldCheck, Calendar, Clock, TestTube, Pill, FileText,
  AlertCircle, Eye, Sparkles, X, Send
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { PATIENTS } from '@/data/mockData';
import type { PrescriptionMedicine } from '@/types';

interface CarePlanFormMedicine {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
}

export function DoctorCarePlanCreate() {
  const navigate = useNavigate();
  const { updateCarePlanStatus, addToast } = useApp();

  const [selectedPatientId, setSelectedPatientId] = useState('HT-2026-001');
  const [medicines, setMedicines] = useState<CarePlanFormMedicine[]>([
    {
      name: 'Vitamin D3 (Cholecalciferol)',
      dosage: '60,000 IU',
      frequency: 'Once weekly',
      duration: '8 weeks',
      instructions: 'Take after heavy lunch with water.'
    },
    {
      name: 'Ferrous Ascorbate + Folic Acid',
      dosage: '100mg / 1.5mg',
      frequency: 'Once daily (OD)',
      duration: '30 days',
      instructions: 'Take 2 hours after dinner. Avoid milk/tea.'
    }
  ]);

  const [tests, setTests] = useState<{ name: string; date: string; instructions: string }[]>([
    { name: 'Complete Blood Count (CBC)', date: '2026-11-15', instructions: 'Fasting 8-10 hours' },
    { name: 'Serum 25-OH Vitamin D', date: '2026-11-15', instructions: 'No special diet required' }
  ]);

  const [followUpDate, setFollowUpDate] = useState('2026-11-20');
  const [followUpTime, setFollowUpTime] = useState('10:30 AM');
  const [followUpReason, setFollowUpReason] = useState('Review repeat blood count and iron levels');
  const [patientInstructions, setPatientInstructions] = useState('Stay adequately hydrated. Incorporate leafy greens, lentils, and citrus fruits for natural iron absorption.');
  const [educationNotes, setEducationNotes] = useState('Iron supplements can temporarily darken stool. This is normal and benign. If mild gastric irritation occurs, take right after food.');

  const [planStatus, setPlanStatus] = useState<'draft' | 'pending_approval' | 'approved' | 'shared'>('draft');
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // Medicine form field handlers
  const handleAddMedicine = () => {
    setMedicines(prev => [
      ...prev,
      { name: '', dosage: '', frequency: 'Once daily', duration: '14 days', instructions: 'Take after food' }
    ]);
  };

  const handleRemoveMedicine = (index: number) => {
    setMedicines(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpdateMedicine = (index: number, field: keyof CarePlanFormMedicine, value: string) => {
    setMedicines(prev => prev.map((m, i) => i === index ? { ...m, [field]: value } : m));
  };

  // Lab test form handlers
  const handleAddTest = () => {
    setTests(prev => [...prev, { name: '', date: '2026-11-15', instructions: '' }]);
  };

  const handleRemoveTest = (index: number) => {
    setTests(prev => prev.filter((_, i) => i !== index));
  };

  const handleSaveDraft = () => {
    setPlanStatus('draft');
    updateCarePlanStatus('CAREPLAN-001', 'draft');
    addToast('Care plan draft saved locally', 'info');
  };

  const handleReview = () => {
    setPlanStatus('pending_approval');
    setIsPreviewOpen(true);
  };

  const handleApprove = () => {
    setPlanStatus('approved');
    updateCarePlanStatus('CAREPLAN-001', 'approved');
    addToast('Care plan clinically approved by Dr. Rahul Sharma', 'success');
  };

  const handleShareWithPatient = () => {
    setPlanStatus('shared');
    updateCarePlanStatus('CAREPLAN-001', 'shared');
    setIsPreviewOpen(false);
    addToast('Care plan approved & transmitted live to Ananya Reddy and Priya Reddy!', 'success');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-gray-100 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-navy/10 text-navy text-xs font-semibold mb-2">
            <ClipboardList size={14} />
            <span>Care Continuity Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy">
            Create Post-Consultation Care Plan
          </h1>
          <p className="text-sm text-text-secondary mt-1">
            Build structured medication schedules, diagnostic lab orders, and lifestyle notes.
          </p>
        </div>

        {/* Current status pill */}
        <div className="flex items-center gap-2 self-start md:self-center">
          <span className="text-xs text-text-secondary font-medium">Status:</span>
          <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
            planStatus === 'shared'
              ? 'bg-healthcare/10 text-healthcare border border-healthcare/20'
              : planStatus === 'approved'
              ? 'bg-success/10 text-success border border-success/20'
              : 'bg-warning/10 text-warning border border-warning/20'
          }`}>
            {planStatus.replace('_', ' ')}
          </span>
        </div>
      </div>

      {/* Target Patient Selector */}
      <div className="p-6 rounded-3xl bg-white border border-gray-100 shadow-xs space-y-3">
        <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wider">
          Target Patient for Care Plan
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {PATIENTS.slice(0, 2).map(p => (
            <div
              key={p.id}
              onClick={() => setSelectedPatientId(p.id)}
              className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                selectedPatientId === p.id
                  ? 'border-healthcare bg-healthcare/5 ring-2 ring-healthcare/20 shadow-xs'
                  : 'border-gray-200 hover:bg-gray-50'
              }`}
            >
              <div>
                <h4 className="font-bold text-navy text-sm">{p.name}</h4>
                <p className="text-xs text-text-secondary">{p.id} • {p.age} yrs • Blood Group {p.bloodGroup}</p>
              </div>
              {selectedPatientId === p.id && (
                <CheckCircle2 size={18} className="text-healthcare" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Section 1: Prescription Details */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-gray-100 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Pill size={18} className="text-teal" />
            <h3 className="font-bold text-navy text-base">1. Prescribed Medications</h3>
          </div>
          <button
            type="button"
            onClick={handleAddMedicine}
            className="px-3.5 py-1.5 rounded-xl bg-teal/10 hover:bg-teal hover:text-white text-teal-800 text-xs font-semibold flex items-center gap-1 transition-all"
          >
            <Plus size={14} />
            <span>Add Medicine</span>
          </button>
        </div>

        <div className="space-y-4">
          {medicines.map((med, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-gray-50/80 border border-gray-200/80 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-healthcare">Medicine #{idx + 1}</span>
                {medicines.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveMedicine(idx)}
                    className="p-1 rounded-lg text-error hover:bg-error/10 transition-colors"
                  >
                    <Trash2 size={15} />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                <div>
                  <label className="block text-text-secondary font-medium mb-1">Medicine Name</label>
                  <input
                    type="text"
                    value={med.name}
                    onChange={e => handleUpdateMedicine(idx, 'name', e.target.value)}
                    placeholder="E.g. Vitamin D3"
                    className="w-full p-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-healthcare/30 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-text-secondary font-medium mb-1">Dosage / Strength</label>
                  <input
                    type="text"
                    value={med.dosage}
                    onChange={e => handleUpdateMedicine(idx, 'dosage', e.target.value)}
                    placeholder="E.g. 60,000 IU"
                    className="w-full p-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-healthcare/30 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-text-secondary font-medium mb-1">Frequency</label>
                  <input
                    type="text"
                    value={med.frequency}
                    onChange={e => handleUpdateMedicine(idx, 'frequency', e.target.value)}
                    placeholder="E.g. Once weekly"
                    className="w-full p-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-healthcare/30 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-text-secondary font-medium mb-1">Duration</label>
                  <input
                    type="text"
                    value={med.duration}
                    onChange={e => handleUpdateMedicine(idx, 'duration', e.target.value)}
                    placeholder="E.g. 8 weeks"
                    className="w-full p-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-healthcare/30 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-text-secondary font-medium text-xs mb-1">Clinical Timing Instructions</label>
                <input
                  type="text"
                  value={med.instructions}
                  onChange={e => handleUpdateMedicine(idx, 'instructions', e.target.value)}
                  placeholder="E.g. Take orally after lunch with water."
                  className="w-full p-2.5 bg-white border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-healthcare/30 focus:outline-none"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 2: Diagnostic Lab Tests */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-gray-100 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TestTube size={18} className="text-amber-500" />
            <h3 className="font-bold text-navy text-base">2. Laboratory Investigations</h3>
          </div>
          <button
            type="button"
            onClick={handleAddTest}
            className="px-3.5 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500 hover:text-white text-amber-700 text-xs font-semibold flex items-center gap-1 transition-all"
          >
            <Plus size={14} />
            <span>Add Test Order</span>
          </button>
        </div>

        <div className="space-y-3">
          {tests.map((t, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-gray-50/80 border border-gray-200/80 flex flex-col sm:flex-row items-center gap-3">
              <input
                type="text"
                value={t.name}
                onChange={e => {
                  const val = e.target.value;
                  setTests(prev => prev.map((item, i) => i === idx ? { ...item, name: val } : item));
                }}
                placeholder="Test Name (e.g. Complete Blood Count)"
                className="flex-1 p-2.5 bg-white border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-healthcare/30 focus:outline-none"
              />
              <input
                type="date"
                value={t.date}
                onChange={e => {
                  const val = e.target.value;
                  setTests(prev => prev.map((item, i) => i === idx ? { ...item, date: val } : item));
                }}
                className="p-2.5 bg-white border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-healthcare/30 focus:outline-none"
              />
              <input
                type="text"
                value={t.instructions}
                onChange={e => {
                  const val = e.target.value;
                  setTests(prev => prev.map((item, i) => i === idx ? { ...item, instructions: val } : item));
                }}
                placeholder="Prep notes (e.g. Fasting 8 hrs)"
                className="flex-1 p-2.5 bg-white border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-healthcare/30 focus:outline-none"
              />
              {tests.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveTest(idx)}
                  className="p-2 rounded-xl text-error hover:bg-error/10"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Section 3: Follow-Up Appointment */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-gray-100 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <Calendar size={18} className="text-navy" />
          <h3 className="font-bold text-navy text-base">3. Follow-Up Consultation</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div>
            <label className="block text-text-secondary font-medium mb-1">Date</label>
            <input
              type="date"
              value={followUpDate}
              onChange={e => setFollowUpDate(e.target.value)}
              className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-healthcare/30 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-text-secondary font-medium mb-1">Time</label>
            <input
              type="text"
              value={followUpTime}
              onChange={e => setFollowUpTime(e.target.value)}
              className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-healthcare/30 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-text-secondary font-medium mb-1">Purpose / Reason</label>
            <input
              type="text"
              value={followUpReason}
              onChange={e => setFollowUpReason(e.target.value)}
              className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-healthcare/30 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Section 4: Additional Patient Instructions & Education Notes */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-gray-100 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <FileText size={18} className="text-healthcare" />
          <h3 className="font-bold text-navy text-base">4. Patient Instructions & Education</h3>
        </div>

        <div className="space-y-3 text-xs">
          <div>
            <label className="block text-text-secondary font-medium mb-1">General Lifestyle / Dietary Instructions</label>
            <textarea
              value={patientInstructions}
              onChange={e => setPatientInstructions(e.target.value)}
              rows={2}
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-healthcare/30 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-text-secondary font-medium mb-1">Special Education Note (Known side-effects, reassuring notes)</label>
            <textarea
              value={educationNotes}
              onChange={e => setEducationNotes(e.target.value)}
              rows={2}
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-healthcare/30 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Medical Safety Notice */}
      <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/70 text-xs text-amber-900 flex items-start gap-3">
        <ShieldCheck size={18} className="text-amber-700 mt-0.5 flex-shrink-0" />
        <div>
          <strong className="block mb-0.5">Clinical Protocol Rule:</strong>
          AI-generated clinical explanations will never appear doctor-approved to the patient until you explicitly review, approve, and share this care plan.
        </div>
      </div>

      {/* Action Buttons Toolbar */}
      <div className="p-4 rounded-3xl bg-white border border-gray-100 shadow-lg flex flex-wrap items-center justify-between gap-3 sticky bottom-4">
        <button
          type="button"
          onClick={handleSaveDraft}
          className="px-5 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-navy font-semibold text-xs transition-colors"
        >
          Save Draft
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleReview}
            className="px-5 py-2.5 rounded-xl bg-navy hover:bg-navy-800 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <Eye size={14} />
            <span>Review Care Plan</span>
          </button>
          <button
            type="button"
            onClick={handleApprove}
            className="px-5 py-2.5 rounded-xl bg-success hover:bg-success/90 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <CheckCircle2 size={14} />
            <span>Approve Plan</span>
          </button>
          <button
            type="button"
            onClick={handleShareWithPatient}
            className="px-6 py-2.5 rounded-xl bg-healthcare hover:bg-healthcare-600 text-white font-semibold text-xs transition-colors flex items-center gap-2 shadow-md shadow-healthcare/20"
          >
            <Send size={14} />
            <span>Share With Patient</span>
          </button>
        </div>
      </div>

      {/* Care Plan Review Modal */}
      <AnimatePresence>
        {isPreviewOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsPreviewOpen(false)}
              className="absolute inset-0 bg-navy-900/50 backdrop-blur-sm"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden z-10 max-h-[85vh] flex flex-col"
            >
              <div className="p-6 bg-navy text-white flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-white/20 text-teal-300">
                    Clinical Preview
                  </span>
                  <h3 className="text-lg font-bold mt-1">Post-Consultation Plan for Ananya Reddy</h3>
                </div>
                <button onClick={() => setIsPreviewOpen(false)} className="text-white hover:text-gray-300">
                  <X size={18} />
                </button>
              </div>

              <div className="p-6 overflow-y-auto space-y-4 text-xs">
                <div>
                  <h4 className="font-bold text-navy mb-2">Prescribed Medications:</h4>
                  <ul className="space-y-1.5">
                    {medicines.map((m, i) => (
                      <li key={i} className="p-2.5 bg-gray-50 rounded-xl border border-gray-200">
                        <strong>{m.name}</strong> ({m.dosage}) — {m.frequency} for {m.duration}. Instruction: {m.instructions}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-navy mb-2">Ordered Tests:</h4>
                  <ul className="space-y-1.5">
                    {tests.map((t, i) => (
                      <li key={i} className="p-2.5 bg-gray-50 rounded-xl border border-gray-200">
                        {t.name} on {t.date}. Notes: {t.instructions}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-navy mb-1">Follow-Up:</h4>
                  <p className="text-text-secondary">{followUpDate} at {followUpTime} ({followUpReason})</p>
                </div>

                <div>
                  <h4 className="font-bold text-navy mb-1">Lifestyle Guidance:</h4>
                  <p className="text-text-secondary">{patientInstructions}</p>
                </div>
              </div>

              <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                <button
                  onClick={() => setIsPreviewOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-text-secondary hover:bg-gray-200 rounded-xl"
                >
                  Edit Further
                </button>
                <button
                  onClick={handleShareWithPatient}
                  className="px-6 py-2.5 rounded-xl bg-healthcare hover:bg-healthcare-600 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md"
                >
                  <Send size={13} />
                  <span>Approve & Share Live with Patient</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
