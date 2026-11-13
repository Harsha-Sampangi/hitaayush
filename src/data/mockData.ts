import { Patient, Doctor, Caregiver, Medicine, MedicineDose, Prescription, PrescriptionMedicine, LabTest, LabResult, Appointment, CarePlan, TimelineEvent, Notification, ProgressUpdate } from '@/types';
import type { Language } from '@/types';

// ─── PATIENTS ────────────────────────────────────────────────────────────────

export const PATIENTS: Patient[] = [
  {
    id: 'HT-2026-001',
    name: 'Ananya Reddy',
    age: 28,
    gender: 'Female',
    bloodGroup: 'O+',
    phone: '+91 98765 43210',
    email: 'ananya.reddy@email.com',
    lastConsultation: '10 November 2026',
    followUpDate: '20 November 2026',
    carePlanStatus: 'shared',
  },
  {
    id: 'HT-2026-002',
    name: 'Rahul Kumar',
    age: 45,
    gender: 'Male',
    bloodGroup: 'A+',
    phone: '+91 98765 43211',
    email: 'rahul.kumar@email.com',
    lastConsultation: '5 November 2026',
    followUpDate: '25 November 2026',
    carePlanStatus: 'approved',
  },
  {
    id: 'HT-2026-003',
    name: 'Sneha Varma',
    age: 35,
    gender: 'Female',
    bloodGroup: 'B+',
    phone: '+91 98765 43212',
    email: 'sneha.varma@email.com',
    lastConsultation: '8 November 2026',
    followUpDate: '22 November 2026',
    carePlanStatus: 'pending',
  },
  {
    id: 'HT-2026-004',
    name: 'Arjun Rao',
    age: 52,
    gender: 'Male',
    bloodGroup: 'AB+',
    phone: '+91 98765 43213',
    email: 'arjun.rao@email.com',
    lastConsultation: '1 November 2026',
    followUpDate: '1 December 2026',
    carePlanStatus: 'shared',
  },
  {
    id: 'HT-2026-005',
    name: 'Priya Sharma',
    age: 30,
    gender: 'Female',
    bloodGroup: 'O-',
    phone: '+91 98765 43214',
    email: 'priya.sharma@email.com',
    lastConsultation: '12 November 2026',
    followUpDate: '26 November 2026',
    carePlanStatus: 'draft',
  },
];

// ─── DOCTOR ──────────────────────────────────────────────────────────────────

export const DOCTOR: Doctor = {
  id: 'DOC-001',
  name: 'Dr. Rahul Sharma',
  specialty: 'General Medicine',
  hospital: 'Hitaayus Demo Hospital',
  phone: '+91 99887 76655',
  email: 'dr.rahul.sharma@hitaayus.com',
};

// ─── CAREGIVER ───────────────────────────────────────────────────────────────

export const CAREGIVER: Caregiver = {
  id: 'CG-001',
  name: 'Priya Reddy',
  relation: 'Sister',
  phone: '+91 98765 43220',
  email: 'priya.reddy@email.com',
  connectedPatients: ['HT-2026-001'],
  permissions: {
    viewPrescriptions: true,
    viewMedicineSchedules: true,
    viewTestReports: true,
    viewAppointments: true,
    receiveReminders: true,
  },
};

// ─── PRESCRIPTION MEDICINES (shared across prescriptions & care plan) ────────

const vitaminD3Medicine: PrescriptionMedicine = {
  name: 'Vitamin D3 (Cholecalciferol)',
  dosage: '60,000 IU',
  frequency: 'Once weekly',
  duration: '8 weeks',
  instructions: 'Take with a fatty meal for better absorption.',
  originalInstruction: 'Take one sachet (60,000 IU) orally once a week with a fatty meal.',
  simpleExplanation: {
    en: 'Take one packet by mouth once every week along with a meal that has some oil or ghee in it. This helps your body absorb the vitamin better.',
    te: 'వారంలో ఒకసారి ఒక ప్యాకెట్ నోటి ద్వారా తీసుకోండి, నూనె లేదా నెయ్యి ఉన్న భోజనంతో తీసుకోండి. ఇది మీ శరీరానికి విటమిన్ ను బాగా గ్రహించడంలో సహాయపడుతుంది.',
    hi: 'सप्ताह में एक बार एक पैकेट मुँह से लें, ऐसे भोजन के साथ जिसमें तेल या घी हो। इससे आपके शरीर को विटामिन बेहतर तरीके से अवशोषित करने में मदद मिलती है।',
  },
};

