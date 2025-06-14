"use client";

import React, { useState } from "react";

const sections = [
  {
    title: "Introduction to High Level Design",
    progress: 0,
    total: 4,
  },
  {
    title: "Scalability in Distributed Systems",
    progress: 0,
    total: 20,
  },
  {
    title: "System Design Tradeoffs",
    progress: 0,
    total: 14,
  },
  {
    title: "Databases",
    progress: 0,
    total: 16,
  },
  {
    title: "Application Programming Interface (API)",
    progress: 0,
    total: 11,
  },
  {
    title: "Networking",
    progress: 0,
    total: 28,
  },
  {
    title: "Caches Deep Dive",
    progress: 0,
    total: 8,
  },
  {
    title: "Data consistency in Distributed Systems",
    progress: 0,
    total: 11,
  },
  {
    title: "Fault and Failure in Distributed Systems",
    progress: 0,
    total: 7,
  },
  {
    title: "Distributed Consensus",
    progress: 0,
    total: 5,
  },
  {
    title: "Asynchronous Programming",
    progress: 0,
    total: 6,
  },
  {
    title: "Distributed Rate Limiting",
    progress: 0,
    total: 2,
  },
  {
    title: "Security in Distributed Systems",
    progress: 0,
    total: 5,
  },
  {
    title: "Observability in Distributed Systems",
    progress: 0,
    total: 3,
  },
  {
    title: "HLD Interview Problems",
    progress: 0,
    total: 19,
  },
];

export default function HLDPage() {
  // Track completion state for each section (true = complete, false = not complete)
  const [completed, setCompleted] = useState(Array(sections.length).fill(false));
  // Track which section is open for showing subsections
  const [open, setOpen] = useState(null);

  // Calculate number of completed sections
  const completedCount = completed.filter(Boolean).length;
  const totalCount = sections.length;
  const percentComplete = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  // Handler to toggle completion
  const toggleComplete = (e, idx) => {
    e.stopPropagation(); // Prevent expanding/collapsing when ticking
    setCompleted(prev => {
      const updated = [...prev];
      updated[idx] = !updated[idx];
      return updated;
    });
  };

  // Dummy subsections
  const getSubsections = idx => Array.from({ length: 5 }, (_, i) => `Subsection ${i + 1} of Section ${idx + 1}`);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a23] via-[#112240] to-[#0a0a23] text-white flex flex-col items-center py-12">
      <div className="w-full max-w-4xl bg-[#232b4a] rounded-2xl p-8 shadow-2xl">
        <h1 className="text-3xl font-bold mb-2">High Level Design</h1>
        <p className="text-lg text-gray-300 mb-6">
          Cover basics to advanced HLD Concepts & Problems, with Interview Tips & Tricks for all Levels, based on me & my super seniors Real Interview Experiences
        </p>
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-300 mb-1">
            <span>{completedCount} / {totalCount}</span>
            <span>{Math.round(percentComplete)} % Complete</span>
          </div>
          <div className="w-full h-4 bg-[#313a4f] rounded-full overflow-hidden">
            <div className="h-full bg-green-500 transition-all duration-300" style={{ width: `${percentComplete}%` }} />
          </div>
        </div>
        <div className="space-y-4">
          {sections.map((section, idx) => {
            const percent = section.total > 0 ? (section.progress / section.total) * 100 : 0;
            const isOpen = open === idx;
            return (
              <div
                key={idx}
                className={`bg-[#313a4f] rounded-lg p-4 cursor-pointer hover:bg-[#3a4663] transition-colors`}
                onClick={() => setOpen(isOpen ? null : idx)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button
                      className="w-5 h-5 rounded-full border-2 border-gray-400 flex items-center justify-center bg-[#232b4a] focus:outline-none focus:ring-2 focus:ring-green-400"
                      aria-label={completed[idx] ? 'Mark as incomplete' : 'Mark as complete'}
                      onClick={e => toggleComplete(e, idx)}
                      type="button"
                    >
                      {completed[idx] ? (
                        <span className="w-3 h-3 rounded-full bg-green-500 block"></span>
                      ) : null}
                    </button>
                    <span className="font-semibold text-white">{section.title}</span>
                  </div>
                  <span className="text-gray-300 text-sm">{section.progress} / {section.total}</span>
                </div>
                <div className="w-full h-2 bg-[#232b4a] rounded-full mt-3 overflow-hidden">
                  <div
                    className="h-full bg-green-500 transition-all duration-300"
                    style={{ width: `${percent}%` }}
                  />
                </div>
                {isOpen && (
                  <div className="mt-4 space-y-2">
                    {getSubsections(idx).map((sub, subIdx) => (
                      <div key={subIdx} className="bg-[#232b4a] rounded px-4 py-2 text-gray-200 text-sm">
                        {sub}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
} 