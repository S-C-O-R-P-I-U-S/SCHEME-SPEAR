# SCHEME-SPEAR
SCHEME SPEAR is an AI-powered, multi-faceted Government Welfare Scheme Discovery, Financial Inclusion, and Application Management Platform. Built specifically to empower Indian citizens—including micro-entrepreneurs, women, SC/ST/OBC beneficiaries, and aspiring business owners—it bridges the gap between 3,500+ Central and State Government schemes and eligible citizens through sub-50ms AI matching, compound loan calculators, document verification lockers, and direct application tracking.

Core Purpose & Problem Solved
Fragmented Information: 
 Eliminates the frustration of searching through hundreds of official government portals by indexing 3,500+ schemes in one central master database.

Complex Eligibility Rules: Replaces multi-page policy jargon with plain-language pass/fail criteria indicators and gap analysis.

Financial Barriers: Solves loan confusion by automatically calculating principal grant subsidies (15% to 35%), interest concessions, and monthly repayment EMIs.

Document Uncertainty: Prevents application rejections by offering an uploadable Document Locker checklist that scores application readiness before submission.

Lack of Transparency: Provides a live 4-step milestone tracker board from Submission → Nodal Review → Bank Sanction → Direct Benefit Transfer (DBT).
⚡ Master Features Inventory
🧠
1. Sub-50ms AI-Powered Scheme Discovery Engine
3,500+ Master Schemes Explorer: Instant client-side filtering across Central and State government schemes.
Multi-Faceted Search: Search schemes by keyword, ministry name, beneficiary trade, target caste, income limit, or subsidy type.
Match Scoring: Dynamic percentage match score (e.g., 98% Match) calculated for every scheme based on user demographics.
Pagination & Sorting: Paginated scheme explorer grid with responsive sorting (Highest Subsidy, Max Loan Amount, Tenure, Match Score).

👤 2. Dynamic Citizen Profile & DOB Intake Module
Automated Age Calculator: Takes user Date of Birth (DOB) and automatically calculates precise age in years via Math.abs(new Date(Date.now() - dobDate.getTime()).getUTCFullYear() - 1970).
Social & Category Classification: Captures SC, ST, OBC, EWS, General, and Differently Abled categories to unlock targeted scheme quotas.
Geographic Jurisdiction: State/UT and District selection for accurate State vs. Central scheme filtering.
Income Ceiling Mapping: Captures annual income in Lakhs Per Annum (LPA) to verify eligibility against poverty line and low-income ceilings.

📂 3. Uploadable Document Locker & Readiness Checklist
Document Standard Checklist: Interactive upload and toggle system for mandatory verification documents:
🆔 Aadhaar Card (Identity Proof)
📜 Caste / Category Certificate (Quota Verification)
💵 Income Certificate (Subsidy Eligibility)
📋 Detailed Project Report / Business Plan (Loan Feasibility)
🏦 Bank Passbook - First Page (DBT Account Verification)
Readiness Meter: Real-time score meter showing application readiness percentage (e.g., 5/5 Documents Verified — 100% Ready).

🧮 4. Smart Loan & EMI Recommendation Suite
Compound Financial Simulator: Uses standard compounding loan equations:
EMI = (P * (R/1200) * ((1 + R/1200) ^ (N*12))) / (((1 + R/1200) ^ (N*12)) - 1)
P: Principal Loan Amount (after deducting government grant subsidy)
R: Annual Interest Rate Percentage
N: Loan Tenure in Years​
 
Automated Grant Subsidy Computation: Computes exact subsidy grants (15% to 35% based on SC/ST/OBC category rules).
Net Loan Burden Analysis: Calculates gross loan required, minus government grant subsidy, yielding net loan principal and exact monthly EMI.
ROI & Interest Concession Guidance: Highlights concessional interest rates (e.g., 6.0% p.a. under NSFDC / Stand-Up India).