const ironFolicAcidMedicine: PrescriptionMedicine = {
  name: 'Iron + Folic Acid',
  dosage: '100mg + 500mcg',
  frequency: 'Once daily after food',
  duration: '90 days',
  instructions: 'Take after lunch. Avoid tea/coffee 1 hour before and after taking this medicine.',
  originalInstruction: 'Take one tablet orally once daily after food. Avoid tea, coffee, and dairy 1 hour before and after.',
  simpleExplanation: {
    en: 'Take one tablet by mouth once every day after eating a meal (preferably lunch). Do not drink tea, coffee, or milk one hour before or after taking this tablet.',
    te: 'భోజనం తర్వాత (ముఖ్యంగా మధ్యాహ్న భోజనం తర్వాత) రోజుకు ఒక టాబ్లెట్ నోటి ద్వారా తీసుకోండి. ఈ టాబ్లెట్ తీసుకునే ముందు లేదా తర్వాత ఒక గంట టీ, కాఫీ లేదా పాలు తాగకండి.',
    hi: 'भोजन के बाद (विशेषकर दोपहर के भोजन के बाद) रोजाना एक गोली मुँह से लें। इस गोली को लेने से एक घंटे पहले या बाद में चाय, कॉफी या दूध न पिएं।',
  },
};

const calciumVitDMedicine: PrescriptionMedicine = {
  name: 'Calcium + Vitamin D',
  dosage: '500mg + 250 IU',
  frequency: 'Once daily after dinner',
  duration: '90 days',
  instructions: 'Take after dinner. Do not take at the same time as iron tablet.',
  originalInstruction: 'Take one tablet orally once daily after dinner. Maintain at least 2 hours gap from iron supplement.',
  simpleExplanation: {
    en: 'Take one tablet by mouth every night after dinner. Make sure there is at least a 2-hour gap between this tablet and your iron tablet, as they can interfere with each other.',
    te: 'ప్రతి రాత్రి భోజనం తర్వాత ఒక టాబ్లెట్ నోటి ద్వారా తీసుకోండి. ఈ టాబ్లెట్ మరియు మీ ఐరన్ టాబ్లెట్ మధ్య కనీసం 2 గంటల తేడా ఉండేలా చూసుకోండి, ఎందుకంటే అవి ఒకదానికొకటి అడ్డుపడతాయి.',
    hi: 'हर रात खाने के बाद एक गोली मुँह से लें। इस गोली और आयरन की गोली के बीच कम से कम 2 घंटे का अंतर रखें, क्योंकि ये एक-दूसरे में हस्तक्षेप कर सकती हैं।',
  },
};

const multivitaminMedicine: PrescriptionMedicine = {
  name: 'Multivitamin (A-Z)',
  dosage: '1 tablet',
  frequency: 'Once daily after breakfast',
  duration: '30 days',
  instructions: 'Take after breakfast.',
  originalInstruction: 'Take one tablet orally once daily after breakfast.',
  simpleExplanation: {
    en: 'Take one tablet by mouth every day after eating breakfast.',
    te: 'ప్రతి రోజు అల్పాహారం తర్వాత ఒక టాబ్లెట్ నోటి ద్వారా తీసుకోండి.',
    hi: 'हर दिन नाश्ते के बाद एक गोली मुँह से लें।',
  },
};

// ─── PRESCRIPTIONS ───────────────────────────────────────────────────────────

export const PRESCRIPTIONS: Prescription[] = [
  {
    id: 'RX-2026-001',
    doctorId: 'DOC-001',
    doctorName: 'Dr. Rahul Sharma',
    patientId: 'HT-2026-001',
    date: '10 November 2026',
    diagnosis: 'Vitamin D Deficiency, Iron Deficiency Anemia',
    medicines: [vitaminD3Medicine, ironFolicAcidMedicine, calciumVitDMedicine],
    instructions: 'Ensure adequate sun exposure (15-20 minutes morning sunlight). Maintain a balanced diet rich in green leafy vegetables, jaggery, and dates. Stay hydrated.',
    followUp: '20 November 2026',
    status: 'active',
  },
  {
    id: 'RX-2026-002',
    doctorId: 'DOC-001',
    doctorName: 'Dr. Rahul Sharma',
    patientId: 'HT-2026-001',
    date: '10 November 2026',
    diagnosis: 'General Wellness - Nutritional Support',
    medicines: [multivitaminMedicine],
    instructions: 'Continue regular exercise. Get 7-8 hours of sleep. Follow up after lab reports are available.',
    followUp: '20 November 2026',
    status: 'active',
  },
];

