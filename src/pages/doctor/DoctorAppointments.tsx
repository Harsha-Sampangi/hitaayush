import React from 'react';
import { Calendar, Clock, User, Stethoscope } from 'lucide-react';
import { APPOINTMENTS } from '@/data/mockData';

export function DoctorAppointments() {
  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-gray-100 shadow-xs">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-navy/10 text-navy text-xs font-semibold mb-2">
          <Calendar size={14} />
          <span>Doctor OPD Schedule</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-navy">
          Consultation Calendar
        </h1>
        <p className="text-sm text-text-secondary mt-1">
          Review upcoming follow-ups, in-person patient reviews, and diagnostic test evaluations.
        </p>
      </div>

      <div className="space-y-4">
        {APPOINTMENTS.map(appt => (
          <div key={appt.id} className="p-6 rounded-3xl bg-white border border-gray-100 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-navy text-base">{appt.patientName}</h3>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-healthcare/10 text-healthcare font-semibold">
                  {appt.type}
                </span>
                <span className="text-[10px] font-mono text-text-secondary">({appt.patientId})</span>
              </div>
              <div className="flex items-center gap-4 text-xs text-text-secondary">
                <span className="flex items-center gap-1">
                  <Calendar size={13} />
                  {appt.date}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock size={13} />
                  {appt.time}
                </span>
              </div>
              <p className="text-xs text-text-secondary">
                Clinical Focus: <strong>{appt.reason}</strong>
              </p>
            </div>

            <span className="text-xs font-semibold px-3 py-1.5 bg-gray-100 text-navy rounded-xl self-start md:self-center">
              Confirmed Slot
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
