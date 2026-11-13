# 🏥 Hitaayus (హి తాయుష్ / हितायुष)
### AI-Powered Post-Consultation Healthcare Platform
> *"Healthcare should not restart from zero at every visit."*

[![React](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC.svg)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-ff69b4.svg)](https://www.framer.com/motion/)

---

## 🌟 Executive Overview

A patient’s healthcare journey does **not** end when they leave the doctor’s consultation room. In reality, that is where the most critical phase begins: taking multiple medications, completing laboratory investigations, following lifestyle adjustments, and scheduling timely follow-ups.

Yet, information frequently gets lost. Patients struggle with illegible prescriptions and Latin medical shorthand, miss doses, lose diagnostic records, and feel disconnected between visits.

**Hitaayus** is a modern, Apple Liquid Glass-inspired healthcare continuity platform designed specifically for **Post-Consultation Care**. It seamlessly connects three vital stakeholders in one unified care loop:

1. **Patients:** Understand medical instructions in plain everyday language, track medicines with one-tap compliance, schedule lab tests, and submit daily check-ins.
2. **Caregivers / Family Members:** Support loved ones with permission-based access, trigger medication reminders, and log assisted doses.
3. **Doctors:** Formulate structured digital care plans, oversee patient recovery between visits, and review continuous health timelines before the next consult.

---

## 🎨 Key Features & Architectural Innovations

### 1. 🤖 AI Prescription Clarifier (Multilingual + Audio)
- Converts complex doctor instructions (e.g., *"Take Tab OD pc"*) into simple everyday language.
- Tri-lingual support: **English**, **తెలుగు (Telugu)**, and **हिन्दी (Hindi)**.
- Integrated text-to-speech engine providing simulated voice readouts for elderly or visually impaired patients.
- Strict medical safety safeguards: never alters dosage or suggests independent treatments.

### 2. 💊 Interactive Medicine Management & Skip Logging
- Live daily schedule categorized by morning, afternoon, and night doses.
- **Mark Taken** updates recovery progress in real time.
- **Skip with Reason** captures clinical reasons (e.g., stomach discomfort, fasting, forgot) to keep the supervising doctor informed.

### 3. 🧪 Diagnostic Lab Investigation Tracking
- Tracks upcoming lab tests (e.g., Complete Blood Count, Vitamin D).
- Simulates laboratory PDF/Scan upload with extraction animation.
- **Hitaayus Insight™:** Simplifies test parameters without generating clinical diagnoses, with a clear prompt to consult the doctor.

### 4. 📅 Follow-Up Coordination & Rescheduling
- Displays confirmed follow-up reviews with appointment location and reason.
- Interactive reschedule request flow with patient confirmation dialogs.

### 5. ⏳ Unified Chronological Health Timeline
- Vertical health record showing past consultations, uploaded prescriptions, medicine adherence milestones, and check-in logs.
- Category filters (Consultations, Prescriptions, Medicines, Tests, Reports, Appointments).
- Proves the core thesis: **patient data never resets to zero**.

### 6. 🛡️ Patient-Controlled Caregiver Access & Consent
- Granular permission toggles: Prescriptions, Medicine Schedules, Lab Reports, Appointments, and Reminders.
- One-tap consent pause/restore functionality.

### 7. 🩺 Doctor Care Plan Engine (Core Workflow)
- Structured clinical builder for doctors to prescribe medications, order lab tests, set follow-up milestones, and add lifestyle/dietary guidance.
- 4-stage governance pipeline: `Draft` ➔ `Pending Approval` ➔ `Approved` ➔ `Shared With Patient`.
- **Live Sync:** Approving and sharing a plan instantly updates the patient's and caregiver's portals.

### 8. 📊 Real-Time Patient Check-In Stream
- Patients submit daily updates (*Feeling Better, No Change, Feeling Worse, Need Help*), sample collection confirmations, and notes.
- Submissions stream directly into the Doctor’s clinical feed and the Caregiver’s supervision board.

### 9. 🤖 Floating AI Care Assistant
- Persistent floating assistant accessible across patient views.
- Quick prompts for prescription explanation, daily dose queries, upcoming appointments, and pending lab tests in all 3 languages.

---

## 🚀 15-Step Connected Demo Journey

Experience the complete multi-stakeholder care continuum:

1. **Doctor Portal (`/doctor`):** Log in as **Dr. Rahul Sharma** (General Medicine).
2. **Select Patient:** In the registry table, select **Ananya Reddy (HT-2026-001)**.
3. **Create Care Plan:** Click **"+ Create Post-Care Plan"** (`/doctor/care-plan`).
4. **Approve & Share:** Review the medication and lab order draft, click **"Review Care Plan"**, and click **"Approve & Share Live with Patient"**.
5. **Patient Sync (`/patient`):** Switch role to **Patient — Ananya Reddy**. Notice the new care plan and schedule.
6. **Prescriptions (`/patient/prescriptions`):** Open the active prescription from Dr. Sharma.
7. **AI Clarification:** Click **"Understand Instruction"**. Switch between English, Telugu, and Hindi, and test the voice readout.
8. **Medicine Schedule (`/patient/medicines`):** Inspect today’s doses.
9. **Mark Taken:** Mark **Vitamin D3** as *"Taken"*. Observe the instant badge update and adherence score increment.
10. **Upcoming Tests (`/patient/tests`):** View the scheduled **Complete Blood Count (CBC)** for 15 November.
11. **Upload Report:** Click **"Upload Lab Report"** to simulate document synchronization with the clinic.
12. **Daily Check-In:** Click **"Daily Health Check-In"**, select *"Feeling Better"*, and submit an update.
13. **Caregiver View (`/caregiver`):** Switch to **Caregiver — Priya Reddy**. Observe Ananya’s taken dose, upcoming fasting reminder, and the synchronized health check-in log.
14. **Doctor Feed (`/doctor`):** Switch back to Dr. Sharma. See Ananya's check-in log in the live clinical stream.
15. **Health Timeline (`/patient/timeline`):** Verify that all consultations, prescriptions, doses, and check-ins are preserved chronologically.

---

## 💻 Tech Stack

- **Framework:** [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool:** [Vite 6](https://vitejs.dev/)
- **Styling:** [Tailwind CSS 3.4](https://tailwindcss.com/) with custom Liquid Glass design utilities
- **Icons:** [Lucide React](https://lucide.dev/)
- **Animations:** [Framer Motion 12](https://www.framer.com/motion/)
- **Routing:** [React Router 7](https://reactrouter.com/)
- **State Management:** Reactive React Context (`AppContext`) with `localStorage` persistence

---

## 📂 Project Structure

```
hitaayush/
├── public/                     # Static assets
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   └── DashboardLayout.tsx      # Responsive sidebar, liquid glass nav, role switcher
│   │   ├── shared/
│   │   │   ├── AiAssistantModal.tsx     # Floating multilingual care assistant
│   │   │   ├── CheckInModal.tsx         # Patient daily progress check-in
│   │   │   ├── PrescriptionAiModal.tsx  # Side-by-side AI prescription clarifier
│   │   │   ├── ReportAiModal.tsx        # Diagnostic report insight breakdown
│   │   │   └── SkipMedicineModal.tsx    # Skipped dose reason capture
│   │   └── ui/                          # Reusable buttons, badges, modals, toast container
│   ├── context/
│   │   └── AppContext.tsx               # Global state for roles, doses, check-ins, toasts
│   ├── data/
│   │   ├── mockData.ts                  # Realistic multi-stakeholder mock datasets
│   │   └── translations.ts              # Natural translations for English, Telugu, and Hindi
│   ├── hooks/
│   │   └── useTranslation.ts            # Dynamic localization hook
│   ├── pages/
│   │   ├── LandingPage.tsx              # Apple-inspired public landing page
│   │   ├── RoleSelectionPage.tsx        # Demo role-selection portal
│   │   ├── RoadmapPage.tsx              # Future strategic horizons (ABDM, MediKiosks, etc.)
│   │   ├── patient/                     # 9 Patient views (Dashboard, Prescriptions, Meds, Labs, etc.)
│   │   ├── caregiver/                   # 6 Caregiver views (Dashboard, Meds, Coordination, etc.)
│   │   └── doctor/                      # 6 Doctor views (Dashboard, Registry, Care Plan Engine, etc.)
│   ├── types/
│   │   └── index.ts                     # TypeScript interfaces and domain models
│   ├── utils/
│   │   └── helpers.ts                   # Formatting and helper utilities
│   ├── App.tsx                          # Route definitions & global providers
│   ├── index.css                        # Tailwind directives & liquid glass classes
│   └── main.tsx                         # React root entry point
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## 🛠️ Quick Start & Installation

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm or yarn

### 1. Clone the repository
```bash
git clone https://github.com/Harsha-Sampangi/hitaayush.git
cd hitaayush
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start development server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Build for production
```bash
npm run build
npm run preview
```

---

## 🔒 Medical Disclaimer
*Hitaayus is an interactive design prototype created for demonstration and evaluation purposes. It uses illustrative sample data and is not connected to live hospital clinical systems. AI-generated explanations are simplified for educational readability and do not replace professional medical advice.*

---

**Developed with ❤️ for Connected Healthcare Continuity.**