// ─── MEDICINES (active list for Ananya) ──────────────────────────────────────

export const MEDICINES: Medicine[] = [
  {
    id: 'MED-001',
    name: 'Vitamin D3 (Cholecalciferol)',
    dosage: '60,000 IU',
    frequency: 'Once weekly',
    timing: ['09:00 AM'],
    startDate: '2026-11-10',
    endDate: '2027-01-05',
    instructions: 'Take one sachet with a fatty meal. Today is your weekly dose day.',
    prescribedBy: 'DOC-001',
    status: 'active',
  },
  {
    id: 'MED-002',
    name: 'Iron + Folic Acid',
    dosage: '100mg + 500mcg',
    frequency: 'Once daily after lunch',
    timing: ['01:00 PM'],
    startDate: '2026-11-10',
    endDate: '2027-02-07',
    instructions: 'Take after lunch. Avoid tea/coffee 1 hour before and after.',
    prescribedBy: 'DOC-001',
    status: 'active',
  },
  {
    id: 'MED-003',
    name: 'Calcium + Vitamin D',
    dosage: '500mg + 250 IU',
    frequency: 'Once daily after dinner',
    timing: ['09:00 PM'],
    startDate: '2026-11-10',
    endDate: '2027-02-07',
    instructions: 'Take after dinner. Keep 2-hour gap from iron tablet.',
    prescribedBy: 'DOC-001',
    status: 'active',
  },
  {
    id: 'MED-004',
    name: 'Multivitamin (A-Z)',
    dosage: '1 tablet',
    frequency: 'Once daily after breakfast',
    timing: ['09:00 AM'],
    startDate: '2026-11-10',
    endDate: '2026-12-10',
    instructions: 'Take after breakfast.',
    prescribedBy: 'DOC-001',
    status: 'active',
  },
];

// ─── MEDICINE DOSES (today's schedule for Ananya) ────────────────────────────

export const MEDICINE_DOSES: MedicineDose[] = [
  {
    id: 'DOSE-001',
    medicineId: 'MED-001',
    medicineName: 'Vitamin D3 (Cholecalciferol)',
    dosage: '60,000 IU sachet',
    time: '09:00 AM',
    status: 'pending',
  },
  {
    id: 'DOSE-002',
    medicineId: 'MED-004',
    medicineName: 'Multivitamin (A-Z)',
    dosage: '1 tablet',
    time: '09:00 AM',
    status: 'pending',
  },
  {
    id: 'DOSE-003',
    medicineId: 'MED-002',
    medicineName: 'Iron + Folic Acid',
    dosage: '100mg + 500mcg tablet',
    time: '01:00 PM',
    status: 'pending',
  },
  {
    id: 'DOSE-004',
    medicineId: 'MED-003',
    medicineName: 'Calcium + Vitamin D',
    dosage: '500mg + 250 IU tablet',
    time: '09:00 PM',
    status: 'pending',
  },
];

// ─── LAB RESULTS (for completed CBC on 10 Oct 2026) ─────────────────────────

