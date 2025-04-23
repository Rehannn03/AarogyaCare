// Dummy data for medications
export const dummyMedications = [
  {
    name: "Lisinopril",
    dosage: "10mg",
    time: "8:00 AM",
    status: "taken",
    instructions: "Take with food",
  },
  {
    name: "Metformin",
    dosage: "500mg",
    time: "12:30 PM",
    status: "upcoming",
    instructions: "Take with meal",
  },
  {
    name: "Atorvastatin",
    dosage: "20mg",
    time: "8:00 PM",
    status: "upcoming",
    instructions: "Take in the evening",
  },
  {
    name: "Aspirin",
    dosage: "81mg",
    time: "8:00 AM",
    status: "taken",
    instructions: "Take with breakfast",
  },
  {
    name: "Vitamin D",
    dosage: "1000 IU",
    time: "8:00 AM",
    status: "taken",
    instructions: "Take with breakfast",
  },
  {
    name: "Levothyroxine",
    dosage: "50mcg",
    time: "7:00 AM",
    status: "missed",
    instructions: "Take on empty stomach",
  },
]

// Dummy data for the latest report
export const dummyLatestReport = {
  id: 1,
  title: "Annual Physical Examination",
  date: "2023-03-15",
  doctor: "Emily Johnson",
  summary:
    "Overall health is good. Blood pressure is slightly elevated. Cholesterol levels are within normal range. Recommended lifestyle changes to address blood pressure.",
  findings: [
    {
      name: "Blood Pressure",
      value: "135/85",
      unit: "mmHg",
      status: "attention",
      normalRange: "120/80 mmHg",
    },
    {
      name: "Cholesterol",
      value: "180",
      unit: "mg/dL",
      status: "normal",
      normalRange: "<200 mg/dL",
    },
    {
      name: "Blood Glucose",
      value: "95",
      unit: "mg/dL",
      status: "normal",
      normalRange: "70-100 mg/dL",
    },
    {
      name: "Heart Rate",
      value: "72",
      unit: "bpm",
      status: "normal",
      normalRange: "60-100 bpm",
    },
  ],
  recommendations: [
    "Reduce sodium intake to help lower blood pressure",
    "Maintain regular exercise routine of at least 150 minutes per week",
    "Continue taking prescribed medications as directed",
    "Schedule follow-up appointment in 3 months to reassess blood pressure",
  ],
  nextSteps:
    "Follow up in 3 months for blood pressure check. Continue current medication regimen. Consider scheduling a consultation with a nutritionist for dietary guidance.",
}

// Dummy data for all reports
export const dummyReports = [
  dummyLatestReport,
  {
    id: 2,
    title: "Blood Test Results",
    date: "2023-02-10",
    doctor: "Michael Chen",
    summary:
      "Complete blood count shows all values within normal range. Iron levels slightly low but not concerning. Vitamin D levels are optimal.",
    findings: [
      {
        name: "Hemoglobin",
        value: "14.2",
        unit: "g/dL",
        status: "normal",
        normalRange: "12-16 g/dL",
      },
      {
        name: "Iron",
        value: "60",
        unit: "μg/dL",
        status: "attention",
        normalRange: "65-175 μg/dL",
      },
      {
        name: "Vitamin D",
        value: "45",
        unit: "ng/mL",
        status: "normal",
        normalRange: "30-50 ng/mL",
      },
    ],
    recommendations: [
      "Consider iron-rich foods in your diet",
      "Continue vitamin D supplementation",
      "No additional supplements needed at this time",
    ],
    nextSteps: "No immediate follow-up needed. Routine blood work in 6 months.",
  },
  {
    id: 3,
    title: "Cardiology Consultation",
    date: "2023-01-05",
    doctor: "Robert Williams",
    summary:
      "Echocardiogram shows normal heart function. EKG within normal limits. No signs of structural heart disease. Stress test results normal.",
    findings: [
      {
        name: "Ejection Fraction",
        value: "60",
        unit: "%",
        status: "normal",
        normalRange: "55-70%",
      },
      {
        name: "Heart Rhythm",
        value: "Normal sinus rhythm",
        unit: "",
        status: "normal",
        normalRange: "Regular rhythm",
      },
    ],
    recommendations: [
      "Continue current exercise regimen",
      "Maintain heart-healthy diet",
      "Monitor blood pressure regularly",
    ],
    nextSteps: "Annual cardiology follow-up recommended. Continue monitoring blood pressure at home.",
  },
  {
    id: 4,
    title: "Chest X-Ray Results",
    date: "2022-11-20",
    doctor: "Sarah Thompson",
    summary:
      "Chest X-ray shows clear lung fields. No evidence of pneumonia, effusion, or masses. Heart size appears normal.",
    findings: [
      {
        name: "Lung Fields",
        value: "Clear",
        unit: "",
        status: "normal",
        normalRange: "Clear",
      },
      {
        name: "Heart Size",
        value: "Normal",
        unit: "",
        status: "normal",
        normalRange: "Normal",
      },
    ],
    recommendations: [
      "No further imaging needed at this time",
      "Follow up if symptoms of cough or shortness of breath develop",
    ],
    nextSteps: "No follow-up imaging required unless new symptoms develop.",
  },
]
