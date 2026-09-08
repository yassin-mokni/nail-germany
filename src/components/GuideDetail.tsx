"use client";

import React from "react";
import Link from "next/link";
import { TaskItem } from "@/types";
import { UrgencyBadge } from "./UrgencyBadge";
import { slugify } from "@/lib/tasks";

interface GuideDetailProps {
  task: TaskItem;
  relatedTasks: TaskItem[];
}

export const GuideDetail: React.FC<GuideDetailProps> = ({ task, relatedTasks }) => {
  const categorySlug = slugify(task.category);

  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="mb-6 font-mono text-xs text-gray-700 flex flex-wrap items-center gap-2">
        <Link href="/" className="hover:underline hover:text-black">
          HOME
        </Link>
        <span>/</span>
        <Link href={`/category/${categorySlug}/`} className="hover:underline hover:text-black uppercase">
          {task.category}
        </Link>
        <span>/</span>
        <span className="text-black font-bold uppercase truncate max-w-xs">{task.title}</span>
      </nav>

      {/* Main Guide Card */}
      <div className="border-4 border-black bg-white mb-8">
        {/* Top Meta Bar */}
        <div className="bg-black text-white px-4 py-2 font-mono text-xs flex flex-wrap items-center justify-between gap-2 border-b-2 border-black">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="font-bold tracking-wider">OFFICIAL GUIDE</span>
            <span className="text-gray-400">{"//"}</span>
            <UrgencyBadge urgency={task.urgency} />
            <Link
              href={`/category/${categorySlug}/`}
              className="border border-white px-2 py-0.5 uppercase text-[11px] font-bold hover:bg-white hover:text-black transition-none"
            >
              {task.category}
            </Link>
          </div>
          {task.legal_ref && (
            <div className="bg-white text-black px-2 py-0.5 text-[11px] font-bold">
              LAW: {task.legal_ref}
            </div>
          )}
        </div>

        <div className="p-6 md:p-8">
          {/* Main Title and Summary */}
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-black uppercase font-sans leading-tight">
            {task.title}
          </h1>

          <p className="mt-4 text-base md:text-lg text-black font-medium leading-relaxed max-w-3xl">
            {task.description}
          </p>

          {/* Key Facts Summary Box */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs border-2 border-black p-4 bg-gray-50">
            {task.deadline && (
              <div>
                <span className="text-[10px] text-gray-600 block uppercase font-bold">STATUTORY DEADLINE</span>
                <span className="text-black font-bold text-xs mt-0.5 block">{task.deadline}</span>
              </div>
            )}
            {task.estimated_time && (
              <div>
                <span className="text-[10px] text-gray-600 block uppercase font-bold">ESTIMATED TIME</span>
                <span className="text-black font-bold text-xs mt-0.5 block">{task.estimated_time}</span>
              </div>
            )}
            {task.costs_fines && (
              <div>
                <span className="text-[10px] text-gray-600 block uppercase font-bold">COSTS / PENALTIES</span>
                <span className="text-black font-bold text-xs mt-0.5 block">{task.costs_fines}</span>
              </div>
            )}
          </div>

          {/* Interactive CTA Banner */}
          <div className="mt-6 p-4 border-2 border-black bg-yellow-400 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono">
            <div>
              <div className="font-bold text-black uppercase text-xs">
                TRACK THIS IN YOUR CUSTOM CHECKLIST
              </div>
              <p className="text-[11px] text-gray-900 font-sans font-medium mt-0.5">
                Configure your citizenship, housing, and job status to get a prioritized timeline.
              </p>
            </div>
            <Link
              href={`/?task=${task.id}#task-${task.id}`}
              className="bg-black text-white px-4 py-2 text-xs font-bold uppercase hover:bg-white hover:text-black border-2 border-black transition-none shrink-0"
            >
              [+ ADD TO MY CHECKLIST]
            </Link>
          </div>

          {/* The Bureaucracy Trap Callout */}
          {task.trap_warning && (
            <section className="mt-8 border-2 border-black bg-amber-50">
              <div className="bg-black text-amber-300 px-4 py-2 font-mono text-xs font-black uppercase tracking-wider flex items-center gap-2 border-b-2 border-black">
                <span className="bg-amber-400 text-black px-1.5 py-0.5 text-[10px] font-black shrink-0">
                  ! TRAP
                </span>
                <span>WHAT EXPATS GET WRONG (COMMON TRAP)</span>
              </div>
              <div className="p-4 md:p-5 text-sm md:text-base font-medium leading-relaxed text-black">
                <p>{task.trap_warning}</p>
              </div>
            </section>
          )}

          {/* Step-by-step Action Protocol */}
          {task.action_steps && task.action_steps.length > 0 && (
            <section className="mt-8">
              <div className="border-b-2 border-black pb-2 mb-4">
                <h2 className="font-mono text-sm font-black uppercase tracking-wider text-black">
                  STEP-BY-STEP ACTION PROTOCOL ({task.action_steps.length} STEPS)
                </h2>
              </div>
              <ol className="space-y-3 font-sans">
                {task.action_steps.map((step, idx) => (
                  <li
                    key={idx}
                    className="border-2 border-black p-4 bg-white flex items-start gap-4"
                  >
                    <span className="font-mono text-base font-black bg-black text-white w-7 h-7 shrink-0 flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm md:text-base font-medium text-black leading-relaxed">
                        {step}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>
          )}

          {/* Official Government Links & Resources */}
          {task.official_links && task.official_links.length > 0 && (
            <section className="mt-8">
              <div className="border-b-2 border-black pb-2 mb-3">
                <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-gray-700">
                  OFFICIAL PORTALS & LEGAL REFERENCES
                </h2>
              </div>
              <div className="flex flex-wrap gap-2 font-mono text-xs">
                {task.official_links.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-2 border-black px-3 py-2 bg-gray-50 hover:bg-black hover:text-white font-bold inline-flex items-center gap-1.5 transition-none"
                  >
                    <span>↗ {link.title}</span>
                  </a>
                ))}
                {task.legal_ref && (
                  <span className="border-2 border-gray-300 px-3 py-2 bg-gray-100 text-gray-700 font-bold">
                    Statute: {task.legal_ref}
                  </span>
                )}
              </div>
            </section>
          )}

          {/* Frequently Asked Questions */}
          {task.faq && task.faq.length > 0 && (
            <section className="mt-10 border-t-4 border-black pt-6">
              <div className="mb-4">
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-gray-700 block">
                  LEGAL CLARIFICATIONS
                </span>
                <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight text-black font-sans">
                  Frequently Asked Questions
                </h2>
              </div>
              <div className="space-y-4 font-sans">
                {task.faq.map((item, idx) => (
                  <details
                    key={idx}
                    open
                    className="border-2 border-black bg-gray-50 p-4 transition-none group"
                  >
                    <summary className="font-black text-base text-black cursor-pointer uppercase list-none flex items-center justify-between gap-2 select-none">
                      <span>{item.question}</span>
                      <span className="font-mono text-xs font-bold bg-black text-white px-1.5 py-0.5 shrink-0">
                        [FAQ]
                      </span>
                    </summary>
                    <p className="mt-3 text-sm md:text-base text-gray-900 font-medium leading-relaxed border-t border-gray-300 pt-3">
                      {item.answer}
                    </p>
                  </details>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      {/* Related Bureaucratic Procedures */}
      {relatedTasks.length > 0 && (
        <section className="border-4 border-black bg-white p-6 mb-8">
          <div className="border-b-2 border-black pb-2 mb-4 flex items-center justify-between gap-2">
            <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-black">
              COMPANION ADMINISTRATIVE PROCEDURES
            </h2>
            <Link
              href={`/category/${categorySlug}/`}
              className="font-mono text-xs font-bold text-black underline hover:bg-black hover:text-white px-1"
            >
              [VIEW ALL IN {task.category.toUpperCase()}]
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {relatedTasks.map((rel) => (
              <Link
                key={rel.id}
                href={`/guide/${rel.id}/`}
                className="border-2 border-black p-3 hover:bg-yellow-50 transition-none flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <UrgencyBadge urgency={rel.urgency} />
                    <span className="text-[10px] font-mono font-bold text-gray-600 truncate">
                      {rel.category}
                    </span>
                  </div>
                  <h3 className="font-black text-sm uppercase text-black leading-snug">
                    {rel.title}
                  </h3>
                </div>
                <div className="mt-3 font-mono text-[11px] font-bold text-black underline">
                  Read Protocol →
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Return to Main Tracker */}
      <div className="text-center font-mono text-xs">
        <Link
          href="/"
          className="inline-block px-5 py-3 border-2 border-black bg-black text-white hover:bg-yellow-400 hover:text-black font-bold uppercase transition-none"
        >
          ← RETURN TO FULL GERMAN BUREAUCRACY CHECKLIST
        </Link>
      </div>
    </article>
  );
};