const previousCBCResults: LabResult[] = [
  {
    parameter: 'Hemoglobin',
    value: '10.2',
    unit: 'g/dL',
    referenceRange: '12.0 - 15.5',
    status: 'low',
    explanation: {
      en: 'Your hemoglobin is below normal. This means your blood has fewer red blood cells than usual, which can make you feel tired or weak. This is common in iron deficiency anemia.',
      te: 'మీ హిమోగ్లోబిన్ సాధారణ కంటే తక్కువగా ఉంది. మీ రక్తంలో ఎర్ర రక్తకణాలు తక్కువగా ఉన్నాయి, దీని వల్ల మీకు అలసట లేదా బలహీనత అనిపించవచ్చు. ఇది ఐరన్ లోపం రక్తహీనతలో సాధారణం.',
      hi: 'आपका हीमोग्लोबिन सामान्य से कम है। इसका मतलब है कि आपके रक्त में सामान्य से कम लाल रक्त कोशिकाएं हैं, जिससे आपको थकान या कमजोरी महसूस हो सकती है। यह आयरन की कमी से होने वाले एनीमिया में आम है।',
    },
  },
  {
    parameter: 'RBC Count',
    value: '3.8',
    unit: 'million/µL',
    referenceRange: '4.0 - 5.5',
    status: 'low',
    explanation: {
      en: 'Your red blood cell count is slightly below normal, which supports the anemia diagnosis. Iron supplementation should help bring this back to normal.',
      te: 'మీ ఎర్ర రక్తకణాల సంఖ్య కొంచెం తక్కువగా ఉంది, ఇది రక్తహీనత నిర్ధారణను సమర్థిస్తుంది. ఐరన్ సప్లిమెంటేషన్ దీన్ని సాధారణ స్థాయికి తీసుకురావడంలో సహాయపడుతుంది.',
      hi: 'आपकी लाल रक्त कोशिकाओं की संख्या सामान्य से थोड़ी कम है, जो एनीमिया के निदान की पुष्टि करती है। आयरन की खुराक इसे सामान्य करने में मदद करेगी।',
    },
  },
  {
    parameter: 'WBC Count',
    value: '7,200',
    unit: '/µL',
    referenceRange: '4,000 - 11,000',
    status: 'normal',
    explanation: {
      en: 'Your white blood cell count is within the normal range. This means your immune system is working properly and there are no signs of infection.',
      te: 'మీ తెల్ల రక్తకణాల సంఖ్య సాధారణ పరిధిలో ఉంది. మీ రోగనిరోధక వ్యవస్థ సరిగ్గా పనిచేస్తోంది మరియు ఇన్ఫెక్షన్ సంకేతాలు లేవు.',
      hi: 'आपकी सफेद रक्त कोशिकाओं की संख्या सामान्य सीमा में है। इसका मतलब है कि आपकी प्रतिरक्षा प्रणाली सही तरीके से काम कर रही है और संक्रमण के कोई संकेत नहीं हैं।',
    },
  },
  {
    parameter: 'Platelet Count',
    value: '2,50,000',
    unit: '/µL',
    referenceRange: '1,50,000 - 4,00,000',
    status: 'normal',
    explanation: {
      en: 'Your platelet count is normal. Platelets help your blood clot properly, and yours are at a healthy level.',
      te: 'మీ ప్లేట్‌లెట్ సంఖ్య సాధారణంగా ఉంది. ప్లేట్‌లెట్లు మీ రక్తం సరిగ్గా గడ్డకట్టడానికి సహాయపడతాయి, మరియు మీవి ఆరోగ్యకరమైన స్థాయిలో ఉన్నాయి.',
      hi: 'आपकी प्लेटलेट गिनती सामान्य है। प्लेटलेट्स आपके रक्त को ठीक से जमने में मदद करते हैं, और आपकी स्वस्थ स्तर पर हैं।',
    },
  },
  {
    parameter: 'MCV',
    value: '72',
    unit: 'fL',
    referenceRange: '80 - 100',
    status: 'low',
    explanation: {
      en: 'Your MCV (Mean Corpuscular Volume) is low, meaning your red blood cells are smaller than normal. This is a classic sign of iron deficiency anemia.',
      te: 'మీ MCV (సగటు కణ పరిమాణం) తక్కువగా ఉంది, అంటే మీ ఎర్ర రక్తకణాలు సాధారణ కంటే చిన్నవిగా ఉన్నాయి. ఇది ఐరన్ లోపం రక్తహీనతకు ఒక ప్రధాన సంకేతం.',
      hi: 'आपका MCV (औसत कोशिका आयतन) कम है, जिसका अर्थ है कि आपकी लाल रक्त कोशिकाएं सामान्य से छोटी हैं। यह आयरन की कमी से होने वाले एनीमिया का एक प्रमुख संकेत है।',
    },
  },
  {
    parameter: 'Serum Ferritin',
    value: '8',
    unit: 'ng/mL',
    referenceRange: '12 - 150',
    status: 'low',
    explanation: {
      en: 'Your ferritin level is very low. Ferritin stores iron in your body. A low level confirms iron deficiency. The iron supplements prescribed should help increase this over the next few months.',
      te: 'మీ ఫెర్రిటిన్ స్థాయి చాలా తక్కువగా ఉంది. ఫెర్రిటిన్ మీ శరీరంలో ఐరన్ ను నిల్వ చేస్తుంది. తక్కువ స్థాయి ఐరన్ లోపాన్ని నిర్ధారిస్తుంది. సూచించిన ఐరన్ సప్లిమెంట్లు రాబోయే కొన్ని నెలల్లో దీన్ని పెంచడంలో సహాయపడతాయి.',
      hi: 'आपका फेरिटिन स्तर बहुत कम है। फेरिटिन आपके शरीर में आयरन का भंडारण करता है। कम स्तर आयरन की कमी की पुष्टि करता है। निर्धारित आयरन सप्लीमेंट अगले कुछ महीनों में इसे बढ़ाने में मदद करेंगे।',
    },
  },
  {
    parameter: 'Vitamin D (25-OH)',
    value: '12',
    unit: 'ng/mL',
    referenceRange: '30 - 100',
    status: 'low',
    explanation: {
      en: 'Your Vitamin D level is significantly low (deficient). Normal is above 30 ng/mL. This can cause bone pain, fatigue, and muscle weakness. The weekly Vitamin D3 supplement should help bring this up.',
      te: 'మీ విటమిన్ D స్థాయి చాలా తక్కువగా (లోపం) ఉంది. సాధారణ స్థాయి 30 ng/mL కంటే ఎక్కువ. ఇది ఎముక నొప్పి, అలసట మరియు కండరాల బలహీనతకు కారణం కావచ్చు. వారంవారీ విటమిన్ D3 సప్లిమెంట్ దీన్ని పెంచడంలో సహాయపడుతుంది.',
      hi: 'आपका विटामिन D स्तर काफी कम (कमी) है। सामान्य 30 ng/mL से ऊपर है। इससे हड्डियों में दर्द, थकान और मांसपेशियों में कमजोरी हो सकती है। साप्ताहिक विटामिन D3 सप्लीमेंट इसे बढ़ाने में मदद करेगा।',
    },
  },
];

