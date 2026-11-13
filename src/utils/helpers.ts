/**
 * Format an ISO date string to a readable date.
 * e.g. "2024-03-15" → "Mar 15, 2024"
 */
export function formatDate(date: string): string {
  try {
    const d = new Date(date);
    if (isNaN(d.getTime())) return date;
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return date;
  }
}

/**
 * Format a time string to a readable format.
 * e.g. "14:30" → "2:30 PM", or "08:00:00" → "8:00 AM"
 */
export function formatTime(time: string): string {
  try {
    // Handle HH:mm or HH:mm:ss formats
    const parts = time.split(':');
    if (parts.length < 2) return time;

    let hours = parseInt(parts[0], 10);
    const minutes = parts[1];
    if (isNaN(hours)) return time;

    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;

    return `${hours}:${minutes} ${ampm}`;
  } catch {
    return time;
  }
}

/**
 * Returns a greeting based on the current time of day.
 */
export function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

/**
 * Get initials from a full name.
 * e.g. "Harsha Vardhan" → "HV", "Ravi" → "R"
 */
export function getInitials(name: string): string {
  if (!name || !name.trim()) return '';
  return name
    .trim()
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('');
}

/**
 * Join class names, filtering out falsy values.
 * e.g. classNames('btn', isActive && 'btn-active', undefined) → "btn btn-active"
 */
export function classNames(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter((c): c is string => typeof c === 'string' && c.length > 0).join(' ');
}

/**
 * Generate a simple unique ID string.
 */
export function generateId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Returns a Tailwind text-color class for a given status.
 */
export function getStatusColor(status: string): string {
  const colorMap: Record<string, string> = {
    active: 'text-green-600',
    completed: 'text-blue-600',
    upcoming: 'text-yellow-600',
    pending: 'text-yellow-600',
    taken: 'text-green-600',
    skipped: 'text-red-500',
    missed: 'text-red-600',
    normal: 'text-green-600',
    high: 'text-red-600',
    low: 'text-yellow-600',
    draft: 'text-gray-500',
    pending_approval: 'text-yellow-600',
    approved: 'text-green-600',
    shared: 'text-blue-600',
    scheduled: 'text-blue-500',
    report_uploaded: 'text-indigo-600',
    doctor_review: 'text-purple-600',
    rescheduled: 'text-orange-500',
    cancelled: 'text-red-600',
    better: 'text-green-600',
    no_change: 'text-yellow-600',
    worse: 'text-red-600',
    need_help: 'text-red-700',
  };

  return colorMap[status] ?? 'text-gray-600';
}

/**
 * Returns a Tailwind badge class string for a given status.
 */
export function getStatusBadgeClass(status: string): string {
  const badgeMap: Record<string, string> = {
    active: 'bg-green-100 text-green-800 border-green-200',
    completed: 'bg-blue-100 text-blue-800 border-blue-200',
    upcoming: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    taken: 'bg-green-100 text-green-800 border-green-200',
    skipped: 'bg-red-100 text-red-800 border-red-200',
    missed: 'bg-red-100 text-red-800 border-red-200',
    normal: 'bg-green-100 text-green-800 border-green-200',
    high: 'bg-red-100 text-red-800 border-red-200',
    low: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    draft: 'bg-gray-100 text-gray-700 border-gray-200',
    pending_approval: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    approved: 'bg-green-100 text-green-800 border-green-200',
    shared: 'bg-blue-100 text-blue-800 border-blue-200',
    scheduled: 'bg-blue-100 text-blue-800 border-blue-200',
    report_uploaded: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    doctor_review: 'bg-purple-100 text-purple-800 border-purple-200',
    rescheduled: 'bg-orange-100 text-orange-800 border-orange-200',
    cancelled: 'bg-red-100 text-red-800 border-red-200',
    better: 'bg-green-100 text-green-800 border-green-200',
    no_change: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    worse: 'bg-red-100 text-red-800 border-red-200',
    need_help: 'bg-red-100 text-red-800 border-red-200',
  };

  return badgeMap[status] ?? 'bg-gray-100 text-gray-700 border-gray-200';
}
