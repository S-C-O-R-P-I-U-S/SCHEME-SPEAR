export interface SchemeDetailItem {
  id: string;
  code: string;
  title: string;
  level: 'Central' | 'State';
  stateName?: string;
  category: string;
  benefits: string;
  details: string;
  eligibilityRules: string[];
  applicationSteps: { step: number; title: string; desc: string }[];
  tags: string[];
  minAge: number;
  maxAge: number;
  incomeCeiling: number; // in LPA
  targetCastes: string[];
  requiredDocs: { id: string; name: string; category: string }[];
}

export const EXTENDED_SCHEMES_CATALOG: SchemeDetailItem[] = [
  // --- EDUCATION & SCHOLARSHIPS ---
  {
    id: 'sch-post-matric-sc',
    code: 'NSP-POST-MATRIC-2026',
    title: 'Post-Matric Scholarship for SC/ST Students',
    level: 'Central',
    category: 'Education & Scholarships',
    benefits: '100% course fee reimbursement + monthly maintenance allowance up to ₹1,200/month.',
    details: 'Centrally sponsored scheme providing financial support to SC/ST students studying in Class 11, 12, ITI, Diploma, Graduation, and Post-Graduation degrees in recognized institutions.',
    eligibilityRules: [
      'Must belong to Scheduled Caste (SC) or Scheduled Tribe (ST) category.',
      'Annual family income must not exceed ₹2,50,000 LPA.',
      'Must be enrolled in a recognized post-secondary educational institution.'
    ],
    applicationSteps: [
      { step: 1, title: 'National Scholarship Portal', desc: 'Register at scholarship.gov.in with student Aadhaar.' },
      { step: 2, title: 'Institutional Nodal Verification', desc: 'College verifies marksheets & attendance record.' },
      { step: 3, title: 'Direct Benefit Transfer (DBT)', desc: 'Scholarship credited directly to Aadhaar-seeded bank account.' }
    ],
    tags: ['Scholarship', 'Education', 'SC', 'ST', 'Student'],
    minAge: 15,
    maxAge: 30,
    incomeCeiling: 2.5,
    targetCastes: ['SC', 'ST'],
    requiredDocs: [
      { id: 'doc-aadhaar', name: 'Aadhaar Card', category: 'Identity' },
      { id: 'doc-caste', name: 'Caste Certificate (SC/ST)', category: 'Reservation' },
      { id: 'doc-income', name: 'Income Certificate', category: 'Financial' },
      { id: 'doc-marksheet', name: 'Previous Year Marksheet', category: 'Academic' }
    ]
  },
  {
    id: 'sch-pm-yasasvi',
    code: 'PM-YASASVI-2026',
    title: 'PM YASASVI Central Top Class Education Scholarship for OBC/EWS',
    level: 'Central',
    category: 'Education & Scholarships',
    benefits: 'Full tuition fee reimbursement + annual stationary allowance up to ₹45,000/year.',
    details: 'Scheme by Ministry of Social Justice & Empowerment for meritorious OBC, EWS, and DNT students studying in top-ranked IITs, NITs, IIMs, and AIIMS.',
    eligibilityRules: [
      'Must belong to OBC, EWS, or DNT categories.',
      'Annual family income ceiling of ₹2,50,000 LPA.',
      'Passed YASASVI entrance test or secured admission in designated Top Class Institutes.'
    ],
    applicationSteps: [
      { step: 1, title: 'NTA YASASVI Portal', desc: 'Fill online application at yet.nta.ac.in' },
      { step: 2, title: 'Institute Verification', desc: 'Upload admission fee receipt & rank card.' }
    ],
    tags: ['Scholarship', 'OBC', 'EWS', 'Top Class', 'IIT'],
    minAge: 14,
    maxAge: 25,
    incomeCeiling: 2.5,
    targetCastes: ['OBC', 'EWS'],
    requiredDocs: [
      { id: 'doc-aadhaar', name: 'Aadhaar Card', category: 'Identity' },
      { id: 'doc-caste-obc', name: 'OBC / EWS Certificate', category: 'Reservation' },
      { id: 'doc-income', name: 'Income Certificate', category: 'Financial' },
      { id: 'doc-admission', name: 'College Admission Receipt', category: 'Academic' }
    ]
  },
  {
    id: 'sch-[#nmms]',
    code: 'NMMSS-2026',
    title: 'National Means-cum-Merit Scholarship (NMMS) for School Students',
    level: 'Central',
    category: 'Education & Scholarships',
    benefits: 'Scholarship of ₹12,000 per annum (₹1,000/month) for Class 9 to Class 12.',
    details: 'Aims to prevent dropouts among meritorious students from economically weaker sections after Class 8.',
    eligibilityRules: [
      'Students studying in Class 9 having secured minimum 55% in Class 8.',
      'Annual family income ceiling of ₹3,50,000 LPA.',
      'Must clear the State Level NMMS Selection Test.'
    ],
    applicationSteps: [
      { step: 1, title: 'State Examination Portal', desc: 'Apply through school headmaster.' },
      { step: 2, title: 'Selection Test & Portal Onboarding', desc: 'Link selected student roll number on NSP.' }
    ],
    tags: ['Scholarship', 'Merit', 'School', 'EWS'],
    minAge: 13,
    maxAge: 18,
    incomeCeiling: 3.5,
    targetCastes: ['SC', 'ST', 'OBC', 'EWS', 'General'],
    requiredDocs: [
      { id: 'doc-aadhaar', name: 'Aadhaar Card', category: 'Identity' },
      { id: 'doc-income', name: 'Income Certificate', category: 'Financial' },
      { id: 'doc-marksheet-8', name: 'Class 8 Marksheet', category: 'Academic' }
    ]
  },
  {
    id: 'sch-pragati-women',
    code: 'AICTE-PRAGATI-2026',
    title: 'AICTE Pragati Scholarship for Girl Students in Technical Education',
    level: 'Central',
    category: 'Education & Scholarships',
    benefits: '₹50,000 per annum for duration of Degree/Diploma course.',
    details: 'Encourages young women to pursue technical degree and diploma engineering programs.',
    eligibilityRules: [
      'Girl student admitted to 1st year Degree/Diploma course in AICTE approved institute.',
      'Maximum 2 girl children per family eligible.',
      'Family income less than ₹8,00,000 LPA.'
    ],
    applicationSteps: [
      { step: 1, title: 'National Scholarship Portal', desc: 'Submit application under AICTE scheme section.' },
      { step: 2, title: 'Direct Bank Transfer', desc: 'Disbursement into student account.' }
    ],
    tags: ['Women', 'Engineering', 'Technical', 'Diploma'],
    minAge: 17,
    maxAge: 25,
    incomeCeiling: 8.0,
    targetCastes: ['SC', 'ST', 'OBC', 'EWS', 'General'],
    requiredDocs: [
      { id: 'doc-aadhaar', name: 'Aadhaar Card', category: 'Identity' },
      { id: 'doc-income', name: 'Income Certificate', category: 'Financial' },
      { id: 'doc-[#aicte]', name: 'AICTE Admission Allotment Letter', category: 'Academic' }
    ]
  },

  // --- BUSINESS & LOANS ---
  {
    id: 'sch-nsfdc-term-loan',
    code: 'NSFDC-TL-2026',
    title: 'NSFDC Concessional Term Loan for SC Micro-Entrepreneurs',
    level: 'Central',
    category: 'Business & Loans',
    benefits: 'Term Loan assistance up to ₹15 Lakhs at 6% per annum with 35% capital subsidy.',
    details: 'Concessional finance for SC entrepreneurs setting up manufacturing, service, or retail enterprises.',
    eligibilityRules: [
      'Must belong to Scheduled Caste (SC) category.',
      'Annual family income below ₹3,00,000 LPA.',
      'Age between 18 and 55 years.'
    ],
    applicationSteps: [
      { step: 1, title: 'District SCA Nodal Form', desc: 'Submit project profile to State Channelizing Agency.' },
      { step: 2, title: 'Bank Appraisal & Subsidy Release', desc: 'Bank sanctions loan with upfront subsidy.' }
    ],
    tags: ['SC', 'Micro-Loan', 'Subsidy', 'NSFDC'],
    minAge: 18,
    maxAge: 55,
    incomeCeiling: 3.0,
    targetCastes: ['SC'],
    requiredDocs: [
      { id: 'doc-aadhaar', name: 'Aadhaar Card', category: 'Identity' },
      { id: 'doc-caste', name: 'Caste Certificate (SC)', category: 'Reservation' },
      { id: 'doc-income', name: 'Income Certificate', category: 'Financial' },
      { id: 'doc-bank', name: 'Bank Account Passbook', category: 'Financial' }
    ]
  },
  {
    id: 'sch-standup-india',
    code: 'SUI-2026',
    title: 'Stand-Up India Scheme for Women & SC/ST Enterprise',
    level: 'Central',
    category: 'Business & Loans',
    benefits: 'Bank loans between ₹10 Lakhs up to ₹1 Crore for greenfield enterprises with 25% margin support.',
    details: 'Facilitates bank credit for SC/ST and female borrowers for setting up manufacturing or trading units.',
    eligibilityRules: [
      'SC/ST and/or Female borrower above 18 years.',
      'Greenfield enterprise in manufacturing, services, or trading sector.'
    ],
    applicationSteps: [
      { step: 1, title: 'Stand-Up Mitra Portal', desc: 'Apply online at standupmitra.in' },
      { step: 2, title: 'Lead District Bank Approval', desc: 'Branch verification & loan sanction.' }
    ],
    tags: ['Women', 'SC', 'ST', 'Bank Loan', 'Micro-Unit'],
    minAge: 18,
    maxAge: 65,
    incomeCeiling: 10.0,
    targetCastes: ['SC', 'ST', 'General', 'OBC'],
    requiredDocs: [
      { id: 'doc-aadhaar', name: 'Aadhaar Card', category: 'Identity' },
      { id: 'doc-pan', name: 'PAN Card', category: 'Identity' },
      { id: 'doc-project-report', name: 'Detailed Project Report (DPR)', category: 'Business' }
    ]
  },
  {
    id: 'sch-pmegp',
    code: 'PMEGP-2026',
    title: 'Prime Minister Employment Generation Programme (PMEGP)',
    level: 'Central',
    category: 'Business & Loans',
    benefits: 'Margin money subsidy up to 35% for project cost up to ₹50 Lakhs (Manufacturing) and ₹20 Lakhs (Services).',
    details: 'Credit-linked subsidy program administered by KVIC to generate self-employment in rural and urban areas.',
    eligibilityRules: [
      'Any individual above 18 years of age.',
      'At least VIII standard pass for projects costing above ₹10 Lakhs in manufacturing.',
      'Special category beneficiaries (SC/ST/OBC/Women) get 35% subsidy in rural areas.'
    ],
    applicationSteps: [
      { step: 1, title: 'KVIC Online Portal', desc: 'Submit application at kviconline.gov.in' },
      { step: 2, title: 'Task Force Screening', desc: 'Interview and bank branch forwarding.' }
    ],
    tags: ['PMEGP', 'Subsidy', 'KVIC', 'Self-Employment'],
    minAge: 18,
    maxAge: 60,
    incomeCeiling: 5.0,
    targetCastes: ['SC', 'ST', 'OBC', 'EWS', 'General'],
    requiredDocs: [
      { id: 'doc-aadhaar', name: 'Aadhaar Card', category: 'Identity' },
      { id: 'doc-education', name: 'Class 8th / 10th Pass Certificate', category: 'Academic' },
      { id: 'doc-caste', name: 'Category Certificate', category: 'Reservation' }
    ]
  },

  // --- AGRICULTURE & FARMING ---
  {
    id: 'sch-pm-kisan',
    code: 'PM-KISAN-2026',
    title: 'Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)',
    level: 'Central',
    category: 'Agriculture & Farming',
    benefits: 'Direct financial assistance of ₹6,000 per year paid in 3 equal installments of ₹2,000.',
    details: 'Income support scheme for all landholding farmer families across the country.',
    eligibilityRules: [
      'Landholding farmer families with cultivable land in their name.',
      'Excludes institutional landholders and high-income tax payers.'
    ],
    applicationSteps: [
      { step: 1, title: 'PM KSA Portal', desc: 'Register at pmkisan.gov.in via e-KYC.' },
      { step: 2, title: 'Village Revenue Officer Verification', desc: 'Land record matching.' }
    ],
    tags: ['Farmer', 'Agriculture', 'DBT', 'Rural'],
    minAge: 18,
    maxAge: 75,
    incomeCeiling: 4.0,
    targetCastes: ['SC', 'ST', 'OBC', 'General'],
    requiredDocs: [
      { id: 'doc-aadhaar', name: 'Aadhaar Card', category: 'Identity' },
      { id: 'doc-patta', name: 'Land Ownership Document (Patta/Chitta)', category: 'Occupation' },
      { id: 'doc-bank', name: 'Bank Passbook', category: 'Financial' }
    ]
  },
  {
    id: 'sch-kisan-credit-card',
    code: 'KCC-2026',
    title: 'Kisan Credit Card (KCC) Scheme with Interest Subvention',
    level: 'Central',
    category: 'Agriculture & Farming',
    benefits: 'Revolving crop credit up to ₹3 Lakhs at concessional 4% interest rate on prompt repayment.',
    details: 'Provides timely agricultural credit for crop cultivation, post-harvest expenses, and allied activities.',
    eligibilityRules: [
      'Farmers - individual/joint borrowers, tenant farmers, and Self-Help Groups.',
      'Age between 18 and 75 years.'
    ],
    applicationSteps: [
      { step: 1, title: 'Bank Branch Submission', desc: 'Submit KCC single-page application at any commercial or rural bank.' }
    ],
    tags: ['KCC', 'Crop Loan', 'Interest Subvention', 'Farmers'],
    minAge: 18,
    maxAge: 75,
    incomeCeiling: 6.0,
    targetCastes: ['SC', 'ST', 'OBC', 'General'],
    requiredDocs: [
      { id: 'doc-aadhaar', name: 'Aadhaar Card', category: 'Identity' },
      { id: 'doc-patta', name: 'Land Record Proof', category: 'Occupation' }
    ]
  },

  // --- SOCIAL WELFARE & HEALTH ---
  {
    id: 'sch-mahila-samriddhi',
    code: 'NSFDC-MSY-2026',
    title: 'Mahila Samriddhi Yojana for Women Micro-Vendors',
    level: 'State',
    category: 'Social Welfare',
    benefits: 'Micro-credit loan up to ₹1.4 Lakhs at ultra-low 4% annual interest rate.',
    details: 'Empowers women entrepreneurs belonging to Scheduled Castes and Backward Classes for petty business activities.',
    eligibilityRules: [
      'Women belonging to SC or Backward Classes.',
      'Annual family income below ₹3,00,000 LPA.'
    ],
    applicationSteps: [
      { step: 1, title: 'State SCA Branch Submission', desc: 'Apply through District Channel Officer.' }
    ],
    tags: ['Women', 'Micro-Loan', 'Social Welfare', 'NSFDC'],
    minAge: 18,
    maxAge: 55,
    incomeCeiling: 3.0,
    targetCastes: ['SC', 'OBC', 'ST'],
    requiredDocs: [
      { id: 'doc-aadhaar', name: 'Aadhaar Card', category: 'Identity' },
      { id: 'doc-caste', name: 'Caste Certificate', category: 'Reservation' },
      { id: 'doc-income', name: 'Income Certificate', category: 'Financial' }
    ]
  },
  {
    id: 'sch-ayushman-bharat',
    code: 'PM-JAY-2026',
    title: 'Ayushman Bharat Pradhan Mantri Jan Arogya Yojana (PM-JAY)',
    level: 'Central',
    category: 'Social Welfare',
    benefits: 'Free cashless health cover up to ₹5 Lakhs per family per year for secondary & tertiary hospitalization.',
    details: 'World largest health assurance scheme covering vulnerable families identified under SECC data.',
    eligibilityRules: [
      'Families identified under Socio-Economic Caste Census (SECC) data or BPL ration card holders.'
    ],
    applicationSteps: [
      { step: 1, title: 'Ayushman Card Generation', desc: 'Visit nearest Common Service Centre (CSC) or Empaneled Hospital.' }
    ],
    tags: ['Health', 'Insurance', 'BPL', 'Hospitalization'],
    minAge: 0,
    maxAge: 100,
    incomeCeiling: 2.5,
    targetCastes: ['SC', 'ST', 'OBC', 'EWS', 'General'],
    requiredDocs: [
      { id: 'doc-aadhaar', name: 'Aadhaar Card', category: 'Identity' },
      { id: 'doc-ration', name: 'Ration Card (BPL/AAY)', category: 'Financial' }
    ]
  }
];

export function calculateAgeFromDob(dobString: string): number {
  if (!dobString) return 26;
  const dobDate = new Date(dobString);
  const diffMs = Date.now() - dobDate.getTime();
  const ageDate = new Date(diffMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}
