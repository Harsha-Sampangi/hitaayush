import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Users, Pill, TestTube, Calendar, Bell, Send, CheckCircle2,
  AlertCircle, Heart, ArrowRight, ShieldCheck, MessageSquare,
  HelpCircle, UserCheck, Clock, X
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { PATIENTS, DOCTORS, MEDICINES, LAB_TESTS, APPOINTMENTS } from '@/data/mockData';

export function CaregiverDashboard() {
  const navigate = useNavigate();
  const { medicineDoses, progressUpdates, addToast } = useApp();
  const patient = PATIENTS[0]; // Ananya Reddy
  const doctor = DOCTORS[0]; // Dr. Rahul Sharma
  const nextTest = LAB_TESTS[0];
  const nextAppt = APPOINTMENTS[0];

  const [clarificationModalOpen, setClarificationModalOpen] = useState(false);
  const [clarificationQuery, setClarificationQuery] = useState('');

  const handleSendReminder = (medName: string) => {
    addToast(`Push reminder sent to Ananya's phone for ${medName}!`, 'success');
  };

  const handleMarkAssisted = (medName: string) => {
    addToast(`Logged: Priya Reddy assisted Ananya with taking ${medName}.`, 'info');
  };

  const handleClarificationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clarificationQuery.trim()) return;
    addToast(`Caregiver query sent to Dr. Rahul Sharma: "${clarificationQuery}"`, 'success');
    setClarificationQuery('');
    setClarificationModalOpen(false);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Caregiver Welcome Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-teal-800 via-teal to-navy text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white text-xl font-bold shadow-inner">
              PR
            </div>
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/20 text-teal-200">
                Authorized Family Caregiver
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold mt-1">
                Good morning, Priya.
              </h2>
              <p className="text-sm text-teal-100 mt-0.5">
                Your loved one's care journey is easier to manage together. Supporting Ananya Reddy.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setClarificationModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs"
            >
              <HelpCircle size={15} />
              <span>Ask Doctor Clarification</span>
            </button>
            <button
              onClick={() => navigate('/caregiver/medicines')}
              className="px-4 py-2.5 rounded-xl bg-white text-navy hover:bg-gray-100 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-md"
            >
              <Pill size={15} />
              <span>Review Meds</span>
            </button>
          </div>
        </div>

        {/* Patient Status Summary Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-white/15 text-xs">
          <div>
            <span className="text-teal-100/80 block">Supervised Patient</span>
            <span className="font-semibold text-white">Ananya Reddy (Sister)</span>
          </div>
          <div>
            <span className="text-teal-100/80 block">Today's Dose Compliance</span>
            <span className="font-semibold text-white">
              {medicineDoses.filter(d => d.status === 'taken').length} of {medicineDoses.length} Taken
            </span>
          </div>
          <div>
            <span className="text-teal-100/80 block">Upcoming Blood Test</span>
            <span className="font-semibold text-white">CBC (15 Nov 2026)</span>
          </div>
          <div>
            <span className="text-teal-100/80 block">Supervising Physician</span>
            <span className="font-semibold text-white">{doctor.name}</span>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 cols): Patient Support & Pending Doses */}
        <div className="lg:col-span-2 space-y-6">
          {/* Active Medicines & Reminder Controls */}
          <div className="p-6 rounded-3xl bg-white border border-gray-100 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-teal/10 text-teal-600 flex items-center justify-center">
                  <Pill size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-navy text-base">Ananya's Scheduled Doses Today</h3>
                  <p className="text-xs text-text-secondary">Send timely alerts or log assisted administration</p>
                </div>
              </div>
              <button
                onClick={() => navigate('/caregiver/medicines')}
                className="text-xs font-semibold text-teal-700 hover:underline"
              >
                Full List →
              </button>
            </div>

            <div className="space-y-3">
              {medicineDoses.map(dose => (
                <div
                  key={dose.id}
                  className="p-4 rounded-2xl border border-gray-200/80 hover:border-teal/30 bg-white transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-teal/10 text-teal-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Clock size={16} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-sm text-navy">{dose.medicineName}</h4>
                        <span className="text-xs text-text-secondary">({dose.dosage})</span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-text-secondary mt-0.5">
                        <span>Time: {dose.time}</span>
                        <span>•</span>
                        <span className={`font-semibold ${
                          dose.status === 'taken' ? 'text-success' : 'text-warning'
                        }`}>
                          {dose.status === 'taken' ? '✓ Patient Took Dose' : 'Pending Intake'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    {dose.status === 'pending' ? (
                      <>
                        <button
                          onClick={() => handleSendReminder(dose.medicineName)}
                          className="px-3 py-1.5 rounded-xl bg-healthcare/10 hover:bg-healthcare text-healthcare hover:text-white text-xs font-medium flex items-center gap-1 transition-all"
                        >
                          <Send size={12} />
                          <span>Remind Ananya</span>
                        </button>
                        <button
                          onClick={() => handleMarkAssisted(dose.medicineName)}
                          className="px-3 py-1.5 rounded-xl bg-teal hover:bg-teal-600 text-white text-xs font-medium flex items-center gap-1 transition-colors shadow-xs"
                        >
                          <UserCheck size={12} />
                          <span>Mark Assisted</span>
                        </button>
                      </>
                    ) : (
                      <span className="text-xs font-semibold text-success bg-success/10 px-3 py-1 rounded-lg">
                        Completed
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Patient Progress Feed (What Ananya reported) */}
          <div className="p-6 rounded-3xl bg-white border border-gray-100 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-healthcare/10 text-healthcare flex items-center justify-center">
                  <MessageSquare size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-navy text-base">Ananya's Health Check-In Logs</h3>
                  <p className="text-xs text-text-secondary">Direct updates submitted by the patient</p>
                </div>
              </div>
              <span className="text-xs font-bold text-success bg-success/10 px-2.5 py-1 rounded-full">
                Synchronized
              </span>
            </div>

            <div className="space-y-3">
              {progressUpdates.map(up => (
                <div key={up.id} className="p-4 rounded-2xl bg-gray-50 border border-gray-200/70 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-navy flex items-center gap-1.5">
                      <Heart size={13} className="text-error" />
                      Status: {up.feeling.replace('_', ' ').toUpperCase()}
                    </span>
                    <span className="text-text-secondary">{up.date}</span>
                  </div>
                  <p className="text-xs text-navy font-medium bg-white p-3 rounded-xl border border-gray-200/60 leading-relaxed">
                    "{up.notes}"
                  </p>
                  <div className="flex items-center gap-4 text-[11px] text-text-secondary pt-1">
                    <span>Lab Test Done: {up.completedTest ? 'Yes' : 'Pending'}</span>
                    <span>•</span>
                    <span>Assistance Needed: {up.needHelp ? 'Yes (Alerted)' : 'No'}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (1 col): Upcoming Milestones & Permission Overview */}
        <div className="space-y-6">
          {/* Upcoming Lab Test Card */}
          <div className="p-6 rounded-3xl bg-white border border-gray-100 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
                  <TestTube size={16} />
                </div>
                <h3 className="font-bold text-navy text-sm">Pending Lab Test</h3>
              </div>
              <span className="text-xs text-amber-600 font-semibold bg-amber-50 px-2 py-0.5 rounded-full">
                15 Nov
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200/80">
              <h4 className="font-bold text-sm text-navy">{nextTest.name}</h4>
              <p className="text-xs text-text-secondary mt-0.5">Ordered by {nextTest.doctorName}</p>
              <p className="text-[11px] text-gray-500 mt-2">
                Instructions: Ananya needs to fast for 8-10 hours prior to sample collection.
              </p>
              <button
                onClick={() => addToast('Reminder sent to Ananya: Remember to fast from 10 PM on 14 Nov.', 'success')}
                className="mt-3 w-full py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500 hover:text-white text-amber-700 text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
              >
                <Send size={12} />
                <span>Send Fasting Reminder</span>
              </button>
            </div>
          </div>

          {/* Follow-Up Appointment */}
          <div className="p-6 rounded-3xl bg-white border border-gray-100 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-navy/10 text-navy flex items-center justify-center">
                  <Calendar size={16} />
                </div>
                <h3 className="font-bold text-navy text-sm">Doctor Follow-Up</h3>
              </div>
              <span className="text-xs text-navy font-semibold bg-navy/10 px-2 py-0.5 rounded-full">
                20 Nov
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200/80">
              <h4 className="font-bold text-sm text-navy">{nextAppt.doctorName}</h4>
              <p className="text-xs text-text-secondary">{nextAppt.doctorSpecialty}</p>
              <div className="mt-3 p-2 bg-white rounded-xl border border-gray-200 text-xs font-semibold text-navy flex items-center gap-2">
                <Clock size={14} className="text-healthcare" />
                <span>10:30 AM • Clinic OPD Room 204</span>
              </div>
              <p className="text-[11px] text-text-secondary mt-2">
                Please accompany Ananya if physical mobility assistance is needed.
              </p>
            </div>
          </div>

          {/* Security & Access Guard Banner */}
          <div className="p-5 rounded-3xl bg-teal-50/60 border border-teal-200/60">
            <div className="flex items-center gap-2 text-teal-800 font-bold text-xs mb-1.5">
              <ShieldCheck size={16} />
              <span>Caregiver Authority Standard</span>
            </div>
            <p className="text-xs text-teal-900 leading-relaxed">
              You are viewing Ananya’s profile with authorized consent. To adjust data visibility, visit <button onClick={() => navigate('/caregiver/settings')} className="underline font-semibold">Access Permissions</button>.
            </p>
          </div>
        </div>
      </div>

      {/* Ask Doctor Clarification Modal */}
      <AnimatePresence>
        {clarificationModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setClarificationModalOpen(false)}
              className="absolute inset-0 bg-navy-900/40 backdrop-blur-sm"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-gray-100 p-6 z-10"
            >
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <h3 className="font-bold text-navy text-base">Request Doctor Clarification</h3>
                <button onClick={() => setClarificationModalOpen(false)} className="p-1 rounded-lg hover:bg-gray-100">
                  <X size={18} className="text-text-secondary" />
                </button>
              </div>

              <form onSubmit={handleClarificationSubmit} className="mt-4 space-y-4">
                <p className="text-xs text-text-secondary leading-relaxed">
                  Have a question about Ananya's instructions, dietary restrictions, or medicine timing? This note will be sent directly to <strong>Dr. Rahul Sharma</strong>.
                </p>

                <div>
                  <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1">
                    Your Clarification Question
                  </label>
                  <textarea
                    value={clarificationQuery}
                    onChange={e => setClarificationQuery(e.target.value)}
                    rows={4}
                    placeholder="E.g., Ananya felt slight nausea after the Iron supplement. Can she take it after milk or fruit instead of water?"
                    className="w-full p-3 text-xs border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal/30 focus:outline-none"
                    required
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setClarificationModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs font-medium text-text-secondary hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl text-xs font-semibold bg-teal hover:bg-teal-600 text-white shadow-xs"
                  >
                    Send to Doctor
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
