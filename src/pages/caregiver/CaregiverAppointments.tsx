import React from 'react';
import { Calendar, Clock, Stethoscope, MapPin, Send } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { APPOINTMENTS } from '@/data/mockData';

export function CaregiverAppointments() {
  const { addToast } = useApp();

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-gray-100 shadow-xs">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal/10 text-teal-700 text-xs font-semibold mb-2">
          <Calendar size={14} />
          <span>Caregiver Visit Coordination</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-navy">
          Ananya's Doctor Appointments
        </h1>
        <p className="text-sm text-text-secondary mt-1">
          Coordinate hospital visits and accompany your loved one to follow-up consultations.
        </p>
      </div>

      <div className="space-y-4">
        {APPOINTMENTS.map(appt => (
          <div key={appt.id} className="p-6 rounded-3xl bg-white border border-gray-100 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-navy text-base">{appt.doctorName}</h3>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-healthcare/10 text-healthcare font-semibold">
                  {appt.doctorSpecialty}
                </span>
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
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin size={13} />
                  OPD Suite 204
                </span>
              </div>
              <p className="text-xs text-text-secondary">
                Reason: {appt.reason}
              </p>
            </div>

            <button
              onClick={() => addToast('Calendar reminder synchronized with your phone', 'success')}
              className="px-4 py-2 rounded-xl bg-teal hover:bg-teal-600 text-white text-xs font-semibold self-start md:self-center transition-colors shadow-xs"
            >
              Add to My Calendar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
