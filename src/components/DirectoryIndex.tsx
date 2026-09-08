import React from "react";
import Link from "next/link";
import { getAllCategories } from "@/lib/tasks";

export const DirectoryIndex: React.FC = () => {
  const categories = getAllCategories();

  return (
    <section
      aria-label="German Administrative Directory and Statute Index"
      className="max-w-6xl mx-auto px-4 mt-12 mb-6"
    >
      <div className="border-4 border-black bg-gray-50 p-6">
        <div className="border-b-2 border-black pb-3 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-gray-700 mb-1">
              <span className="w-2.5 h-2.5 bg-black inline-block" />
              <span>OFFICIAL STATUTE & TOPIC DIRECTORY</span>
            </div>
            <h2 className="text-xl md:text-2xl font-black uppercase text-black font-sans tracking-tight">
              German Bureaucracy Guides & Statutory Protections
            </h2>
          </div>
          <div className="font-mono text-xs text-gray-600 self-start sm:self-auto">
            <span>21 PROTOCOLS // 7 HUBS</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-mono text-xs">
          {categories.map((cat) => (
            <div key={cat.slug} className="border-2 border-black bg-white p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-gray-300 pb-2 mb-3">
                  <Link
                    href={`/category/${cat.slug}/`}
                    className="font-black text-sm uppercase text-black hover:underline"
                  >
                    {cat.name}
                  </Link>
                  <span className="text-[10px] font-bold bg-black text-white px-1.5 py-0.5">
                    {cat.tasks.length}
                  </span>
                </div>
                <p className="text-[11px] text-gray-700 font-sans font-medium mb-3 leading-snug">
                  {cat.description}
                </p>
                <ul className="space-y-1.5 border-t border-gray-100 pt-2">
                  {cat.tasks.map((task) => (
                    <li key={task.id} className="leading-tight">
                      <Link
                        href={`/guide/${task.id}/`}
                        className="text-black hover:underline hover:bg-yellow-100 px-0.5 block truncate"
                        title={task.title}
                      >
                        <span className="font-bold text-[11px]">→ {task.title}</span>
                      </Link>
                      {task.legal_ref && (
                        <span className="text-[10px] text-gray-500 block pl-3">
                          {task.legal_ref}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-4 pt-2 border-t border-gray-200 text-right">
                <Link
                  href={`/category/${cat.slug}/`}
                  className="font-bold text-[10px] text-black underline uppercase hover:bg-black hover:text-white px-1"
                >
                  View Category Hub →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
