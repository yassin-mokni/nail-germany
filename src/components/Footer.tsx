"use client";

import React from "react";

export const Footer: React.FC = () => {
  return (
    <footer className="mt-12 border-t-4 border-black pt-6 pb-12 font-mono text-xs text-gray-600 bg-white no-print">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-bold text-black text-sm uppercase tracking-wide">
              NAIL GERMANY // GERMAN BUREAUCRACY CHECKLIST
            </span>
          </div>
          <p className="text-[11px] leading-relaxed max-w-xl text-gray-700 font-sans font-medium">
            Built by Yassin. A practical, direct survival guide for expats navigating German administrative systems, rental rights, and tax laws.
          </p>
          <p className="text-[10px] leading-relaxed max-w-xl text-gray-500 mt-1 font-sans">
            Disclaimer: References German statutes (BGB, BMG, AufenthG, EStG). Informational only, not formal legal advice.
          </p>
        </div>
        <div className="text-left md:text-right text-[11px] space-y-1 text-gray-700 shrink-0">
          <div className="text-black font-black text-xs uppercase tracking-wider">
            BUILT BY YASSIN
          </div>
          <div className="text-black font-bold">100% PRIVATE & LOCAL</div>
          <div>Data stays in your browser.</div>
          <div className="text-gray-500 text-[10px]">No tracking • Zero accounts • Updated for 2026</div>
        </div>
      </div>
    </footer>
  );
};
