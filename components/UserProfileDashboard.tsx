'use client';

import React, { useState, useMemo } from 'react';
import { z } from 'zod';
import { 
  User, MapPin, Shield, Briefcase, FileCheck, CheckCircle2, 
  Circle, AlertCircle, Edit3, Award, Sparkles, Sliders, ChevronRight, 
  Percent, ArrowRight, X, HeartHandshake, Layers, Lock, Check
} from 'lucide-react';

// ==========================================
// 1. ZOD VALIDATION SCHEMA & TYPES
// ==========================================

export const UserProfileSchema = z.object({
  // Personal & Demographics
  name: z.string().min(2, 'Name is required'),
  phone: z.string().regex(/^[0-9]{10}$/, '10-digit mobile number required'),
  age: z.number().min(14).max(100),
  dob: z.string(),
  gender: z.enum(['MALE', 'FEMALE', 'TRANSGENDER', 'PREFER_NOT_TO_SAY']),
  maritalStatus: z.enum(['SINGLE', 'MARRIED', 'WIDOWED', 'DIVORCED']),
  isDisabled: z.boolean(),
  disabilityPercentage: z.number().min(0).max(100).optional(),

  // Location
  state: z.string().min(1, 'State is required'),
  district: z.string().min(1, 'District is required'),
  areaType: z.enum(['RURAL', 'URBAN', 'SEMI_URBAN']),

  // Social & Economic
  casteCategory: z.enum(['GENERAL', 'OBC', 'SC', 'ST', 'EWS', 'MINORITY']),
  annualIncome: z.number().min(0),
  rationCardType: z.enum(['NONE', 'APL', 'BPL', 'AAY']),

  // Occupation & Sector
  occupation: z.enum([
    'STUDENT', 'FARMER', 'CONSTRUCTION_BOCW', 'FISHERMAN', 
    'MICRO_ENTREPRENEUR', 'UNORGANIZED_LABOR', 'UNEMPLOYED', 'SALARIED'
  ]),
  hasBocwCard: z.boolean().default(false),
  landOwnershipHectares: z.number().min(0).default(0),
  studentGradeLevel: z.string().optional(),

  // Document Locker (Possessed document codes)
  possessedDocIds: z.array(z.string()).default([])
});

export type UserProfileData = z.infer<typeof UserProfileSchema>;

export interface MasterDocument {
  id: string;
  code: string;
  name: string;
  category: 'Identity' | 'Residence' | 'Reservation' | 'Financial' | 'Occupation' | 'Special';
  description: string;
}

export interface SchemeItem {
  id: string;
  code: string;
  schemeName: string;
  level: 'CENTRAL' | 'STATE';
  applicableState?: string;
  category: string;
  benefits: string;
  minAge: number;
  maxAge: number;
  incomeCeiling: number;
  targetCastes: string[];
  allowedOccupations: string[];
  requiredDocs: MasterDocument[];
}

// ==========================================
// MASTER DOCUMENT LOCKER CATALOG
// ==========================================
export const MASTER_DOCUMENTS: MasterDocument[] = [
  { id: 'doc-aadhaar', code: 'AADHAAR', name: 'Aadhaar Card', category: 'Identity', description: 'UIDAI Unique Identification Proof' },
  { id: 'doc-domicile', code: 'DOMICILE', name: 'Domicile / Residence Certificate', category: 'Residence', description: 'State Residence Proof issued by Tehsildar' },
  { id: 'doc-caste', code: 'CASTE_CERT', name: 'Caste Certificate (SC/ST/OBC)', category: 'Reservation', description: 'Competent Authority Caste Proof' },
  { id: 'doc-income', code: 'INCOME_CERT', name: 'Income Certificate', category: 'Financial', description: 'Current Fiscal Year Family Income Certificate' },
  { id: 'doc-ration', code: 'RATION_CARD', name: 'Ration Card (BPL/AAY/APL)', category: 'Financial', description: 'PDS Smart Ration Card' },
  { id: 'doc-bank', code: 'BANK_PASSBOOK', name: 'Bank Passbook & IFSC Details', category: 'Financial', description: 'Aadhaar Seeded Bank Account Details' },
  { id: 'doc-patta', code: 'LAND_PATTA', name: 'Land Ownership (Patta / Chitta)', category: 'Occupation', description: 'Revenue Record Land Title Proof' },
  { id: 'doc-bocw', code: 'BOCW_CARD', name: 'BOCW Welfare Board ID Card', category: 'Occupation', description: 'Construction Workers Welfare Board Card' },
  { id: 'doc-[#pwd]', code: 'DISABILITY_CERT', name: 'Disability Certificate (40%+)', category: 'Special', description: 'UDID Card / Civil Surgeon Disability Proof' }
];