// ─── LAB TESTS ───────────────────────────────────────────────────────────────

export const LAB_TESTS: LabTest[] = [
  {
    id: 'LT-2026-001',
    name: 'Complete Blood Count (CBC)',
    date: '15 November 2026',
    status: 'scheduled',
    doctorId: 'DOC-001',
    doctorName: 'Dr. Rahul Sharma',
    patientId: 'HT-2026-001',
  },
  {
    id: 'LT-2026-002',
    name: 'Vitamin D Level (25-Hydroxy)',
    date: '15 November 2026',
    status: 'scheduled',
    doctorId: 'DOC-001',
    doctorName: 'Dr. Rahul Sharma',
    patientId: 'HT-2026-001',
  },
  {
    id: 'LT-2026-003',
    name: 'Serum Ferritin',
    date: '15 November 2026',
    status: 'scheduled',
    doctorId: 'DOC-001',
    doctorName: 'Dr. Rahul Sharma',
    patientId: 'HT-2026-001',
  },
  {
    id: 'LT-2026-004',
    name: 'Complete Blood Count (CBC)',
    date: '10 October 2026',
    status: 'completed',
    doctorId: 'DOC-001',
    doctorName: 'Dr. Rahul Sharma',
    patientId: 'HT-2026-001',
    results: previousCBCResults,
    reportUrl: '/reports/LT-2026-004.pdf',
  },
];

// ─── APPOINTMENTS ────────────────────────────────────────────────────────────

export const APPOINTMENTS: Appointment[] = [
  {
    id: 'APT-2026-001',
    doctorId: 'DOC-001',
    doctorName: 'Dr. Rahul Sharma',
    doctorSpecialty: 'General Medicine',
    patientId: 'HT-2026-001',
    patientName: 'Ananya Reddy',
    date: '20 November 2026',
    time: '10:30 AM',
    type: 'follow-up',
    status: 'upcoming',
    reason: 'Follow-up consultation to review lab reports (CBC, Vitamin D, Ferritin) and assess treatment progress for anemia and Vitamin D deficiency.',
  },
  {
    id: 'APT-2026-002',
    doctorId: 'DOC-001',
    doctorName: 'Dr. Rahul Sharma',
    doctorSpecialty: 'General Medicine',
    patientId: 'HT-2026-001',
    patientName: 'Ananya Reddy',
    date: '10 November 2026',
    time: '11:00 AM',
    type: 'consultation',
    status: 'completed',
    reason: 'Initial consultation for fatigue, weakness, and body pain. Diagnosed with Vitamin D deficiency and iron deficiency anemia.',
  },
];

// ─── CARE PLAN ───────────────────────────────────────────────────────────────

