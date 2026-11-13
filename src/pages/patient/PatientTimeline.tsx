import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Activity, Calendar, FileText, Pill, TestTube, Stethoscope,
  CheckCircle2, Clock, Filter, ArrowDown, ChevronRight
} from 'lucide-react';
import { TIMELINE_EVENTS } from '@/data/mockData';
import { AiAssistantModal } from '@/components/shared/AiAssistantModal';
import type { TimelineEvent } from '@/types';

type FilterType = 'all' | 'consultation' | 'prescription' | 'medicine' | 'test' | 'report' | 'appointment';

export function PatientTimeline() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  const filteredEvents = activeFilter === 'all'
    ? TIMELINE_EVENTS
    : TIMELINE_EVENTS.filter(e => e.type === activeFilter);

  const getEventIcon = (type: TimelineEvent['type']) => {
    switch (type) {
      case 'consultation':
        return { icon: Stethoscope, color: 'bg-navy text-white' };
      case 'prescription':
        return { icon: FileText, color: 'bg-healthcare text-white' };
      case 'medicine':
        return { icon: Pill, color: 'bg-teal text-white' };
      case 'test':
        return { icon: TestTube, color: 'bg-amber-500 text-white' };
      case 'report':
        return { icon: CheckCircle2, color: 'bg-emerald-500 text-white' };
      case 'appointment':
        return { icon: Calendar, color: 'bg-purple-600 text-white' };
      default:
        return { icon: Activity, color: 'bg-healthcare text-white' };
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      {/* Top Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-gray-100 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal/10 text-teal-700 text-xs font-semibold mb-2">
            <Activity size={14} />
            <span>Healthcare Continuity Record</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy">
            Unified Patient Health Timeline
          </h1>
          <p className="text-sm text-text-secondary mt-1">
            Care does not restart from zero. Every consultation, medicine log, test, and check-in connects in one continuous historical continuum.
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {[
          { key: 'all', label: 'All Events' },
          { key: 'consultation', label: 'Consultations' },
          { key: 'prescription', label: 'Prescriptions' },
          { key: 'medicine', label: 'Medicines' },
          { key: 'test', label: 'Tests' },
          { key: 'report', label: 'Reports' },
          { key: 'appointment', label: 'Appointments' },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveFilter(tab.key as FilterType)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all border ${
              activeFilter === tab.key
                ? 'bg-navy text-white border-navy shadow-xs'
                : 'bg-white text-text-secondary hover:bg-gray-50 border-gray-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Vertical Timeline */}
      <div className="relative pl-6 sm:pl-8 border-l-2 border-gray-200 ml-4 sm:ml-6 space-y-8 my-6">
        {filteredEvents.map((evt, idx) => {
          const { icon: Icon, color } = getEventIcon(evt.type);
          return (
            <motion.div
              key={evt.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="relative"
            >
              {/* Event node dot */}
              <div className={`absolute -left-[35px] sm:-left-[43px] top-1.5 w-8 h-8 rounded-full ${color} flex items-center justify-center shadow-md ring-4 ring-background`}>
                <Icon size={16} />
              </div>

              {/* Event Card */}
              <div className="p-5 rounded-3xl bg-white border border-gray-100 shadow-xs hover:shadow-md transition-shadow">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                  <span className="text-xs font-bold text-healthcare flex items-center gap-1.5">
                    <Clock size={12} />
                    {evt.date} • {evt.time}
                  </span>
                  <span className="text-[10px] font-semibold text-text-secondary uppercase tracking-wider px-2 py-0.5 rounded-full bg-gray-100 self-start sm:self-auto">
                    {evt.type}
                  </span>
                </div>

                <h3 className="text-base font-bold text-navy">{evt.title}</h3>
                <p className="text-xs text-text-secondary mt-1 leading-relaxed">
                  {evt.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Global AI Assistant Floating Icon */}
      <AiAssistantModal />
    </div>
  );
}
