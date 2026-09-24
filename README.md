# 🛡️ SCHEME SPEAR (SCHEME-SPEAR)
> **AI-Powered Central & State Welfare Scheme Discovery, Financial Inclusion & Direct Application Portal**

![Scheme Spear Banner](assets/logo-day.jpg)

[![Repository](https://img.shields.io/badge/GitHub-SCHEME--SPEAR-orange?style=for-the-badge&logo=github)](https://github.com/S-C-O-R-P-I-U-S/SCHEME-SPEAR.git)
[![Status](https://img.shields.io/badge/Status-Active%20Production-success?style=for-the-badge)](http://localhost:8080)
[![Schemes](https://img.shields.io/badge/Schemes%20Indexed-3%2C500%2B-blue?style=for-the-badge)](#-master-features-inventory)
[![Theme](https://img.shields.io/badge/Theme-Dual%20Mode%20(Day%2FNight)-purple?style=for-the-badge)](#-executive-dual-theme-engine)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

---

## 📌 Table of Contents
- [✨ Overview & Core Mission](#-overview--core-mission)
- [⚡ Key Features Inventory](#-key-features-inventory)
- [🎨 Executive Dual-Theme Engine](#-executive-dual-theme-engine)
- [🔐 3D Animated Citizen Authentication Gate](#-3d-animated-citizen-authentication-gate)
- [🧮 Smart Loan & EMI Recommendation Suite](#-smart-loan--emi-recommendation-suite)
- [📂 Document Locker & Application Tracker](#-document-locker--application-tracker)
- [🛠️ Tech Stack & Architecture](#️-tech-stack--architecture)
- [📁 Directory Structure](#-directory-structure)
- [🚀 Quick Start & Local Setup](#-quick-start--local-setup)
- [🤝 Contributing & License](#-contributing--license)

---

## ✨ Overview & Core Mission

**SCHEME SPEAR** is an AI-powered, multi-faceted Government Welfare Scheme Discovery, Financial Inclusion, and Application Management Platform. Built specifically to empower Indian citizens—including micro-entrepreneurs, women, SC/ST/OBC beneficiaries, students, and aspiring business owners—it bridges the gap between **3,500+ Central and State Government schemes** and eligible citizens.

### 🎯 Problems Solved:
1. **Fragmented Information**: Eliminates portal jumping by indexing 3,500+ schemes in a central client-side RAG engine.
2. **Complex Eligibility Jargon**: Replaces legal terms with sub-50ms eligibility pass/fail indicators and custom gap analysis.
3. **Financial Confusion**: Solves loan opacity by auto-calculating government grant subsidies (15% to 35%), net loan burden, and monthly EMIs.
4. **Document Rejections**: Prevents rejection through an interactive Document Locker checklist that calculates application readiness scores.
5. **Opaque Application Status**: Delivers a live 4-step milestone tracker board from Submission → Nodal Scrutiny → Bank Sanction → Direct Benefit Transfer (DBT).

---

## ⚡ Key Features Inventory

| Category | Description | Key Capabilities |
| :--- | :--- | :--- |
| 🧠 **Scheme Search** | Sub-50ms Client-Side RAG Engine | Real-time filtering across 3,500+ schemes by category, ministry, income, caste quota, and grant subsidy. |
| 🔐 **3D Authentication Gate** | Full-Screen Animated Login Modal | High-DPI theme-matched logos (`logo-day.jpg` / `logo-night.jpg`), Mobile OTP validation, DOB auto-age calculator, and citizen demographic intake. |
| 📂 **Document Locker** | Application Readiness Checklist | Aadhaar, Caste Certificate, Income Proof, Detailed Project Report (DPR), and Bank Passbook verification with readiness score meter. |
| 🧮 **Financial Simulator** | Compound EMI & Subsidy Calculator | Calculates exact principal grant subsidies (15%–35%), net loan balance, interest concessions, and monthly repayment EMIs. |
| 🏛️ **Bank & Nodal Finder** | Geolocation Authorized Desk | Locates nearest public sector banks (SBI, BoB, PNB, Canara) and District Channelizing Agency (SCA) Nodal Officers. |
| 🚀 **Direct Application** | In-Portal Tracker Board | 1-Click scheme application submission with unique tracking IDs (e.g. `APP-2026-8941`) and live 4-stage status timeline. |

---

## 🎨 Executive Dual-Theme Engine

SCHEME SPEAR features a custom dual-theme engine engineered for maximum readability, executive aesthetics, and high-DPI clarity.

```
       +-------------------------------------------------------+
       |                  THEME SELECTION                      |
       +-------------------------------------------------------+
                                  |
            +---------------------+---------------------+
            |                                           |
            v                                           v
   ☀️ CUSTOM DAY MODE                         🌊 CUSTOM NIGHT MODE
   ------------------                         --------------------
   • Background: Pure Crisp White (#FFFFFF)   • Background: Midnight Black (#060911)
   • Accent: Executive Saffron (#EA580C)      • Accent: Electric Ocean Blue (#0284C7)
   • Fonts: High-Contrast Dark (#0F172A)      • Fonts: Crisp High-Luminance White
   • Logo: logo-day.jpg                       • Logo: logo-night.jpg
```

---

## 🔐 3D Animated Citizen Authentication Gate

The authentication flow utilizes forward-facing 3D panel slide animations to ensure 100% legibility and sleek motion design:

- **Opening & Closing Animations**: Smooth scale and fade transitions (`animate-login-open` / `animate-login-close`).
- **Forward-Facing 3D Slide**: Seamless transition between Side A (Mobile OTP) and Side B (Citizen Intake Details) without text mirroring glitches.
- **Intake Data Points**:
  - Full Name & Mobile Number
  - Date of Birth with live auto-calculated age (e.g., `Age: 24 Years`)
  - Social Category / Caste Quota (`SC`, `ST`, `OBC`, `EWS`, `General`, `Differently Abled`)
  - Annual Family Income in Lakhs Per Annum (LPA)
  - Home State / Union Territory & District

---

## 🧮 Smart Loan & EMI Recommendation Suite

Uses standard compounding loan equations to compute net borrower burden after applying government subsidies:

$$\text{EMI} = \frac{P \times \left(\frac{R}{1200}\right) \times \left(1 + \frac{R}{1200}\right)^{N \times 12}}{\left(1 + \frac{R}{1200}\right)^{N \times 12} - 1}$$

- **$P$**: Net Principal Loan Amount (Gross Loan minus Government Grant Subsidy)
- **$R$**: Concessional Annual Interest Rate (%)
- **$N$**: Loan Tenure in Years

---

## 📂 Document Locker & Application Tracker

Users can verify mandatory application documents before applying:
- 🆔 **Aadhaar Card** (Identity Proof)
- 📜 **Caste / Category Certificate** (Quota Verification)
- 💵 **Income Certificate** (Subsidy Eligibility)
- 📋 **Detailed Project Report / Business Plan** (Loan Feasibility)
- 🏦 **Bank Passbook - First Page** (DBT Account Verification)

### Live Milestone Status Timeline:
```
  [ 1. Submitted ]  ==>  [ 2. Nodal Scrutiny ]  ==>  [ 3. Bank Sanction ]  ==>  [ 4. DBT Disbursal ]
       (DONE)                (IN PROGRESS)              (PENDING)                  (PENDING)
```

---

## 🛠️ Tech Stack & Architecture

- **Frontend**: HTML5, Modern ES6+ JavaScript, Tailwind CSS, Lucide Icons, Canvas WebGL 3D graphics.
- **Styling**: Tailwind CSS utility design with glassmorphic cards and dynamic Day/Night theme overrides.
- **Data Engine**: Fast client-side JSON RAG query engine with HTML5 `localStorage` state persistence.
- **Server Runtimes**: Multi-threaded Python HTTP Server on port `8080`.
- **Version Control**: Git & GitHub (`origin/main`).

---

## 📁 Directory Structure

```
SCHEME-SPEAR/
├── index.html            # Core Single Page Application (UI, 3D Login, Calculator, RAG Engine)
├── assets/
│   ├── logo-day.jpg      # Custom High-DPI Executive Day Theme Logo
│   └── logo-night.jpg    # Custom High-DPI Midnight Electric Night Theme Logo
├── README.md             # Detailed Project Documentation & Setup Guide
└── .git/                 # Git Version Control Repository Data
```

---

## 🚀 Quick Start & Local Setup

### 1. Clone the Repository
```bash
git clone https://github.com/S-C-O-R-P-I-U-S/SCHEME-SPEAR.git
cd SCHEME-SPEAR
```

### 2. Launch Local Server
You can launch the application using Python's built-in HTTP server:

```bash
# Python 3
python -m http.server 8080
```

### 3. Access in Browser
Open your preferred browser and navigate to:
```
http://localhost:8080
```

---

## 🤝 Contributing & License

Contributions, feature requests, and bug reports are welcome! Feel free to open an issue or submit a pull request on the [GitHub Repository](https://github.com/S-C-O-R-P-I-U-S/SCHEME-SPEAR.git).

Distributed under the **MIT License**. See `LICENSE` for more information.

---
*Built with ❤️ for Indian Citizens by the SCHEME SPEAR Team.*
