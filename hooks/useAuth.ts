'use client';

import { useState, useEffect } from 'react';
import { UserProfile, matchSchemesForProfile } from '@/lib/matchingEngine';

export interface User {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  authMethod: 'google' | 'phone';
  profile: UserProfile;
}

const defaultProfile: UserProfile = {
  name: 'Sriram Suresh',
  phone: '8056992589',
  age: 26,
  dob: '2000-05-15',
  caste: 'SC',
  entrepreneurStatus: 'Aspiring / New Micro-Unit',
  gender: 'Male',
  lpaIncome: 2.5,
  state: 'Tamil Nadu',
  district: 'Chennai',
  tradeType: 'Food Processing & Agri Micro-Unit',
};

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isIntakeModalOpen, setIsIntakeModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('scorpius_auth_user');
    if (saved) {
      try {
        setUser(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse saved user state', e);
      }
    }
    setLoading(false);
  }, []);

  const saveUserToStorage = (updatedUser: User) => {
    setUser(updatedUser);
    localStorage.setItem('scorpius_auth_user', JSON.stringify(updatedUser));
  };

  const loginWithGoogle = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 600));
    const googleUser: User = {
      id: 'usr_g_' + Math.random().toString(36).substring(2, 9),
      name: 'Sriram Suresh',
      email: 'sriramsuresh.tech@gmail.com',
      authMethod: 'google',
      profile: user?.profile || defaultProfile,
    };
    saveUserToStorage(googleUser);
    setIsAuthModalOpen(false);
    setIsIntakeModalOpen(true);
    setLoading(false);
    return googleUser;
  };

  const loginWithPhone = async (phone: string, otp: string) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 600));
    const phoneUser: User = {
      id: 'usr_p_' + Math.random().toString(36).substring(2, 9),
      name: `Entrepreneur (+91 ${phone.slice(-4)})`,
      phone: `+91 ${phone}`,
      authMethod: 'phone',
      profile: {
        ...defaultProfile,
        phone: phone,
      },
    };
    saveUserToStorage(phoneUser);
    setIsAuthModalOpen(false);
    setIsIntakeModalOpen(true);
    setLoading(false);
    return phoneUser;
  };

  const updateProfile = (newProfile: UserProfile) => {
    if (!user) {
      const newUser: User = {
        id: 'usr_guest_' + Math.random().toString(36).substring(2, 9),
        name: newProfile.name,
        phone: newProfile.phone,
        authMethod: 'phone',
        profile: newProfile,
      };
      saveUserToStorage(newUser);
    } else {
      const updatedUser: User = {
        ...user,
        name: newProfile.name,
        profile: newProfile,
      };
      saveUserToStorage(updatedUser);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('scorpius_auth_user');
  };

  return {
    user,
    isAuthenticated: !!user,
    loading,
    isAuthModalOpen,
    isIntakeModalOpen,
    openAuthModal: () => setIsAuthModalOpen(true),
    closeAuthModal: () => setIsAuthModalOpen(false),
    openIntakeModal: () => setIsIntakeModalOpen(true),
    closeIntakeModal: () => setIsIntakeModalOpen(false),
    loginWithGoogle,
    loginWithPhone,
    updateProfile,
    logout,
  };
}