🛡️ 5. Clear Eligibility Guidance & Gap Analysis Engine
Pass/Fail Criteria Indicators:
✅ Age Limit Passed (e.g., Age 24 within 18–50 limit)
✅ Income Ceiling Passed (e.g., ₹2.5 LPA within ₹3.0 LPA ceiling)
✅ Quota Category Matched (e.g., SC/ST Entrepreneur Quota)
⚠️ Missing Requirements Flagged (Highlights missing documents or unmet criteria).
Plain-Language Summary: Converts bureaucratic legal jargon into easy-to-understand beneficiary advice.

🏦 6. Geolocation Authorized Government Bank Finder
Branch Discovery: Locates nearby authorized public sector bank branches dedicated to welfare loan disbursal:
🏦 State Bank of India (SBI)
🏦 Bank of Baroda
🏦 Canara Bank
🏦 Punjab National Bank (PNB)
🏦 Indian Bank
Branch Details: Renders physical branch addresses, IFSC codes, Nodal Loan Officers, and contact numbers.

🏛️ 7. District SC/ST Nodal Officer (SCA) Desk
Channelizing Agency (SCA) Mapping: Dynamically routes beneficiaries to their assigned District Channelizing Agency Nodal Officer.
Official Telephones & Addresses: Displays officer name, physical office address, phone number, and verification status.
Direct Nodal Desk Consultation: Modal popup providing direct guidance for application scrutiny.

🚀 8. In-Website Direct Application Portal & Live Tracker Board
In-Portal Direct Application: Users can apply for any scheme directly inside the website with 1-click "+ Apply New Scheme Direct".
Unique Application ID Generation: Generates official application IDs (e.g., APP-2026-8941).
Live 4-Step Milestone Progress Tracker:
Submitted ✅
Nodal Scrutiny 🟡
Bank Sanction ⚪
Direct Benefit Transfer (DBT) Disbursal ⚪

🗺️ 9. Visual Roadmap Workflow
4-Node Connected Process Timeline:
Node 1: DOB & Intake Profile → Node 2: Document Locker → Node 3: Nodal Desk Scrutiny → Node 4: Bank Disbursal.
Step-by-step visual guidance keeping first-time beneficiaries informed of their entire journey.

🎨 10. Executive Dual-Theme Engine
☀️ Custom Day Mode (White & Executive Orange):
Background: Pure White (#FFFFFF) & Crisp Slate (#F8FAFC).
Accents: Executive Saffron Orange (#EA580C / #F97316).
Typography: Dark High-Contrast Charcoal (#0F172A / #1E293B) for 100% font legibility.

🌊 Custom Night Mode (Black & Ocean Blue):
Background: Deep Midnight Black (#060911) & Slate Navy (#0F172A).
Accents: Electric Ocean Blue (#0284C7 / #06B6D4 / #38BDF8).
Typography: High-contrast crisp white (#F8FAFC) with sky-blue highlights.
1-Click Navbar Toggle: Instant switcher storing choices in localStorage.

📊 Data & Datasets Integrated
3,500+ Central and State Scheme Repository:
NSFDC Term Loans, Stand-Up India, PMEGP, MUDRA Tarun, Mahila Samriddhi Yojana, Pre/Post-Matric National Scholarships, Chief Minister Self-Employment Schemes across all 28 States & 8 UTs.
Public Sector Bank Network Data: Authorized branch locations, IFSC codes, and loan subsidy disbursal windows.
District Channelizing Agency (SCA) Directory: District SC/ST Nodal Officer contact database.

🛠️ Technical Stack Summary
Frontend: HTML5, Modern ES6+ JavaScript, Tailwind CSS, Three.js (WebGL 3D coin background graphics), React 18, TypeScript, Next.js 14.
Styling: Tailwind utility glassmorphism, dynamic Day/Night theme class overrides.
Data & Storage: Client-side RAG engine, HTML5 Web Storage API (localStorage).
Server: Multi-threaded Python HTTP Server on port 8080 (http://localhost:8080).
