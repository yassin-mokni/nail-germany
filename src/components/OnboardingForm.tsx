"use client";

import React, { useState } from "react";
import { Origin, Employment, Housing, MaritalStatus, UserProfile } from "@/types";
import { useProfileStore } from "@/store/useProfileStore";

interface OnboardingFormProps {
  onComplete: () => void;
}

export const OnboardingForm: React.FC<OnboardingFormProps> = ({ onComplete }) => {
  const storeOrigin = useProfileStore((s) => s.origin);
  const storeEmployment = useProfileStore((s) => s.employment);
  const storeHousing = useProfileStore((s) => s.housing);
  const storeMarital = useProfileStore((s) => s.marital_status);
  const storeChildren = useProfileStore((s) => s.has_children);
  const setProfile = useProfileStore((s) => s.setProfile);

  const [origin, setOrigin] = useState<Origin | null>(storeOrigin);
  const [employment, setEmployment] = useState<Employment | null>(storeEmployment);
  const [housing, setHousing] = useState<Housing | null>(storeHousing);
  const [maritalStatus, setMaritalStatus] = useState<MaritalStatus | null>(storeMarital);
  const [hasChildren, setHasChildren] = useState<boolean | null>(storeChildren);

  const isFormComplete =
    origin !== null &&
    employment !== null &&
    housing !== null &&
    maritalStatus !== null &&
    hasChildren !== null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormComplete) return;

    setProfile({
      origin,
      employment,
      housing,
      marital_status: maritalStatus,
      has_children: hasChildren,
      is_configured: true,
    });
    onComplete();
  };

  const applyPreset = (preset: {
    origin: Origin;
    employment: Employment;
    housing: Housing;
    marital_status: MaritalStatus;
    has_children: boolean;
  }) => {
    setOrigin(preset.origin);
    setEmployment(preset.employment);
    setHousing(preset.housing);
    setMaritalStatus(preset.marital_status);
    setHasChildren(preset.has_children);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      {/* Official Intake Header */}
      <div className="border-4 border-black bg-white p-6 mb-8">
        <div className="font-mono text-xs font-bold text-gray-700 uppercase tracking-widest mb-1 flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-black" />
          <span>FORMULAR AZ-2026 // MANDATORY INTAKE SURVEY</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-black uppercase text-black tracking-tight font-sans">
          Configure Your Expat Profile
        </h2>
        <p className="mt-2 text-base font-medium text-black max-w-2xl leading-relaxed">
          German administrative and civil law applies selectively based on nationality, employment type, and tenancy.
          Answer 5 questions to filter strictly the laws, deadlines, and traps that apply to you.
        </p>

        {/* Quick Testing Presets */}
        <div className="mt-5 pt-4 border-t-2 border-black no-print">
          <div className="font-mono text-xs font-bold uppercase text-black mb-2">
            [⚡ QUICK-LOAD PRESETS FOR AUDIT & TESTING]:
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() =>
                applyPreset({
                  origin: "non-eu",
                  employment: "employed",
                  housing: "own_apartment",
                  marital_status: "married",
                  has_children: true,
                })
              }
              className="font-mono text-xs font-bold px-3 py-1.5 border-2 border-black bg-yellow-400 hover:bg-black hover:text-white cursor-pointer"
            >
              Preset A: Married Non-EU Worker + Child (Tests Kindergeld)
            </button>
            <button
              type="button"
              onClick={() =>
                applyPreset({
                  origin: "non-eu",
                  employment: "student",
                  housing: "wg",
                  marital_status: "single",
                  has_children: false,
                })
              }
              className="font-mono text-xs font-bold px-3 py-1.5 border-2 border-black bg-gray-200 hover:bg-black hover:text-white cursor-pointer"
            >
              Preset B: Single Non-EU Student in WG (Tests Sperrkonto)
            </button>
            <button
              type="button"
              onClick={() =>
                applyPreset({
                  origin: "eu",
                  employment: "freelance",
                  housing: "own_apartment",
                  marital_status: "single",
                  has_children: false,
                })
              }
              className="font-mono text-xs font-bold px-3 py-1.5 border-2 border-black bg-gray-200 hover:bg-black hover:text-white cursor-pointer"
            >
              Preset C: EU Freelancer (Tests Steuernummer)
            </button>
          </div>
        </div>
      </div>

      {/* 5-Question Brutalist Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Question 1: Origin */}
        <div className="border-4 border-black bg-white p-5">
          <div className="flex items-center justify-between mb-3 border-b-2 border-black pb-2">
            <span className="font-mono text-xs font-black uppercase tracking-widest text-black">
              SECTION 01 / 05 // NATIONALITY & IMMIGRATION STATUS
            </span>
            {origin ? (
              <span className="font-mono text-xs font-bold bg-black text-white px-2 py-0.5">[RESOLVED]</span>
            ) : (
              <span className="font-mono text-xs font-bold bg-red-600 text-white px-2 py-0.5">[REQUIRED]</span>
            )}
          </div>
          <h3 className="text-xl font-black text-black uppercase mb-1">Where is your passport / citizenship from?</h3>
          <p className="text-sm text-gray-700 font-medium mb-4">
            EU citizens enjoy unconditional freedom of movement (§ 2 FreizügG/EU). Non-EU citizens must satisfy strict residence permit & work authorization rules.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setOrigin("eu")}
              className={`p-4 border-2 border-black text-left font-sans cursor-pointer transition-none ${
                origin === "eu"
                  ? "bg-black text-white"
                  : "bg-white text-black hover:bg-gray-100"
              }`}
            >
              <div className="font-black text-lg">EU / EEA Citizen</div>
              <div className={`text-xs mt-1 font-mono ${origin === "eu" ? "text-gray-300" : "text-gray-600"}`}>
                Unrestricted residence & labor access. No Ausländerbehörde visa required.
              </div>
            </button>

            <button
              type="button"
              onClick={() => setOrigin("non-eu")}
              className={`p-4 border-2 border-black text-left font-sans cursor-pointer transition-none ${
                origin === "non-eu"
                  ? "bg-black text-white"
                  : "bg-white text-black hover:bg-gray-100"
              }`}
            >
              <div className="font-black text-lg">Non-EU Citizen (Third Country)</div>
              <div className={`text-xs mt-1 font-mono ${origin === "non-eu" ? "text-gray-300" : "text-gray-600"}`}>
                Subject to AufenthG, visa conversions, Blue Card, and immigration checks.
              </div>
            </button>
          </div>
        </div>

        {/* Question 2: Employment */}
        <div className="border-4 border-black bg-white p-5">
          <div className="flex items-center justify-between mb-3 border-b-2 border-black pb-2">
            <span className="font-mono text-xs font-black uppercase tracking-widest text-black">
              SECTION 02 / 05 // ECONOMIC ACTIVITY & EMPLOYMENT
            </span>
            {employment ? (
              <span className="font-mono text-xs font-bold bg-black text-white px-2 py-0.5">[RESOLVED]</span>
            ) : (
              <span className="font-mono text-xs font-bold bg-red-600 text-white px-2 py-0.5">[REQUIRED]</span>
            )}
          </div>
          <h3 className="text-xl font-black text-black uppercase mb-1">What is your employment structure in Germany?</h3>
          <p className="text-sm text-gray-700 font-medium mb-4">
            Dictates social security withholding, dismissal protection eligibility, and mandatory Finanzamt filings.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              type="button"
              onClick={() => setEmployment("employed")}
              className={`p-4 border-2 border-black text-left font-sans cursor-pointer transition-none ${
                employment === "employed"
                  ? "bg-black text-white"
                  : "bg-white text-black hover:bg-gray-100"
              }`}
            >
              <div className="font-black text-lg">Employed (Angestellt)</div>
              <div className={`text-xs mt-1 font-mono ${employment === "employed" ? "text-gray-300" : "text-gray-600"}`}>
                Standard labor contract. Social contributions deducted automatically.
              </div>
            </button>

            <button
              type="button"
              onClick={() => setEmployment("freelance")}
              className={`p-4 border-2 border-black text-left font-sans cursor-pointer transition-none ${
                employment === "freelance"
                  ? "bg-black text-white"
                  : "bg-white text-black hover:bg-gray-100"
              }`}
            >
              <div className="font-black text-lg">Freelancer / Self-Employed</div>
              <div className={`text-xs mt-1 font-mono ${employment === "freelance" ? "text-gray-300" : "text-gray-600"}`}>
                Direct invoice issuance. Requires ELSTER questionnaire & freelance Steuernummer.
              </div>
            </button>

            <button
              type="button"
              onClick={() => setEmployment("student")}
              className={`p-4 border-2 border-black text-left font-sans cursor-pointer transition-none ${
                employment === "student"
                  ? "bg-black text-white"
                  : "bg-white text-black hover:bg-gray-100"
              }`}
            >
              <div className="font-black text-lg">University Student</div>
              <div className={`text-xs mt-1 font-mono ${employment === "student" ? "text-gray-300" : "text-gray-600"}`}>
                Subject to 140 full-day work caps, blocked account payouts, student health rates.
              </div>
            </button>
          </div>
        </div>

        {/* Question 3: Housing */}
        <div className="border-4 border-black bg-white p-5">
          <div className="flex items-center justify-between mb-3 border-b-2 border-black pb-2">
            <span className="font-mono text-xs font-black uppercase tracking-widest text-black">
              SECTION 03 / 05 // RESIDENTIAL TENANCY TYPE
            </span>
            {housing ? (
              <span className="font-mono text-xs font-bold bg-black text-white px-2 py-0.5">[RESOLVED]</span>
            ) : (
              <span className="font-mono text-xs font-bold bg-red-600 text-white px-2 py-0.5">[REQUIRED]</span>
            )}
          </div>
          <h3 className="text-xl font-black text-black uppercase mb-1">What is your housing arrangement?</h3>
          <p className="text-sm text-gray-700 font-medium mb-4">
            Critical for German tenancy law (BGB), Mietkaution escrow protection, and Rundfunkbeitrag liability.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setHousing("own_apartment")}
              className={`p-4 border-2 border-black text-left font-sans cursor-pointer transition-none ${
                housing === "own_apartment"
                  ? "bg-black text-white"
                  : "bg-white text-black hover:bg-gray-100"
              }`}
            >
              <div className="font-black text-lg">Own Apartment (Hauptmieter)</div>
              <div className={`text-xs mt-1 font-mono ${housing === "own_apartment" ? "text-gray-300" : "text-gray-600"}`}>
                Sole or main tenant with direct landlord lease. Responsible for full radio fee.
              </div>
            </button>

            <button
              type="button"
              onClick={() => setHousing("wg")}
              className={`p-4 border-2 border-black text-left font-sans cursor-pointer transition-none ${
                housing === "wg"
                  ? "bg-black text-white"
                  : "bg-white text-black hover:bg-gray-100"
              }`}
            >
              <div className="font-black text-lg">WG / Flatshare (Untermieter)</div>
              <div className={`text-xs mt-1 font-mono ${housing === "wg" ? "text-gray-300" : "text-gray-600"}`}>
                Roommate in shared flat. Must coordinate radio fee with flatmates to avoid double billing.
              </div>
            </button>
          </div>
        </div>

        {/* Question 4: Marital Status */}
        <div className="border-4 border-black bg-white p-5">
          <div className="flex items-center justify-between mb-3 border-b-2 border-black pb-2">
            <span className="font-mono text-xs font-black uppercase tracking-widest text-black">
              SECTION 04 / 05 // CIVIL & MARITAL STATUS
            </span>
            {maritalStatus ? (
              <span className="font-mono text-xs font-bold bg-black text-white px-2 py-0.5">[RESOLVED]</span>
            ) : (
              <span className="font-mono text-xs font-bold bg-red-600 text-white px-2 py-0.5">[REQUIRED]</span>
            )}
          </div>
          <h3 className="text-xl font-black text-black uppercase mb-1">What is your legal marital status?</h3>
          <p className="text-sm text-gray-700 font-medium mb-4">
            Married expats can switch income tax brackets (Steuerklassen III/V vs IV/IV) to optimize monthly take-home pay.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setMaritalStatus("single")}
              className={`p-4 border-2 border-black text-left font-sans cursor-pointer transition-none ${
                maritalStatus === "single"
                  ? "bg-black text-white"
                  : "bg-white text-black hover:bg-gray-100"
              }`}
            >
              <div className="font-black text-lg">Single / Unmarried</div>
              <div className={`text-xs mt-1 font-mono ${maritalStatus === "single" ? "text-gray-300" : "text-gray-600"}`}>
                Assigned Tax Class I automatically. Individual income assessment.
              </div>
            </button>

            <button
              type="button"
              onClick={() => setMaritalStatus("married")}
              className={`p-4 border-2 border-black text-left font-sans cursor-pointer transition-none ${
                maritalStatus === "married"
                  ? "bg-black text-white"
                  : "bg-white text-black hover:bg-gray-100"
              }`}
            >
              <div className="font-black text-lg">Married / Civil Partnership</div>
              <div className={`text-xs mt-1 font-mono ${maritalStatus === "married" ? "text-gray-300" : "text-gray-600"}`}>
                Eligible for joint tax assessment and child support benefit protocols.
              </div>
            </button>
          </div>
        </div>

        {/* Question 5: Children */}
        <div className="border-4 border-black bg-white p-5">
          <div className="flex items-center justify-between mb-3 border-b-2 border-black pb-2">
            <span className="font-mono text-xs font-black uppercase tracking-widest text-black">
              SECTION 05 / 05 // DEPENDENT CHILDREN
            </span>
            {hasChildren !== null ? (
              <span className="font-mono text-xs font-bold bg-black text-white px-2 py-0.5">[RESOLVED]</span>
            ) : (
              <span className="font-mono text-xs font-bold bg-red-600 text-white px-2 py-0.5">[REQUIRED]</span>
            )}
          </div>
          <h3 className="text-xl font-black text-black uppercase mb-1">Do you have dependent children?</h3>
          <p className="text-sm text-gray-700 font-medium mb-4">
            Unlocks state child benefit claims (€250/child/month Kindergeld) and Kita nursery voucher rights.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setHasChildren(true)}
              className={`p-4 border-2 border-black text-left font-sans cursor-pointer transition-none ${
                hasChildren === true
                  ? "bg-black text-white"
                  : "bg-white text-black hover:bg-gray-100"
              }`}
            >
              <div className="font-black text-lg">Yes, I Have Children</div>
              <div className={`text-xs mt-1 font-mono ${hasChildren === true ? "text-gray-300" : "text-gray-600"}`}>
                Triggers state Kindergeld application and child healthcare registration duties.
              </div>
            </button>

            <button
              type="button"
              onClick={() => setHasChildren(false)}
              className={`p-4 border-2 border-black text-left font-sans cursor-pointer transition-none ${
                hasChildren === false
                  ? "bg-black text-white"
                  : "bg-white text-black hover:bg-gray-100"
              }`}
            >
              <div className="font-black text-lg">No Children</div>
              <div className={`text-xs mt-1 font-mono ${hasChildren === false ? "text-gray-300" : "text-gray-600"}`}>
                No child-related obligations or benefit applications required.
              </div>
            </button>
          </div>
        </div>

        {/* Submission Control Bar */}
        <div className="border-4 border-black bg-white p-5 sticky bottom-4 shadow-none">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="font-mono text-xs font-bold uppercase text-black">
                CONFIGURATION STATUS:{" "}
                {isFormComplete ? (
                  <span className="text-black bg-yellow-400 px-2 py-0.5 font-bold">5 OF 5 PARAMETERS READY</span>
                ) : (
                  <span className="text-white bg-red-600 px-2 py-0.5 font-bold">
                    {[
                      origin ? null : "Origin",
                      employment ? null : "Employment",
                      housing ? null : "Housing",
                      maritalStatus ? null : "Marital Status",
                      hasChildren !== null ? null : "Children",
                    ]
                      .filter(Boolean)
                      .join(", ")}{" "}
                    PENDING
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-700 font-mono mt-1">
                Data persists exclusively in client-side localStorage. No external telemetry.
              </p>
            </div>

            <button
              type="submit"
              disabled={!isFormComplete}
              className={`px-8 py-4 border-4 border-black font-black text-lg uppercase tracking-wider transition-none font-sans cursor-pointer ${
                isFormComplete
                  ? "bg-black text-white hover:bg-yellow-400 hover:text-black"
                  : "bg-gray-200 text-gray-500 border-gray-400 cursor-not-allowed"
              }`}
            >
              GENERATE DEFENSE DOSSIER →
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
