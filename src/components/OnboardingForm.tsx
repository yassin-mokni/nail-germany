"use client";

import React, { useState } from "react";
import { Origin, Employment, Housing, MaritalStatus, Bundesland } from "@/types";
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
  const storeState = useProfileStore((s) => s.state);
  const setProfile = useProfileStore((s) => s.setProfile);

  const [origin, setOrigin] = useState<Origin | null>(storeOrigin);
  const [employment, setEmployment] = useState<Employment | null>(storeEmployment);
  const [housing, setHousing] = useState<Housing | null>(storeHousing);
  const [maritalStatus, setMaritalStatus] = useState<MaritalStatus | null>(storeMarital);
  const [hasChildren, setHasChildren] = useState<boolean | null>(storeChildren);
  const [state, setState] = useState<Bundesland | null>(storeState);

  const isFormComplete =
    origin !== null &&
    employment !== null &&
    housing !== null &&
    maritalStatus !== null &&
    hasChildren !== null &&
    state !== null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormComplete) return;

    setProfile({
      origin,
      employment,
      housing,
      marital_status: maritalStatus,
      has_children: hasChildren,
      state,
      is_configured: true,
    });
    onComplete();
  };

  const scrollToQuestion = (questionNumber: number) => {
    if (typeof document !== "undefined") {
      const el = document.getElementById(`question-${questionNumber}`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  };

  const applyPreset = (preset: {
    origin: Origin;
    employment: Employment;
    housing: Housing;
    marital_status: MaritalStatus;
    has_children: boolean;
    state: Bundesland;
  }) => {
    setOrigin(preset.origin);
    setEmployment(preset.employment);
    setHousing(preset.housing);
    setMaritalStatus(preset.marital_status);
    setHasChildren(preset.has_children);
    setState(preset.state);
    setTimeout(() => {
      document.getElementById("submit-card")?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 150);
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      {/* Official Intake Header */}
      <div className="border-4 border-black bg-white p-6 mb-8">
        <div className="font-mono text-xs font-bold text-gray-700 uppercase tracking-widest mb-1 flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-black" />
          <span>SET UP YOUR PROFILE</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-black uppercase text-black tracking-tight font-sans">
          Customize Your Checklist
        </h2>
        <p className="mt-2 text-base font-medium text-black max-w-2xl leading-relaxed">
          German rules, taxes, and deadlines vary depending on your citizenship, job, housing, and federal state.
          Answer these 6 quick questions so we only show the steps that actually apply to you.
        </p>

        {/* Quick Testing Presets */}
        <div className="mt-5 pt-4 border-t-2 border-black no-print">
          <div className="font-mono text-xs font-bold uppercase text-black mb-2">
            [QUICK TEST PROFILES]:
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
                  state: "bayern",
                })
              }
              className="font-mono text-xs font-bold px-3 py-1.5 border-2 border-black bg-yellow-400 hover:bg-black hover:text-white cursor-pointer"
            >
              Married Non-EU Employee in Bavaria (with kids)
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
                  state: "berlin",
                })
              }
              className="font-mono text-xs font-bold px-3 py-1.5 border-2 border-black bg-gray-200 hover:bg-black hover:text-white cursor-pointer"
            >
              Single Non-EU Student in Berlin WG
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
                  state: "nordrhein-westfalen",
                })
              }
              className="font-mono text-xs font-bold px-3 py-1.5 border-2 border-black bg-gray-200 hover:bg-black hover:text-white cursor-pointer"
            >
              EU Freelancer in NRW
            </button>
          </div>
        </div>
      </div>

      {/* 6-Question Form with Sticky Sidebar on Desktop */}
      <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Left Column: Question Sections */}
        <div className="flex-1 min-w-0 space-y-6 w-full">
        {/* Question 1: Citizenship */}
        <div id="question-1" className="border-4 border-black bg-white p-5 scroll-mt-6">
          <div className="flex items-center justify-between mb-3 border-b-2 border-black pb-2">
            <span className="font-mono text-xs font-black uppercase tracking-widest text-black">
              QUESTION 01 OF 06 // CITIZENSHIP
            </span>
            {origin ? (
              <span className="font-mono text-xs font-bold bg-black text-white px-2 py-0.5">[ANSWERED]</span>
            ) : (
              <span className="font-mono text-xs font-bold bg-gray-200 text-gray-800 border border-black px-2 py-0.5">[PENDING]</span>
            )}
          </div>
          <h3 className="text-xl font-black text-black uppercase mb-1">Where is your passport / citizenship from?</h3>
          <p className="text-sm text-gray-700 font-medium mb-4">
            EU citizens have the right to live and work in Germany without a visa (§ 2 FreizügG/EU). Non-EU citizens need a valid residence permit and work authorization.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => {
                setOrigin("eu");
                setTimeout(() => scrollToQuestion(2), 150);
              }}
              className={`p-4 border-2 border-black text-left font-sans cursor-pointer transition-none ${
                origin === "eu"
                  ? "bg-black text-white"
                  : "bg-white text-black hover:bg-gray-100"
              }`}
            >
              <div className="font-black text-lg">EU / EEA Citizen</div>
              <div className={`text-xs mt-1 font-mono ${origin === "eu" ? "text-gray-300" : "text-gray-600"}`}>
                Unrestricted residence and work rights. No visa or immigration office appointment needed.
              </div>
            </button>

            <button
              type="button"
              onClick={() => {
                setOrigin("non-eu");
                setTimeout(() => scrollToQuestion(2), 150);
              }}
              className={`p-4 border-2 border-black text-left font-sans cursor-pointer transition-none ${
                origin === "non-eu"
                  ? "bg-black text-white"
                  : "bg-white text-black hover:bg-gray-100"
              }`}
            >
              <div className="font-black text-lg">Non-EU Citizen (Third Country)</div>
              <div className={`text-xs mt-1 font-mono ${origin === "non-eu" ? "text-gray-300" : "text-gray-600"}`}>
                Subject to residence permits, visa conversions, Blue Card rules, and immigration appointments.
              </div>
            </button>
          </div>
        </div>

        {/* Question 2: Employment */}
        <div id="question-2" className="border-4 border-black bg-white p-5 scroll-mt-6">
          <div className="flex items-center justify-between mb-3 border-b-2 border-black pb-2">
            <span className="font-mono text-xs font-black uppercase tracking-widest text-black">
              QUESTION 02 OF 06 // EMPLOYMENT TYPE
            </span>
            {employment ? (
              <span className="font-mono text-xs font-bold bg-black text-white px-2 py-0.5">[ANSWERED]</span>
            ) : (
              <span className="font-mono text-xs font-bold bg-gray-200 text-gray-800 border border-black px-2 py-0.5">[PENDING]</span>
            )}
          </div>
          <h3 className="text-xl font-black text-black uppercase mb-1">What is your employment structure in Germany?</h3>
          <p className="text-sm text-gray-700 font-medium mb-4">
            Determines how your taxes and social contributions are paid, and what registrations you need with the tax office.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              type="button"
              onClick={() => {
                setEmployment("employed");
                setTimeout(() => scrollToQuestion(3), 150);
              }}
              className={`p-4 border-2 border-black text-left font-sans cursor-pointer transition-none ${
                employment === "employed"
                  ? "bg-black text-white"
                  : "bg-white text-black hover:bg-gray-100"
              }`}
            >
              <div className="font-black text-lg">Employed (Angestellt)</div>
              <div className={`text-xs mt-1 font-mono ${employment === "employed" ? "text-gray-300" : "text-gray-600"}`}>
                Standard employment contract. Health and pension contributions are deducted automatically.
              </div>
            </button>

            <button
              type="button"
              onClick={() => {
                setEmployment("freelance");
                setTimeout(() => scrollToQuestion(3), 150);
              }}
              className={`p-4 border-2 border-black text-left font-sans cursor-pointer transition-none ${
                employment === "freelance"
                  ? "bg-black text-white"
                  : "bg-white text-black hover:bg-gray-100"
              }`}
            >
              <div className="font-black text-lg">Freelancer / Self-Employed</div>
              <div className={`text-xs mt-1 font-mono ${employment === "freelance" ? "text-gray-300" : "text-gray-600"}`}>
                Direct invoice billing. Requires an ELSTER tax registration and freelance tax number.
              </div>
            </button>

            <button
              type="button"
              onClick={() => {
                setEmployment("student");
                setTimeout(() => scrollToQuestion(3), 150);
              }}
              className={`p-4 border-2 border-black text-left font-sans cursor-pointer transition-none ${
                employment === "student"
                  ? "bg-black text-white"
                  : "bg-white text-black hover:bg-gray-100"
              }`}
            >
              <div className="font-black text-lg">University Student</div>
              <div className={`text-xs mt-1 font-mono ${employment === "student" ? "text-gray-300" : "text-gray-600"}`}>
                Subject to work limits (140 full days/year), blocked accounts, and student health rates.
              </div>
            </button>
          </div>
        </div>

        {/* Question 3: Housing */}
        <div id="question-3" className="border-4 border-black bg-white p-5 scroll-mt-6">
          <div className="flex items-center justify-between mb-3 border-b-2 border-black pb-2">
            <span className="font-mono text-xs font-black uppercase tracking-widest text-black">
              QUESTION 03 OF 06 // HOUSING TYPE
            </span>
            {housing ? (
              <span className="font-mono text-xs font-bold bg-black text-white px-2 py-0.5">[ANSWERED]</span>
            ) : (
              <span className="font-mono text-xs font-bold bg-gray-200 text-gray-800 border border-black px-2 py-0.5">[PENDING]</span>
            )}
          </div>
          <h3 className="text-xl font-black text-black uppercase mb-1">What is your housing arrangement?</h3>
          <p className="text-sm text-gray-700 font-medium mb-4">
            Determines your rental deposit rights and how you handle the monthly TV and radio fee (Rundfunkbeitrag).
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => {
                setHousing("own_apartment");
                setTimeout(() => scrollToQuestion(4), 150);
              }}
              className={`p-4 border-2 border-black text-left font-sans cursor-pointer transition-none ${
                housing === "own_apartment"
                  ? "bg-black text-white"
                  : "bg-white text-black hover:bg-gray-100"
              }`}
            >
              <div className="font-black text-lg">Own Apartment (Hauptmieter)</div>
              <div className={`text-xs mt-1 font-mono ${housing === "own_apartment" ? "text-gray-300" : "text-gray-600"}`}>
                Direct lease with landlord. Responsible for the full 18.36 EUR/month TV and radio fee.
              </div>
            </button>

            <button
              type="button"
              onClick={() => {
                setHousing("wg");
                setTimeout(() => scrollToQuestion(4), 150);
              }}
              className={`p-4 border-2 border-black text-left font-sans cursor-pointer transition-none ${
                housing === "wg"
                  ? "bg-black text-white"
                  : "bg-white text-black hover:bg-gray-100"
              }`}
            >
              <div className="font-black text-lg">WG / Flatshare (Untermieter)</div>
              <div className={`text-xs mt-1 font-mono ${housing === "wg" ? "text-gray-300" : "text-gray-600"}`}>
                Room in a shared flat. Coordinate the radio fee with flatmates to avoid being billed twice.
              </div>
            </button>
          </div>
        </div>

        {/* Question 4: Marital Status */}
        <div id="question-4" className="border-4 border-black bg-white p-5 scroll-mt-6">
          <div className="flex items-center justify-between mb-3 border-b-2 border-black pb-2">
            <span className="font-mono text-xs font-black uppercase tracking-widest text-black">
              QUESTION 04 OF 06 // MARITAL STATUS
            </span>
            {maritalStatus ? (
              <span className="font-mono text-xs font-bold bg-black text-white px-2 py-0.5">[ANSWERED]</span>
            ) : (
              <span className="font-mono text-xs font-bold bg-gray-200 text-gray-800 border border-black px-2 py-0.5">[PENDING]</span>
            )}
          </div>
          <h3 className="text-xl font-black text-black uppercase mb-1">What is your legal marital status?</h3>
          <p className="text-sm text-gray-700 font-medium mb-4">
            Married couples can adjust tax classes (such as III and V) to optimize monthly take-home pay.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => {
                setMaritalStatus("single");
                setTimeout(() => scrollToQuestion(5), 150);
              }}
              className={`p-4 border-2 border-black text-left font-sans cursor-pointer transition-none ${
                maritalStatus === "single"
                  ? "bg-black text-white"
                  : "bg-white text-black hover:bg-gray-100"
              }`}
            >
              <div className="font-black text-lg">Single / Unmarried</div>
              <div className={`text-xs mt-1 font-mono ${maritalStatus === "single" ? "text-gray-300" : "text-gray-600"}`}>
                Assigned Tax Class 1 automatically.
              </div>
            </button>

            <button
              type="button"
              onClick={() => {
                setMaritalStatus("married");
                setTimeout(() => scrollToQuestion(5), 150);
              }}
              className={`p-4 border-2 border-black text-left font-sans cursor-pointer transition-none ${
                maritalStatus === "married"
                  ? "bg-black text-white"
                  : "bg-white text-black hover:bg-gray-100"
              }`}
            >
              <div className="font-black text-lg">Married / Civil Partnership</div>
              <div className={`text-xs mt-1 font-mono ${maritalStatus === "married" ? "text-gray-300" : "text-gray-600"}`}>
                Eligible for joint tax assessment and tax class optimization.
              </div>
            </button>
          </div>
        </div>

        {/* Question 5: Children */}
        <div id="question-5" className="border-4 border-black bg-white p-5 scroll-mt-6">
          <div className="flex items-center justify-between mb-3 border-b-2 border-black pb-2">
            <span className="font-mono text-xs font-black uppercase tracking-widest text-black">
              QUESTION 05 OF 06 // CHILDREN
            </span>
            {hasChildren !== null ? (
              <span className="font-mono text-xs font-bold bg-black text-white px-2 py-0.5">[ANSWERED]</span>
            ) : (
              <span className="font-mono text-xs font-bold bg-gray-200 text-gray-800 border border-black px-2 py-0.5">[PENDING]</span>
            )}
          </div>
          <h3 className="text-xl font-black text-black uppercase mb-1">Do you have dependent children?</h3>
          <p className="text-sm text-gray-700 font-medium mb-4">
            Determines whether you should apply for state child benefits (Kindergeld, 250 EUR per month per child) and daycare support.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => {
                setHasChildren(true);
                setTimeout(() => scrollToQuestion(6), 150);
              }}
              className={`p-4 border-2 border-black text-left font-sans cursor-pointer transition-none ${
                hasChildren === true
                  ? "bg-black text-white"
                  : "bg-white text-black hover:bg-gray-100"
              }`}
            >
              <div className="font-black text-lg">Yes, I Have Children</div>
              <div className={`text-xs mt-1 font-mono ${hasChildren === true ? "text-gray-300" : "text-gray-600"}`}>
                Shows child benefit applications (Kindergeld, Elterngeld) and childcare support.
              </div>
            </button>

            <button
              type="button"
              onClick={() => {
                setHasChildren(false);
                setTimeout(() => scrollToQuestion(6), 150);
              }}
              className={`p-4 border-2 border-black text-left font-sans cursor-pointer transition-none ${
                hasChildren === false
                  ? "bg-black text-white"
                  : "bg-white text-black hover:bg-gray-100"
              }`}
            >
              <div className="font-black text-lg">No Children</div>
              <div className={`text-xs mt-1 font-mono ${hasChildren === false ? "text-gray-300" : "text-gray-600"}`}>
                Hides all child-related applications.
              </div>
            </button>
          </div>
        </div>

        {/* Question 6: Bundesland */}
        <div id="question-6" className="border-4 border-black bg-white p-5 scroll-mt-6">
          <div className="flex items-center justify-between mb-3 border-b-2 border-black pb-2">
            <span className="font-mono text-xs font-black uppercase tracking-widest text-black">
              QUESTION 06 OF 06 // FEDERAL STATE (BUNDESLAND)
            </span>
            {state ? (
              <span className="font-mono text-xs font-bold bg-black text-white px-2 py-0.5">[ANSWERED]</span>
            ) : (
              <span className="font-mono text-xs font-bold bg-gray-200 text-gray-800 border border-black px-2 py-0.5">[PENDING]</span>
            )}
          </div>
          <h3 className="text-xl font-black text-black uppercase mb-1">In which German federal state (Bundesland) do you reside?</h3>
          <p className="text-sm text-gray-700 font-medium mb-4">
            Church tax rates (8% in Bavaria and Baden-Württemberg vs 9% elsewhere) and daycare voucher rules differ by state.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { id: "bayern" as Bundesland, label: "Bayern (Bavaria)", note: "Munich, Nuremberg • 8% Church Tax" },
              { id: "berlin" as Bundesland, label: "Berlin", note: "Capital • Free Kita Voucher System" },
              { id: "nordrhein-westfalen" as Bundesland, label: "Nordrhein-Westfalen", note: "Cologne, Düsseldorf • 9% Church Tax" },
              { id: "baden-wuerttemberg" as Bundesland, label: "Baden-Württemberg", note: "Stuttgart • 8% Church Tax" },
              { id: "hessen" as Bundesland, label: "Hessen", note: "Frankfurt, Wiesbaden • Free Kita from age 3" },
              { id: "hamburg" as Bundesland, label: "Hamburg", note: "Free Kita Voucher System" },
              { id: "sachsen" as Bundesland, label: "Sachsen (Saxony)", note: "Leipzig, Dresden • State Erziehungsgeld" },
              { id: "other" as Bundesland, label: "Other Bundesland", note: "Niedersachsen, Bremen, RLP, etc." },
            ].map((st) => (
              <button
                key={st.id}
                type="button"
                onClick={() => {
                  setState(st.id);
                  setTimeout(() => {
                    document.getElementById("submit-card")?.scrollIntoView({ behavior: "smooth", block: "center" });
                  }, 150);
                }}
                className={`p-3 border-2 border-black text-left font-sans cursor-pointer transition-none ${
                  state === st.id ? "bg-black text-white" : "bg-white text-black hover:bg-gray-100"
                }`}
              >
                <div className="font-black text-sm">{st.label}</div>
                <div className={`text-[11px] mt-1 font-mono leading-tight ${state === st.id ? "text-gray-300" : "text-gray-600"}`}>
                  {st.note}
                </div>
              </button>
            ))}
          </div>
        </div>
        </div>

        {/* Right Column: Sticky Status & Submission Sidebar */}
        <aside id="submit-card" className="w-full lg:w-80 xl:w-96 shrink-0 lg:sticky lg:top-6 space-y-4 scroll-mt-6">
          <div className="border-4 border-black bg-white p-5">
            <div className="border-b-2 border-black pb-3 mb-4">
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="font-mono text-xs font-black uppercase tracking-wider text-black">
                  PROFILE STATUS
                </span>
                {isFormComplete ? (
                  <span className="font-mono text-xs font-bold bg-black text-white px-2 py-0.5">
                    [6 / 6 READY]
                  </span>
                ) : (
                  <span className="font-mono text-xs font-bold bg-gray-200 text-gray-800 border border-black px-2 py-0.5">
                    {[origin, employment, housing, maritalStatus, hasChildren !== null, state].filter(Boolean).length} / 6 ANSWERED
                  </span>
                )}
              </div>
              <h3 className="text-lg font-black uppercase text-black font-sans">
                Progress
              </h3>
            </div>

            {/* Checklist items */}
            <div className="space-y-2 font-mono text-xs mb-5">
              {[
                { label: "1. Citizenship", val: origin ? origin.toUpperCase() : null },
                { label: "2. Employment", val: employment ? employment.toUpperCase() : null },
                { label: "3. Housing", val: housing ? (housing === "own_apartment" ? "APARTMENT" : "WG") : null },
                { label: "4. Marital Status", val: maritalStatus ? maritalStatus.toUpperCase() : null },
                { label: "5. Dependents", val: hasChildren !== null ? (hasChildren ? "CHILDREN: YES" : "NO CHILDREN") : null },
                { label: "6. Jurisdiction", val: state ? state.toUpperCase() : null },
              ].map((item, idx) => (
                <button
                  type="button"
                  key={idx}
                  onClick={() => scrollToQuestion(idx + 1)}
                  className={`w-full text-left p-2 border flex items-center justify-between gap-2 cursor-pointer transition-none ${
                    item.val
                      ? "border-black bg-gray-50 text-black font-bold hover:bg-yellow-100"
                      : "border-gray-400 bg-white text-gray-700 hover:border-black hover:bg-gray-50"
                  }`}
                  title={`Jump to Question ${idx + 1}`}
                >
                  <span className="truncate">{item.label}</span>
                  <span
                    className={`shrink-0 px-1.5 py-0.5 text-[10px] font-bold ${
                      item.val ? "bg-black text-white" : "bg-gray-200 text-gray-800 border border-gray-400"
                    }`}
                  >
                    {item.val ? `✓ ${item.val}` : "PENDING"}
                  </span>
                </button>
              ))}
            </div>

            <button
              type="submit"
              disabled={!isFormComplete}
              className={`w-full py-3.5 border-4 border-black font-black text-base uppercase tracking-wider transition-none font-sans ${
                isFormComplete
                  ? "bg-black text-white hover:bg-yellow-400 hover:text-black cursor-pointer"
                  : "bg-gray-200 text-gray-500 border-gray-400 cursor-not-allowed"
              }`}
            >
              VIEW YOUR CHECKLIST →
            </button>

            <p className="text-[11px] text-gray-600 font-mono text-center mt-3 leading-tight">
              100% private. Data stays locally in your browser storage.
            </p>
          </div>
        </aside>
      </form>
    </div>
  );
};
