export interface TranslationSet {
  nav: {
    home: string;
    howItWorks: string;
    features: string;
    about: string;
    getStarted: string;
    dashboard: string;
    myHealth: string;
    prescriptions: string;
    medicines: string;
    testsReports: string;
    appointments: string;
    familyCaregiver: string;
    notifications: string;
    profile: string;
    settings: string;
    logout: string;
  };
  landing: {
    heroTitle: string;
    heroSubtitle: string;
    heroCTA: string;
    heroSecondaryCTA: string;
    problemTitle: string;
    problemCards: Array<{ title: string; desc: string }>;
    solutionTitle: string;
    solutionSteps: string[];
    threeUsersTitle: string;
    patientCard: { title: string; desc: string };
    caregiverCard: { title: string; desc: string };
    doctorCard: { title: string; desc: string };
    featuresTitle: string;
    ctaTitle: string;
    ctaButton: string;
  };
  roles: {
    welcomeTitle: string;
    welcomeSubtitle: string;
    patientTitle: string;
    patientDesc: string;
    caregiverTitle: string;
    caregiverDesc: string;
    doctorTitle: string;
    doctorDesc: string;
    enterDashboard: string;
  };
  patient: {
    greeting: string;
    subtitle: string;
    medicinesToday: string;
    upcomingTests: string;
    nextAppointment: string;
    carePlanProgress: string;
    recentActivity: string;
    markTaken: string;
    markSkipped: string;
    viewDetails: string;
    uploadPrescription: string;
    understandPrescription: string;
    aiExplanation: string;
    originalInstruction: string;
    simpleExplanation: string;
    medicineSchedule: string;
    testSchedule: string;
    healthTimeline: string;
    progressUpdate: string;
    howFeeling: string;
    feelingBetter: string;
    noChange: string;
    feelingWorse: string;
    needHelp: string;
    submitUpdate: string;
    careAssistant: string;
  };
  caregiver: {
    greeting: string;
    subtitle: string;
    connectedPatients: string;
    patientSupport: string;
    sendReminder: string;
    markAssisted: string;
    viewInstructions: string;
    requestClarification: string;
    accessPermissions: string;
  };
  doctor: {
    greeting: string;
    totalPatients: string;
    followUpNeeded: string;
    pendingReviews: string;
    upcomingAppointments: string;
    incompleteCareTasks: string;
    patientList: string;
    createCarePlan: string;
    saveDraft: string;
    reviewPlan: string;
    approvePlan: string;
    shareWithPatient: string;
    carePlanStatus: string;
  };
  common: {
    search: string;
    filter: string;
    viewAll: string;
    save: string;
    cancel: string;
    confirm: string;
    close: string;
    back: string;
    next: string;
    previous: string;
    loading: string;
    noData: string;
    pending: string;
    scheduled: string;
    completed: string;
    active: string;
    approved: string;
    draft: string;
    shared: string;
    today: string;
    tomorrow: string;
    thisWeek: string;
  };
  medical: {
    disclaimer: string;
    aiDisclaimer: string;
    contactDoctor: string;
    demoNotice: string;
  };
}

