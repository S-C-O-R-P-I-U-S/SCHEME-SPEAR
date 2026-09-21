'use client';

import React, { useState, useMemo } from 'react';
import { 
  Search, Filter, CheckCircle2, Circle, ShieldCheck, 
  ChevronRight, Sparkles, Building2, MapPin, FileCheck, X, BookOpen, Layers
} from 'lucide-react';

export interface DocumentItem {
  id: string;
  name: string;
  category: string;
}

export interface SchemeData {
  id: string;
  schemeName: string;
  slug: string;
  details: string;
  benefits: string;
  eligibilityBullets: string[];
  applicationSteps: { step: number; title: string; desc: string }[];
  level: 'Central' | 'State';
  schemeCategory: string;
  tags: string[];
  minAge: number;
  maxAge: number;
  incomeCeiling: number;
  targetCastes: string[];
  documents: DocumentItem[];
}

export interface UserProfile {
  age: number;
  gender: string;
  caste: string;
  income: number;
  state: string;
  possessedDocIds: string[];
}

const SAMPLE_SCHEMES: SchemeData[] = [
  {
    id: 'sch-1',
    schemeName: 'NSFDC Concessional Term Loan for SC Entrepreneurs',
    slug: 'nsfdc-term-loan-sc',
    details: 'Financial assistance for Scheduled Caste entrepreneurs to establish micro-enterprises in manufacturing, services, and trading sectors.',
    benefits: 'Loan assistance up to ₹15 Lakhs with 35% capital subsidy and concessional 6% annual interest rate.',
    eligibilityBullets: [
      'Applicant must belong to Scheduled Caste (SC) category.',
      'Annual family income must be below ₹3,00,000 LPA.',
      'Age of the applicant must be between 18 and 50 years.'
    ],
    applicationSteps: [
      { step: 1, title: 'Profile Intake & Verification', desc: 'Submit caste and income proofs to District Nodal Officer.' },
      { step: 2, title: 'Bank Application Portal', desc: 'Fill online form at NSFDC State Channelizing Agency portal.' },
      { step: 3, title: 'Subsidy Disbursement', desc: 'Direct Benefit Transfer (DBT) upon business inspection.' }
    ],
    level: 'Central',
    schemeCategory: 'Business & Entrepreneurship',
    tags: ['SC', 'Micro-Loan', 'Subsidy', 'NSFDC'],
    minAge: 18,
    maxAge: 50,
    incomeCeiling: 300000,
    targetCastes: ['SC'],
    documents: [
      { id: 'doc-aadhaar', name: 'Aadhaar Card', category: 'Identity' },
      { id: 'doc-caste', name: 'Caste Certificate (SC)', category: 'Reservation' },
      { id: 'doc-income', name: 'Income Certificate', category: 'Financial' },
      { id: 'doc-dpr', name: 'Detailed Project Report (DPR)', category: 'Business' }
    ]
  },
  {
    id: 'sch-2',
    schemeName: 'Post-Matric Scholarship for OBC & EWS Students',
    slug: 'post-matric-obc-ews',
    details: 'Financial assistance to eligible students from backward classes studying in recognized post-secondary institutions.',
    benefits: 'Full tuition fee reimbursement + monthly maintenance allowance up to ₹1,200/month.',
    eligibilityBullets: [
      'Must belong to OBC or EWS social category.',
      'Enrolled in post-matriculation or higher education course.',
      'Family income ceiling of ₹2,50,000 per annum.'
    ],
    applicationSteps: [
      { step: 1, title: 'National Scholarship Portal', desc: 'Register at scholarship.gov.in with student credentials.' },
      { step: 2, title: 'Institutional Verification', desc: 'College Nodal Officer verifies marksheets & attendance.' }
    ],
    level: 'Central',
    schemeCategory: 'Education & Learning',
    tags: ['Scholarship', 'OBC', 'Education', 'Student'],
    minAge: 15,
    maxAge: 30,
    incomeCeiling: 250000,
    targetCastes: ['OBC', 'EWS'],
    documents: [
      { id: 'doc-aadhaar', name: 'Aadhaar Card', category: 'Identity' },
      { id: 'doc-caste-obc', name: 'OBC / EWS Certificate', category: 'Reservation' },
      { id: 'doc-marksheet', name: 'Previous Year Marksheet', category: 'Academic' }
    ]
  },
  {
    id: 'sch-3',
    schemeName: 'Stand-Up India Scheme for Women & SC/ST Enterprise',
    slug: 'standup-india-scheme',
    details: 'Facilitates bank loans between 10 Lakhs and 1 Crore to at least one SC or ST borrower and one woman borrower per bank branch.',
    benefits: 'Concessional bank credit with 25% capital margin money support.',
    eligibilityBullets: [
      'SC/ST and/or Woman entrepreneur above 18 years.',
      'Greenfield enterprise in manufacturing, services or trading sector.'
    ],
    applicationSteps: [
      { step: 1, title: 'Stand-Up India Portal Registration', desc: 'Register online at standupmitra.in' },
      { step: 2, title: 'Lead District Bank Approval', desc: 'Branch appraisal and loan sanction.' }
    ],
    level: 'Central',
    schemeCategory: 'Business & Entrepreneurship',
    tags: ['Women', 'SC', 'ST', 'Bank Loan'],
    minAge: 18,
    maxAge: 65,
    incomeCeiling: 1000000,
    targetCastes: ['SC', 'ST', 'General', 'OBC'],
    documents: [
      { id: 'doc-aadhaar', name: 'Aadhaar Card', category: 'Identity' },
      { id: 'doc-pan', name: 'PAN Card', category: 'Identity' },
      { id: 'doc-project-report', name: 'Bankable Business Plan', category: 'Financial' }
    ]
  }
];

