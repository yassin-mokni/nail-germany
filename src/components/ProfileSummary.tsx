"use client";

import React from "react";
import { useProfileStore } from "@/store/useProfileStore";

interface ProfileSummaryProps {
  onEdit: () => void;
}

export const ProfileSummary: React.FC<ProfileSummaryProps> = ({ onEdit }) => {
  const origin = useProfileStore((s) => s.origin);
  const employment = useProfileStore((s) => s.employment);
  const housing = useProfileStore((s) => s.housing);
  const marital_status = useProfileStore((s) => s.marital_status);
  const has_children = useProfileStore((s) => s.has_children);

  const formatOrigin = (v: string | null) => (v === "eu" ? "EU / EEA CITIZEN" : "NON-EU CITIZEN");
  const formatEmployment = (v: string | null) => {
    if (v === "employed") return "EMPLOYED (ANGESTELLT)";
    if (v === "freelance") return "FREELANCE (FREIBERUFLER / GEWERBE)";
    if (v === "student") return "STUDENT (UNIVERSITÄT)";
    return "UNKNOWN";
  };
  const formatHousing = (v: string | null) => {
    if (v === "own_apartment") return "OWN APARTMENT (HAUPTMIETER)";
    if (v === "wg") return "WG / FLATSHARE (UNTERMIETER)";
    return "UNKNOWN";
  };
  const formatMarital = (v: string | null) => (v === "married" ? "MARRIED / CIVIL UNION" : "SINGLE");
  const formatChildren = (v: boolean | null) => (v ? "WITH CHILDREN" : "NO CHILDREN");

  return (
    <div className="border-4 border-black bg-white p-4 md:p-5 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b-2 border-black pb-3 mb-4 gap-2">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-black inline-block" />
          <h2 className="font-mono font-bold text-sm tracking-wider uppercase">
            ACTIVE EXPAT DOSSIER // PROFILE PARAMETERS
          </h2>
        </div>
        <button
          onClick={onEdit}
          className="no-print font-mono text-xs font-bold px-3 py-1 bg-black text-white hover:bg-yellow-400 hover:text-black border-2 border-black cursor-pointer transition-none self-start sm:self-auto"
        >
          [RECONFIGURE PROFILE]
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 font-mono text-xs">
        <div className="border-2 border-black p-2.5 bg-gray-50">
          <span className="text-[10px] text-gray-700 block uppercase font-bold">1. ORIGIN</span>
          <span className="font-bold text-black text-sm block mt-0.5">{formatOrigin(origin)}</span>
        </div>

        <div className="border-2 border-black p-2.5 bg-gray-50">
          <span className="text-[10px] text-gray-700 block uppercase font-bold">2. EMPLOYMENT</span>
          <span className="font-bold text-black text-sm block mt-0.5">{formatEmployment(employment)}</span>
        </div>

        <div className="border-2 border-black p-2.5 bg-gray-50">
          <span className="text-[10px] text-gray-700 block uppercase font-bold">3. HOUSING</span>
          <span className="font-bold text-black text-sm block mt-0.5">{formatHousing(housing)}</span>
        </div>

        <div className="border-2 border-black p-2.5 bg-gray-50">
          <span className="text-[10px] text-gray-700 block uppercase font-bold">4. MARITAL STATUS</span>
          <span className="font-bold text-black text-sm block mt-0.5">{formatMarital(marital_status)}</span>
        </div>

        <div className="border-2 border-black p-2.5 bg-gray-50">
          <span className="text-[10px] text-gray-700 block uppercase font-bold">5. DEPENDENTS</span>
          <span className="font-bold text-black text-sm block mt-0.5">{formatChildren(has_children)}</span>
        </div>
      </div>
    </div>
  );
};
