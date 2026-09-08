"use client";

import React, { useState, useMemo } from "react";
import { useFilteredTasks } from "@/hooks/useFilteredTasks";
import { useProfileStore } from "@/store/useProfileStore";
import { ProfileSummary } from "./ProfileSummary";
import { TaskCard } from "./TaskCard";
import { Urgency } from "@/types";

interface DashboardProps {
  onReconfigure: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onReconfigure }) => {
  const {
    filteredTasks,
    categories,
    totalCount,
    completedCount,
    criticalPendingCount,
    progressPercentage,
  } = useFilteredTasks();

  const completedTasks = useProfileStore((s) => s.completed_tasks);
  const markTaskCompleted = useProfileStore((s) => s.markTaskCompleted);

  const [urgencyFilter, setUrgencyFilter] = useState<Urgency | "all">("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [hideCompleted, setHideCompleted] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const displayedTasks = useMemo(() => {
    return filteredTasks.filter((task) => {
      // Urgency filter
      if (urgencyFilter !== "all" && task.urgency !== urgencyFilter) {
        return false;
      }
      // Category filter
      if (categoryFilter !== "all" && task.category !== categoryFilter) {
        return false;
      }
      // Hide completed
      const isCompleted = completedTasks.includes(task.id);
      if (hideCompleted && isCompleted) {
        return false;
      }
      // Search query
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase();
        const matchesTitle = task.title.toLowerCase().includes(query);
        const matchesDesc = task.description.toLowerCase().includes(query);
        const matchesTrap = task.trap_warning?.toLowerCase().includes(query);
        const matchesLaw = task.legal_ref?.toLowerCase().includes(query);
        if (!matchesTitle && !matchesDesc && !matchesTrap && !matchesLaw) {
          return false;
        }
      }
      return true;
    });
  }, [filteredTasks, urgencyFilter, categoryFilter, hideCompleted, searchQuery, completedTasks]);

  // Counts for tabs
  const criticalTotal = filteredTasks.filter((t) => t.urgency === "critical").length;
  const recommendedTotal = filteredTasks.filter((t) => t.urgency === "recommended").length;
  const optionalTotal = filteredTasks.filter((t) => t.urgency === "optional").length;

  const handleToggleAllVisible = () => {
    const allVisibleCompleted = displayedTasks.every((t) => completedTasks.includes(t.id));
    displayedTasks.forEach((t) => {
      markTaskCompleted(t.id, !allVisibleCompleted);
    });
  };

  return (
    <div className="max-w-6xl mx-auto py-6 px-4">
      {/* Active Profile Dossier */}
      <ProfileSummary onEdit={onReconfigure} />

      {/* Critical Alarm Alert if there are uncompleted critical tasks */}
      {criticalPendingCount > 0 && (
        <div className="border-4 border-black bg-red-600 text-white p-4 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono">
            <div className="flex items-center gap-3">
              <span className="text-2xl font-black bg-black text-white px-2 py-0.5">!</span>
              <div>
                <span className="font-black text-sm uppercase tracking-wider block">
                  CRITICAL STATUTORY DEADLINES PENDING
                </span>
                <span className="text-xs text-red-100 font-bold">
                  You have {criticalPendingCount} mandatory obligation(s) pending with statutory fines or visa invalidation risks.
                </span>
              </div>
            </div>
            <button
              onClick={() => {
                setUrgencyFilter("critical");
                setHideCompleted(true);
              }}
              className="bg-white text-black font-black text-xs px-4 py-2 border-2 border-black hover:bg-black hover:text-white cursor-pointer uppercase transition-none self-start sm:self-auto"
            >
              FOCUS CRITICAL [{criticalPendingCount}]
            </button>
          </div>
        </div>
      )}

      {/* Executive Progress & Metrics Panel */}
      <div className="border-4 border-black bg-white p-5 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b-2 border-black">
          <div>
            <span className="font-mono text-xs font-bold text-gray-700 uppercase tracking-widest block">
              STATUS & PROGRESS
            </span>
            <h2 className="text-2xl md:text-3xl font-black uppercase text-black font-sans">
              Expat Survival Checklist
            </h2>
          </div>

          {/* Key Metric Blocks */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-center">
            <div className="border-2 border-black p-2 bg-gray-50">
              <span className="text-[10px] text-gray-700 block uppercase font-bold">TOTAL APPLICABLE</span>
              <span className="text-2xl font-black text-black">{totalCount}</span>
            </div>
            <div className="border-2 border-black p-2 bg-gray-50">
              <span className="text-[10px] text-gray-700 block uppercase font-bold">SECURED</span>
              <span className="text-2xl font-black text-black">{completedCount}</span>
            </div>
            <div className={`border-2 border-black p-2 ${criticalPendingCount > 0 ? "bg-red-100" : "bg-gray-50"}`}>
              <span className="text-[10px] text-gray-700 block uppercase font-bold">CRITICAL PENDING</span>
              <span className={`text-2xl font-black ${criticalPendingCount > 0 ? "text-red-700" : "text-black"}`}>
                {criticalPendingCount}
              </span>
            </div>
            <div className="border-2 border-black p-2 bg-yellow-400">
              <span className="text-[10px] text-black block uppercase font-bold">COMPLETION</span>
              <span className="text-2xl font-black text-black">{progressPercentage}%</span>
            </div>
          </div>
        </div>

        {/* Utilitarian Progress Bar */}
        <div className="mt-4">
          <div className="flex justify-between font-mono text-xs font-bold mb-1">
            <span>PROGRESS: {completedCount} OF {totalCount} TASKS COMPLETED</span>
            <span>{progressPercentage}%</span>
          </div>
          <div className="h-6 w-full border-2 border-black bg-gray-200 p-0.5">
            <div
              className="h-full bg-black transition-none"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Filter & Control Bar */}
      <div className="border-4 border-black bg-white p-4 mb-6 no-print">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Urgency Filter Tabs */}
          <div className="flex flex-wrap gap-1.5 font-mono text-xs">
            <button
              onClick={() => setUrgencyFilter("all")}
              className={`px-3 py-1.5 border-2 border-black font-bold cursor-pointer transition-none ${
                urgencyFilter === "all" ? "bg-black text-white" : "bg-white text-black hover:bg-gray-100"
              }`}
            >
              ALL TASKS ({totalCount})
            </button>
            <button
              onClick={() => setUrgencyFilter("critical")}
              className={`px-3 py-1.5 border-2 border-black font-bold cursor-pointer transition-none ${
                urgencyFilter === "critical"
                  ? "bg-red-600 text-white"
                  : "bg-white text-black hover:bg-red-50"
              }`}
            >
              CRITICAL ({criticalTotal})
            </button>
            <button
              onClick={() => setUrgencyFilter("recommended")}
              className={`px-3 py-1.5 border-2 border-black font-bold cursor-pointer transition-none ${
                urgencyFilter === "recommended"
                  ? "bg-yellow-400 text-black font-black"
                  : "bg-white text-black hover:bg-yellow-50"
              }`}
            >
              RECOMMENDED ({recommendedTotal})
            </button>
            <button
              onClick={() => setUrgencyFilter("optional")}
              className={`px-3 py-1.5 border-2 border-black font-bold cursor-pointer transition-none ${
                urgencyFilter === "optional"
                  ? "bg-gray-400 text-black"
                  : "bg-white text-black hover:bg-gray-100"
              }`}
            >
              OPTIONAL ({optionalTotal})
            </button>
          </div>

          {/* Search Input */}
          <div className="flex items-center gap-2">
            <label htmlFor="search-input" className="font-mono text-xs font-bold uppercase shrink-0">
              SEARCH:
            </label>
            <input
              id="search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search laws, traps, keywords..."
              className="border-2 border-black font-mono text-xs px-3 py-1.5 w-full sm:w-64 focus:outline-none focus:bg-yellow-50"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="border-2 border-black px-2 py-1 font-mono text-xs bg-gray-200 hover:bg-black hover:text-white"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Secondary Filters: Category & Completed Toggle */}
        <div className="mt-4 pt-3 border-t-2 border-black flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold uppercase text-gray-700">CATEGORY:</span>
            <button
              onClick={() => setCategoryFilter("all")}
              className={`px-2 py-1 border border-black ${
                categoryFilter === "all" ? "bg-black text-white font-bold" : "bg-white text-black hover:bg-gray-100"
              }`}
            >
              ALL
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-2 py-1 border border-black ${
                  categoryFilter === cat ? "bg-black text-white font-bold" : "bg-white text-black hover:bg-gray-100"
                }`}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 cursor-pointer select-none font-bold">
              <input
                type="checkbox"
                checked={hideCompleted}
                onChange={(e) => setHideCompleted(e.target.checked)}
                className="w-4 h-4 border-2 border-black accent-black rounded-none cursor-pointer"
              />
              <span>HIDE COMPLETED ({completedCount})</span>
            </label>

            {displayedTasks.length > 0 && (
              <button
                onClick={handleToggleAllVisible}
                className="border border-black px-2 py-1 bg-gray-100 hover:bg-black hover:text-white font-bold cursor-pointer"
              >
                [TOGGLE ALL VISIBLE]
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Task List Header */}
      <div className="flex items-center justify-between mb-3 px-1 font-mono text-xs font-bold text-gray-700 uppercase">
        <span>SHOWING {displayedTasks.length} OF {totalCount} RELEVANT TASKS</span>
      </div>

      {/* Task Items */}
      {displayedTasks.length === 0 ? (
        <div className="border-4 border-black bg-white p-8 text-center">
          <div className="font-mono text-lg font-bold text-black uppercase mb-2">
            [!] NO TASKS MATCH CURRENT FILTERS
          </div>
          <p className="text-sm font-medium text-gray-700 mb-4 max-w-md mx-auto">
            Try clearing search queries or switching urgency/category filters.
          </p>
          <button
            onClick={() => {
              setUrgencyFilter("all");
              setCategoryFilter("all");
              setHideCompleted(false);
              setSearchQuery("");
            }}
            className="px-4 py-2 border-2 border-black bg-black text-white font-mono text-xs font-bold uppercase hover:bg-yellow-400 hover:text-black cursor-pointer"
          >
            [RESET ALL FILTERS]
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {displayedTasks.map((task, index) => (
            <TaskCard key={task.id} task={task} index={index} />
          ))}
        </div>
      )}

      {/* Utilitarian Footer Legal Disclaimer */}
      <footer className="mt-12 border-t-4 border-black pt-6 pb-12 font-mono text-xs text-gray-600">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div>
            <span className="font-bold text-black block mb-1">
              NAIL GERMANY // BUNDESREPUBLIK EXPAT SURVIVAL PROTOCOL
            </span>
            <p className="text-[11px] leading-relaxed max-w-xl text-gray-700">
              Disclaimer: This application is a self-defense informational checklist compiled from public German statutes (BGB, BMG, AufenthG, EStG). It does not constitute formal legal counsel. For representation in court or formal landlord disputes, consult your local Mieterverein or an accredited Fachanwalt für Mietrecht / Arbeitsrecht.
            </p>
          </div>
          <div className="text-right text-[11px] space-y-1 text-gray-700">
            <div className="text-black font-bold">100% PRIVATE & LOCAL</div>
            <div>Data stays in your browser.</div>
            <div>No tracking or accounts.</div>
          </div>
        </div>
      </footer>
    </div>
  );
};
