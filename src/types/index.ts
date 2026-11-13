export type Role = 'patient' | 'caregiver' | 'doctor';
export type Language = 'en' | 'te' | 'hi';

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  bloodGroup: string;
  phone: string;
  email: string;
  avatar?: string;
  lastConsultation?: string;
  followUpDate?: string;
  carePlanStatus?: 'draft' | 'pending' | 'approved' | 'shared';
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  hospital: string;
  phone: string;
  email: string;
  avatar?: string;
}

export interface Caregiver {
  id: string;
  name: string;
  relation: string;
  phone: string;
  email: string;
  connectedPatients: string[];
  permissions: CaregiverPermissions;
}

export interface CaregiverPermissions {
  viewPrescriptions: boolean;
  viewMedicineSchedules: boolean;
  viewTestReports: boolean;
  viewAppointments: boolean;
  receiveReminders: boolean;
}

export interface Medicine {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  timing: string[];
  startDate: string;
  endDate: string;
  instructions: string;
  prescribedBy: string;
  status: 'active' | 'completed' | 'upcoming';
}

export interface MedicineDose {
  id: string;
  medicineId: string;
  medicineName: string;
  dosage: string;
  time: string;
  status: 'pending' | 'taken' | 'skipped' | 'missed';
  takenAt?: string;
  skipReason?: string;
}

export interface Prescription {
  id: string;
  doctorId: string;
  doctorName: string;
  patientId: string;
  date: string;
  diagnosis: string;
  medicines: PrescriptionMedicine[];
  instructions: string;
  followUp?: string;
  status: 'active' | 'completed';
}

export interface PrescriptionMedicine {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
  originalInstruction: string;
  simpleExplanation: Record<Language, string>;
}

export interface LabTest {
  id: string;
  name: string;
  date: string;
  status: 'pending' | 'scheduled' | 'completed' | 'report_uploaded' | 'doctor_review';
  doctorId: string;
  doctorName: string;
  patientId: string;
  results?: LabResult[];
  reportUrl?: string;
}

export interface LabResult {
  parameter: string;
  value: string;
  unit: string;
  referenceRange: string;
  status: 'normal' | 'high' | 'low';
  explanation: Record<Language, string>;
}

export interface Appointment {
  id: string;
  doctorId: string;
  doctorName: string;
  doctorSpecialty: string;
  patientId: string;
  patientName: string;
  date: string;
  time: string;
  type: 'consultation' | 'follow-up' | 'review';
  status: 'upcoming' | 'completed' | 'rescheduled' | 'cancelled';
  reason: string;
}

export interface CarePlan {
  id: string;
  doctorId: string;
  patientId: string;
  date: string;
  status: 'draft' | 'pending_approval' | 'approved' | 'shared';
  prescriptions: PrescriptionMedicine[];
  tests: { name: string; date: string; instructions: string }[];
  followUp: { date: string; time: string; reason: string };
  instructions: string;
  educationNotes: string;
}

export interface TimelineEvent {
  id: string;
  date: string;
  time: string;
  type: 'consultation' | 'prescription' | 'medicine' | 'test' | 'report' | 'appointment' | 'update';
  title: string;
  description: string;
  icon?: string;
}

export interface Notification {
  id: string;
  type: 'medicine' | 'test' | 'appointment' | 'care_plan' | 'update' | 'caregiver';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}

export interface ProgressUpdate {
  id: string;
  patientId: string;
  date: string;
  feeling: 'better' | 'no_change' | 'worse' | 'need_help';
  completedTest: boolean;
  difficulty: boolean;
  needHelp: boolean;
  notes: string;
  reviewedByDoctor: boolean;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}
