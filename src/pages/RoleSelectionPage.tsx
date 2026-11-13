import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { User, Users, Stethoscope, ArrowRight, Sparkles, Heart, Globe, ArrowLeft, Shield } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { useTranslation } from '@/hooks/useTranslation';
import type { Role, Language } from '@/types';

export function RoleSelectionPage() {
  const navigate = useNavigate();
  const { setRole, currentLanguage, setLanguage } = useApp();
  const { t } = useTranslation();

  const handleSelectRole = (role: Role) => {
    setRole(role);
    navigate(`/${role}`);
  };

  const ROLES = [
    {
      id: 'patient' as Role,
      title: 'Patient',
      subtitle: 'Understand your care. Stay on track.',
      demoPerson: 'Ananya Reddy, 28 (HT-2026-001)',
      desc: 'View AI-simplified prescriptions, log daily medicine doses, track upcoming lab tests, and complete progress check-ins.',
      icon: User,
      color: 'border-healthcare/30 bg-gradient-to-b from-blue-50/40 to-white hover:border-healthcare',
      iconBg: 'bg-healthcare text-white',
      badge: 'Primary Experience',
      badgeColor: 'bg-healthcare/10 text-healthcare'
    },
    {
      id: 'caregiver' as Role,
      title: 'Caregiver / Family',
      subtitle: 'Support your loved ones throughout their care journey.',
      demoPerson: 'Priya Reddy (Sister of Ananya)',
      desc: 'Review authorized medicine schedules, send gentle reminders, assist with lab bookings, and view verified care plans.',
      icon: Users,
      color: 'border-teal/30 bg-gradient-to-b from-teal-50/40 to-white hover:border-teal',
      iconBg: 'bg-teal text-white',
      badge: 'Authorized Circle',
      badgeColor: 'bg-teal/10 text-teal-700'
    },
    {
      id: 'doctor' as Role,
      title: 'Doctor',
      subtitle: 'Create care plans. Stay connected with patients.',
      demoPerson: 'Dr. Rahul Sharma (General Medicine)',
      desc: 'Formulate post-consultation care plans, review patient-reported symptoms between visits, and track follow-up readiness.',
      icon: Stethoscope,
      color: 'border-navy/30 bg-gradient-to-b from-navy-50/40 to-white hover:border-navy',
      iconBg: 'bg-navy text-white',
      badge: 'Clinical Oversight',
      badgeColor: 'bg-navy/10 text-navy'
    }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col justify-between p-4 sm:p-6 lg:p-8 relative">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-tr from-healthcare/10 to-teal/10 blur-3xl rounded-full -z-10 pointer-events-none" />

      {/* Top Bar */}
      <div className="max-w-6xl mx-auto w-full flex items-center justify-between">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-xs font-medium text-text-secondary hover:text-navy transition-colors px-3 py-1.5 rounded-xl hover:bg-white"
        >
          <ArrowLeft size={16} />
          <span>Back to Landing</span>
        </button>

        <div className="flex items-center gap-2">
          {(['en', 'te', 'hi'] as Language[]).map(l => (
            <button
              key={l}
              onClick={() => setLanguage(l)}
              className={`px-3 py-1 rounded-xl text-xs font-medium transition-all ${
                currentLanguage === l ? 'bg-healthcare text-white shadow-xs' : 'text-text-secondary bg-white hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {l === 'en' ? 'English' : l === 'te' ? 'తెలుగు' : 'हिन्दी'}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto w-full my-auto py-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-gray-200 text-xs font-semibold text-healthcare shadow-xs mb-3">
            <Heart size={14} className="text-healthcare" />
            <span>Interactive Care Continuum</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-navy tracking-tight">
            Welcome to Hitaayus
          </h1>
          <p className="mt-2 text-sm text-text-secondary leading-relaxed">
            Choose how you want to experience connected healthcare. All three roles are linked through Ananya Reddy's care journey.
          </p>
        </div>

        {/* 3 Role Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ROLES.map(r => {
            const Icon = r.icon;
            return (
              <motion.div
                key={r.id}
                whileHover={{ y: -6 }}
                className={`p-6 sm:p-7 rounded-3xl border shadow-sm transition-all flex flex-col justify-between ${r.color}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-md ${r.iconBg}`}>
                      <Icon size={24} />
                    </div>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${r.badgeColor}`}>
                      {r.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-navy">{r.title}</h3>
                  <p className="text-xs font-semibold text-healthcare mt-1">{r.subtitle}</p>

                  <div className="mt-3 py-1.5 px-2.5 rounded-lg bg-white/70 border border-gray-200/60 text-[11px] text-text-secondary">
                    Demo Account: <strong className="text-navy">{r.demoPerson}</strong>
                  </div>

                  <p className="text-xs text-text-secondary mt-3 leading-relaxed">
                    {r.desc}
                  </p>
                </div>

                <button
                  onClick={() => handleSelectRole(r.id)}
                  className="mt-6 w-full py-3 rounded-xl bg-white hover:bg-navy hover:text-white text-navy font-semibold text-xs border border-gray-200/80 shadow-xs transition-all flex items-center justify-center gap-2 group"
                >
                  <span>Enter {r.title} Dashboard</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Prototype Assurance Notice */}
        <div className="mt-10 p-4 rounded-2xl bg-white/70 backdrop-blur-md border border-gray-200/60 text-center max-w-2xl mx-auto flex items-center justify-center gap-2 text-xs text-text-secondary">
          <Shield size={16} className="text-healthcare flex-shrink-0" />
          <span>
            Simulation Mode: You can freely switch between Patient, Caregiver, and Doctor at any time from the top profile menu.
          </span>
        </div>
      </div>

      {/* Bottom info */}
      <div className="text-center text-xs text-text-secondary max-w-xl mx-auto">
        Hitaayus Care Prototype • Post-Consultation Adherence System
      </div>
    </div>
  );
}
