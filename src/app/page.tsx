"use client";

import React, { useState, useSyncExternalStore } from "react";
import { Header } from "@/components/Header";
import { OnboardingForm } from "@/components/OnboardingForm";
import { Dashboard } from "@/components/Dashboard";
import { Footer } from "@/components/Footer";
import { useProfileStore } from "@/store/useProfileStore";

const emptySubscribe = () => () => {};

export default function HomePage() {
  const isConfigured = useProfileStore((s) => s.is_configured);
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  // During SSR or before hydration, render a minimal brutalist loading frame to avoid hydration mismatch
  if (!mounted) {
    return (
      <div className="min-h-screen bg-white text-black flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center p-8">
          <div className="border-4 border-black p-6 font-mono text-sm max-w-md w-full bg-white">
            <div className="flex items-center gap-2 mb-2 font-bold">
              <span className="w-2.5 h-2.5 bg-black inline-block" />
              <span>LOADING CHECKLIST...</span>
            </div>
            <p className="text-xs text-gray-700">
              Retrieving your saved profile from local storage.
            </p>
          </div>
        </main>
      </div>
    );
  }

  const handleEditProfile = () => {
    setIsEditingProfile(true);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleCompleteOnboarding = () => {
    setIsEditingProfile(false);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const showOnboarding = !isConfigured || isEditingProfile;

  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
      <Header
        showReconfigure={!showOnboarding}
        onReconfigure={handleEditProfile}
      />

      <main className="flex-1">
        {showOnboarding ? (
          <OnboardingForm onComplete={handleCompleteOnboarding} />
        ) : (
          <Dashboard onReconfigure={handleEditProfile} />
        )}
      </main>

      <Footer />
    </div>
  );
}
