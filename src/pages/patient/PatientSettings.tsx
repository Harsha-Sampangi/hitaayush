import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Settings, User, Globe, Bell, Shield, Lock,
  ChevronRight, LogOut, CheckCircle2, Save
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { PATIENTS } from '@/data/mockData';
import type { Language } from '@/types';

export function PatientSettings() {
  const navigate = useNavigate();
  const { currentLanguage, setLanguage, setRole, addToast } = useApp();
  const patient = PATIENTS[0];

  const [phone, setPhone] = useState(patient.phone);
  const [email, setEmail] = useState(patient.email);
  const [notifyMeds, setNotifyMeds] = useState(true);
  const [notifyTests, setNotifyTests] = useState(true);
  const [notifyDoctor, setNotifyDoctor] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    addToast('Preferences saved successfully (Locally cached)', 'success');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-16">
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-gray-100 shadow-xs">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-navy/10 text-navy text-xs font-semibold mb-2">
          <Settings size={14} />
          <span>Account Preferences</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-navy">
          Settings & Profile
        </h1>
        <p className="text-sm text-text-secondary mt-1">
          Configure your personal healthcare identity, default explanation language, and alert preferences.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Personal Details */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-gray-100 shadow-xs space-y-4">
          <h3 className="font-bold text-navy text-base flex items-center gap-2">
            <User size={18} className="text-healthcare" />
            <span>Patient Identity</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-text-secondary uppercase tracking-wider mb-1">
                Full Name
              </label>
              <input
                type="text"
                disabled
                value={patient.name}
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-navy font-medium cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block font-semibold text-text-secondary uppercase tracking-wider mb-1">
                Patient Identifier
              </label>
              <input
                type="text"
                disabled
                value={patient.id}
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-navy font-mono font-medium cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block font-semibold text-text-secondary uppercase tracking-wider mb-1">
                Contact Phone
              </label>
              <input
                type="text"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className="w-full p-3 bg-white border border-gray-200 rounded-xl text-navy focus:ring-2 focus:ring-healthcare/30 focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold text-text-secondary uppercase tracking-wider mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full p-3 bg-white border border-gray-200 rounded-xl text-navy focus:ring-2 focus:ring-healthcare/30 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Preferred Language */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-gray-100 shadow-xs space-y-4">
          <h3 className="font-bold text-navy text-base flex items-center gap-2">
            <Globe size={18} className="text-teal" />
            <span>Primary Care & Explanation Language</span>
          </h3>
          <p className="text-xs text-text-secondary">
            Prescriptions and AI medical summaries will automatically adapt to your chosen language.
          </p>

          <div className="grid grid-cols-3 gap-3">
            {[
              { code: 'en' as Language, label: 'English', desc: 'Default Clinical' },
              { code: 'te' as Language, label: 'తెలుగు (Telugu)', desc: 'ప్రాంతీయ భాష' },
              { code: 'hi' as Language, label: 'हिन्दी (Hindi)', desc: 'राष्ट्र भाषा' }
            ].map(lang => (
              <button
                key={lang.code}
                type="button"
                onClick={() => setLanguage(lang.code)}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  currentLanguage === lang.code
                    ? 'border-healthcare bg-healthcare/5 ring-2 ring-healthcare/30'
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                <span className="font-bold text-sm text-navy block">{lang.label}</span>
                <span className="text-[11px] text-text-secondary">{lang.desc}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Alerts & Notifications Preferences */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-gray-100 shadow-xs space-y-4">
          <h3 className="font-bold text-navy text-base flex items-center gap-2">
            <Bell size={18} className="text-warning" />
            <span>Notification Triggers</span>
          </h3>

          <div className="space-y-3 text-xs">
            <label className="flex items-center justify-between p-3 rounded-xl border border-gray-200 hover:bg-gray-50 cursor-pointer">
              <span className="text-navy font-medium">Daily Medicine Dose Reminders</span>
              <input
                type="checkbox"
                checked={notifyMeds}
                onChange={e => setNotifyMeds(e.target.checked)}
                className="rounded text-healthcare h-4 w-4"
              />
            </label>
            <label className="flex items-center justify-between p-3 rounded-xl border border-gray-200 hover:bg-gray-50 cursor-pointer">
              <span className="text-navy font-medium">Upcoming Diagnostic Lab Alerts</span>
              <input
                type="checkbox"
                checked={notifyTests}
                onChange={e => setNotifyTests(e.target.checked)}
                className="rounded text-healthcare h-4 w-4"
              />
            </label>
            <label className="flex items-center justify-between p-3 rounded-xl border border-gray-200 hover:bg-gray-50 cursor-pointer">
              <span className="text-navy font-medium">Doctor Care Plan Updates & Feedback</span>
              <input
                type="checkbox"
                checked={notifyDoctor}
                onChange={e => setNotifyDoctor(e.target.checked)}
                className="rounded text-healthcare h-4 w-4"
              />
            </label>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => { setRole(null); navigate('/roles'); }}
            className="flex items-center gap-2 text-xs font-semibold text-error hover:bg-error/10 px-4 py-2.5 rounded-xl transition-colors"
          >
            <LogOut size={16} />
            <span>Switch Role or Log Out</span>
          </button>

          <button
            type="submit"
            className="btn-primary text-xs py-2.5 px-6 flex items-center gap-2"
          >
            <Save size={14} />
            <span>Save Preferences</span>
          </button>
        </div>
      </form>
    </div>
  );
}
