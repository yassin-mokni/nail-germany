"use client";

import React from "react";
import { useProfileStore } from "@/store/useProfileStore";

interface HeaderProps {
  onReconfigure?: () => void;
  showReconfigure?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onReconfigure, showReconfigure = false }) => {
  const resetProfile = useProfileStore((s) => s.resetProfile);

  return (
    <header className="border-b-4 border-black bg-white w-full">
      {/* Top Gov Meta Bar */}
      <div className="bg-black text-white px-4 py-1.5 font-mono text-xs flex flex-wrap justify-between items-center gap-2">
        <div className="flex items-center gap-2">
          <span className="font-bold tracking-widest">
            NAIL GERMANY // RELOCATION & BUREAUCRACY GUIDE
          </span>
        </div>
        <div className="text-gray-400 text-[11px]">
          <span>UPDATED FOR 2026</span>
        </div>
      </div>

      {/* Main Header Content */}
      <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="inline-block bg-black text-white font-mono text-xs px-2 py-0.5 font-bold uppercase mb-2">
            Practical Expat Checklist
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-black uppercase font-sans">
            Nail Germany
          </h1>
          <p className="mt-2 text-base md:text-lg text-black font-medium max-w-2xl leading-snug">
            A clear, honest guide to moving to and living in Germany. Know your rights, avoid costly mistakes with landlords or health insurance, and get your paperwork done on time.
          </p>
        </div>

        {/* Utilitarian Quick Actions */}
        <div className="flex flex-wrap items-center gap-2 no-print font-mono text-xs">
          {showReconfigure && onReconfigure && (
            <button
              onClick={onReconfigure}
              className="px-3 py-2 border-2 border-black bg-white hover:bg-black hover:text-white font-bold transition-none cursor-pointer"
            >
              [↺ EDIT PROFILE]
            </button>
          )}
          <button
            onClick={() => window.print()}
            className="px-3 py-2 border-2 border-black bg-white hover:bg-black hover:text-white font-bold transition-none cursor-pointer"
            title="Print checklist for offline use"
          >
            [⎙ PRINT CHECKLIST]
          </button>
          <button
            onClick={() => {
              if (confirm("Reset all saved profile data and completed checkmarks?")) {
                resetProfile();
              }
            }}
            className="px-3 py-2 border-2 border-black bg-gray-200 hover:bg-red-600 hover:text-white font-bold transition-none cursor-pointer"
          >
            [✕ RESET DATA]
          </button>
        </div>
      </div>
    </header>
  );
};
