import React, { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import type {
  Role,
  Language,
  Notification,
  MedicineDose,
  ProgressUpdate,
} from '@/types';
import {
  mockNotifications,
  mockTodayDoses,
  mockCarePlanStatuses,
  mockProgressUpdates,
} from '@/data/mockData';

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
}

interface AppContextValue {
  currentRole: Role | null;
  currentLanguage: Language;
  setRole: (role: Role | null) => void;
  setLanguage: (lang: Language) => void;
  notifications: Notification[];
  markNotificationRead: (id: string) => void;
  unreadCount: number;
  medicineDoses: MedicineDose[];
  markMedicineTaken: (doseId: string) => void;
  markMedicineSkipped: (doseId: string, reason: string) => void;
  carePlanStatus: Record<string, string>;
  updateCarePlanStatus: (planId: string, status: string) => void;
  progressUpdates: ProgressUpdate[];
  addProgressUpdate: (update: Omit<ProgressUpdate, 'id'>) => void;
  toasts: Toast[];
  addToast: (message: string, type: Toast['type']) => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const stored = localStorage.getItem(key);
    if (stored !== null) {
      return JSON.parse(stored) as T;
    }
  } catch {
    // Ignore parse errors, use fallback
  }
  return fallback;
}

function saveToStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore storage errors
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentRole, setCurrentRole] = useState<Role | null>(() =>
    loadFromStorage<Role | null>('hitaayus_role', null)
  );

  const [currentLanguage, setCurrentLanguage] = useState<Language>(() =>
    loadFromStorage<Language>('hitaayus_language', 'en')
  );

  const [notifications, setNotifications] = useState<Notification[]>(() =>
    loadFromStorage<Notification[]>('hitaayus_notifications', mockNotifications)
  );

  const [medicineDoses, setMedicineDoses] = useState<MedicineDose[]>(() =>
    loadFromStorage<MedicineDose[]>('hitaayus_doses', mockTodayDoses)
  );

  const [carePlanStatus, setCarePlanStatus] = useState<Record<string, string>>(() =>
    loadFromStorage<Record<string, string>>('hitaayus_careplan_status', mockCarePlanStatuses)
  );

  const [progressUpdates, setProgressUpdates] = useState<ProgressUpdate[]>(() =>
    loadFromStorage<ProgressUpdate[]>('hitaayus_progress', mockProgressUpdates)
  );

  const [toasts, setToasts] = useState<Toast[]>([]);

  // Persist to localStorage on changes
  useEffect(() => {
    saveToStorage('hitaayus_role', currentRole);
  }, [currentRole]);

  useEffect(() => {
    saveToStorage('hitaayus_language', currentLanguage);
  }, [currentLanguage]);

  useEffect(() => {
    saveToStorage('hitaayus_notifications', notifications);
  }, [notifications]);

  useEffect(() => {
    saveToStorage('hitaayus_doses', medicineDoses);
  }, [medicineDoses]);

  useEffect(() => {
    saveToStorage('hitaayus_careplan_status', carePlanStatus);
  }, [carePlanStatus]);

  useEffect(() => {
    saveToStorage('hitaayus_progress', progressUpdates);
  }, [progressUpdates]);

  const setRole = useCallback((role: Role | null) => {
    setCurrentRole(role);
  }, []);

  const setLanguage = useCallback((lang: Language) => {
    setCurrentLanguage(lang);
  }, []);

  const markNotificationRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markMedicineTaken = useCallback((doseId: string) => {
    setMedicineDoses((prev) =>
      prev.map((dose) =>
        dose.id === doseId
          ? { ...dose, status: 'taken' as const, takenAt: new Date().toISOString() }
          : dose
      )
    );
  }, []);

  const markMedicineSkipped = useCallback((doseId: string, reason: string) => {
    setMedicineDoses((prev) =>
      prev.map((dose) =>
        dose.id === doseId
          ? { ...dose, status: 'skipped' as const, skipReason: reason }
          : dose
      )
    );
  }, []);

  const updateCarePlanStatus = useCallback((planId: string, status: string) => {
    setCarePlanStatus((prev) => ({ ...prev, [planId]: status }));
  }, []);

  const addProgressUpdate = useCallback((update: Omit<ProgressUpdate, 'id'>) => {
    const newUpdate: ProgressUpdate = { ...update, id: generateId() };
    setProgressUpdates((prev) => [newUpdate, ...prev]);
  }, []);

  const addToast = useCallback((message: string, type: Toast['type']) => {
    const id = generateId();
    const toast: Toast = { id, message, type };
    setToasts((prev) => [...prev, toast]);

    // Auto-remove after 4 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const value: AppContextValue = {
    currentRole,
    currentLanguage,
    setRole,
    setLanguage,
    notifications,
    markNotificationRead,
    unreadCount,
    medicineDoses,
    markMedicineTaken,
    markMedicineSkipped,
    carePlanStatus,
    updateCarePlanStatus,
    progressUpdates,
    addProgressUpdate,
    toasts,
    addToast,
    removeToast,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp(): AppContextValue {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

export default AppContext;