export const CARE_PLAN: CarePlan = {
  id: 'CP-2026-001',
  doctorId: 'DOC-001',
  patientId: 'HT-2026-001',
  date: '10 November 2026',
  status: 'shared',
  prescriptions: [vitaminD3Medicine, ironFolicAcidMedicine, calciumVitDMedicine, multivitaminMedicine],
  tests: [
    {
      name: 'Complete Blood Count (CBC)',
      date: '15 November 2026',
      instructions: 'Fasting not required. Can be done at any time of the day.',
    },
    {
      name: 'Vitamin D Level (25-Hydroxy)',
      date: '15 November 2026',
      instructions: 'Fasting not required. Best done in the morning.',
    },
    {
      name: 'Serum Ferritin',
      date: '15 November 2026',
      instructions: 'Fasting for 8-12 hours preferred. Morning sample recommended.',
    },
  ],
  followUp: {
    date: '20 November 2026',
    time: '10:30 AM',
    reason: 'Review lab reports and assess treatment progress. Adjust medication dosages if needed.',
  },
  instructions: 'Get 15-20 minutes of morning sunlight daily. Eat iron-rich foods like spinach, jaggery, dates, and pomegranate. Stay well hydrated (8-10 glasses of water). Avoid tea/coffee around iron supplement time. Get 7-8 hours of quality sleep. Light exercise (walking 30 minutes) is encouraged.',
  educationNotes: 'Vitamin D is essential for strong bones and overall immunity. Iron is needed to make healthy red blood cells that carry oxygen throughout your body. It takes 2-3 months for iron stores to rebuild fully, so do not stop your medicines even if you feel better. Your follow-up tests will help us track your progress.',
};

// ─── TIMELINE EVENTS ─────────────────────────────────────────────────────────

export const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    id: 'TL-001',
    date: '10 November 2026',
    time: '11:00 AM',
    type: 'consultation',
    title: 'Initial Consultation with Dr. Rahul Sharma',
    description: 'Visited Hitaayus Demo Hospital for fatigue and weakness. Diagnosed with Vitamin D deficiency and iron deficiency anemia.',
  },
  {
    id: 'TL-002',
    date: '10 November 2026',
    time: '11:30 AM',
    type: 'prescription',
    title: 'Prescription Created',
    description: 'Dr. Sharma prescribed Vitamin D3 (weekly), Iron + Folic Acid (daily), Calcium + Vitamin D (daily), and Multivitamin (daily).',
  },
  {
    id: 'TL-003',
    date: '10 November 2026',
    time: '11:45 AM',
    type: 'appointment',
    title: 'Follow-up Appointment Scheduled',
    description: 'Follow-up consultation booked for 20 November 2026 at 10:30 AM to review lab results.',
  },
  {
    id: 'TL-004',
    date: '10 November 2026',
    time: '12:00 PM',
    type: 'test',
    title: 'Lab Tests Ordered',
    description: 'CBC, Vitamin D Level, and Serum Ferritin tests scheduled for 15 November 2026.',
  },
  {
    id: 'TL-005',
    date: '10 November 2026',
    time: '12:15 PM',
    type: 'report',
    title: 'Previous Lab Report Reviewed',
    description: 'Dr. Sharma reviewed CBC results from 10 October 2026. Hemoglobin 10.2 g/dL (low), Ferritin 8 ng/mL (low), Vitamin D 12 ng/mL (deficient).',
  },
  {
    id: 'TL-006',
    date: '11 November 2026',
    time: '09:00 AM',
    type: 'medicine',
    title: 'Started Medication Regimen',
    description: 'Began taking prescribed medicines: Vitamin D3 sachet (weekly), Iron + Folic Acid after lunch, Calcium after dinner, Multivitamin after breakfast.',
  },
  {
    id: 'TL-007',
    date: '11 November 2026',
    time: '10:00 AM',
    type: 'update',
    title: 'Care Plan Shared',
    description: 'Dr. Sharma shared the complete care plan including prescriptions, lab test schedule, dietary guidelines, and follow-up details.',
  },
  {
    id: 'TL-008',
    date: '12 November 2026',
    time: '09:00 AM',
    type: 'medicine',
    title: 'Daily Medicines Taken',
    description: 'Completed today\'s medicine schedule: Multivitamin (morning), Iron + Folic Acid (afternoon), Calcium + Vitamin D (night).',
  },
  {
    id: 'TL-009',
    date: '12 November 2026',
    time: '06:00 PM',
    type: 'update',
    title: 'Progress Update Submitted',
    description: 'Ananya reported feeling slightly better with less fatigue. No difficulty taking medicines. Noted mild stomach discomfort after iron tablet.',
  },
  {
    id: 'TL-010',
    date: '13 November 2026',
    time: '09:00 AM',
    type: 'medicine',
    title: 'Medicine Reminder',
    description: 'Today\'s medicines: Multivitamin (9 AM), Iron + Folic Acid (1 PM after lunch), Calcium + Vitamin D (9 PM after dinner).',
  },
  {
    id: 'TL-011',
    date: '15 November 2026',
    time: '08:00 AM',
    type: 'test',
    title: 'Lab Tests Scheduled Today',
    description: 'CBC, Vitamin D Level, and Serum Ferritin tests to be done today. Remember: fasting preferred for Ferritin test.',
  },
  {
    id: 'TL-012',
    date: '20 November 2026',
    time: '10:30 AM',
    type: 'appointment',
    title: 'Follow-up with Dr. Rahul Sharma',
    description: 'Follow-up consultation to review new lab reports and assess treatment progress. Hitaayus Demo Hospital.',
  },
];

