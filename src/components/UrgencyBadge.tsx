import React from "react";
import { Urgency } from "@/types";

interface UrgencyBadgeProps {
  urgency: Urgency;
  className?: string;
}

export const UrgencyBadge: React.FC<UrgencyBadgeProps> = ({ urgency, className = "" }) => {
  switch (urgency) {
    case "critical":
      return (
        <span
          className={`bg-black text-white font-mono uppercase font-bold text-xs px-2.5 py-1 tracking-wider border-2 border-black inline-flex items-center gap-1.5 rounded-none select-none ${className}`}
        >
          <span className="inline-block w-2 h-2 bg-amber-400" />
          TIME-SENSITIVE
        </span>
      );
    case "recommended":
      return (
        <span
          className={`bg-yellow-400 text-black font-mono uppercase font-bold text-xs px-2.5 py-1 tracking-wider border-2 border-black inline-flex items-center gap-1 rounded-none select-none ${className}`}
        >
          <span className="inline-block w-2 h-2 bg-black" />
          RECOMMENDED
        </span>
      );
    case "optional":
    default:
      return (
        <span
          className={`bg-gray-200 text-black font-mono uppercase font-bold text-xs px-2.5 py-1 tracking-wider border-2 border-black inline-flex items-center gap-1 rounded-none select-none ${className}`}
        >
          <span className="inline-block w-2 h-2 bg-gray-600" />
          OPTIONAL / INFORMATIONAL
        </span>
      );
  }
};
