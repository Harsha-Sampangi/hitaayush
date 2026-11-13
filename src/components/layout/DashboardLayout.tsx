import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Menu, X, Globe, Bell, User, LogOut, ChevronDown,
  LayoutDashboard, Heart, FileText, Pill, TestTube,
  Calendar, Users, Settings, Stethoscope, ClipboardList,
  Activity, MessageSquare, Home
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { useTranslation } from '@/hooks/useTranslation';
import type { Language } from '@/types';

const languageLabels: Record<Language, string> = {
  en: 'English',
  te: 'తెలుగు',
  hi: 'हिन्दी',
};

const patientNavItems = [
  { key: 'dashboard', icon: LayoutDashboard, path: '/patient' },
  { key: 'prescriptions', icon: FileText, path: '/patient/prescriptions' },
  { key: 'medicines', icon: Pill, path: '/patient/medicines' },
  { key: 'testsReports', icon: TestTube, path: '/patient/tests' },
  { key: 'appointments', icon: Calendar, path: '/patient/appointments' },
  { key: 'myHealth', icon: Activity, path: '/patient/timeline' },
  { key: 'familyCaregiver', icon: Users, path: '/patient/family' },
];

const caregiverNavItems = [
  { key: 'dashboard', icon: LayoutDashboard, path: '/caregiver' },
  { key: 'connectedPatients', icon: Users, path: '/caregiver/patients' },
  { key: 'medicines', icon: Pill, path: '/caregiver/medicines' },
  { key: 'appointments', icon: Calendar, path: '/caregiver/appointments' },
  { key: 'testsReports', icon: TestTube, path: '/caregiver/tests' },
];