// ─── NOTIFICATIONS ───────────────────────────────────────────────────────────

export const NOTIFICATIONS: Notification[] = [
  // Patient notifications
  {
    id: 'NOTIF-001',
    type: 'medicine',
    title: 'Morning Medicine Reminder',
    message: 'Time to take your Vitamin D3 sachet and Multivitamin tablet (9:00 AM).',
    timestamp: '2026-11-13T09:00:00',
    read: false,
    actionUrl: '/patient/medicines',
  },
  {
    id: 'NOTIF-002',
    type: 'medicine',
    title: 'Afternoon Medicine Reminder',
    message: 'Take your Iron + Folic Acid tablet after lunch (1:00 PM). Avoid tea/coffee for 1 hour.',
    timestamp: '2026-11-13T13:00:00',
    read: false,
    actionUrl: '/patient/medicines',
  },
  {
    id: 'NOTIF-003',
    type: 'test',
    title: 'Lab Tests in 2 Days',
    message: 'Your CBC, Vitamin D, and Ferritin tests are scheduled for 15 November. Remember fasting for Ferritin test.',
    timestamp: '2026-11-13T08:00:00',
    read: false,
    actionUrl: '/patient/tests',
  },
  {
    id: 'NOTIF-004',
    type: 'appointment',
    title: 'Upcoming Follow-up Appointment',
    message: 'Follow-up with Dr. Rahul Sharma on 20 November at 10:30 AM at Hitaayus Demo Hospital.',
    timestamp: '2026-11-13T08:30:00',
    read: true,
    actionUrl: '/patient/appointments',
  },
  {
    id: 'NOTIF-005',
    type: 'care_plan',
    title: 'Care Plan Shared by Dr. Sharma',
    message: 'Your care plan has been shared. It includes your prescriptions, lab tests, and follow-up schedule. Tap to view.',
    timestamp: '2026-11-11T10:00:00',
    read: true,
    actionUrl: '/patient/care-plan',
  },
  // Caregiver notifications
  {
    id: 'NOTIF-006',
    type: 'caregiver',
    title: 'Medicine Reminder for Ananya',
    message: 'Ananya has not taken her morning medicines yet (Vitamin D3, Multivitamin). Please remind her.',
    timestamp: '2026-11-13T09:30:00',
    read: false,
    actionUrl: '/caregiver/dashboard',
  },
  {
    id: 'NOTIF-007',
    type: 'test',
    title: 'Lab Tests Scheduled for Ananya',
    message: 'Ananya\'s lab tests (CBC, Vitamin D, Ferritin) are scheduled for 15 November. Help her prepare for fasting.',
    timestamp: '2026-11-13T08:00:00',
    read: false,
    actionUrl: '/caregiver/dashboard',
  },
  {
    id: 'NOTIF-008',
    type: 'update',
    title: 'Ananya Submitted a Progress Update',
    message: 'Ananya reported feeling better but mentioned mild stomach discomfort after iron tablet.',
    timestamp: '2026-11-12T18:15:00',
    read: true,
    actionUrl: '/caregiver/dashboard',
  },
  // Doctor notifications
  {
    id: 'NOTIF-009',
    type: 'update',
    title: 'Patient Progress Update',
    message: 'Ananya Reddy (HT-2026-001) submitted a progress update. She reports feeling better with mild side effects from iron.',
    timestamp: '2026-11-12T18:15:00',
    read: false,
    actionUrl: '/doctor/patients/HT-2026-001',
  },
  {
    id: 'NOTIF-010',
    type: 'appointment',
    title: 'Upcoming Appointments Today',
    message: 'You have 3 follow-up appointments scheduled today. First appointment at 9:30 AM.',
    timestamp: '2026-11-13T07:30:00',
    read: false,
    actionUrl: '/doctor/appointments',
  },
  {
    id: 'NOTIF-011',
    type: 'test',
    title: 'Lab Reports Pending Review',
    message: 'Lab reports for Rahul Kumar (HT-2026-002) are ready for review. CBC and Lipid Profile.',
    timestamp: '2026-11-12T16:00:00',
    read: true,
    actionUrl: '/doctor/patients/HT-2026-002',
  },
];

