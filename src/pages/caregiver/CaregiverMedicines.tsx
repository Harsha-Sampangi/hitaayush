import React from 'react';
import { Pill, Clock, Send, UserCheck, CheckCircle2, AlertCircle } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { MEDICINES } from '@/data/mockData';

export function CaregiverMedicines() {
  const { medicineDoses, addToast } = useApp();

  const handleSendReminder = (medName: string) => {
    addToast(`Push reminder dispatched to Ananya for ${medName}!`, 'success');
  };

  const handleMarkAssisted = (medName: string) => {
    addToast(`Recorded: Priya assisted Ananya with taking ${medName}.`, 'info');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-gray-100 shadow-xs">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal/10 text-teal-700 text-xs font-semibold mb-2">
          <Pill size={14} />
          <span>Caregiver Medication Oversight</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-navy">
          Ananya's Medicine Regimen
        </h1>
        <p className="text-sm text-text-secondary mt-1">
          Monitor your loved one's prescribed daily doses and help keep their recovery schedule consistent.
        </p>
      </div>

      <div className="space-y-4">
        {medicineDoses.map(dose => (
          <div
            key={dose.id}
            className="p-6 rounded-3xl bg-white border border-gray-100 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-navy text-base">{dose.medicineName}</h3>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-gray-100 text-text-secondary">
                  {dose.dosage}
                </span>
              </div>
              <p className="text-xs text-text-secondary">
                Scheduled Time: <strong className="text-navy">{dose.time}</strong> • Status:{' '}
                <span className={dose.status === 'taken' ? 'text-success font-semibold' : 'text-warning font-semibold'}>
                  {dose.status.toUpperCase()}
                </span>
              </p>
            </div>

            <div className="flex items-center gap-2">
              {dose.status === 'pending' ? (
                <>
                  <button
                    onClick={() => handleSendReminder(dose.medicineName)}
                    className="px-4 py-2 rounded-xl bg-healthcare/10 hover:bg-healthcare text-healthcare hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-all"
                  >
                    <Send size={13} />
                    <span>Send Reminder</span>
                  </button>
                  <button
                    onClick={() => handleMarkAssisted(dose.medicineName)}
                    className="px-4 py-2 rounded-xl bg-teal hover:bg-teal-600 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
                  >
                    <UserCheck size={13} />
                    <span>Mark As Assisted</span>
                  </button>
                </>
              ) : (
                <span className="text-xs font-semibold text-success bg-success/10 px-3.5 py-1.5 rounded-xl flex items-center gap-1.5">
                  <CheckCircle2 size={15} />
                  <span>Dose Logged as Taken</span>
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