// ==========================================
// 3,400+ SCHEME DATASET SAMPLE
// ==========================================
export const SCHEMES_CATALOG: SchemeItem[] = [
  {
    id: 'sch-nsfdc-tl',
    code: 'NSFDC-TL-2026',
    schemeName: 'NSFDC Concessional Term Loan for SC Entrepreneurs',
    level: 'CENTRAL',
    category: 'Business & Entrepreneurship',
    benefits: 'Term Loan assistance up to ₹15 Lakhs at 6% per annum with 35% capital subsidy.',
    minAge: 18,
    maxAge: 55,
    incomeCeiling: 300000,
    targetCastes: ['SC'],
    allowedOccupations: ['MICRO_ENTREPRENEUR', 'UNEMPLOYED', 'UNORGANIZED_LABOR'],
    requiredDocs: [
      MASTER_DOCUMENTS[0], // Aadhaar
      MASTER_DOCUMENTS[2], // Caste
      MASTER_DOCUMENTS[3], // Income
      MASTER_DOCUMENTS[5]  // Bank
    ]
  },
  {
    id: 'sch-sui',
    code: 'STANDUP-INDIA',
    schemeName: 'Stand-Up India Scheme for Women & SC/ST Enterprise',
    level: 'CENTRAL',
    category: 'Business & Entrepreneurship',
    benefits: 'Bank loan from ₹10 Lakhs up to ₹1 Crore for setting up greenfield micro-units.',
    minAge: 18,
    maxAge: 65,
    incomeCeiling: 1000000,
    targetCastes: ['SC', 'ST', 'GENERAL', 'OBC', 'EWS'],
    allowedOccupations: ['MICRO_ENTREPRENEUR', 'SALARIED', 'UNEMPLOYED'],
    requiredDocs: [
      MASTER_DOCUMENTS[0], // Aadhaar
      MASTER_DOCUMENTS[2], // Caste
      MASTER_DOCUMENTS[5]  // Bank
    ]
  },
  {
    id: 'sch-bocw-stipend',
    code: 'BOCW-EDU-STIPEND',
    schemeName: 'BOCW Construction Workers Child Education Assistance',
    level: 'STATE',
    applicableState: 'Tamil Nadu',
    category: 'Education & Learning',
    benefits: 'Annual scholarship grant of ₹12,000 for children of registered construction workers.',
    minAge: 14,
    maxAge: 70,
    incomeCeiling: 250000,
    targetCastes: ['GENERAL', 'OBC', 'SC', 'ST', 'EWS'],
    allowedOccupations: ['CONSTRUCTION_BOCW', 'UNORGANIZED_LABOR'],
    requiredDocs: [
      MASTER_DOCUMENTS[0], // Aadhaar
      MASTER_DOCUMENTS[7], // BOCW Card
      MASTER_DOCUMENTS[5]  // Bank
    ]
  },
  {
    id: 'sch-pm-kisan',
    code: 'PM-KISAN-2026',
    schemeName: 'Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)',
    level: 'CENTRAL',
    category: 'Agriculture & Rural',
    benefits: 'Direct cash transfer of ₹6,000 per year in 3 equal installments into bank accounts.',
    minAge: 18,
    maxAge: 75,
    incomeCeiling: 400000,
    targetCastes: ['GENERAL', 'OBC', 'SC', 'ST', 'EWS'],
    allowedOccupations: ['FARMER'],
    requiredDocs: [
      MASTER_DOCUMENTS[0], // Aadhaar
      MASTER_DOCUMENTS[6], // Land Patta
      MASTER_DOCUMENTS[5]  // Bank
    ]
  }
];

