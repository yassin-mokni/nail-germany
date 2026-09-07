"use client";

import React, { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { OnboardingForm } from "@/components/OnboardingForm";
import { Dashboard } from "@/components/Dashboard";
import { useProfileStore } from "@/store/useProfileStore";

export default function HomePage() {
  const isConfigured = useProfileStore((s) => s.is_configured);
  const [mounted, setMounted] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // During SSR or before hydration, render a minimal brutalist loading frame to avoid hydration mismatch
  if (!mounted) {
    return (
      <div className="min-h-screen bg-white text-black flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center p-8">
          <div className="border-4 border-black p-6 font-mono text-sm max-w-md w-full bg-white">
            <div className="flex items-center gap-2 mb-2 font-bold">
              <span className="w-3 h-3 bg-black inline-block animate-ping" />
              <span>[BOOT] INITIALIZING LOCAL PROFILE STORE...</span>
            </div>
            <p className="text-xs text-gray-700">
              Retrieving client-side profile from localStorage. No remote tracking active.
            </p>
          </div>
        </main>
      </div>
    );
  }

  const showOnboarding = !isConfigured || isEditingProfile;

  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
      <Header
        showReconfigure={!showOnboarding}
        onReconfigure={() => setIsEditingProfile(true)}
      />

      <main className="flex-1">
        {showOnboarding ? (
          <OnboardingForm
            onComplete={() => {
              setIsEditingProfile(false);
            }}
          />
        ) : (
          <Dashboard
            onReconfigure={() => {
              setIsEditingProfile(true);
            }}
          />
        )}
      </main>
    </div>
  );
}
