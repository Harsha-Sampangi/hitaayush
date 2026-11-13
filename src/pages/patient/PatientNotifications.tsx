import React from 'react';
import { motion } from 'framer-motion';
import {
  Bell, Pill, Calendar, TestTube, FileText, CheckCircle2,
  Clock, Check
} from 'lucide-react';
import { useApp } from '@/context/AppContext';

export function PatientNotifications() {
  const { notifications, markNotificationRead, addToast } = useApp();

  const getNotifIcon = (type: string) => {
    switch (type) {
      case 'medicine': return { icon: Pill, color: 'bg-teal/10 text-teal-600' };
      case 'test': return { icon: TestTube, color: 'bg-amber-500/10 text-amber-600' };
      case 'appointment': return { icon: Calendar, color: 'bg-healthcare/10 text-healthcare' };
      case 'care_plan': return { icon: FileText, color: 'bg-navy/10 text-navy' };
      default: return { icon: Bell, color: 'bg-gray-100 text-text-secondary' };
    }
  };

  const handleMarkAllRead = () => {
    notifications.forEach(n => markNotificationRead(n.id));
    addToast('Marked all notifications as read', 'info');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-16">
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-gray-100 shadow-xs flex items-center justify-between">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-healthcare/10 text-healthcare text-xs font-semibold mb-2">
            <Bell size={14} />
            <span>Reminders & Alerts</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy">
            Notifications Center
          </h1>
          <p className="text-sm text-text-secondary mt-1">
            Real-time updates on scheduled medicine doses, doctor notes, and diagnostic milestones.
          </p>
        </div>

        <button
          onClick={handleMarkAllRead}
          className="px-4 py-2 rounded-xl text-xs font-semibold text-healthcare hover:bg-healthcare/10 transition-colors"
        >
          Mark all as read
        </button>
      </div>

      <div className="space-y-3">
        {notifications.map(n => {
          const { icon: Icon, color } = getNotifIcon(n.type);
          return (
            <div
              key={n.id}
              onClick={() => markNotificationRead(n.id)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer flex items-start gap-4 ${
                !n.read
                  ? 'bg-white border-healthcare/30 shadow-xs'
                  : 'bg-gray-50/70 border-gray-200/60 opacity-75'
              }`}
            >
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 ${color}`}>
                <Icon size={18} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="font-bold text-sm text-navy">{n.title}</h4>
                  <span className="text-[11px] text-gray-400">{n.timestamp}</span>
                </div>
                <p className="text-xs text-text-secondary mt-1 leading-relaxed">{n.message}</p>
              </div>
              {!n.read && (
                <span className="w-2.5 h-2.5 rounded-full bg-healthcare flex-shrink-0 mt-2" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
