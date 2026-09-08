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
            A practical, direct guide for expats moving to and living in Germany. Know your rights, avoid administrative traps, and stay on top of statutory deadlines.
          </p>
          <p className="text-[10px] leading-relaxed max-w-xl text-gray-500 mt-1 font-sans">
            Disclaimer: References German statutes (BGB, BMG, AufenthG, EStG). Informational only, not formal legal advice.
          </p>
        </div>
        <div className="text-left md:text-right text-[11px] space-y-1 text-gray-700 shrink-0 font-mono">
          <div className="text-black font-semibold flex items-center md:justify-end gap-2">
            <a
              href="https://github.com/yassin-mokni/nail-germany"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-black hover:underline cursor-pointer font-mono text-[11px]"
            >
              [GitHub]
            </a>
            <span className="text-gray-400">•</span>
            <span>Built by</span>
            <a
              href="https://mokni.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black text-white font-bold px-1.5 py-0.5 hover:bg-yellow-400 hover:text-black transition-none cursor-pointer"
            >
              Yassin
            </a>
          </div>
          <div className="text-black font-bold">OPEN SOURCE • 100% PRIVATE</div>
          <div className="text-gray-500 text-[10px]">Data stays in your browser • Updated for 2026</div>
        </div>
      </div>
    </footer>
  );
};
