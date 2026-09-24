export interface UserProfile {
  name: string;
  phone: string;
  age: number;
  dob: string;
  caste: 'SC' | 'ST' | 'OBC' | 'EWS' | 'General' | 'Differently Abled';
  entrepreneurStatus: 'Aspiring / New Micro-Unit' | 'Existing Micro-Entrepreneur' | 'Self-Help Group (SHG) Member';
  gender: 'Female' | 'Male' | 'Transgender' | 'Prefer not to say';
  lpaIncome: number; // in Lakhs Per Annum (e.g. 2.5)
  state: string;
  district: string;
  tradeType: string;
}

export interface MatchedScheme {
  id: string;
  code: string;
  title: string;
  ministry: string;
  matchScore: number; // Percentage (e.g. 98)
  subsidyPct: number; // e.g. 30
  maxLoanAmount: number; // in INR
  interestRatePct: number; // e.g. 6.5
  tenureYears: number; // e.g. 5
  calculatedEmi: number; // Monthly payment in INR
  calculatedSubsidyAmount: number; // in INR
  eligibilityStatus: 'Eligible' | 'Conditional' | 'Ineligible';
  eligibilityReason: string;
  missingRequirements: string[];
  scaPartner: {
    agencyName: string;
    nodalOfficer: string;
    contactPhone: string;
    address: string;
  };
}

// EMI Calculation Helper: EMI = [P x R x (1+R)^N]/[(1+R)^N-1]
export function calculateEmi(principal: number, annualRatePct: number, tenureYears: number): number {
  const monthlyRate = annualRatePct / 12 / 100;
  const totalMonths = tenureYears * 12;
  if (monthlyRate === 0) return Math.round(principal / totalMonths);
  const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
  return Math.round(emi);
}