// ─── PROGRESS UPDATES ────────────────────────────────────────────────────────

export const PROGRESS_UPDATES: ProgressUpdate[] = [
  {
    id: 'PU-001',
    patientId: 'HT-2026-001',
    date: '12 November 2026',
    feeling: 'better',
    completedTest: false,
    difficulty: false,
    needHelp: false,
    notes: 'I am feeling slightly better compared to last week. Less fatigue during the day. However, I noticed mild stomach discomfort about 30 minutes after taking the iron tablet. Eating a small snack before taking it seems to help a little.',
    reviewedByDoctor: false,
  },
  {
    id: 'PU-002',
    patientId: 'HT-2026-001',
    date: '13 November 2026',
    feeling: 'better',
    completedTest: false,
    difficulty: false,
    needHelp: false,
    notes: 'Energy levels are improving gradually. Followed the diet recommendations — had spinach, dates, and pomegranate juice. Morning sunlight routine started. No issues with Vitamin D sachet or calcium tablet.',
    reviewedByDoctor: false,
  },
];

// ─── HELPER FUNCTIONS ────────────────────────────────────────────────────────

export function getPatientById(id: string): Patient | undefined {
  return PATIENTS.find((p) => p.id === id);
}

export function getMedicinesForPatient(patientId: string): Medicine[] {
  // In real app, medicines would be linked to patient. For demo, Ananya is the primary patient.
  if (patientId === 'HT-2026-001') {
    return MEDICINES;
  }
  return [];
}

export function getDosesForToday(patientId: string): MedicineDose[] {
  if (patientId === 'HT-2026-001') {
    return MEDICINE_DOSES;
  }
  return [];
}

export function getTestsForPatient(patientId: string): LabTest[] {
  return LAB_TESTS.filter((t) => t.patientId === patientId);
}

export function getAppointmentsForPatient(patientId: string): Appointment[] {
  return APPOINTMENTS.filter((a) => a.patientId === patientId);
}

export function getTimelineForPatient(patientId: string): TimelineEvent[] {
  if (patientId === 'HT-2026-001') {
    return TIMELINE_EVENTS;
  }
  return [];
}

export function getNotificationsForRole(role: 'patient' | 'caregiver' | 'doctor'): Notification[] {
  switch (role) {
    case 'patient':
      return NOTIFICATIONS.filter((n) =>
        ['NOTIF-001', 'NOTIF-002', 'NOTIF-003', 'NOTIF-004', 'NOTIF-005'].includes(n.id)
      );
    case 'caregiver':
      return NOTIFICATIONS.filter((n) =>
        ['NOTIF-006', 'NOTIF-007', 'NOTIF-008'].includes(n.id)
      );
    case 'doctor':
      return NOTIFICATIONS.filter((n) =>
        ['NOTIF-009', 'NOTIF-010', 'NOTIF-011'].includes(n.id)
      );
    default:
      return [];
  }
}

export const DOCTORS: Doctor[] = [DOCTOR];
export const CAREGIVERS: Caregiver[] = [CAREGIVER];
export const mockNotifications = NOTIFICATIONS;
export const mockTodayDoses = MEDICINE_DOSES;
export const mockProgressUpdates = PROGRESS_UPDATES;
export const mockCarePlanStatuses: Record<string, 'draft' | 'pending_approval' | 'approved' | 'shared'> = {
  'CAREPLAN-001': 'shared',
};