const doctorNavItems = [
  { key: 'dashboard', icon: LayoutDashboard, path: '/doctor' },
  { key: 'patientList', icon: Users, path: '/doctor/patients' },
  { key: 'appointments', icon: Calendar, path: '/doctor/appointments' },
  { key: 'createCarePlan', icon: ClipboardList, path: '/doctor/care-plan' },
];

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { currentRole, setRole, currentLanguage, setLanguage, unreadCount } = useApp();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const navItems = currentRole === 'patient' ? patientNavItems
    : currentRole === 'caregiver' ? caregiverNavItems
    : doctorNavItems;

  const roleLabel = currentRole === 'patient' ? 'Ananya Reddy'
    : currentRole === 'caregiver' ? 'Priya Reddy'
    : 'Dr. Rahul Sharma';

  const roleSubLabel = currentRole === 'patient' ? 'Patient'
    : currentRole === 'caregiver' ? 'Caregiver'
    : 'Doctor';

  const handleNavigation = (path: string) => {
    navigate(path);
    setSidebarOpen(false);
  };

  const handleRoleSwitch = (role: 'patient' | 'caregiver' | 'doctor') => {
    setRole(role);
    setProfileDropdownOpen(false);
    navigate(`/${role}`);
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-gray-100 fixed inset-y-0 z-30">
        <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-100">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-healthcare to-teal flex items-center justify-center">
            <Heart size={18} className="text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-navy tracking-tight">Hitaayus</h1>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <button
                key={item.key}
                onClick={() => handleNavigation(item.path)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-healthcare/10 text-healthcare'
                    : 'text-text-secondary hover:bg-gray-50 hover:text-navy'
                }`}
              >
                <Icon size={18} />
                <span>{t(`nav.${item.key}`)}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button
            onClick={() => handleNavigation(`/${currentRole}/settings`)}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-text-secondary hover:bg-gray-50 hover:text-navy transition-all"
          >
            <Settings size={18} />
            <span>{t('nav.settings')}</span>
          </button>
          <button
            onClick={() => { setRole(null); navigate('/roles'); }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-text-secondary hover:bg-gray-50 hover:text-error transition-all mt-1"
          >
            <LogOut size={18} />
            <span>{t('nav.logout')}</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 lg:ml-64">
        {/* Top Nav Bar */}
        <header className="sticky top-0 z-20 glass-nav">
          <div className="flex items-center justify-between px-4 lg:px-6 py-3">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <Menu size={20} className="text-navy" />
              </button>
              <div className="lg:hidden flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-healthcare to-teal flex items-center justify-center">
                  <Heart size={14} className="text-white" />
                </div>
                <span className="font-bold text-navy">Hitaayus</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Language Selector */}
              <div className="relative">
                <button
                  onClick={() => { setLangDropdownOpen(!langDropdownOpen); setProfileDropdownOpen(false); }}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl hover:bg-gray-100 transition-colors text-sm text-text-secondary"
                >
                  <Globe size={16} />
                  <span className="hidden sm:inline">{languageLabels[currentLanguage]}</span>
                  <ChevronDown size={14} />
                </button>
                <AnimatePresence>
                  {langDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-1 w-36 bg-white/90 backdrop-blur-xl border border-gray-200 rounded-xl shadow-lg overflow-hidden z-50"
                    >
                      {(Object.keys(languageLabels) as Language[]).map((lang) => (
                        <button
                          key={lang}
                          onClick={() => { setLanguage(lang); setLangDropdownOpen(false); }}
                          className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                            currentLanguage === lang ? 'bg-healthcare/10 text-healthcare font-medium' : 'text-text-secondary hover:bg-gray-50'
                          }`}
                        >
                          {languageLabels[lang]}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Notifications */}
              <button
                onClick={() => handleNavigation(`/${currentRole}/notifications`)}
                className="relative p-2 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <Bell size={18} className="text-text-secondary" />
                {unreadCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-error rounded-full text-[10px] text-white flex items-center justify-center font-medium">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Profile */}
              <div className="relative">
                <button
                  onClick={() => { setProfileDropdownOpen(!profileDropdownOpen); setLangDropdownOpen(false); }}
                  className="flex items-center gap-2 px-2 py-1.5 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-healthcare to-teal flex items-center justify-center text-white text-xs font-semibold">
                    {roleLabel.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="hidden sm:block text-left">
                    <p className="text-sm font-medium text-navy">{roleLabel}</p>
                    <p className="text-[11px] text-text-secondary">{roleSubLabel}</p>
                  </div>
                  <ChevronDown size={14} className="text-text-secondary hidden sm:block" />
                </button>
                <AnimatePresence>
                  {profileDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-1 w-52 bg-white/90 backdrop-blur-xl border border-gray-200 rounded-xl shadow-lg overflow-hidden z-50"
                    >
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-xs text-text-secondary">Switch Role</p>
                      </div>
                      <button onClick={() => handleRoleSwitch('patient')} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-text-secondary hover:bg-gray-50">
                        <User size={16} /> Patient — Ananya
                      </button>
                      <button onClick={() => handleRoleSwitch('caregiver')} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-text-secondary hover:bg-gray-50">
                        <Users size={16} /> Caregiver — Priya
                      </button>
                      <button onClick={() => handleRoleSwitch('doctor')} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-text-secondary hover:bg-gray-50">
                        <Stethoscope size={16} /> Doctor — Dr. Sharma
                      </button>
                      <div className="border-t border-gray-100">
                        <button onClick={() => { setRole(null); navigate('/'); setProfileDropdownOpen(false); }} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-error hover:bg-error/5">
                          <LogOut size={16} /> Exit Dashboard
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </header>

        {/* Mobile Sidebar Overlay */}
        <AnimatePresence>
          {sidebarOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-navy/40 backdrop-blur-sm z-40 lg:hidden"
                onClick={() => setSidebarOpen(false)}
              />
              <motion.aside
                initial={{ x: -280 }}
                animate={{ x: 0 }}
                exit={{ x: -280 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="fixed inset-y-0 left-0 w-72 bg-white shadow-xl z-50 lg:hidden"
              >
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-healthcare to-teal flex items-center justify-center">
                      <Heart size={16} className="text-white" />
                    </div>
                    <span className="font-bold text-navy text-lg">Hitaayus</span>
                  </div>
                  <button onClick={() => setSidebarOpen(false)} className="p-1.5 rounded-lg hover:bg-gray-100">
                    <X size={18} className="text-text-secondary" />
                  </button>
                </div>
                <nav className="px-3 py-4 space-y-1">
                  {navItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.key}
                        onClick={() => handleNavigation(item.path)}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                          isActive
                            ? 'bg-healthcare/10 text-healthcare'
                            : 'text-text-secondary hover:bg-gray-50'
                        }`}
                      >
                        <Icon size={18} />
                        <span>{t(`nav.${item.key}`)}</span>
                      </button>
                    );
                  })}
                </nav>
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* Page Content */}
        <main className="p-4 lg:p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
