import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Heart, ArrowRight, ShieldCheck, CheckCircle2, Clock, Calendar,
  Pill, TestTube, Stethoscope, Users, User, Activity, Sparkles,
  FileText, MessageSquare, ChevronRight, Globe, AlertTriangle
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { useTranslation } from '@/hooks/useTranslation';
import type { Language } from '@/types';

export function LandingPage() {
  const navigate = useNavigate();
  const { currentLanguage, setLanguage, setRole } = useApp();
  const { t } = useTranslation();
  const [langMenu, setLangMenu] = useState(false);

  const handleStart = (role?: 'patient' | 'caregiver' | 'doctor') => {
    if (role) {
      setRole(role);
      navigate(`/${role}`);
    } else {
      navigate('/roles');
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col selection:bg-healthcare/20 selection:text-healthcare">
      {/* Liquid Glass Top Navigation Bar */}
      <header className="fixed top-0 inset-x-0 z-50 glass-nav">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-healthcare to-teal flex items-center justify-center shadow-md shadow-healthcare/20">
              <Heart size={20} className="text-white" />
            </div>
            <div>
              <span className="text-xl font-bold text-navy tracking-tight">Hitaayus</span>
              <span className="block text-[10px] tracking-widest text-teal-600 font-semibold uppercase -mt-1">
                Post-Care Continuity
              </span>
            </div>
          </div>

          {/* Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-text-secondary">
            <a href="#problem" className="hover:text-healthcare transition-colors">The Challenge</a>
            <a href="#solution" className="hover:text-healthcare transition-colors">How It Works</a>
            <a href="#users" className="hover:text-healthcare transition-colors">Stakeholders</a>
            <a href="#features" className="hover:text-healthcare transition-colors">Features</a>
            <button onClick={() => navigate('/roadmap')} className="hover:text-healthcare transition-colors">
              Roadmap
            </button>
          </nav>

          {/* Language & CTA */}
          <div className="flex items-center gap-3">
            {/* Language dropdown */}
            <div className="relative">
              <button
                onClick={() => setLangMenu(!langMenu)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-navy hover:bg-gray-100 transition-colors border border-gray-200"
              >
                <Globe size={15} />
                <span>{currentLanguage === 'en' ? 'English' : currentLanguage === 'te' ? 'తెలుగు' : 'हिन्दी'}</span>
              </button>
              {langMenu && (
                <div className="absolute right-0 mt-2 w-32 bg-white rounded-xl shadow-xl border border-gray-100 py-1 z-50">
                  <button
                    onClick={() => { setLanguage('en'); setLangMenu(false); }}
                    className="w-full text-left px-3 py-2 text-xs hover:bg-gray-50 text-navy"
                  >
                    English
                  </button>
                  <button
                    onClick={() => { setLanguage('te'); setLangMenu(false); }}
                    className="w-full text-left px-3 py-2 text-xs hover:bg-gray-50 text-navy"
                  >
                    తెలుగు
                  </button>
                  <button
                    onClick={() => { setLanguage('hi'); setLangMenu(false); }}
                    className="w-full text-left px-3 py-2 text-xs hover:bg-gray-50 text-navy"
                  >
                    हिन्दी
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => handleStart()}
              className="btn-primary text-xs sm:text-sm py-2.5 px-5 flex items-center gap-2"
            >
              <span>Get Started</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden relative">
        {/* Soft Ambient Background Glows */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-healthcare/15 to-teal/15 blur-3xl rounded-full -z-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            {/* Pill Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-healthcare/10 border border-healthcare/20 text-healthcare text-xs font-semibold mb-6"
            >
              <Sparkles size={14} />
              <span>AI-Powered Post-Consultation Healthcare Platform</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-navy tracking-tight leading-[1.15]"
            >
              Your Healthcare Journey <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-healthcare via-teal to-healthcare bg-clip-text text-transparent">
                Doesn't End at the Consultation.
              </span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 text-base sm:text-lg text-text-secondary leading-relaxed max-w-2xl mx-auto"
            >
              Hitaayus helps you understand medical instructions, manage medicines, track investigations, and stay connected with your doctor after every visit.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <button
                onClick={() => handleStart()}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-healthcare hover:bg-healthcare-600 text-white font-semibold text-sm shadow-xl shadow-healthcare/20 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
              >
                <span>Get Started</span>
                <ArrowRight size={18} />
              </button>
              <a
                href="#solution"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white hover:bg-gray-50 text-navy font-semibold text-sm border border-gray-200/80 shadow-xs flex items-center justify-center gap-2 transition-all"
              >
                Explore How It Works
              </a>
            </motion.div>
          </div>

          {/* Hero Visual: Apple-inspired Floating Translucent Cards */}
          <div className="mt-16 max-w-5xl mx-auto relative">
            {/* Center Connection Visual */}
            <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-white/90 to-white/60 backdrop-blur-2xl border border-white/60 shadow-2xl relative overflow-hidden">
              <div className="text-center mb-8">
                <span className="text-xs font-bold text-healthcare uppercase tracking-wider">
                  Post-Consultation Continuity Loop
                </span>
                <div className="flex items-center justify-center gap-4 mt-3 text-xs font-semibold text-navy">
                  <span className="px-3 py-1 bg-healthcare/10 rounded-full text-healthcare">Doctor</span>
                  <ArrowRight size={14} className="text-gray-400" />
                  <span className="px-3 py-1 bg-teal/10 rounded-full text-teal-700">Patient</span>
                  <ArrowRight size={14} className="text-gray-400" />
                  <span className="px-3 py-1 bg-navy/10 rounded-full text-navy">Caregiver</span>
                  <ArrowRight size={14} className="text-gray-400" />
                  <span className="px-3 py-1 bg-success/10 rounded-full text-success">Continued Recovery</span>
                </div>
              </div>

              {/* 4 Floating Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Floating Card 1: Medicine Reminder */}
                <motion.div
                  whileHover={{ y: -4 }}
                  className="p-4 rounded-2xl bg-white/80 backdrop-blur-md border border-white/80 shadow-md flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-8 h-8 rounded-xl bg-teal/10 text-teal-600 flex items-center justify-center">
                      <Pill size={16} />
                    </div>
                    <span className="text-[10px] font-semibold text-warning bg-warning/10 px-2 py-0.5 rounded-full">
                      9:00 AM
                    </span>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-navy">Vitamin D3 (60K IU)</h4>
                    <p className="text-[11px] text-text-secondary mt-0.5">1 Tab • Weekly after food</p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-gray-100 flex items-center justify-between text-[11px]">
                    <span className="text-text-secondary">Status:</span>
                    <span className="text-warning font-semibold">Pending Dose</span>
                  </div>
                </motion.div>

                {/* Floating Card 2: Upcoming Lab Test */}
                <motion.div
                  whileHover={{ y: -4 }}
                  className="p-4 rounded-2xl bg-white/80 backdrop-blur-md border border-white/80 shadow-md flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-8 h-8 rounded-xl bg-healthcare/10 text-healthcare flex items-center justify-center">
                      <TestTube size={16} />
                    </div>
                    <span className="text-[10px] font-semibold text-healthcare bg-healthcare/10 px-2 py-0.5 rounded-full">
                      15 Nov
                    </span>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-navy">Complete Blood Count</h4>
                    <p className="text-[11px] text-text-secondary mt-0.5">Fasting 8-10 hrs advised</p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-gray-100 flex items-center justify-between text-[11px]">
                    <span className="text-text-secondary">Sample:</span>
                    <span className="text-healthcare font-semibold">Scheduled</span>
                  </div>
                </motion.div>

                {/* Floating Card 3: Follow-Up Appointment */}
                <motion.div
                  whileHover={{ y: -4 }}
                  className="p-4 rounded-2xl bg-white/80 backdrop-blur-md border border-white/80 shadow-md flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-8 h-8 rounded-xl bg-navy/10 text-navy flex items-center justify-center">
                      <Calendar size={16} />
                    </div>
                    <span className="text-[10px] font-semibold text-navy bg-navy/10 px-2 py-0.5 rounded-full">
                      20 Nov
                    </span>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-navy">Dr. Rahul Sharma</h4>
                    <p className="text-[11px] text-text-secondary mt-0.5">10:30 AM • In-Clinic Review</p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-gray-100 flex items-center justify-between text-[11px]">
                    <span className="text-text-secondary">Purpose:</span>
                    <span className="text-navy font-semibold">Lab Check</span>
                  </div>
                </motion.div>

                {/* Floating Card 4: Health Progress */}
                <motion.div
                  whileHover={{ y: -4 }}
                  className="p-4 rounded-2xl bg-white/80 backdrop-blur-md border border-white/80 shadow-md flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-8 h-8 rounded-xl bg-success/10 text-success flex items-center justify-center">
                      <Activity size={16} />
                    </div>
                    <span className="text-[10px] font-semibold text-success bg-success/10 px-2 py-0.5 rounded-full">
                      60% Done
                    </span>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-navy">Care Plan Compliance</h4>
                    <p className="text-[11px] text-text-secondary mt-0.5">3 of 5 recovery tasks done</p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-gray-100 flex items-center justify-between text-[11px]">
                    <span className="text-text-secondary">Sync:</span>
                    <span className="text-success font-semibold">Doctor Shared</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem Section */}
      <section id="problem" className="py-20 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-error uppercase tracking-wider">The Real Healthcare Gap</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy mt-2">
              Care Continues. But Information Gets Lost.
            </h2>
            <p className="mt-3 text-sm text-text-secondary">
              A consultation lasts 15 minutes, but the recovery journey lasts weeks. That is where traditional care breaks down.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Confusing Medical Instructions',
                desc: 'Unreadable cursive prescriptions, complex Latin frequencies like "OD pc" and "TDS", and overwhelming medical jargon lead to incorrect dosages.',
                icon: FileText
              },
              {
                title: 'Missed Medicines & Follow-ups',
                desc: 'Without automated contextual alerts, patients forget daily doses, skip vital lab tests, and miss scheduled post-visit review consultations.',
                icon: Clock
              },
              {
                title: 'Scattered Medical Records',
                desc: 'Paper prescriptions and printed lab reports get misplaced, forcing patients and doctors to restart diagnosis from zero at every visit.',
                icon: AlertTriangle
              },
              {
                title: 'Zero Between-Visit Communication',
                desc: 'Family caregivers are kept in the dark, and doctors have no visibility into whether patients complied with care plans or experienced adverse reactions.',
                icon: MessageSquare
              }
            ].map((prob, i) => {
              const Icon = prob.icon;
              return (
                <div key={i} className="p-6 rounded-2xl bg-gray-50/70 border border-gray-200/70 hover:border-healthcare/30 transition-all">
                  <div className="w-12 h-12 rounded-2xl bg-white shadow-xs border border-gray-100 flex items-center justify-center text-error mb-4">
                    <Icon size={22} />
                  </div>
                  <h3 className="font-bold text-base text-navy mb-2">{prob.title}</h3>
                  <p className="text-xs text-text-secondary leading-relaxed">{prob.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* The Solution Section */}
      <section id="solution" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-healthcare uppercase tracking-wider">The Hitaayus Blueprint</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy mt-2">
              One Connected Experience for Continued Care.
            </h2>
            <p className="mt-3 text-sm text-text-secondary">
              A 5-step seamless post-consultation continuum that ensures patient adherence, family involvement, and doctor oversight.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              {
                step: '01',
                title: 'Consultation Completed',
                desc: 'Doctor reviews patient, prescribes medicines, orders tests, and creates digital care plan.'
              },
              {
                step: '02',
                title: 'Plan Instantly Added',
                desc: 'Care plan syncs seamlessly to patient and authorized family caregiver dashboards.'
              },
              {
                step: '03',
                title: 'Instructions Explained',
                desc: 'Hitaayus AI translates complex dosages into plain English, Telugu, or Hindi with audio.'
              },
              {
                step: '04',
                title: 'Meds & Tests Tracked',
                desc: 'Reminders trigger on schedule; doses marked as taken or skipped with clinical logging.'
              },
              {
                step: '05',
                title: 'Progress Shared',
                desc: 'Daily check-in logs and uploaded lab reports feed directly into the doctor’s clinic feed.'
              }
            ].map((st, i) => (
              <div key={i} className="p-5 rounded-2xl bg-white border border-gray-100 shadow-sm relative">
                <span className="text-2xl font-black text-healthcare/20 block mb-2">{st.step}</span>
                <h4 className="font-bold text-sm text-navy mb-1.5">{st.title}</h4>
                <p className="text-xs text-text-secondary leading-relaxed">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Three Connected Stakeholders */}
      <section id="users" className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-teal-600 uppercase tracking-wider">Tailored Portals</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy mt-2">
              Designed for the Whole Circle of Care.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Patient Card */}
            <div className="p-8 rounded-3xl bg-gradient-to-b from-blue-50/50 to-white border border-blue-100 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-healthcare text-white flex items-center justify-center mb-5 shadow-md shadow-healthcare/20">
                  <User size={24} />
                </div>
                <h3 className="text-xl font-bold text-navy">For Patients</h3>
                <p className="text-xs text-text-secondary mt-2 mb-6 leading-relaxed">
                  Understand what your doctor prescribed in simple everyday language. Manage daily doses, track lab visits, and submit check-ins without confusion.
                </p>
                <ul className="space-y-2 text-xs text-navy">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-healthcare" />
                    <span>AI Prescription Simplifier with Audio</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-healthcare" />
                    <span>Medicine schedule with one-tap status</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-healthcare" />
                    <span>Unified chronological health timeline</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={() => handleStart('patient')}
                className="mt-8 w-full py-3 rounded-xl bg-healthcare hover:bg-healthcare-600 text-white font-medium text-xs transition-colors flex items-center justify-center gap-2"
              >
                <span>Enter Patient Portal</span>
                <ChevronRight size={14} />
              </button>
            </div>

            {/* Caregiver Card */}
            <div className="p-8 rounded-3xl bg-gradient-to-b from-teal-50/50 to-white border border-teal-100 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-teal text-white flex items-center justify-center mb-5 shadow-md shadow-teal/20">
                  <Users size={24} />
                </div>
                <h3 className="text-xl font-bold text-navy">For Caregivers</h3>
                <p className="text-xs text-text-secondary mt-2 mb-6 leading-relaxed">
                  Support elderly parents or loved ones. View authorized medicine schedules, receive missed-dose alerts, and assist with lab appointments.
                </p>
                <ul className="space-y-2 text-xs text-navy">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-teal" />
                    <span>Permission-controlled patient views</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-teal" />
                    <span>One-tap reminder alerts to patients</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-teal" />
                    <span>Distinct "Caregiver Assisted" logging</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={() => handleStart('caregiver')}
                className="mt-8 w-full py-3 rounded-xl bg-teal hover:bg-teal-600 text-white font-medium text-xs transition-colors flex items-center justify-center gap-2"
              >
                <span>Enter Caregiver Portal</span>
                <ChevronRight size={14} />
              </button>
            </div>

            {/* Doctor Card */}
            <div className="p-8 rounded-3xl bg-gradient-to-b from-navy-50/50 to-white border border-navy-100 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-navy text-white flex items-center justify-center mb-5 shadow-md shadow-navy/20">
                  <Stethoscope size={24} />
                </div>
                <h3 className="text-xl font-bold text-navy">For Doctors</h3>
                <p className="text-xs text-text-secondary mt-2 mb-6 leading-relaxed">
                  Maintain continuous clinical visibility between visits. Publish structured post-care plans and review patient adherence before the next consult.
                </p>
                <ul className="space-y-2 text-xs text-navy">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-navy" />
                    <span>Structured Care Plan Authoring & Sharing</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-navy" />
                    <span>Patient-reported progress feed</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-navy" />
                    <span>Adherence and lab report review queue</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={() => handleStart('doctor')}
                className="mt-8 w-full py-3 rounded-xl bg-navy hover:bg-navy-800 text-white font-medium text-xs transition-colors flex items-center justify-center gap-2"
              >
                <span>Enter Doctor Portal</span>
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Grid */}
      <section id="features" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-healthcare uppercase tracking-wider">Features</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy mt-2">
              Everything Needed for Seamless Post-Care
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'AI Prescription Clarifier', desc: 'Converts complex clinical instructions into Telugu, Hindi, and English with voice readout.', icon: Sparkles },
              { title: 'Medicine Adherence Tracking', desc: 'Live dose schedules with reasons captured for skips, keeping the doctor informed.', icon: Pill },
              { title: 'Interactive Lab Reports', desc: 'Clear explanations of test parameters like Hemoglobin and RBC without false medical diagnosis.', icon: TestTube },
              { title: 'Unified Health Timeline', desc: 'Chronological event record that never restarts from zero on follow-up appointments.', icon: Activity },
              { title: 'Authorized Caregiver Access', desc: 'Consent-based permission system allowing family members to assist safely.', icon: Users },
              { title: 'Doctor Care Plan Engine', desc: 'Create, review, approve, and push structured post-consultation recovery regimens.', icon: Stethoscope }
            ].map((f, i) => {
              const Icon = f.icon;
              return (
                <div key={i} className="p-6 rounded-2xl bg-white border border-gray-100 shadow-xs hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 rounded-xl bg-healthcare/10 text-healthcare flex items-center justify-center mb-4">
                    <Icon size={20} />
                  </div>
                  <h4 className="font-bold text-base text-navy mb-1.5">{f.title}</h4>
                  <p className="text-xs text-text-secondary leading-relaxed">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-navy via-healthcare to-teal text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Continue Your Care Journey With Hitaayus.
          </h2>
          <p className="mt-4 text-base text-blue-100 max-w-xl mx-auto">
            Experience the interactive prototype with realistic patient data, AI instruction clarification, and connected multi-stakeholder dashboards.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => handleStart()}
              className="px-8 py-3.5 rounded-xl bg-white text-navy font-bold text-sm shadow-xl hover:bg-gray-100 transition-all flex items-center gap-2"
            >
              <span>Enter Hitaayus Prototype</span>
              <ArrowRight size={16} />
            </button>
            <button
              onClick={() => navigate('/roadmap')}
              className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-sm border border-white/20 transition-all"
            >
              View Future Roadmap
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-healthcare text-white flex items-center justify-center">
              <Heart size={14} />
            </div>
            <span className="font-bold text-navy text-sm">Hitaayus Prototype</span>
            <span className="text-xs text-text-secondary">• Non-clinical interactive design</span>
          </div>
          <div className="text-xs text-text-secondary text-center sm:text-right">
            Healthcare continuity prototype for demonstration purposes only.
          </div>
        </div>
      </footer>
    </div>
  );
}
