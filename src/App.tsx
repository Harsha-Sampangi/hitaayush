import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from '@/context/AppContext';
import { ToastContainer } from '@/components/ui';
import { DashboardLayout } from '@/components/layout/DashboardLayout';

// Pages
import { LandingPage } from '@/pages/LandingPage';
import { RoleSelectionPage } from '@/pages/RoleSelectionPage';
import { RoadmapPage } from '@/pages/RoadmapPage';

// Patient Pages
import { PatientDashboard } from '@/pages/patient/PatientDashboard';
import { PatientPrescriptions } from '@/pages/patient/PatientPrescriptions';
import { PatientMedicines } from '@/pages/patient/PatientMedicines';
import { PatientTests } from '@/pages/patient/PatientTests';
import { PatientAppointments } from '@/pages/patient/PatientAppointments';
import { PatientTimeline } from '@/pages/patient/PatientTimeline';
import { PatientFamily } from '@/pages/patient/PatientFamily';
import { PatientNotifications } from '@/pages/patient/PatientNotifications';
import { PatientSettings } from '@/pages/patient/PatientSettings';

// Caregiver Pages
import { CaregiverDashboard } from '@/pages/caregiver/CaregiverDashboard';
import { CaregiverPatients } from '@/pages/caregiver/CaregiverPatients';
import { CaregiverMedicines } from '@/pages/caregiver/CaregiverMedicines';
import { CaregiverAppointments } from '@/pages/caregiver/CaregiverAppointments';
import { CaregiverTests } from '@/pages/caregiver/CaregiverTests';
import { CaregiverSettings } from '@/pages/caregiver/CaregiverSettings';

// Doctor Pages
import { DoctorDashboard } from '@/pages/doctor/DoctorDashboard';
import { DoctorPatients } from '@/pages/doctor/DoctorPatients';
import { DoctorPatientDetail } from '@/pages/doctor/DoctorPatientDetail';
import { DoctorCarePlanCreate } from '@/pages/doctor/DoctorCarePlanCreate';
import { DoctorAppointments } from '@/pages/doctor/DoctorAppointments';
import { DoctorSettings } from '@/pages/doctor/DoctorSettings';

function AppContent() {
  const { toasts, removeToast } = useApp();

  return (
    <>
      <Routes>
        {/* Public Landing & Role Selection */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/roles" element={<RoleSelectionPage />} />
        <Route path="/roadmap" element={<RoadmapPage />} />

        {/* Patient Dashboard Routes */}
        <Route path="/patient" element={<DashboardLayout><PatientDashboard /></DashboardLayout>} />
        <Route path="/patient/prescriptions" element={<DashboardLayout><PatientPrescriptions /></DashboardLayout>} />
        <Route path="/patient/medicines" element={<DashboardLayout><PatientMedicines /></DashboardLayout>} />
        <Route path="/patient/tests" element={<DashboardLayout><PatientTests /></DashboardLayout>} />
        <Route path="/patient/appointments" element={<DashboardLayout><PatientAppointments /></DashboardLayout>} />
        <Route path="/patient/timeline" element={<DashboardLayout><PatientTimeline /></DashboardLayout>} />
        <Route path="/patient/family" element={<DashboardLayout><PatientFamily /></DashboardLayout>} />
        <Route path="/patient/notifications" element={<DashboardLayout><PatientNotifications /></DashboardLayout>} />
        <Route path="/patient/settings" element={<DashboardLayout><PatientSettings /></DashboardLayout>} />

        {/* Caregiver Dashboard Routes */}
        <Route path="/caregiver" element={<DashboardLayout><CaregiverDashboard /></DashboardLayout>} />
        <Route path="/caregiver/patients" element={<DashboardLayout><CaregiverPatients /></DashboardLayout>} />
        <Route path="/caregiver/medicines" element={<DashboardLayout><CaregiverMedicines /></DashboardLayout>} />
        <Route path="/caregiver/appointments" element={<DashboardLayout><CaregiverAppointments /></DashboardLayout>} />
        <Route path="/caregiver/tests" element={<DashboardLayout><CaregiverTests /></DashboardLayout>} />
        <Route path="/caregiver/notifications" element={<DashboardLayout><PatientNotifications /></DashboardLayout>} />
        <Route path="/caregiver/settings" element={<DashboardLayout><CaregiverSettings /></DashboardLayout>} />

        {/* Doctor Dashboard Routes */}
        <Route path="/doctor" element={<DashboardLayout><DoctorDashboard /></DashboardLayout>} />
        <Route path="/doctor/patients" element={<DashboardLayout><DoctorPatients /></DashboardLayout>} />
        <Route path="/doctor/patients/:id" element={<DashboardLayout><DoctorPatientDetail /></DashboardLayout>} />
        <Route path="/doctor/care-plan" element={<DashboardLayout><DoctorCarePlanCreate /></DashboardLayout>} />
        <Route path="/doctor/appointments" element={<DashboardLayout><DoctorAppointments /></DashboardLayout>} />
        <Route path="/doctor/notifications" element={<DashboardLayout><PatientNotifications /></DashboardLayout>} />
        <Route path="/doctor/settings" element={<DashboardLayout><DoctorSettings /></DashboardLayout>} />

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Global Toast Container */}
      <ToastContainer toasts={toasts} onClose={removeToast} />
    </>
  );
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AppProvider>
  );
}
