"use client";

import { useState } from "react";
import { ExternalLink, ChevronDown, ChevronUp, Lightbulb, Lock } from "lucide-react";
import type { Problem } from "@/lib/problems";
import { SOURCE_META } from "@/lib/problems";
import MathRenderer from "./math-renderer";

interface ProblemCardProps {
  problem: Problem;
  index: number;
  solutionVisible: boolean;
  isQotd?: boolean;
}

export default function ProblemCard({ problem, index, solutionVisible, isQotd }: ProblemCardProps) {
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);

  const meta = SOURCE_META[problem.source];
  const diffColor =
    problem.difficulty === "easy"
      ? "text-emerald-600"
      : problem.difficulty === "medium"
      ? "text-amber-600"
      : "text-red-600";

  return (
    <div className="rounded-lg border border-gray-100 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <span className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white ${
            isQotd ? "bg-indigo-600" : "bg-gray-900"
          }`}>
            {isQotd ? "★" : index}
          </span>
          <div className="flex flex-wrap gap-2">
            <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${meta.color}`}>
              {meta.label}
            </span>
            <span className={`text-xs font-medium ${diffColor}`}>{problem.difficulty}</span>
          </div>
        </div>
        <a
          href={meta.url}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 text-gray-300 hover:text-gray-500"
        >
          <ExternalLink size={14} />
        </a>
      </div>

      <div className="mt-3">
        <p className="text-sm font-medium text-gray-900">{problem.title}</p>
        <div className="mt-1.5 text-sm leading-relaxed text-gray-700">
          <MathRenderer text={problem.problem} />
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-2">
        {problem.hint && (
          <button
            onClick={() => setShowHint((v) => !v)}
            className="flex items-center gap-1.5 text-xs text-amber-600 hover:text-amber-800"
          >
            <Lightbulb size={13} />
            {showHint ? "Hide hint" : "Show hint"}
            {showHint ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
          </button>
        )}
        {showHint && (
          <div className="rounded bg-amber-50 px-3 py-2 text-xs text-amber-800">
            <MathRenderer text={problem.hint} />
          </div>
        )}

        {solutionVisible ? (
          <>
            <button
              onClick={() => setShowSolution((v) => !v)}
              className="flex items-center gap-1.5 text-xs text-gray-600 hover:text-gray-900"
            >
              Solution
              {showSolution ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
            </button>
            {showSolution && (
              <div className="rounded bg-gray-50 px-3 py-2 text-xs leading-relaxed text-gray-700">
                <MathRenderer text={problem.solution} />
              </div>
            )}
          </>
        ) : (
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <Lock size={12} />
            Solution unlocks at 8 PM
          </div>
        )}
      </div>

      {problem.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1">
          {problem.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-gray-100 px-2 py-0.5 text-xs text-gray-400"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