// ==========================================
// 2. CLIENT-SIDE MATCHING & READINESS UTILITIES
// ==========================================

export function calculateProfileCompletion(profile: UserProfileData): { percentage: number; missingFields: string[] } {
  const fields: { key: keyof UserProfileData; label: string }[] = [
    { key: 'name', label: 'Full Name' },
    { key: 'phone', label: 'Phone Number' },
    { key: 'age', label: 'Age' },
    { key: 'gender', label: 'Gender' },
    { key: 'state', label: 'State' },
    { key: 'district', label: 'District' },
    { key: 'casteCategory', label: 'Caste Category' },
    { key: 'annualIncome', label: 'Annual Income' },
    { key: 'occupation', label: 'Occupation' }
  ];

  let completedCount = 0;
  const missingFields: string[] = [];

  fields.forEach(f => {
    const val = profile[f.key];
    if (val !== undefined && val !== null && val !== '') {
      completedCount++;
    } else {
      missingFields.push(f.label);
    }
  });

  const percentage = Math.round((completedCount / fields.length) * 100);
  return { percentage, missingFields };
}

export function matchSchemeForUser(scheme: SchemeItem, profile: UserProfileData) {
  let score = 70;
  const missingReasons: string[] = [];

  // 1. Caste Eligibility
  if (scheme.targetCastes.includes(profile.casteCategory)) {
    score += 15;
  } else {
    score -= 20;
    missingReasons.push(`Scheme specifically targets ${scheme.targetCastes.join('/')} categories.`);
  }

  // 2. Income Ceiling
  if (profile.annualIncome <= scheme.incomeCeiling) {
    score += 10;
  } else {
    score -= 15;
    missingReasons.push(`Annual income ₹${(profile.annualIncome/100000).toFixed(1)} LPA exceeds ceiling of ₹${(scheme.incomeCeiling/100000).toFixed(1)} LPA.`);
  }

  // 3. Age Bracket
  if (profile.age >= scheme.minAge && profile.age <= scheme.maxAge) {
    score += 5;
  } else {
    missingReasons.push(`Age ${profile.age} is outside the allowed bracket of ${scheme.minAge}-${scheme.maxAge} years.`);
  }

  // 4. Occupation Match
  if (scheme.allowedOccupations.includes(profile.occupation)) {
    score += 5;
  }

  const matchPercentage = Math.min(99, Math.max(40, score));
  const isEligible = matchPercentage >= 80 ? 'HIGH_MATCH' : matchPercentage >= 60 ? 'MODERATE' : 'LOW';

  // Document Readiness Calculation
  const requiredCount = scheme.requiredDocs.length;
  const readyCount = scheme.requiredDocs.filter(d => profile.possessedDocIds.includes(d.id)).length;
  const docReadinessPct = Math.round((readyCount / requiredCount) * 100);

  return {
    scheme,
    matchPercentage,
    isEligible,
    missingReasons,
    readyCount,
    requiredCount,
    docReadinessPct
  };
}

// ==========================================
// 3. MAIN PROFILE DASHBOARD COMPONENT
// ==========================================

