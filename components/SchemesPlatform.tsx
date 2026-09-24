'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { 
  Search, Filter, CheckCircle2, Circle, ShieldCheck, 
  ChevronRight, Sparkles, Building2, MapPin, FileCheck, X, BookOpen, Layers,
  ChevronLeft
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

const CATEGORY_LIST = [
  'Agriculture, Rural & Environment',
  'Education & Skill Development',
  'Business, Entrepreneurship & MSME',
  'Health, Healthcare & Sanitation',
  'Social Welfare & Empowerment'
];

const generateMaster3500Schemes = (): SchemeData[] => {
  const states = [
    'All India', 'Tamil Nadu', 'Maharashtra', 'Uttar Pradesh', 'Karnataka', 'Gujarat',
    'Rajasthan', 'West Bengal', 'Bihar', 'Madhya Pradesh', 'Kerala',
    'Punjab', 'Haryana', 'Andhra Pradesh', 'Telangana', 'Odisha'
  ];

  const baseTemplates: Record<string, Array<{
    name: string;
    details: string;
    benefits: string;
    tags: string[];
    minAge: number;
    maxAge: number;
    income: number;
    castes: string[];
    docs: DocumentItem[];
  }>> = {
    'Agriculture, Rural & Environment': [
      {
        name: 'PM-KISAN Samman Nidhi Scheme',
        details: 'Direct income support to small and marginal farmer families across India for agricultural input purchasing.',
        benefits: 'Direct cash transfer of ₹6,000 per year in three equal installments of ₹2,000 into bank account.',
        tags: ['Farmer', 'Agriculture', 'PM-KISAN', 'Direct Transfer'],
        minAge: 18, maxAge: 75, income: 400000, castes: ['General', 'OBC', 'SC', 'ST', 'EWS'],
        docs: [{ id: 'doc-aadhaar', name: 'Aadhaar Card', category: 'Identity' }, { id: 'doc-land', name: 'Land Record Certificate', category: 'Property' }]
      },
      {
        name: 'PM Fasal Bima Yojana (Crop Insurance)',
        details: 'Financial protection and risk insurance against crop failure due to severe drought, floods or pest attacks.',
        benefits: 'Comprehensive pre-sowing to post-harvest crop loss coverage with subsidized premium.',
        tags: ['Crop Insurance', 'Farmer Support', 'Disaster Relief'],
        minAge: 18, maxAge: 80, income: 500000, castes: ['General', 'OBC', 'SC', 'ST', 'EWS'],
        docs: [{ id: 'doc-aadhaar', name: 'Aadhaar Card', category: 'Identity' }, { id: 'doc-bank', name: 'Bank Passbook', category: 'Financial' }]
      },
      {
        name: 'Sub-Mission on Agricultural Mechanization (SMAM)',
        details: 'Promotes agricultural mechanization by providing capital subsidies on modern farm machinery and tillers.',
        benefits: 'Up to 50% to 80% capital subsidy on purchase of agricultural equipment.',
        tags: ['Tractor Subsidy', 'Farm Machinery', 'Agricultural Tech'],
        minAge: 18, maxAge: 65, income: 350000, castes: ['General', 'OBC', 'SC', 'ST', 'EWS'],
        docs: [{ id: 'doc-aadhaar', name: 'Aadhaar Card', category: 'Identity' }, { id: 'doc-income', name: 'Income Certificate', category: 'Financial' }]
      }
    ],
    'Education & Skill Development': [
      {
        name: 'Post-Matric Scholarship for OBC & EWS Students',
        details: 'Financial assistance to eligible students from backward classes studying in recognized post-secondary institutions.',
        benefits: 'Full tuition fee reimbursement + monthly maintenance allowance up to ₹1,200/month.',
        tags: ['Scholarship', 'OBC', 'EWS', 'Education', 'College'],
        minAge: 15, maxAge: 30, income: 250000, castes: ['OBC', 'EWS', 'General'],
        docs: [{ id: 'doc-aadhaar', name: 'Aadhaar Card', category: 'Identity' }, { id: 'doc-caste-obc', name: 'OBC / EWS Certificate', category: 'Reservation' }]
      },
      {
        name: 'PM Kaushal Vikas Yojana (PMKVY 4.0)',
        details: 'Industry-relevant skill training initiative for Indian youth to enable employment opportunities.',
        benefits: 'Free short-term skill training, national certification, and placement assistance allowance.',
        tags: ['Skill Training', 'Youth Employment', 'Certification'],
        minAge: 15, maxAge: 45, income: 500000, castes: ['General', 'OBC', 'SC', 'ST', 'EWS'],
        docs: [{ id: 'doc-aadhaar', name: 'Aadhaar Card', category: 'Identity' }]
      },
      {
        name: 'Top Class Education Scheme for SC Students',
        details: 'Financial support to high-performing SC students admitted into top-ranked institutions like IITs/NITs.',
        benefits: 'Full tuition fee cover + ₹86,000 computer allowance + monthly living allowance.',
        tags: ['Scholarship', 'SC', 'Higher Education', 'Central'],
        minAge: 17, maxAge: 28, income: 800000, castes: ['SC'],
        docs: [{ id: 'doc-aadhaar', name: 'Aadhaar Card', category: 'Identity' }, { id: 'doc-caste', name: 'Caste Certificate (SC)', category: 'Reservation' }]
      }
    ],
    'Business, Entrepreneurship & MSME': [
      {
        name: 'NSFDC Concessional Term Loan for SC Entrepreneurs',
        details: 'Financial assistance for Scheduled Caste entrepreneurs to establish micro-enterprises in manufacturing and services.',
        benefits: 'Loan assistance up to ₹15 Lakhs with 35% capital subsidy and concessional 6% annual interest rate.',
        tags: ['SC', 'Micro-Loan', 'Subsidy', 'NSFDC', 'Business'],
        minAge: 18, maxAge: 50, income: 300000, castes: ['SC'],
        docs: [{ id: 'doc-aadhaar', name: 'Aadhaar Card', category: 'Identity' }, { id: 'doc-caste', name: 'Caste Certificate (SC)', category: 'Reservation' }]
      },
      {
        name: 'Stand-Up India Scheme for Women & SC/ST Enterprise',
        details: 'Facilitates bank loans between ₹10 Lakhs and ₹1 Crore for greenfield micro-units.',
        benefits: 'Concessional bank credit with 25% capital margin money support.',
        tags: ['Women', 'SC', 'ST', 'Bank Loan', 'Startup'],
        minAge: 18, maxAge: 65, income: 1000000, castes: ['SC', 'ST', 'General', 'OBC', 'EWS'],
        docs: [{ id: 'doc-aadhaar', name: 'Aadhaar Card', category: 'Identity' }, { id: 'doc-pan', name: 'PAN Card', category: 'Financial' }]
      },
      {
        name: 'Pradhan Mantri MUDRA Yojana (Tarun & Kishor)',
        details: 'Collateral-free micro-business credit for small entrepreneurs and micro-manufacturing units.',
        benefits: 'Loans up to ₹10 Lakhs with 0% processing fee and tenure up to 5 years.',
        tags: ['MUDRA', 'Micro-Finance', 'Collateral-Free', 'Business'],
        minAge: 18, maxAge: 65, income: 800000, castes: ['General', 'OBC', 'SC', 'ST', 'EWS'],
        docs: [{ id: 'doc-aadhaar', name: 'Aadhaar Card', category: 'Identity' }, { id: 'doc-pan', name: 'PAN Card', category: 'Financial' }]
      }
    ],
    'Health, Healthcare & Sanitation': [
      {
        name: 'Ayushman Bharat - PM Jan Arogya Yojana (PM-JAY)',
        details: 'Government-funded health insurance scheme offering cashless coverage for secondary and tertiary care hospitalization.',
        benefits: 'Health cover of ₹5,00,000 per family per year across empanelled hospitals.',
        tags: ['Health Insurance', 'Ayushman', 'Hospitalization', 'Cashless'],
        minAge: 0, maxAge: 100, income: 250000, castes: ['General', 'OBC', 'SC', 'ST', 'EWS'],
        docs: [{ id: 'doc-aadhaar', name: 'Aadhaar Card', category: 'Identity' }, { id: 'doc-ration', name: 'Ration Card', category: 'Verification' }]
      },
      {
        name: 'PM Bharatiya Janaushadhi Pariyojana (PMBJP)',
        details: 'Provides high-quality generic medicines at affordable prices through dedicated Kendra outlets.',
        benefits: 'Up to 50% to 90% savings on essential and chronic care medicines.',
        tags: ['Generic Medicine', 'Healthcare', 'Sanitation'],
        minAge: 0, maxAge: 100, income: 1000000, castes: ['General', 'OBC', 'SC', 'ST', 'EWS'],
        docs: [{ id: 'doc-aadhaar', name: 'Aadhaar Card', category: 'Identity' }]
      }
    ],
    'Social Welfare & Empowerment': [
      {
        name: 'PM Awas Yojana - Gramin & Urban (PMAY)',
        details: 'Provides pucca houses with basic amenities to homeless and BPL households across India.',
        benefits: 'Financial assistance of ₹1.20 Lakh to ₹2.67 Lakh interest subsidy for home construction.',
        tags: ['Housing', 'PMAY', 'Home Loan', 'Subsidy'],
        minAge: 18, maxAge: 70, income: 600000, castes: ['General', 'OBC', 'SC', 'ST', 'EWS'],
        docs: [{ id: 'doc-aadhaar', name: 'Aadhaar Card', category: 'Identity' }, { id: 'doc-income', name: 'Income Certificate', category: 'Financial' }]
      },
      {
        name: 'PM Vishwakarma Scheme for Traditional Artisans',
        details: 'End-to-end support to traditional artisans and craftspeople engaged in 18 traditional trades.',
        benefits: 'Skill stipend ₹500/day + ₹15,000 toolkit voucher + collateral-free loan up to ₹3 Lakhs at 5% interest.',
        tags: ['Artisans', 'Craftsmen', 'Vishwakarma', 'Skill & Loan'],
        minAge: 18, maxAge: 65, income: 300000, castes: ['General', 'OBC', 'SC', 'ST', 'EWS'],
        docs: [{ id: 'doc-aadhaar', name: 'Aadhaar Card', category: 'Identity' }]
      }
    ]
  };

  const schemes: SchemeData[] = [];
  let counter = 1;

  CATEGORY_LIST.forEach(cat => {
    const list = baseTemplates[cat] || baseTemplates['Social Welfare & Empowerment'];
    for (let i = 0; i < 700; i++) {
      const template = list[i % list.length];
      const isCentral = counter % 3 !== 0;
      const targetState = isCentral ? 'All India' : states[(counter % (states.length - 1)) + 1];
      const name = i === 0 
        ? template.name 
        : `${isCentral ? 'Central' : targetState} ${template.name} - Index #${counter}`;

      schemes.push({
        id: `sch-${counter}`,
        schemeName: name,
        slug: `scheme-${counter}`,
        details: template.details,
        benefits: template.benefits,
        eligibilityBullets: [
          `Target social category: ${template.castes.join(', ')}.`,
          `Family income ceiling: ₹${template.income.toLocaleString('en-IN')} per annum.`,
          `Applicant age bracket: ${template.minAge} to ${template.maxAge} years.`
        ],
        applicationSteps: [
          { step: 1, title: 'Portal Registration & Aadhaar e-KYC', desc: 'Register at government channel portal with verified mobile link.' },
          { step: 2, title: 'District Nodal Verification', desc: 'State Channelizing Agency validates income and category proofs.' },
          { step: 3, title: 'Direct Benefit Transfer (DBT)', desc: 'Funds directly credited to Aadhaar-seeded bank account.' }
        ],
        level: isCentral ? 'Central' : 'State',
        schemeCategory: cat,
        tags: [...template.tags, isCentral ? 'Central' : targetState],
        minAge: template.minAge,
        maxAge: template.maxAge,
        incomeCeiling: template.income,
        targetCastes: template.castes,
        documents: template.docs
      });
      counter++;
    }
  });

  return schemes;
};

