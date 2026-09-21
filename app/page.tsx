'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { useAuth } from '@/hooks/useAuth';
import Navbar from '@/components/ui/Navbar';
import AuthModal from '@/components/ui/AuthModal';
import ProfileIntakeModal from '@/components/ui/ProfileIntakeModal';
import UserProfileDashboard from '@/components/UserProfileDashboard';
import SchemesPlatform from '@/components/SchemesPlatform';
import HeroSection from '@/components/sections/HeroSection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import HowItWorksSection from '@/components/sections/HowItWorksSection';
import ProblemSection from '@/components/sections/ProblemSection';
import TechStackSection from '@/components/sections/TechStackSection';
import ArchitectureSection from '@/components/sections/ArchitectureSection';
import FeasibilitySection from '@/components/sections/FeasibilitySection';
import ImpactSection from '@/components/sections/ImpactSection';
import ResearchSection from '@/components/sections/ResearchSection';
import ContactFooter from '@/components/sections/ContactFooter';

const BackgroundCanvas = dynamic(() => import('@/components/canvas/BackgroundCanvas'), {
  ssr: false,
});

export default function Home() {
  const auth = useAuth();

  return (
    <main className="relative min-h-screen bg-[#0A0E1A] overflow-hidden">
      {/* 3D WebGL Background Scene */}
      <BackgroundCanvas />

      {/* Sticky Glassmorphic Navbar */}
      <Navbar auth={auth} />

      {/* Hero Section */}
      <HeroSection onOpenAuth={auth.openAuthModal} />

      {/* Redesigned User Profile Dashboard & Document Locker */}
      <div id="profile-dashboard-section" className="relative z-20 my-8">
        <UserProfileDashboard />
      </div>

      {/* 3,400+ Schemes Search & Multi-Faceted Filter Platform */}
      <div id="scheme-search-section" className="relative z-20 my-8">
        <SchemesPlatform />
      </div>

      {/* Main Site Sections */}
      <FeaturesSection />
      <HowItWorksSection onOpenAuth={auth.openAuthModal} />
      <ProblemSection />
      <TechStackSection />
      <ArchitectureSection />
      <FeasibilitySection />
      <ImpactSection />
      <ResearchSection />
      <ContactFooter />

      {/* Modals */}
      <AuthModal
        isOpen={auth.isAuthModalOpen}
        onClose={auth.closeAuthModal}
        auth={auth}
      />

      <ProfileIntakeModal
        isOpen={auth.isIntakeModalOpen}
        onClose={auth.closeIntakeModal}
        onSubmitProfile={auth.updateProfile}
        initialData={auth.user?.profile}
      />
    </main>
  );
}
