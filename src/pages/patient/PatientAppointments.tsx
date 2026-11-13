import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar, Clock, Stethoscope, MapPin, CheckCircle,
  AlertCircle, ChevronRight, X, Phone, User
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { APPOINTMENTS, DOCTORS } from '@/data/mockData';
import { AiAssistantModal } from '@/components/shared/AiAssistantModal';
import type { Appointment } from '@/types';

export function PatientAppointments() {
  const { addToast } = useApp();
  const [appointments, setAppointments] = useState<Appointment[]>(APPOINTMENTS);
  const [rescheduleModalAppt, setRescheduleModalAppt] = useState<Appointment | null>(null);
  const [newDate, setNewDate] = useState('2026-11-22');
  const [newTime, setNewTime] = useState('11:00 AM');
  const [rescheduleReason, setRescheduleReason] = useState('Conflict with office schedule');

  const handleRescheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rescheduleModalAppt) return;

    setAppointments(prev => prev.map(a => {
      if (a.id === rescheduleModalAppt.id) {
        return {
          ...a,
          date: newDate,
          time: newTime,
          status: 'rescheduled' as const
        };
      }
      return a;
    }));

    addToast(`Reschedule request sent to Dr. Sharma's clinic for ${newDate} at ${newTime}`, 'success');
    setRescheduleModalAppt(null);
  };

  const handleMarkComplete = (id: string) => {
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status: 'completed' as const } : a));
    addToast('Marked appointment as completed!', 'success');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Top Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-gray-100 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-navy/10 text-navy text-xs font-semibold mb-2">
            <Calendar size={14} />
            <span>Consultation Schedule</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy">
            Appointments & Follow-Ups
          </h1>
          <p className="text-sm text-text-secondary mt-1">
            Care continuity relies on timely post-consultation reviews. Never miss a scheduled follow-up.
          </p>
        </div>
      </div>

      {/* Appointments List */}
      <div className="space-y-4">
        {appointments.map(appt => {
          const isUpcoming = appt.status === 'upcoming' || appt.status === 'rescheduled';
          return (
            <div
              key={appt.id}
              className={`p-6 rounded-3xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 ${
                isUpcoming
                  ? 'bg-white border-gray-200/80 shadow-xs hover:border-healthcare/30'
                  : 'bg-gray-50/70 border-gray-200/60 opacity-80'
              }`}
            >
              <div className="space-y-3 flex-1">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold ${
                    isUpcoming ? 'bg-healthcare text-white shadow-md shadow-healthcare/20' : 'bg-gray-200 text-gray-500'
                  }`}>
                    <Stethoscope size={22} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-navy">{appt.doctorName}</h3>
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                        appt.status === 'completed'
                          ? 'bg-success/10 text-success'
                          : appt.status === 'rescheduled'
                          ? 'bg-warning/10 text-warning'
                          : 'bg-healthcare/10 text-healthcare'
                      }`}>
                        {appt.status}
                      </span>
                    </div>
                    <p className="text-xs text-text-secondary">{appt.doctorSpecialty} • Hitaayus Demo Hospital</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-gray-50/80 p-3.5 rounded-2xl border border-gray-200/60">
                  <div className="flex items-center gap-2 text-navy font-semibold">
                    <Calendar size={14} className="text-healthcare" />
                    <span>{appt.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-navy font-semibold">
                    <Clock size={14} className="text-healthcare" />
                    <span>{appt.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-text-secondary">
                    <MapPin size={14} className="text-teal" />
                    <span>OPD Suite 204</span>
                  </div>
                </div>

                <p className="text-xs text-text-secondary">
                  <strong>Reason for Visit:</strong> {appt.reason}
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-center gap-2 self-start md:self-center">
                {isUpcoming && (
                  <>
                    <button
                      onClick={() => setRescheduleModalAppt(appt)}
                      className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-navy text-xs font-semibold transition-colors"
                    >
                      Request Reschedule
                    </button>
                    <button
                      onClick={() => handleMarkComplete(appt.id)}
                      className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-healthcare hover:bg-healthcare-600 text-white text-xs font-semibold transition-colors shadow-xs"
                    >
                      Mark Completed
                    </button>
                  </>
                )}
                {appt.status === 'completed' && (
                  <span className="text-xs font-medium text-success px-4 py-2 bg-success/10 rounded-xl flex items-center gap-1.5">
                    <CheckCircle size={15} />
                    <span>Consultation Concluded</span>
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Reschedule Confirmation Modal */}
      <AnimatePresence>
        {rescheduleModalAppt && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setRescheduleModalAppt(null)}
              className="absolute inset-0 bg-navy-900/40 backdrop-blur-sm"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-gray-100 p-6 z-10"
            >
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <h3 className="font-bold text-navy text-base">Request Appointment Reschedule</h3>
                <button onClick={() => setRescheduleModalAppt(null)} className="p-1 rounded-lg hover:bg-gray-100">
                  <X size={18} className="text-text-secondary" />
                </button>
              </div>

              <form onSubmit={handleRescheduleSubmit} className="mt-4 space-y-4">
                <p className="text-xs text-text-secondary">
                  Current: <strong className="text-navy">{rescheduleModalAppt.doctorName}</strong> on {rescheduleModalAppt.date} at {rescheduleModalAppt.time}.
                </p>

                <div>
                  <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1">
                    Preferred New Date
                  </label>
                  <input
                    type="date"
                    value={newDate}
                    onChange={e => setNewDate(e.target.value)}
                    className="w-full p-2.5 text-xs border border-gray-200 rounded-xl focus:ring-2 focus:ring-healthcare/30 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1">
                    Preferred Time Slot
                  </label>
                  <select
                    value={newTime}
                    onChange={e => setNewTime(e.target.value)}
                    className="w-full p-2.5 text-xs border border-gray-200 rounded-xl focus:ring-2 focus:ring-healthcare/30 focus:outline-none"
                  >
                    <option value="10:00 AM">10:00 AM - Morning Slot</option>
                    <option value="11:00 AM">11:00 AM - Morning Slot</option>
                    <option value="02:30 PM">02:30 PM - Afternoon Slot</option>
                    <option value="04:30 PM">04:30 PM - Evening Slot</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1">
                    Reason for Reschedule
                  </label>
                  <input
                    type="text"
                    value={rescheduleReason}
                    onChange={e => setRescheduleReason(e.target.value)}
                    className="w-full p-2.5 text-xs border border-gray-200 rounded-xl focus:ring-2 focus:ring-healthcare/30 focus:outline-none"
                    placeholder="E.g., Work conflict or waiting on test results"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setRescheduleModalAppt(null)}
                    className="px-4 py-2 rounded-xl text-xs font-medium text-text-secondary hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl text-xs font-semibold bg-healthcare hover:bg-healthcare-600 text-white shadow-xs"
                  >
                    Submit Request
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Global AI Assistant Floating Icon */}
      <AiAssistantModal />
    </div>
  );
}