export default function UserProfileDashboard() {
  const [profile, setProfile] = useState<UserProfileData>({
    name: 'Sriram Suresh',
    phone: '8056992589',
    age: 26,
    dob: '2000-05-15',
    gender: 'MALE',
    maritalStatus: 'SINGLE',
    isDisabled: false,
    disabilityPercentage: 0,
    state: 'Tamil Nadu',
    district: 'Chennai',
    areaType: 'URBAN',
    casteCategory: 'SC',
    annualIncome: 220000,
    rationCardType: 'BPL',
    occupation: 'MICRO_ENTREPRENEUR',
    hasBocwCard: false,
    landOwnershipHectares: 0,
    possessedDocIds: ['doc-aadhaar', 'doc-caste', 'doc-income', 'doc-bank']
  });

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'MATCHED' | 'LOCKER'>('MATCHED');

  const { percentage: completionPct, missingFields } = calculateProfileCompletion(profile);

  const matchedResults = useMemo(() => {
    return SCHEMES_CATALOG.map(scheme => matchSchemeForUser(scheme, profile))
      .sort((a, b) => b.matchPercentage - a.matchPercentage);
  }, [profile]);

  const toggleDocument = (docId: string) => {
    setProfile(prev => {
      const exists = prev.possessedDocIds.includes(docId);
      return {
        ...prev,
        possessedDocIds: exists 
          ? prev.possessedDocIds.filter(id => id !== docId)
          : [...prev.possessedDocIds, docId]
      };
    });
  };

  return (
    <div className="min-h-screen bg-[#0A0E1A] text-slate-100 font-sans p-4 md:p-8">
      
      {/* Top Banner Header */}
      <header className="max-w-7xl mx-auto mb-8 border-b border-slate-800 pb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-md bg-[#FFB800]/20 text-[#FFB800] border border-[#FFB800]/40 text-xs font-mono font-bold">
              CITIZEN PROFILE DASHBOARD
            </span>
            <span className="text-xs text-slate-400 font-mono">3,400+ SCHEME MATCHING ENGINE</span>
          </div>
          <h1 className="text-2xl md:text-4xl font-extrabold font-heading text-white mt-1">
            Welcome back, {profile.name}
          </h1>
        </div>

        <button
          onClick={() => setIsEditModalOpen(true)}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FFB800] to-amber-500 text-black font-extrabold text-xs flex items-center gap-2 shadow-[0_0_20px_rgba(255,184,0,0.35)] hover:scale-105 transition-transform cursor-pointer"
        >
          <Edit3 className="w-4 h-4" /> Edit Profile Attributes
        </button>
      </header>

      {/* Main Workspace Layout Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Profile Summary & Completion Meter */}
        <aside className="lg:col-span-4 space-y-6">
          
          {/* Profile Overview Card */}
          <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 backdrop-blur-xl shadow-xl space-y-6">
            <div className="flex items-center gap-4 border-b border-slate-800 pb-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#FFB800] to-[#00E5CC] p-0.5 shadow-md flex-shrink-0">
                <div className="w-full h-full bg-[#0A0E1A] rounded-[14px] flex items-center justify-center font-black font-heading text-transparent bg-clip-text bg-gradient-to-r from-[#FFB800] to-[#00E5CC] text-lg">
                  {profile.name.split(' ').map(n=>n[0]).join('')}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold font-heading text-white">{profile.name}</h3>
                <span className="px-2 py-0.5 rounded bg-[#FFB800]/20 text-[#FFB800] border border-[#FFB800]/40 text-[10px] font-mono font-bold">
                  {profile.casteCategory} CATEGORY
                </span>
                <p className="text-xs text-slate-400 font-mono mt-1">📍 {profile.district}, {profile.state}</p>
              </div>
            </div>

            {/* Completion Meter Alert */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">PROFILE COMPLETION</span>
                <span className="text-[#00E5CC] font-bold">{completionPct}%</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#FFB800] to-[#00E5CC] transition-all duration-500" 
                  style={{ width: `${completionPct}%` }}
                />
              </div>
              {completionPct < 100 && (
                <p className="text-[11px] text-amber-300 flex items-center gap-1.5 pt-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                  Complete missing fields to unlock more accurate scheme matches.
                </p>
              )}
            </div>

            {/* Detailed Attributes Grid */}
            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                <span className="text-slate-400">Annual Income</span>
                <strong className="text-emerald-400 font-mono">₹{(profile.annualIncome/100000).toFixed(2)} LPA</strong>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                <span className="text-slate-400">Occupation</span>
                <strong className="text-white">{profile.occupation.replace('_', ' ')}</strong>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                <span className="text-slate-400">Ration Card</span>
                <strong className="text-[#FFB800]">{profile.rationCardType}</strong>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                <span className="text-slate-400">Age & Gender</span>
                <strong className="text-white">{profile.age} Yrs • {profile.gender}</strong>
              </div>
            </div>
          </div>

          {/* Quick Document Locker Summary */}
          <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h4 className="text-sm font-bold font-heading text-white flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-[#00E5CC]" /> Document Locker Summary
              </h4>
              <span className="text-xs font-mono text-[#00E5CC]">
                {profile.possessedDocIds.length} / {MASTER_DOCUMENTS.length} Ready
              </span>
            </div>

            <div className="space-y-2">
              {MASTER_DOCUMENTS.slice(0, 4).map(doc => {
                const isOwned = profile.possessedDocIds.includes(doc.id);
                return (
                  <div key={doc.id} className="flex items-center justify-between text-xs py-1">
                    <span className={isOwned ? 'text-slate-200' : 'text-slate-500'}>{doc.name}</span>
                    {isOwned ? (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">READY</span>
                    ) : (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-500">MISSING</span>
                    )}
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => setActiveTab('LOCKER')}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              Manage Full Locker <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </aside>

        {/* Right Column: Tabbed View (Matched Schemes vs Document Locker) */}
        <main className="lg:col-span-8 space-y-6">
          
          {/* Section Navigation Tabs */}
          <div className="flex p-1 bg-slate-900 rounded-2xl border border-slate-800">
            <button
              onClick={() => setActiveTab('MATCHED')}
              className={`flex-1 py-3 rounded-xl text-xs font-extrabold font-heading flex items-center justify-center gap-2 transition-all cursor-pointer ${
                activeTab === 'MATCHED'
                  ? 'bg-gradient-to-r from-[#FFB800] to-amber-500 text-black shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Award className="w-4 h-4" /> Top Recommended Schemes ({matchedResults.length})
            </button>

            <button
              onClick={() => setActiveTab('LOCKER')}
              className={`flex-1 py-3 rounded-xl text-xs font-extrabold font-heading flex items-center justify-center gap-2 transition-all cursor-pointer ${
                activeTab === 'LOCKER'
                  ? 'bg-gradient-to-r from-[#00E5CC] to-teal-500 text-black shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <FileCheck className="w-4 h-4" /> My Document Locker Checklist ({profile.possessedDocIds.length})
            </button>
          </div>

          {/* TAB 1: MATCHED SCHEMES GRID */}
          {activeTab === 'MATCHED' && (
            <div className="space-y-4">
              {matchedResults.map(({ scheme, matchPercentage, isEligible, missingReasons, readyCount, requiredCount, docReadinessPct }) => (
                <div 
                  key={scheme.id}
                  className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all shadow-xl space-y-4"
                >
                  {/* Scheme Card Header */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                          scheme.level === 'CENTRAL' 
                            ? 'bg-amber-500/20 text-[#FFB800] border border-amber-500/40' 
                            : 'bg-teal-500/20 text-[#00E5CC] border border-teal-500/40'
                        }`}>
                          {scheme.level} • {scheme.code}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                          {scheme.category}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold font-heading text-white">
                        {scheme.schemeName}
                      </h3>
                    </div>

                    <div className="text-right flex-shrink-0">
                      <div className="text-2xl font-black font-heading text-[#FFB800]">
                        {matchPercentage}%
                      </div>
                      <div className="text-[10px] font-mono text-slate-400">Match Confidence</div>
                    </div>
                  </div>

                  {/* Benefits */}
                  <p className="text-xs text-slate-300 bg-slate-950 p-3.5 rounded-2xl border border-slate-800/80 leading-relaxed">
                    💡 <strong>Benefits:</strong> {scheme.benefits}
                  </p>

                  {/* Document Readiness & CTAs Footer */}
                  <div className="pt-3 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <FileCheck className="w-4 h-4 text-[#00E5CC]" />
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-[11px] font-mono text-slate-300">
                          <span>Document Readiness Badge:</span>
                          <strong className="text-white">{readyCount} of {requiredCount} Documents Ready</strong>
                        </div>
                        <div className="w-36 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-[#FFB800] to-[#00E5CC]" 
                            style={{ width: `${docReadinessPct}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    <button 
                      onClick={() => alert(`Applying for ${scheme.schemeName}`)}
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FFB800] to-amber-500 text-black font-extrabold text-xs shadow-md hover:scale-105 transition-transform cursor-pointer"
                    >
                      Apply & Route <ChevronRight className="w-4 h-4 inline" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 2: INTERACTIVE DOCUMENT LOCKER CHECKLIST */}
          {activeTab === 'LOCKER' && (
            <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6">
              <div>
                <h3 className="text-lg font-bold font-heading text-white">Interactive Document Locker Checklist</h3>
                <p className="text-xs text-slate-400 mt-0.5">Toggle proofs you possess to immediately update scheme eligibility readiness scores.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {MASTER_DOCUMENTS.map(doc => {
                  const isOwned = profile.possessedDocIds.includes(doc.id);
                  return (
                    <div
                      key={doc.id}
                      onClick={() => toggleDocument(doc.id)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                        isOwned 
                          ? 'bg-emerald-500/10 border-emerald-500/40 text-white shadow-md' 
                          : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                          isOwned ? 'bg-emerald-500 text-black font-bold' : 'border border-slate-700'
                        }`}>
                          {isOwned && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white">{doc.name}</div>
                          <div className="text-[10px] font-mono text-slate-400 mt-0.5">{doc.description}</div>
                        </div>
                      </div>

                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                        isOwned ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-500'
                      }`}>
                        {isOwned ? 'READY' : 'ADD'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </main>
      </div>

      {/* QUICK INLINE PROFILE EDIT MODAL */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-xl rounded-3xl bg-[#0F172A] border border-[#FFB800]/40 p-6 sm:p-8 shadow-2xl text-white my-8">
            <button 
              onClick={() => setIsEditModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <span className="px-3 py-1 rounded-full bg-[#FFB800]/10 border border-[#FFB800]/30 text-[#FFB800] text-xs font-mono">
                PROFILE INTAKE WIZARD
              </span>
              <h3 className="text-2xl font-bold font-heading text-white mt-2">Edit Citizen Parameters</h3>
            </div>

            <form 
              onSubmit={(e) => { e.preventDefault(); setIsEditModalOpen(false); }}
              className="space-y-4"
            >
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono text-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Annual Income (₹)</label>
                  <input
                    type="number"
                    value={profile.annualIncome}
                    onChange={(e) => setProfile({ ...profile, annualIncome: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono text-[#00E5CC] font-bold outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Caste Category</label>
                  <select
                    value={profile.casteCategory}
                    onChange={(e) => setProfile({ ...profile, casteCategory: e.target.value as any })}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono text-[#FFB800] font-bold outline-none"
                  >
                    <option value="SC">Scheduled Caste (SC)</option>
                    <option value="ST">Scheduled Tribe (ST)</option>
                    <option value="OBC">Other Backward Class (OBC)</option>
                    <option value="EWS">Economically Weaker Section (EWS)</option>
                    <option value="GENERAL">General</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Occupation</label>
                  <select
                    value={profile.occupation}
                    onChange={(e) => setProfile({ ...profile, occupation: e.target.value as any })}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono text-white outline-none"
                  >
                    <option value="MICRO_ENTREPRENEUR">Micro-Entrepreneur / MSME</option>
                    <option value="FARMER">Farmer</option>
                    <option value="STUDENT">Student</option>
                    <option value="CONSTRUCTION_BOCW">Construction / BOCW Worker</option>
                    <option value="UNORGANIZED_LABOR">Unorganized Labor</option>
                    <option value="UNEMPLOYED">Unemployed</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#FFB800] to-amber-500 text-black font-extrabold text-xs cursor-pointer shadow-lg mt-4"
              >
                Save & Recalculate Matching Schemes 🚀
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