export const translations: Record<'en' | 'te' | 'hi', TranslationSet> = {
  en: {
    nav: {
      home: 'Home',
      howItWorks: 'How It Works',
      features: 'Features',
      about: 'About',
      getStarted: 'Get Started',
      dashboard: 'Dashboard',
      myHealth: 'My Health',
      prescriptions: 'Prescriptions',
      medicines: 'Medicines',
      testsReports: 'Tests & Reports',
      appointments: 'Appointments',
      familyCaregiver: 'Family & Caregiver',
      notifications: 'Notifications',
      profile: 'Profile',
      settings: 'Settings',
      logout: 'Logout',
    },
    landing: {
      heroTitle: 'Your Healthcare Journey Doesn\'t End at the Consultation.',
      heroSubtitle:
        'Hitaayush bridges the gap between doctor visits — helping patients, families, and doctors stay connected through every step of the care plan.',
      heroCTA: 'Get Started Free',
      heroSecondaryCTA: 'See How It Works',
      problemTitle: 'Healthcare Shouldn\'t Be This Hard',
      problemCards: [
        {
          title: 'Confusing Prescriptions',
          desc: 'Complex medical instructions leave patients unsure about what to take, when, and why.',
        },
        {
          title: 'Forgotten Follow-ups',
          desc: 'Critical tests, medicines, and appointments get missed without timely reminders.',
        },
        {
          title: 'Family Left in the Dark',
          desc: 'Caregivers struggle to coordinate care without clear visibility into the treatment plan.',
        },
        {
          title: 'Doctors Lose Track',
          desc: 'Without patient feedback between visits, doctors can\'t adjust care plans proactively.',
        },
      ],
      solutionTitle: 'How Hitaayush Works',
      solutionSteps: [
        'Upload your prescription or care plan',
        'AI explains medicines, tests, and instructions in simple language',
        'Get smart reminders for every medicine, test, and appointment',
        'Family members and caregivers stay informed and connected',
        'Doctors receive progress updates and can adjust care plans remotely',
      ],
      threeUsersTitle: 'Built for Everyone in the Care Journey',
      patientCard: {
        title: 'For Patients',
        desc: 'Understand your prescriptions, never miss a medicine, and track your health progress — all in your language.',
      },
      caregiverCard: {
        title: 'For Family & Caregivers',
        desc: 'Stay informed about your loved one\'s care plan, send reminders, and coordinate with their doctor effortlessly.',
      },
      doctorCard: {
        title: 'For Doctors',
        desc: 'Create structured care plans, monitor patient adherence, and intervene early when something needs attention.',
      },
      featuresTitle: 'Everything You Need for Better Healthcare',
      ctaTitle: 'Ready to Take Control of Your Health?',
      ctaButton: 'Start Your Free Journey',
    },
    roles: {
      welcomeTitle: 'Welcome to Hitaayush',
      welcomeSubtitle: 'Choose how you\'d like to use the platform',
      patientTitle: 'I\'m a Patient',
      patientDesc:
        'Track your medicines, understand prescriptions, and stay on top of your health journey.',
      caregiverTitle: 'I\'m a Family Member / Caregiver',
      caregiverDesc:
        'Help your loved ones follow their care plans, send reminders, and stay connected with their doctors.',
      doctorTitle: 'I\'m a Doctor',
      doctorDesc:
        'Create care plans, monitor patient progress, and provide timely guidance between visits.',
      enterDashboard: 'Enter Dashboard',
    },
    patient: {
      greeting: 'Good to see you',
      subtitle: 'Here\'s your health overview for today',
      medicinesToday: 'Medicines Today',
      upcomingTests: 'Upcoming Tests',
      nextAppointment: 'Next Appointment',
      carePlanProgress: 'Care Plan Progress',
      recentActivity: 'Recent Activity',
      markTaken: 'Mark as Taken',
      markSkipped: 'Skip',
      viewDetails: 'View Details',
      uploadPrescription: 'Upload Prescription',
      understandPrescription: 'Understand My Prescription',
      aiExplanation: 'AI-Powered Explanation',
      originalInstruction: 'Original Instruction',
      simpleExplanation: 'Simple Explanation',
      medicineSchedule: 'Medicine Schedule',
      testSchedule: 'Test Schedule',
      healthTimeline: 'Health Timeline',
      progressUpdate: 'Progress Update',
      howFeeling: 'How are you feeling today?',
      feelingBetter: 'Feeling Better',
      noChange: 'No Change',
      feelingWorse: 'Feeling Worse',
      needHelp: 'Need Help',
      submitUpdate: 'Submit Update',
      careAssistant: 'Care Assistant',
    },
    caregiver: {
      greeting: 'Welcome back',
      subtitle: 'Here\'s how your family members are doing',
      connectedPatients: 'Connected Patients',
      patientSupport: 'Patient Support',
      sendReminder: 'Send Reminder',
      markAssisted: 'Mark as Assisted',
      viewInstructions: 'View Instructions',
      requestClarification: 'Request Clarification',
      accessPermissions: 'Access & Permissions',
    },
    doctor: {
      greeting: 'Welcome, Doctor',
      totalPatients: 'Total Patients',
      followUpNeeded: 'Follow-up Needed',
      pendingReviews: 'Pending Reviews',
      upcomingAppointments: 'Upcoming Appointments',
      incompleteCareTasks: 'Incomplete Care Tasks',
      patientList: 'Patient List',
      createCarePlan: 'Create Care Plan',
      saveDraft: 'Save Draft',
      reviewPlan: 'Review Plan',
      approvePlan: 'Approve Plan',
      shareWithPatient: 'Share with Patient',
      carePlanStatus: 'Care Plan Status',
    },
    common: {
      search: 'Search',
      filter: 'Filter',
      viewAll: 'View All',
      save: 'Save',
      cancel: 'Cancel',
      confirm: 'Confirm',
      close: 'Close',
      back: 'Back',
      next: 'Next',
      previous: 'Previous',
      loading: 'Loading...',
      noData: 'No data available',
      pending: 'Pending',
      scheduled: 'Scheduled',
      completed: 'Completed',
      active: 'Active',
      approved: 'Approved',
      draft: 'Draft',
      shared: 'Shared',
      today: 'Today',
      tomorrow: 'Tomorrow',
      thisWeek: 'This Week',
    },
    medical: {
      disclaimer:
        'This platform is for informational purposes only and does not replace professional medical advice. Always consult your doctor before making any changes to your treatment.',
      aiDisclaimer:
        'AI-generated explanations are simplified for understanding. They are not medical advice. Please verify with your healthcare provider.',
      contactDoctor: 'Contact Your Doctor',
      demoNotice:
        'This is a prototype demonstration. No real patient data is stored or processed.',
    },
  },

  te: {
    nav: {
      home: 'హోమ్',
      howItWorks: 'ఎలా పని చేస్తుంది',
      features: 'ఫీచర్లు',
      about: 'గురించి',
      getStarted: 'ప్రారంభించండి',
      dashboard: 'డ్యాష్‌బోర్డ్',
      myHealth: 'నా ఆరోగ్యం',
      prescriptions: 'ప్రిస్క్రిప్షన్లు',
      medicines: 'మందులు',
      testsReports: 'పరీక్షలు & రిపోర్టులు',
      appointments: 'అపాయింట్‌మెంట్లు',
      familyCaregiver: 'కుటుంబం & సంరక్షకులు',
      notifications: 'నోటిఫికేషన్లు',
      profile: 'ప్రొఫైల్',
      settings: 'సెట్టింగ్‌లు',
      logout: 'లాగ్ అవుట్',
    },
    landing: {
      heroTitle: 'మీ ఆరోగ్య ప్రయాణం సంప్రదింపుతో ముగియదు.',
      heroSubtitle:
        'హితాయుష్ డాక్టర్ సందర్శనల మధ్య అంతరాన్ని తగ్గిస్తుంది — రోగులు, కుటుంబాలు మరియు వైద్యులు సంరక్షణ ప్రణాళికలో ప్రతి దశలో అనుసంధానంగా ఉండేలా సహాయపడుతుంది.',
      heroCTA: 'ఉచితంగా ప్రారంభించండి',
      heroSecondaryCTA: 'ఎలా పని చేస్తుందో చూడండి',
      problemTitle: 'ఆరోగ్య సంరక్షణ ఇంత కష్టంగా ఉండకూడదు',
      problemCards: [
        {
          title: 'గందరగోళ ప్రిస్క్రిప్షన్లు',
          desc: 'సంక్లిష్టమైన వైద్య సూచనలు రోగులకు ఏమి తీసుకోవాలి, ఎప్పుడు, ఎందుకు అనే విషయంలో అయోమయం కలిగిస్తాయి.',
        },
        {
          title: 'మర్చిపోయిన ఫాలో-అప్‌లు',
          desc: 'సమయానికి రిమైండర్లు లేకుండా ముఖ్యమైన పరీక్షలు, మందులు మరియు అపాయింట్‌మెంట్లు తప్పిపోతాయి.',
        },
        {
          title: 'కుటుంబం చీకటిలో ఉంది',
          desc: 'చికిత్స ప్రణాళికపై స్పష్టమైన అవగాహన లేకుండా సంరక్షకులు సంరక్షణను సమన్వయం చేయడంలో ఇబ్బంది పడతారు.',
        },
        {
          title: 'వైద్యులు ట్రాక్ కోల్పోతారు',
          desc: 'సందర్శనల మధ్య రోగి ఫీడ్‌బ్యాక్ లేకుండా, వైద్యులు సంరక్షణ ప్రణాళికలను ముందస్తుగా సవరించలేరు.',
        },
      ],
      solutionTitle: 'హితాయుష్ ఎలా పని చేస్తుంది',
      solutionSteps: [
        'మీ ప్రిస్క్రిప్షన్ లేదా సంరక్షణ ప్రణాళికను అప్‌లోడ్ చేయండి',
        'AI మందులు, పరీక్షలు మరియు సూచనలను సరళ భాషలో వివరిస్తుంది',
        'ప్రతి మందు, పరీక్ష మరియు అపాయింట్‌మెంట్ కోసం తెలివైన రిమైండర్లు పొందండి',
        'కుటుంబ సభ్యులు మరియు సంరక్షకులు తెలిసి ఉంటారు మరియు అనుసంధానంగా ఉంటారు',
        'వైద్యులు పురోగతి నవీకరణలను అందుకుంటారు మరియు సంరక్షణ ప్రణాళికలను రిమోట్‌గా సవరించగలరు',
      ],
      threeUsersTitle: 'సంరక్షణ ప్రయాణంలో ప్రతి ఒక్కరి కోసం నిర్మించబడింది',
      patientCard: {
        title: 'రోగుల కోసం',
        desc: 'మీ ప్రిస్క్రిప్షన్లను అర్థం చేసుకోండి, ఏ మందు తప్పిపోకుండా చూడండి, మరియు మీ ఆరోగ్య పురోగతిని ట్రాక్ చేయండి — అంతా మీ భాషలో.',
      },
      caregiverCard: {
        title: 'కుటుంబం & సంరక్షకుల కోసం',
        desc: 'మీ ప్రియమైన వారి సంరక్షణ ప్రణాళిక గురించి తెలుసుకోండి, రిమైండర్లు పంపండి, మరియు వారి వైద్యునితో సులభంగా సమన్వయం చేయండి.',
      },
      doctorCard: {
        title: 'వైద్యుల కోసం',
        desc: 'నిర్మాణాత్మక సంరక్షణ ప్రణాళికలను సృష్టించండి, రోగి అనుసరణను పర్యవేక్షించండి, మరియు ఏదైనా శ్రద్ధ అవసరమైనప్పుడు ముందుగానే జోక్యం చేసుకోండి.',
      },
      featuresTitle: 'మెరుగైన ఆరోగ్య సంరక్షణ కోసం మీకు కావలసినవన్నీ',
      ctaTitle: 'మీ ఆరోగ్యాన్ని మీ చేతుల్లోకి తీసుకోవడానికి సిద్ధంగా ఉన్నారా?',
      ctaButton: 'మీ ఉచిత ప్రయాణాన్ని ప్రారంభించండి',
    },
    roles: {
      welcomeTitle: 'హితాయుష్‌కి స్వాగతం',
      welcomeSubtitle: 'మీరు ప్లాట్‌ఫారమ్‌ను ఎలా ఉపయోగించాలనుకుంటున్నారో ఎంచుకోండి',
      patientTitle: 'నేను రోగిని',
      patientDesc:
        'మీ మందులను ట్రాక్ చేయండి, ప్రిస్క్రిప్షన్లను అర్థం చేసుకోండి, మరియు మీ ఆరోగ్య ప్రయాణంలో ముందుండండి.',
      caregiverTitle: 'నేను కుటుంబ సభ్యుడిని / సంరక్షకుడిని',
      caregiverDesc:
        'మీ ప్రియమైన వారికి వారి సంరక్షణ ప్రణాళికలను అనుసరించడంలో సహాయం చేయండి, రిమైండర్లు పంపండి, మరియు వారి వైద్యులతో అనుసంధానంగా ఉండండి.',
      doctorTitle: 'నేను వైద్యుడిని',
      doctorDesc:
        'సంరక్షణ ప్రణాళికలను సృష్టించండి, రోగి పురోగతిని పర్యవేక్షించండి, మరియు సందర్శనల మధ్య సకాలంలో మార్గదర్శకత్వం అందించండి.',
      enterDashboard: 'డ్యాష్‌బోర్డ్‌లోకి ప్రవేశించండి',
    },
    patient: {
      greeting: 'మిమ్మల్ని చూసి ఆనందంగా ఉంది',
      subtitle: 'ఈ రోజు మీ ఆరోగ్య సారాంశం ఇక్కడ ఉంది',
      medicinesToday: 'ఈ రోజు మందులు',
      upcomingTests: 'రాబోయే పరీక్షలు',
      nextAppointment: 'తదుపరి అపాయింట్‌మెంట్',
      carePlanProgress: 'సంరక్షణ ప్రణాళిక పురోగతి',
      recentActivity: 'ఇటీవలి కార్యకలాపం',
      markTaken: 'తీసుకున్నట్లు గుర్తించు',
      markSkipped: 'దాటవేయి',
      viewDetails: 'వివరాలు చూడండి',
      uploadPrescription: 'ప్రిస్క్రిప్షన్ అప్‌లోడ్ చేయండి',
      understandPrescription: 'నా ప్రిస్క్రిప్షన్‌ను అర్థం చేసుకోండి',
      aiExplanation: 'AI-ఆధారిత వివరణ',
      originalInstruction: 'అసలు సూచన',
      simpleExplanation: 'సరళ వివరణ',
      medicineSchedule: 'మందుల షెడ్యూల్',
      testSchedule: 'పరీక్ష షెడ్యూల్',
      healthTimeline: 'ఆరోగ్య టైమ్‌లైన్',
      progressUpdate: 'పురోగతి నవీకరణ',
      howFeeling: 'ఈ రోజు మీకు ఎలా అనిపిస్తోంది?',
      feelingBetter: 'మెరుగ్గా అనిపిస్తోంది',
      noChange: 'మార్పు లేదు',
      feelingWorse: 'అధ్వాన్నంగా అనిపిస్తోంది',
      needHelp: 'సహాయం కావాలి',
      submitUpdate: 'నవీకరణ సమర్పించండి',
      careAssistant: 'సంరక్షణ సహాయకుడు',
    },
    caregiver: {
      greeting: 'తిరిగి స్వాగతం',
      subtitle: 'మీ కుటుంబ సభ్యులు ఎలా ఉన్నారో ఇక్కడ ఉంది',
      connectedPatients: 'అనుసంధానిత రోగులు',
      patientSupport: 'రోగి సహాయం',
      sendReminder: 'రిమైండర్ పంపండి',
      markAssisted: 'సహాయం చేసినట్లు గుర్తించు',
      viewInstructions: 'సూచనలు చూడండి',
      requestClarification: 'వివరణ కోరండి',
      accessPermissions: 'యాక్సెస్ & అనుమతులు',
    },
    doctor: {
      greeting: 'స్వాగతం, డాక్టర్',
      totalPatients: 'మొత్తం రోగులు',
      followUpNeeded: 'ఫాలో-అప్ అవసరం',
      pendingReviews: 'పెండింగ్ సమీక్షలు',
      upcomingAppointments: 'రాబోయే అపాయింట్‌మెంట్లు',
      incompleteCareTasks: 'అసంపూర్ణ సంరక్షణ పనులు',
      patientList: 'రోగుల జాబితా',
      createCarePlan: 'సంరక్షణ ప్రణాళిక సృష్టించండి',
      saveDraft: 'డ్రాఫ్ట్ సేవ్ చేయండి',
      reviewPlan: 'ప్రణాళిక సమీక్షించండి',
      approvePlan: 'ప్రణాళిక ఆమోదించండి',
      shareWithPatient: 'రోగితో పంచుకోండి',
      carePlanStatus: 'సంరక్షణ ప్రణాళిక స్థితి',
    },
    common: {
      search: 'వెతకండి',
      filter: 'ఫిల్టర్',
      viewAll: 'అన్నీ చూడండి',
      save: 'సేవ్ చేయండి',
      cancel: 'రద్దు చేయండి',
      confirm: 'నిర్ధారించండి',
      close: 'మూసివేయండి',
      back: 'వెనుకకు',
      next: 'తదుపరి',
      previous: 'మునుపటి',
      loading: 'లోడ్ అవుతోంది...',
      noData: 'డేటా అందుబాటులో లేదు',
      pending: 'పెండింగ్',
      scheduled: 'షెడ్యూల్ చేయబడింది',
      completed: 'పూర్తయింది',
      active: 'యాక్టివ్',
      approved: 'ఆమోదించబడింది',
      draft: 'డ్రాఫ్ట్',
      shared: 'పంచుకోబడింది',
      today: 'ఈ రోజు',
      tomorrow: 'రేపు',
      thisWeek: 'ఈ వారం',
    },
    medical: {
      disclaimer:
        'ఈ ప్లాట్‌ఫారమ్ సమాచార ఉద్దేశ్యాల కోసం మాత్రమే మరియు వృత్తిపరమైన వైద్య సలహాకు ప్రత్యామ్నాయం కాదు. మీ చికిత్సలో ఏవైనా మార్పులు చేసే ముందు ఎల్లప్పుడూ మీ వైద్యుడిని సంప్రదించండి.',
      aiDisclaimer:
        'AI-రూపొందించిన వివరణలు అవగాహన కోసం సరళీకృతం చేయబడ్డాయి. ఇవి వైద్య సలహా కాదు. దయచేసి మీ ఆరోగ్య సంరక్షణ ప్రదాతతో ధృవీకరించండి.',
      contactDoctor: 'మీ వైద్యుడిని సంప్రదించండి',
      demoNotice:
        'ఇది ఒక ప్రోటోటైప్ ప్రదర్శన. నిజమైన రోగి డేటా ఏదీ నిల్వ చేయబడదు లేదా ప్రాసెస్ చేయబడదు.',
    },
  },

  hi: {
    nav: {
      home: 'होम',
      howItWorks: 'यह कैसे काम करता है',
      features: 'विशेषताएँ',
      about: 'हमारे बारे में',
      getStarted: 'शुरू करें',
      dashboard: 'डैशबोर्ड',
      myHealth: 'मेरा स्वास्थ्य',
      prescriptions: 'प्रिस्क्रिप्शन',
      medicines: 'दवाइयाँ',
      testsReports: 'जाँच और रिपोर्ट',
      appointments: 'अपॉइंटमेंट',
      familyCaregiver: 'परिवार और देखभालकर्ता',
      notifications: 'सूचनाएँ',
      profile: 'प्रोफ़ाइल',
      settings: 'सेटिंग्स',
      logout: 'लॉग आउट',
    },
    landing: {
      heroTitle: 'आपकी स्वास्थ्य यात्रा परामर्श पर समाप्त नहीं होती।',
      heroSubtitle:
        'हिताायुष डॉक्टर के दौरों के बीच की खाई को पाटता है — मरीजों, परिवारों और डॉक्टरों को देखभाल योजना के हर कदम पर जुड़े रहने में मदद करता है।',
      heroCTA: 'मुफ़्त में शुरू करें',
      heroSecondaryCTA: 'देखें यह कैसे काम करता है',
      problemTitle: 'स्वास्थ्य सेवा इतनी कठिन नहीं होनी चाहिए',
      problemCards: [
        {
          title: 'भ्रमित करने वाले प्रिस्क्रिप्शन',
          desc: 'जटिल चिकित्सा निर्देश मरीजों को यह समझने में असमर्थ छोड़ देते हैं कि क्या लेना है, कब और क्यों।',
        },
        {
          title: 'भूली हुई फ़ॉलो-अप',
          desc: 'समय पर रिमाइंडर के बिना महत्वपूर्ण जाँच, दवाइयाँ और अपॉइंटमेंट छूट जाती हैं।',
        },
        {
          title: 'परिवार अनजान रहता है',
          desc: 'उपचार योजना की स्पष्ट जानकारी के बिना देखभालकर्ताओं को देखभाल का समन्वय करने में कठिनाई होती है।',
        },
        {
          title: 'डॉक्टर ट्रैक खो देते हैं',
          desc: 'दौरों के बीच मरीज की प्रतिक्रिया के बिना, डॉक्टर देखभाल योजनाओं को सक्रिय रूप से समायोजित नहीं कर सकते।',
        },
      ],
      solutionTitle: 'हिताायुष कैसे काम करता है',
      solutionSteps: [
        'अपना प्रिस्क्रिप्शन या देखभाल योजना अपलोड करें',
        'AI दवाइयों, जाँचों और निर्देशों को सरल भाषा में समझाता है',
        'हर दवाई, जाँच और अपॉइंटमेंट के लिए स्मार्ट रिमाइंडर पाएँ',
        'परिवार के सदस्य और देखभालकर्ता जानकारी में और जुड़े रहते हैं',
        'डॉक्टरों को प्रगति अपडेट मिलते हैं और वे दूर से देखभाल योजनाओं को समायोजित कर सकते हैं',
      ],
      threeUsersTitle: 'देखभाल यात्रा में हर किसी के लिए बनाया गया',
      patientCard: {
        title: 'मरीजों के लिए',
        desc: 'अपने प्रिस्क्रिप्शन समझें, कोई दवाई न छूटे, और अपनी स्वास्थ्य प्रगति को ट्रैक करें — सब कुछ अपनी भाषा में।',
      },
      caregiverCard: {
        title: 'परिवार और देखभालकर्ताओं के लिए',
        desc: 'अपने प्रियजनों की देखभाल योजना के बारे में जानकारी रखें, रिमाइंडर भेजें, और उनके डॉक्टर के साथ सहजता से समन्वय करें।',
      },
      doctorCard: {
        title: 'डॉक्टरों के लिए',
        desc: 'संरचित देखभाल योजनाएँ बनाएँ, मरीज के अनुपालन की निगरानी करें, और जब कुछ ध्यान देने की ज़रूरत हो तो जल्दी हस्तक्षेप करें।',
      },
      featuresTitle: 'बेहतर स्वास्थ्य सेवा के लिए आपको जो कुछ भी चाहिए',
      ctaTitle: 'अपने स्वास्थ्य को नियंत्रण में लेने के लिए तैयार हैं?',
      ctaButton: 'अपनी मुफ़्त यात्रा शुरू करें',
    },
    roles: {
      welcomeTitle: 'हिताायुष में आपका स्वागत है',
      welcomeSubtitle: 'चुनें कि आप प्लेटफ़ॉर्म का उपयोग कैसे करना चाहते हैं',
      patientTitle: 'मैं मरीज़ हूँ',
      patientDesc:
        'अपनी दवाइयों को ट्रैक करें, प्रिस्क्रिप्शन समझें, और अपनी स्वास्थ्य यात्रा में आगे रहें।',
      caregiverTitle: 'मैं परिवार का सदस्य / देखभालकर्ता हूँ',
      caregiverDesc:
        'अपने प्रियजनों को उनकी देखभाल योजनाओं का पालन करने में मदद करें, रिमाइंडर भेजें, और उनके डॉक्टरों से जुड़े रहें।',
      doctorTitle: 'मैं डॉक्टर हूँ',
      doctorDesc:
        'देखभाल योजनाएँ बनाएँ, मरीज की प्रगति की निगरानी करें, और दौरों के बीच समय पर मार्गदर्शन प्रदान करें।',
      enterDashboard: 'डैशबोर्ड में प्रवेश करें',
    },
    patient: {
      greeting: 'आपको देखकर अच्छा लगा',
      subtitle: 'आज के लिए आपका स्वास्थ्य सारांश यहाँ है',
      medicinesToday: 'आज की दवाइयाँ',
      upcomingTests: 'आगामी जाँचें',
      nextAppointment: 'अगली अपॉइंटमेंट',
      carePlanProgress: 'देखभाल योजना प्रगति',
      recentActivity: 'हालिया गतिविधि',
      markTaken: 'ली हुई चिह्नित करें',
      markSkipped: 'छोड़ें',
      viewDetails: 'विवरण देखें',
      uploadPrescription: 'प्रिस्क्रिप्शन अपलोड करें',
      understandPrescription: 'मेरा प्रिस्क्रिप्शन समझें',
      aiExplanation: 'AI-संचालित व्याख्या',
      originalInstruction: 'मूल निर्देश',
      simpleExplanation: 'सरल व्याख्या',
      medicineSchedule: 'दवाई अनुसूची',
      testSchedule: 'जाँच अनुसूची',
      healthTimeline: 'स्वास्थ्य टाइमलाइन',
      progressUpdate: 'प्रगति अपडेट',
      howFeeling: 'आज आप कैसा महसूस कर रहे हैं?',
      feelingBetter: 'बेहतर महसूस कर रहा/रही हूँ',
      noChange: 'कोई बदलाव नहीं',
      feelingWorse: 'बुरा महसूस कर रहा/रही हूँ',
      needHelp: 'मदद चाहिए',
      submitUpdate: 'अपडेट सबमिट करें',
      careAssistant: 'देखभाल सहायक',
    },
    caregiver: {
      greeting: 'वापस आने पर स्वागत है',
      subtitle: 'आपके परिवार के सदस्यों की स्थिति यहाँ है',
      connectedPatients: 'जुड़े हुए मरीज़',
      patientSupport: 'मरीज़ सहायता',
      sendReminder: 'रिमाइंडर भेजें',
      markAssisted: 'सहायता दी गई चिह्नित करें',
      viewInstructions: 'निर्देश देखें',
      requestClarification: 'स्पष्टीकरण माँगें',
      accessPermissions: 'एक्सेस और अनुमतियाँ',
    },
    doctor: {
      greeting: 'स्वागत है, डॉक्टर',
      totalPatients: 'कुल मरीज़',
      followUpNeeded: 'फ़ॉलो-अप ज़रूरी',
      pendingReviews: 'लंबित समीक्षाएँ',
      upcomingAppointments: 'आगामी अपॉइंटमेंट',
      incompleteCareTasks: 'अधूरे देखभाल कार्य',
      patientList: 'मरीज़ सूची',
      createCarePlan: 'देखभाल योजना बनाएँ',
      saveDraft: 'ड्राफ़्ट सेव करें',
      reviewPlan: 'योजना समीक्षा करें',
      approvePlan: 'योजना स्वीकृत करें',
      shareWithPatient: 'मरीज़ के साथ साझा करें',
      carePlanStatus: 'देखभाल योजना स्थिति',
    },
    common: {
      search: 'खोजें',
      filter: 'फ़िल्टर',
      viewAll: 'सभी देखें',
      save: 'सेव करें',
      cancel: 'रद्द करें',
      confirm: 'पुष्टि करें',
      close: 'बंद करें',
      back: 'वापस',
      next: 'अगला',
      previous: 'पिछला',
      loading: 'लोड हो रहा है...',
      noData: 'कोई डेटा उपलब्ध नहीं',
      pending: 'लंबित',
      scheduled: 'शेड्यूल किया गया',
      completed: 'पूर्ण',
      active: 'सक्रिय',
      approved: 'स्वीकृत',
      draft: 'ड्राफ़्ट',
      shared: 'साझा किया गया',
      today: 'आज',
      tomorrow: 'कल',
      thisWeek: 'इस सप्ताह',
    },
    medical: {
      disclaimer:
        'यह प्लेटफ़ॉर्म केवल सूचना उद्देश्यों के लिए है और पेशेवर चिकित्सा सलाह का विकल्प नहीं है। अपने उपचार में कोई भी बदलाव करने से पहले हमेशा अपने डॉक्टर से परामर्श लें।',
      aiDisclaimer:
        'AI-जनित व्याख्याएँ समझने के लिए सरलीकृत हैं। ये चिकित्सा सलाह नहीं हैं। कृपया अपने स्वास्थ्य सेवा प्रदाता से सत्यापित करें।',
      contactDoctor: 'अपने डॉक्टर से संपर्क करें',
      demoNotice:
        'यह एक प्रोटोटाइप प्रदर्शन है। कोई वास्तविक मरीज़ डेटा संग्रहीत या संसाधित नहीं किया जाता है।',
    },
  },
};
