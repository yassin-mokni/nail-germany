"use client";

import React, { useState } from "react";
import { TaskItem } from "@/types";
import { UrgencyBadge } from "./UrgencyBadge";
import { useProfileStore } from "@/store/useProfileStore";

interface TaskCardProps {
  task: TaskItem;
  index: number;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, index }) => {
  const completedTasks = useProfileStore((s) => s.completed_tasks);
  const toggleCompletedTask = useProfileStore((s) => s.toggleCompletedTask);
  const isCompleted = completedTasks.includes(task.id);
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <article
      id={`task-${task.id}`}
      className={`border-4 border-black mb-4 bg-white transition-none ${
        isCompleted ? "bg-gray-50 border-gray-400" : "bg-white"
      }`}
    >
      {/* Top Meta Bar */}
      <div
        className={`px-4 py-2 border-b-2 flex flex-wrap items-center justify-between gap-2 font-mono text-xs ${
          isCompleted ? "bg-gray-200 border-gray-400 text-gray-700" : "bg-gray-100 border-black text-black"
        }`}
      >
        <div className="flex items-center gap-3 flex-wrap">
          <span className="font-bold">TASK #{String(index + 1).padStart(2, "0")}</span>
          <UrgencyBadge urgency={task.urgency} />
          <span className="border border-black px-2 py-0.5 bg-white uppercase text-[11px] font-bold">
            {task.category}
          </span>
        </div>

        {task.legal_ref && (
          <div className="font-bold text-black border border-black px-2 py-0.5 bg-white text-[11px]">
            LAW: {task.legal_ref}
          </div>
        )}
      </div>

      {/* Main Card Body */}
      <div className="p-4 md:p-5">
        <div className="flex items-start gap-4">
          {/* Brutalist Custom Checkbox */}
          <button
            type="button"
            role="checkbox"
            aria-checked={isCompleted}
            onClick={() => toggleCompletedTask(task.id)}
            className={`w-8 h-8 shrink-0 border-2 border-black flex items-center justify-center cursor-pointer select-none font-mono text-base font-black transition-none focus:outline-none focus:ring-2 focus:ring-black ${
              isCompleted ? "bg-black text-white" : "bg-white text-transparent hover:bg-gray-200"
            }`}
            title={isCompleted ? "Mark as pending" : "Mark as completed"}
          >
            {isCompleted ? "✓" : ""}
          </button>

          <div className="flex-1 min-w-0">
            <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2">
              <h3
                onClick={() => toggleCompletedTask(task.id)}
                className={`text-xl md:text-2xl font-black cursor-pointer tracking-tight ${
                  isCompleted ? "line-through text-gray-500" : "text-black"
                }`}
              >
                {task.title}
              </h3>

              {isCompleted ? (
                <span className="font-mono text-xs font-bold px-2 py-0.5 bg-black text-white self-start">
                  [✓ COMPLETED]
                </span>
              ) : (
                task.deadline && (
                  <span className="font-mono text-xs font-bold text-red-700 bg-red-50 border border-red-300 px-2 py-0.5 self-start">
                    ⏱ {task.deadline}
                  </span>
                )
              )}
            </div>

            <p className={`mt-2 text-base leading-relaxed ${isCompleted ? "text-gray-600" : "text-black font-medium"}`}>
              {task.description}
            </p>

            {/* Bureaucracy Trap Warning */}
            {task.trap_warning && (
              <div className="mt-4 border-2 border-black bg-amber-50">
                <div className="bg-black text-amber-300 px-3 py-1.5 font-mono text-xs font-black uppercase tracking-wider flex items-center gap-2 border-b-2 border-black">
                  <span className="bg-amber-400 text-black px-1.5 py-0.5 text-[10px] font-black">
                    ! TRAP
                  </span>
                  <span>WHAT TO WATCH OUT FOR (COMMON TRAP)</span>
                </div>
                <p className="p-3 text-sm font-medium leading-relaxed text-black">
                  {task.trap_warning}
                </p>
              </div>
            )}

            {/* Expandable Protocol Steps */}
            {task.action_steps && task.action_steps.length > 0 && (
              <div className="mt-4 border-t-2 border-black pt-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-black">
                    ACTION STEPS ({task.action_steps.length}):
                  </span>
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="font-mono text-xs text-black underline font-bold cursor-pointer"
                  >
                    {isExpanded ? "[- HIDE STEPS]" : "[+ VIEW STEPS]"}
                  </button>
                </div>

                {isExpanded && (
                  <ol className="list-decimal list-inside space-y-1.5 font-mono text-xs text-black bg-gray-50 p-3 border-2 border-black">
                    {task.action_steps.map((step, idx) => (
                      <li key={idx} className="leading-snug">
                        <span className="font-medium text-black">{step}</span>
                      </li>
                    ))}
                  </ol>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};
