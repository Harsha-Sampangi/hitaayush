import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Compass, ArrowLeft, ArrowRight, ShieldCheck, Cpu, Smartphone,
  Layers, Database, Sparkles, Building2, Radio
} from 'lucide-react';

export function RoadmapPage() {
  const navigate = useNavigate();

  const ROADMAP_ITEMS = [
    {
      category: 'Phase 2: Horizon Expansion',
      title: 'Pre-Consultation Clinical Intake',
      desc: 'Structured symptom surveys, prior history questionnaire, and vitals capture before entering the doctor room, allowing the doctor to start ahead.',
      icon: Smartphone,
      status: 'Conceptual Exploration'
    },
    {
      category: 'Phase 2: Emergency & Critical Safety',
      title: 'Emergency Medical Summary & QR Pass',
      desc: 'Offline-first, cryptographic QR card providing emergency responders instant access to blood group, severe allergies, and emergency contacts.',
      icon: ShieldCheck,
      status: 'Architecture Design'
    },
    {
      category: 'Phase 3: Rural & Semi-Urban Inclusion',
      title: 'MediKiosk Assisted Access Terminals',
      desc: 'Physical, voice-guided healthcare kiosks installed at primary health centers to help illiterate or non-smartphone users access their care plan.',
      icon: Building2,
      status: 'Hardware Partner Research'
    },
    {
      category: 'Phase 3: National Infrastructure',
      title: 'ABDM (Ayushman Bharat Digital Mission) Gateway',
      desc: 'Seamless interoperability with ABHA (Ayushman Bharat Health Account), enabling certified consent-based health data exchange across India.',
      icon: Database,
      status: 'Standards Alignment'
    },
    {
      category: 'Phase 4: Advanced AI Diagnostics',
      title: 'Multilingual Conversational Voice AI',
      desc: 'Full conversational audio dialogues in 12 Indian regional dialects with speech-to-intent analysis for automated adherence phone follow-ups.',
      icon: Radio,
      status: 'R&D Phase'
    },
    {
      category: 'Phase 4: Long-Term Care',
      title: 'Longitudinal Chronic Disease Coordination',
      desc: 'Multi-year disease trajectory tracking for diabetes, hypertension, and oncology with multi-specialist care circles and predictive relapse flags.',
      icon: Layers,
      status: 'Clinical Feasibility Study'
    }
  ];

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-10">
      <div className="max-w-5xl mx-auto">
        {/* Navigation */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-xs font-medium text-text-secondary hover:text-navy px-3 py-1.5 rounded-xl hover:bg-white transition-colors"
          >
            <ArrowLeft size={16} />
            <span>Back to Home</span>
          </button>
          <button
            onClick={() => navigate('/roles')}
            className="btn-primary text-xs py-2 px-4 flex items-center gap-1.5"
          >
            <span>Launch Prototype</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-healthcare/10 text-healthcare text-xs font-semibold mb-3">
            <Compass size={14} />
            <span>Vision & Strategic Horizons</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-navy tracking-tight">
            The Future of Hitaayus
          </h1>
          <p className="mt-2 text-sm text-text-secondary leading-relaxed">
            While our core prototype remains laser-focused on <strong className="text-navy">Post-Consultation Care Continuity</strong>, these conceptual horizons represent future expansions.
          </p>
        </div>

        {/* Disclaimer Card */}
        <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/80 mb-10 text-xs text-amber-900 flex items-start gap-3">
          <Sparkles size={18} className="text-amber-700 mt-0.5 flex-shrink-0" />
          <div>
            <strong className="block mb-0.5">Important Prototype Notice:</strong>
            These items are strategic product possibilities for future roadmap evaluation. They are intentionally not built as core workflows in this prototype to maintain razor-sharp focus on post-visit patient recovery and adherence.
          </div>
        </div>

        {/* Roadmap Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ROADMAP_ITEMS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                whileHover={{ y: -4 }}
                className="p-6 rounded-3xl bg-white border border-gray-100 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-healthcare/10 text-healthcare flex items-center justify-center">
                      <Icon size={20} />
                    </div>
                    <span className="text-[10px] font-semibold text-text-secondary bg-gray-100 px-2.5 py-1 rounded-full">
                      {item.status}
                    </span>
                  </div>
                  <span className="text-[11px] font-bold text-healthcare uppercase tracking-wider block mb-1">
                    {item.category}
                  </span>
                  <h3 className="text-lg font-bold text-navy mb-2">{item.title}</h3>
                  <p className="text-xs text-text-secondary leading-relaxed">{item.desc}</p>
                </div>

                <div className="mt-5 pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-text-secondary">
                  <span>Planned Horizon</span>
                  <span className="text-healthcare font-medium">Future Spec</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