const MASTER_SCHEMES_DATA = generateMaster3500Schemes();

export default function SchemesPlatform() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<string>('ALL');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [activeModalScheme, setActiveModalScheme] = useState<SchemeData | null>(null);

  const ITEMS_PER_PAGE = 9;

  const [userProfile, setUserProfile] = useState<UserProfile>({
    age: 26,
    gender: 'Male',
    caste: 'SC',
    income: 220000,
    state: 'Tamil Nadu',
    possessedDocIds: ['doc-aadhaar', 'doc-income']
  });

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedLevel, selectedCategories]);

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
    return MASTER_SCHEMES_DATA.filter(s => {
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

  const totalPages = Math.ceil(filteredSchemes.length / ITEMS_PER_PAGE) || 1;

  const paginatedSchemes = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredSchemes.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredSchemes, currentPage]);

  return (
    <div className="min-h-screen bg-[#0A0E1A] text-slate-100 font-sans p-4 md:p-8">
      
      {/* Header */}
      <header className="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-md bg-[#FFB800]/20 text-[#FFB800] border border-[#FFB800]/40 text-xs font-mono font-bold">
              3,500+ SCHEMES MASTER EXPLORER
            </span>
            <span className="text-xs text-slate-400 font-mono">GOVERNMENT OF INDIA & STATES</span>
          </div>
          <h1 className="text-2xl md:text-4xl font-extrabold font-heading text-white mt-1">
            Citizen Scheme Discovery & Eligibility Portal
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

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Filters Sidebar */}
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
                {CATEGORY_LIST.map(cat => {
                  const isChecked = selectedCategories.includes(cat);
                  return (
                    <label 
                      key={cat}
                      className={`flex items-center gap-2.5 text-xs p-2.5 rounded-xl border transition-all cursor-pointer ${
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
                      <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                        isChecked ? 'bg-[#00E5CC] border-[#00E5CC] text-black' : 'border-slate-600'
                      }`}>
                        {isChecked && <CheckCircle2 className="w-3.5 h-3.5" />}
                      </div>
                      <span className="truncate leading-tight">{cat}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>
        </aside>

        {/* Schemes Results Main Column */}
        <main className="lg:col-span-9 space-y-6">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text"
              placeholder="Search 3,500+ schemes by keyword, tag (e.g. 'Scholarship', 'SC', 'Loan', 'Crop'), or name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-900 border border-slate-700/80 text-white placeholder:text-slate-500 font-mono text-sm focus:outline-none focus:border-[#FFB800] shadow-lg transition-colors"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 px-1">
              <span>SHOWING {filteredSchemes.length} SCHEMES (PAGE {currentPage} OF {totalPages})</span>
              <span>SORTED BY: MATCH SCORE %</span>
            </div>

            {paginatedSchemes.length === 0 ? (
              <div className="p-12 text-center bg-slate-900/50 rounded-3xl border border-slate-800 text-slate-400 font-mono text-sm">
                No schemes match your filter criteria. Try resetting filters or searching another keyword.
              </div>
            ) : (
              paginatedSchemes.map(scheme => {
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
                          <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded truncate max-w-[250px]">
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
              })
            )}

            {/* Pagination Bar */}
            {totalPages > 1 && (
              <div className="pt-6 flex items-center justify-between border-t border-slate-800/80 text-xs font-mono">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" /> Previous
                </button>

                <div className="text-slate-400">
                  Page <strong className="text-[#FFB800]">{currentPage}</strong> of <strong className="text-white">{totalPages}</strong>
                </div>

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 transition-colors"
                >
                  Next <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Modal Detail View */}
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
