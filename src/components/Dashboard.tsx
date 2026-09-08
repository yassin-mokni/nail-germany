"use client";

import React, { useState, useMemo, useEffect } from "react";
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
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    if (typeof document !== "undefined") {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

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

      {/* Time-Sensitive Administrative Directive */}
      {criticalPendingCount > 0 && (
        <div className="border-2 border-black bg-white text-black p-4 mb-6 border-l-8 border-l-black">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-black text-white px-2 py-0.5 text-xs font-bold uppercase tracking-wider">
                  OFFICIAL NOTICE
                </span>
                <span className="text-xs font-bold text-black uppercase tracking-wider">
                  {"//"} {criticalPendingCount} TIME-SENSITIVE TASK{criticalPendingCount > 1 ? "S" : ""}
                </span>
              </div>
              <p className="text-xs text-gray-700 font-sans font-medium">
                {criticalPendingCount} pending task{criticalPendingCount > 1 ? "s have" : " has"} statutory deadlines (such as registration within 14 days of move-in). Prioritize {criticalPendingCount > 1 ? "these" : "this"} to stay compliant.
              </p>
            </div>
            <button
              onClick={() => {
                setUrgencyFilter("critical");
                setHideCompleted(true);
                scrollToSection("tasks-section");
              }}
              className="bg-white text-black hover:bg-black hover:text-white font-mono font-bold text-xs px-3.5 py-2 border-2 border-black cursor-pointer uppercase transition-none self-start sm:self-auto shrink-0"
            >
              [FILTER TIME-SENSITIVE ({criticalPendingCount})]
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
              German Bureaucracy Checklist
            </h2>
          </div>

          {/* Key Metric Blocks */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-center">
            <button
              type="button"
              onClick={() => {
                setUrgencyFilter("all");
                setCategoryFilter("all");
                scrollToSection("tasks-section");
              }}
              className="border-2 border-black p-2 bg-gray-50 hover:bg-black hover:text-white cursor-pointer transition-none text-center"
              title="Show all applicable tasks"
            >
              <span className="text-[10px] block uppercase font-bold opacity-80">TOTAL APPLICABLE</span>
              <span className="text-2xl font-black">{totalCount}</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setHideCompleted(false);
                scrollToSection("tasks-section");
              }}
              className="border-2 border-black p-2 bg-gray-50 hover:bg-black hover:text-white cursor-pointer transition-none text-center"
              title="Show completed tasks"
            >
              <span className="text-[10px] block uppercase font-bold opacity-80">COMPLETED</span>
              <span className="text-2xl font-black">{completedCount}</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setUrgencyFilter("critical");
                setHideCompleted(true);
                scrollToSection("tasks-section");
              }}
              className={`border-2 border-black p-2 cursor-pointer transition-none text-center ${
                criticalPendingCount > 0 ? "bg-amber-50 hover:bg-black hover:text-white" : "bg-gray-50 hover:bg-black hover:text-white"
              }`}
              title="Filter to time-sensitive tasks"
            >
              <span className="text-[10px] block uppercase font-bold opacity-80">TIME-SENSITIVE</span>
              <span className="text-2xl font-black">
                {criticalPendingCount}
              </span>
            </button>
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
      <div id="tasks-section" className="border-4 border-black bg-white p-4 mb-6 scroll-mt-4 no-print">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Urgency Filter Tabs */}
          <div className="flex flex-wrap gap-1.5 font-mono text-xs">
            <button
              onClick={() => {
                setUrgencyFilter("all");
                scrollToSection("tasks-section");
              }}
              className={`px-3 py-1.5 border-2 border-black font-bold cursor-pointer transition-none ${
                urgencyFilter === "all" ? "bg-black text-white" : "bg-white text-black hover:bg-gray-100"
              }`}
            >
              ALL TASKS ({totalCount})
            </button>
            <button
              onClick={() => {
                setUrgencyFilter("critical");
                scrollToSection("tasks-section");
              }}
              className={`px-3 py-1.5 border-2 border-black font-bold cursor-pointer transition-none ${
                urgencyFilter === "critical"
                  ? "bg-black text-white"
                  : "bg-white text-black hover:bg-amber-50"
              }`}
            >
              TIME-SENSITIVE ({criticalTotal})
            </button>
            <button
              onClick={() => {
                setUrgencyFilter("recommended");
                scrollToSection("tasks-section");
              }}
              className={`px-3 py-1.5 border-2 border-black font-bold cursor-pointer transition-none ${
                urgencyFilter === "recommended"
                  ? "bg-yellow-400 text-black font-black"
                  : "bg-white text-black hover:bg-yellow-50"
              }`}
            >
              RECOMMENDED ({recommendedTotal})
            </button>
            <button
              onClick={() => {
                setUrgencyFilter("optional");
                scrollToSection("tasks-section");
              }}
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
          <div className="flex items-center gap-2 w-full md:w-auto">
            <label htmlFor="search-input" className="font-mono text-xs font-bold uppercase shrink-0">
              SEARCH:
            </label>
            <input
              id="search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search laws, traps, keywords..."
              className="border-2 border-black font-mono text-xs px-3 py-1.5 flex-1 min-w-0 md:w-64 focus:outline-none focus:bg-yellow-50"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="border-2 border-black px-2 py-1 font-mono text-xs bg-gray-200 hover:bg-black hover:text-white cursor-pointer shrink-0"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Secondary Filters: Category & Completed Toggle */}
        <div className="mt-4 pt-3 border-t-2 border-black flex flex-col md:flex-row md:items-center justify-between gap-3 font-mono text-xs">
          <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
            <span className="font-bold uppercase text-gray-700">CATEGORY:</span>
            <button
              onClick={() => {
                setCategoryFilter("all");
                scrollToSection("tasks-section");
              }}
              className={`px-2 py-1 border border-black cursor-pointer ${
                categoryFilter === "all" ? "bg-black text-white font-bold" : "bg-white text-black hover:bg-gray-100"
              }`}
            >
              ALL
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setCategoryFilter(cat);
                  scrollToSection("tasks-section");
                }}
                className={`px-2 py-1 border border-black cursor-pointer ${
                  categoryFilter === cat ? "bg-black text-white font-bold" : "bg-white text-black hover:bg-gray-100"
                }`}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-between sm:justify-start gap-3 pt-2 md:pt-0 border-t border-gray-200 md:border-t-0">
            <label className="flex items-center gap-2 cursor-pointer select-none font-bold">
              <input
                type="checkbox"
                checked={hideCompleted}
                onChange={(e) => {
                  setHideCompleted(e.target.checked);
                  scrollToSection("tasks-section");
                }}
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
              scrollToSection("tasks-section");
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


      {/* Floating Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-40 bg-black text-white font-mono text-xs font-bold px-3 py-2 border-2 border-black hover:bg-yellow-400 hover:text-black shadow-lg uppercase transition-none cursor-pointer flex items-center gap-1.5"
          title="Return to top metrics and filters"
        >
          <span>↑</span>
          <span>TOP</span>
        </button>
      )}
    </div>
  );
};