export default function SchemesPlatform() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<string>('ALL');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [activeModalScheme, setActiveModalScheme] = useState<SchemeData | null>(null);

  const [userProfile, setUserProfile] = useState<UserProfile>({
    age: 26,
    gender: 'Male',
    caste: 'SC',
    income: 220000,
    state: 'Tamil Nadu',
    possessedDocIds: ['doc-aadhaar', 'doc-income']
  });

  const toggleUserDoc = (docId: string) => {
    setUserProfile(prev => {
      const exists = prev.possessedDocIds.includes(docId);
      return {
        ...prev,
        possessedDocIds: exists 
          ? prev.possessedDocIds.filter(id => id !== docId)
          : [...prev.possessedDocIds, docId]
      };
    });
  };

  const calculateMatchScore = (scheme: SchemeData): number => {
    let score = 70;
    if (scheme.targetCastes.includes(userProfile.caste)) score += 15;
    if (userProfile.income <= scheme.incomeCeiling) score += 10;
    if (userProfile.age >= scheme.minAge && userProfile.age <= scheme.maxAge) score += 5;
    return Math.min(99, score);
  };

  const filteredSchemes = useMemo(() => {
    return SAMPLE_SCHEMES.filter(s => {
      const q = searchQuery.toLowerCase();
      const matchesSearch = !q || 
        s.schemeName.toLowerCase().includes(q) || 
        s.tags.some(t => t.toLowerCase().includes(q)) ||
        s.schemeCategory.toLowerCase().includes(q);

      const matchesLevel = selectedLevel === 'ALL' || s.level.toUpperCase() === selectedLevel;
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(s.schemeCategory);

      return matchesSearch && matchesLevel && matchesCategory;
    });
  }, [searchQuery, selectedLevel, selectedCategories]);

  return (
    <div className="min-h-screen bg-[#0A0E1A] text-slate-100 font-sans p-4 md:p-8">
      
      {/* Header */}
      <header className="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-md bg-[#FFB800]/20 text-[#FFB800] border border-[#FFB800]/40 text-xs font-mono font-bold">
              3,400+ SCHEMES INDEX
            </span>
            <span className="text-xs text-slate-400 font-mono">GOVT OF INDIA</span>
          </div>
          <h1 className="text-2xl md:text-4xl font-extrabold font-heading text-white mt-1">
            Citizen Scheme Matching & Discovery Portal
          </h1>
        </div>

        <div className="p-3 rounded-2xl bg-slate-900 border border-slate-700/80 flex items-center gap-4 text-xs font-mono">
          <div>
            <div className="text-slate-400">ACTIVE PROFILE</div>
            <div className="text-[#00E5CC] font-bold">{userProfile.caste} | ₹{(userProfile.income/100000).toFixed(1)} LPA | Age {userProfile.age}</div>
          </div>
          <div className="h-8 w-px bg-slate-800" />
          <div>
            <div className="text-slate-400">DOCS VAULT</div>
            <div className="text-[#FFB800] font-bold">{userProfile.possessedDocIds.length} Verified</div>
          </div>
        </div>
      </header>

      {/* Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        <aside className="lg:col-span-3 space-y-6">
          <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="font-bold text-sm font-heading text-white flex items-center gap-2">
                <Filter className="w-4 h-4 text-[#FFB800]" /> Faceted Filters
              </span>
              {(selectedLevel !== 'ALL' || selectedCategories.length > 0) && (
                <button 
                  onClick={() => { setSelectedLevel('ALL'); setSelectedCategories([]); }}
                  className="text-[11px] text-rose-400 hover:underline font-mono"
                >
                  Reset
                </button>
              )}
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-2.5">GOVERNMENT LEVEL</label>
              <div className="grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-slate-950 border border-slate-800 text-xs font-semibold">
                {['ALL', 'CENTRAL', 'STATE'].map(lvl => (
                  <button
                    key={lvl}
                    onClick={() => setSelectedLevel(lvl)}
                    className={`py-1.5 rounded-lg text-center transition-all ${
                      selectedLevel === lvl 
                        ? 'bg-[#FFB800] text-black font-bold shadow-md' 
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-2.5">SECTOR CATEGORY</label>
              <div className="space-y-2">
                {[
                  'Business & Entrepreneurship',
                  'Education & Learning',
                  'Social Welfare & Empowerment',
                  'Agriculture, Rural & Environment',
                  'Health & Wellness'
                ].map(cat => {
                  const isChecked = selectedCategories.includes(cat);
                  return (
                    <label 
                      key={cat}
                      className={`flex items-center gap-2.5 text-xs p-2 rounded-xl border transition-all cursor-pointer ${
                        isChecked 
                          ? 'bg-slate-800 border-[#00E5CC] text-white' 
                          : 'bg-slate-950/60 border-slate-800/80 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <input 
                        type="checkbox" 
                        checked={isChecked}
                        onChange={() => {
                          setSelectedCategories(prev => 
                            isChecked ? prev.filter(c => c !== cat) : [...prev, cat]
                          );
                        }}
                        className="hidden"
                      />
                      <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center ${
                        isChecked ? 'bg-[#00E5CC] border-[#00E5CC] text-black' : 'border-slate-600'
                      }`}>
                        {isChecked && <CheckCircle2 className="w-3 h-3" />}
                      </div>
                      <span className="truncate">{cat}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>
        </aside>

        <main className="lg:col-span-9 space-y-6">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text"
              placeholder="Search 3,400+ schemes by keyword, tag (e.g. 'Scholarship', 'SC', 'Loan'), or scheme name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-900 border border-slate-700/80 text-white placeholder:text-slate-500 font-mono text-sm focus:outline-none focus:border-[#FFB800] shadow-lg transition-colors"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 px-1">
              <span>SHOWING {filteredSchemes.length} SCHEMES</span>
              <span>SORTED BY: MATCH SCORE %</span>
            </div>

            {filteredSchemes.map(scheme => {
              const matchScore = calculateMatchScore(scheme);
              const possessedCount = scheme.documents.filter(d => userProfile.possessedDocIds.includes(d.id)).length;
              const docPct = Math.round((possessedCount / scheme.documents.length) * 100);

              return (
                <div 
                  key={scheme.id}
                  className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all shadow-xl space-y-4 relative overflow-hidden group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                          scheme.level === 'Central' 
                            ? 'bg-amber-500/20 text-[#FFB800] border border-amber-500/40' 
                            : 'bg-teal-500/20 text-[#00E5CC] border border-teal-500/40'
                        }`}>
                          {scheme.level.toUpperCase()}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                          {scheme.schemeCategory}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold font-heading text-white group-hover:text-[#FFB800] transition-colors">
                        {scheme.schemeName}
                      </h3>
                    </div>

                    <div className="text-right flex-shrink-0">
                      <div className="text-2xl font-black font-heading text-[#FFB800]">
                        {matchScore}%
                      </div>
                      <div className="text-[10px] font-mono text-slate-400">Match Score</div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 bg-slate-950/70 p-3 rounded-xl border border-slate-800/80 leading-relaxed">
                    💡 <strong>Benefits:</strong> {scheme.benefits}
                  </p>

                  <div className="pt-3 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <FileCheck className="w-4 h-4 text-[#00E5CC]" />
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-[11px] font-mono text-slate-300">
                          <span>Doc Readiness:</span>
                          <strong className="text-white">{possessedCount} / {scheme.documents.length} Ready</strong>
                        </div>
                        <div className="w-32 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-[#FFB800] to-[#00E5CC]" 
                            style={{ width: `${docPct}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => setActiveModalScheme(scheme)}
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FFB800] to-amber-500 text-black font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-md hover:scale-105 transition-transform cursor-pointer"
                    >
                      Inspect Scheme & Apply <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      </div>

      {activeModalScheme && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-3xl rounded-3xl bg-[#0F172A] border border-[#FFB800]/40 p-6 sm:p-8 shadow-2xl text-white my-8 max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setActiveModalScheme(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2 mb-6">
              <span className="px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-[#FFB800]/20 text-[#FFB800] border border-[#FFB800]/40">
                {activeModalScheme.level} • {activeModalScheme.schemeCategory}
              </span>
              <h2 className="text-2xl font-bold font-heading text-white">
                {activeModalScheme.schemeName}
              </h2>
            </div>

            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
                <h4 className="text-xs font-mono text-[#00E5CC] uppercase mb-1">SCHEME OVERVIEW & OBJECTIVE</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{activeModalScheme.details}</p>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-bold font-heading text-white flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#FFB800]" /> Parsed Eligibility Criteria
                </h4>
                <div className="space-y-2">
                  {activeModalScheme.eligibilityBullets.map((bullet, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300 p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-bold font-heading text-white flex items-center gap-2">
                  <FileCheck className="w-4 h-4 text-[#00E5CC]" /> Interactive Document Verification Checklist
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeModalScheme.documents.map(doc => {
                    const isOwned = userProfile.possessedDocIds.includes(doc.id);
                    return (
                      <div
                        key={doc.id}
                        onClick={() => toggleUserDoc(doc.id)}
                        className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                          isOwned 
                            ? 'bg-emerald-500/10 border-emerald-500/40 text-white' 
                            : 'bg-slate-900 border-slate-800 text-slate-400'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          {isOwned ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          ) : (
                            <Circle className="w-4 h-4 text-slate-600" />
                          )}
                          <div>
                            <div className="text-xs font-bold">{doc.name}</div>
                            <div className="text-[10px] font-mono text-slate-500">{doc.category}</div>
                          </div>
                        </div>
                        <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                          isOwned ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-500'
                        }`}>
                          {isOwned ? 'READY' : 'MISSING'}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <h4 className="text-sm font-bold font-heading text-white flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#FFB800]" /> Phased Application Steps
                </h4>
                <div className="space-y-3">
                  {activeModalScheme.applicationSteps.map((step) => (
                    <div key={step.step} className="flex gap-4 p-3.5 rounded-2xl bg-slate-900 border border-slate-800">
                      <div className="w-8 h-8 rounded-xl bg-[#FFB800] text-black font-black flex items-center justify-center text-xs flex-shrink-0">
                        0{step.step}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">{step.title}</div>
                        <div className="text-xs text-slate-400 mt-0.5">{step.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
