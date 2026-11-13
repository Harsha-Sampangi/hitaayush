import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

interface ToastProps {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  onClose: (id: string) => void;
}

const iconMap = {
  success: CheckCircle,
  error: AlertCircle,
  info: Info,
  warning: AlertTriangle,
};

const colorMap = {
  success: 'bg-success/10 border-success/30 text-success',
  error: 'bg-error/10 border-error/30 text-error',
  info: 'bg-healthcare/10 border-healthcare/30 text-healthcare',
  warning: 'bg-warning/10 border-warning/30 text-warning',
};

export function Toast({ id, message, type, onClose }: ToastProps) {
  const Icon = iconMap[type];

  React.useEffect(() => {
    const timer = setTimeout(() => onClose(id), 4000);
    return () => clearTimeout(timer);
  }, [id, onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.9 }}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg backdrop-blur-sm ${colorMap[type]}`}
    >
      <Icon size={18} />
      <span className="text-sm font-medium text-text-primary">{message}</span>
      <button onClick={() => onClose(id)} className="ml-2 opacity-50 hover:opacity-100 transition-opacity">
        <X size={14} />
      </button>
    </motion.div>
  );
}

export function ToastContainer({ toasts, onClose }: { toasts: { id: string; message: string; type: 'success' | 'error' | 'info' | 'warning' }[]; onClose: (id: string) => void }) {
  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2">
      <AnimatePresence>
        {toasts.map((toast) => (
          <Toast key={toast.id} {...toast} onClose={onClose} />
        ))}
      </AnimatePresence>
    </div>
  );
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function Modal({ isOpen, onClose, title, children, size = 'md' }: ModalProps) {
  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-2xl',
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-navy/40 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={`relative w-full ${sizeClasses[size]} bg-white/90 backdrop-blur-xl border border-white/30 rounded-2xl shadow-2xl overflow-hidden`}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-navy">{title}</h3>
              <button
                onClick={onClose}
                className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X size={20} className="text-text-secondary" />
              </button>
            </div>
            <div className="px-6 py-4 max-h-[70vh] overflow-y-auto">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

interface ProgressBarProps {
  value: number;
  max: number;
  color?: string;
  showLabel?: boolean;
  size?: 'sm' | 'md';
}

export function ProgressBar({ value, max, color = 'bg-healthcare', showLabel = true, size = 'md' }: ProgressBarProps) {
  const percentage = Math.round((value / max) * 100);
  const height = size === 'sm' ? 'h-1.5' : 'h-2.5';

  return (
    <div className="w-full">
      <div className={`w-full bg-gray-100 rounded-full ${height} overflow-hidden`}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className={`${height} rounded-full ${color}`}
        />
      </div>
      {showLabel && (
        <div className="flex justify-between mt-1">
          <span className="text-xs text-text-secondary">{value} of {max}</span>
          <span className="text-xs font-medium text-text-secondary">{percentage}%</span>
        </div>
      )}
    </div>
  );
}

interface StatusBadgeProps {
  status: string;
  size?: 'sm' | 'md';
}

const statusConfig: Record<string, { bg: string; text: string; label: string }> = {
  pending: { bg: 'bg-warning/10', text: 'text-warning', label: 'Pending' },
  scheduled: { bg: 'bg-healthcare/10', text: 'text-healthcare', label: 'Scheduled' },
  completed: { bg: 'bg-success/10', text: 'text-success', label: 'Completed' },
  active: { bg: 'bg-teal/10', text: 'text-teal', label: 'Active' },
  approved: { bg: 'bg-success/10', text: 'text-success', label: 'Approved' },
  draft: { bg: 'bg-gray-100', text: 'text-text-secondary', label: 'Draft' },
  shared: { bg: 'bg-healthcare/10', text: 'text-healthcare', label: 'Shared' },
  taken: { bg: 'bg-success/10', text: 'text-success', label: 'Taken' },
  skipped: { bg: 'bg-error/10', text: 'text-error', label: 'Skipped' },
  missed: { bg: 'bg-error/10', text: 'text-error', label: 'Missed' },
  upcoming: { bg: 'bg-healthcare/10', text: 'text-healthcare', label: 'Upcoming' },
  rescheduled: { bg: 'bg-warning/10', text: 'text-warning', label: 'Rescheduled' },
  cancelled: { bg: 'bg-error/10', text: 'text-error', label: 'Cancelled' },
  report_uploaded: { bg: 'bg-teal/10', text: 'text-teal', label: 'Report Uploaded' },
  doctor_review: { bg: 'bg-warning/10', text: 'text-warning', label: 'Doctor Review' },
  pending_approval: { bg: 'bg-warning/10', text: 'text-warning', label: 'Pending Approval' },
};

export function StatusBadge({ status, size = 'sm' }: StatusBadgeProps) {
  const config = statusConfig[status] || { bg: 'bg-gray-100', text: 'text-text-secondary', label: status };
  const sizeClasses = size === 'sm' ? 'px-2.5 py-0.5 text-xs' : 'px-3 py-1 text-sm';

  return (
    <span className={`inline-flex items-center rounded-full font-medium ${config.bg} ${config.text} ${sizeClasses}`}>
      {config.label}
    </span>
  );
}

export function LoadingSpinner({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = { sm: 'w-4 h-4', md: 'w-8 h-8', lg: 'w-12 h-12' };
  return (
    <div className="flex items-center justify-center p-8">
      <div className={`${sizeClasses[size]} border-2 border-gray-200 border-t-healthcare rounded-full animate-spin`} />
    </div>
  );
}

export function EmptyState({ icon: Icon, title, description, action }: { icon: React.ElementType; title: string; description: string; action?: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-12 px-4 text-center"
    >
      <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
        <Icon size={28} className="text-text-secondary" />
      </div>
      <h3 className="text-lg font-semibold text-navy mb-2">{title}</h3>
      <p className="text-text-secondary text-sm max-w-sm">{description}</p>
      {action && <div className="mt-4">{action}</div>}
    </motion.div>
  );
}

export function DemoNotice() {
  return (
    <div className="bg-healthcare/5 border border-healthcare/20 rounded-xl px-4 py-3 flex items-start gap-3">
      <Info size={16} className="text-healthcare mt-0.5 flex-shrink-0" />
      <p className="text-xs text-text-secondary">
        This is an interactive prototype using illustrative data. It is not connected to real patient records or clinical systems.
      </p>
    </div>
  );
}

export function MedicalDisclaimer({ text }: { text?: string }) {
  return (
    <div className="bg-warning/5 border border-warning/20 rounded-xl px-4 py-3 flex items-start gap-3 mt-4">
      <AlertTriangle size={16} className="text-warning mt-0.5 flex-shrink-0" />
      <p className="text-xs text-text-secondary">
        {text || 'For personalized medical guidance, please contact your doctor. AI explanations are informational and not a replacement for professional medical advice.'}
      </p>
    </div>
  );
}

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
}

export function Card({ children, className = '', onClick, hover = true }: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={hover ? { y: -2 } : undefined}
      onClick={onClick}
      className={`bg-white rounded-2xl shadow-sm border border-gray-100 p-6 transition-all duration-200 ${hover ? 'hover:shadow-md cursor-pointer' : ''} ${className}`}
    >
      {children}
    </motion.div>
  );
}

export function GlassCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white/70 backdrop-blur-xl border border-white/30 shadow-lg rounded-2xl p-6 ${className}`}
    >
      {children}
    </motion.div>
  );
}

export function StatCard({ icon: Icon, label, value, trend, color = 'text-healthcare' }: { icon: React.ElementType; label: string; value: string | number; trend?: string; color?: string }) {
  return (
    <Card>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-text-secondary mb-1">{label}</p>
          <p className="text-2xl font-bold text-navy">{value}</p>
          {trend && <p className="text-xs text-success mt-1">{trend}</p>}
        </div>
        <div className={`w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center ${color}`}>
          <Icon size={20} />
        </div>
      </div>
    </Card>
  );
}