// Master AI Matching Engine
export function matchSchemesForProfile(profile: UserProfile): MatchedScheme[] {
  const baseSchemes = [
    {
      id: 'nsfdc-term-loan',
      code: 'NSFDC-TL-2026',
      title: 'NSFDC Term Loan Concessional Scheme for SC Entrepreneurs',
      ministry: 'National Scheduled Castes Finance & Development Corp (MoSJE)',
      baseSubsidy: 35,
      maxLoan: 1500000,
      interestRate: 6.0,
      tenure: 5,
      targetCastes: ['SC', 'Differently Abled'],
      incomeLimitLpa: 3.0,
    },
    {
      id: 'standup-india',
      code: 'SUI-2026',
      title: 'Stand-Up India Scheme for SC/ST & Women Entrepreneurs',
      ministry: 'Ministry of Finance, Govt of India',
      baseSubsidy: 25,
      maxLoan: 10000000,
      interestRate: 7.5,
      tenure: 7,
      targetCastes: ['SC', 'ST', 'OBC', 'General', 'EWS'],
      incomeLimitLpa: 10.0,
    },
    {
      id: 'pmegp-scheme',
      code: 'PMEGP-2026',
      title: 'Prime Minister Employment Generation Programme (PMEGP)',
      ministry: 'Ministry of MSME & KVIC',
      baseSubsidy: 35,
      maxLoan: 2500000,
      interestRate: 8.0,
      tenure: 6,
      targetCastes: ['SC', 'ST', 'OBC', 'EWS', 'General', 'Differently Abled'],
      incomeLimitLpa: 5.0,
    },
    {
      id: 'mudra-tarun',
      code: 'MUDRA-TARUN-2026',
      title: 'Pradhan Mantri MUDRA Yojana (Tarun Micro-Loan)',
      ministry: 'MUDRA Ltd / SIDBI',
      baseSubsidy: 15,
      maxLoan: 1000000,
      interestRate: 8.5,
      tenure: 5,
      targetCastes: ['SC', 'ST', 'OBC', 'EWS', 'General'],
      incomeLimitLpa: 8.0,
    },
    {
      id: 'mahila-samriddhi',
      code: 'NSFDC-MSY-2026',
      title: 'Mahila Samriddhi Yojana for Women Micro-Vendors',
      ministry: 'NSFDC & NBCFDC',
      baseSubsidy: 40,
      maxLoan: 140000,
      interestRate: 4.0,
      tenure: 3,
      targetCastes: ['SC', 'OBC', 'ST', 'Differently Abled'],
      incomeLimitLpa: 3.0,
    },
    {
      id: 'cegsc-scheme',
      code: 'CEGSC-2026',
      title: 'Credit Enhancement Guarantee Scheme for SC (CEGSC)',
      ministry: 'IFCI Ltd & Ministry of Social Justice',
      baseSubsidy: 20,
      maxLoan: 5000000,
      interestRate: 7.0,
      tenure: 5,
      targetCastes: ['SC'],
      incomeLimitLpa: 12.0,
    }
  ];

  return baseSchemes.map((s) => {
    let score = 70;
    const missing: string[] = [];

    // Caste Matching
    if (s.targetCastes.includes(profile.caste)) {
      score += 15;
    } else {
      missing.push(`Scheme specifically targets ${s.targetCastes.join('/')} categories.`);
    }

    // Gender boost for Women & Special Categories
    if (profile.gender === 'Female' && (s.id === 'mahila-samriddhi' || s.id === 'standup-india')) {
      score += 10;
    }

    // Income Ceiling Check
    if (profile.lpaIncome <= s.incomeLimitLpa) {
      score += 10;
    } else {
      score -= 15;
      missing.push(`Income ₹${profile.lpaIncome} LPA exceeds optimal ceiling of ₹${s.incomeLimitLpa} LPA.`);
    }

    // Age Check (18-65)
    if (profile.age >= 18 && profile.age <= 65) {
      score += 5;
    } else {
      missing.push(`Applicant age (${profile.age}) must be between 18 and 65 years.`);
    }

    const finalScore = Math.min(99, Math.max(45, score));
    const isEligible: 'Eligible' | 'Conditional' | 'Ineligible' = finalScore >= 80 ? 'Eligible' : finalScore >= 60 ? 'Conditional' : 'Ineligible';

    const netPrincipalAfterSubsidy = s.maxLoan * (1 - s.baseSubsidy / 100);
    const emi = calculateEmi(netPrincipalAfterSubsidy, s.interestRate, s.tenure);
    const subsidyAmt = Math.round(s.maxLoan * (s.baseSubsidy / 100));

    // SCA Channel Partner Resolver
    const scaAgencyName = `${profile.state || 'State'} Channelizing Agency (SCA) - ${profile.district || 'District'} Branch`;
    const nodalOfficer = `Nodal Officer ${profile.district || 'District'} HQ`;

    return {
      id: s.id,
      code: s.code,
      title: s.title,
      ministry: s.ministry,
      matchScore: finalScore,
      subsidyPct: s.baseSubsidy,
      maxLoanAmount: s.maxLoan,
      interestRatePct: s.interestRate,
      tenureYears: s.tenure,
      calculatedEmi: emi,
      calculatedSubsidyAmount: subsidyAmt,
      eligibilityStatus: isEligible,
      eligibilityReason: isEligible === 'Eligible'
        ? `Fully complies with ${profile.caste} category reservation and income ceiling limit of ₹${s.incomeLimitLpa} LPA.`
        : `Partial criteria match. Requires secondary verification of caste certificate and business plan.`,
      missingRequirements: missing,
      scaPartner: {
        agencyName: scaAgencyName,
        nodalOfficer: nodalOfficer,
        contactPhone: profile.phone || '+91 80569 92589',
        address: `District Industries Centre (DIC), ${profile.district || 'Nodal Center'}, ${profile.state || 'India'}`,
      },
    };
  }).sort((a, b) => b.matchScore - a.matchScore);
}
