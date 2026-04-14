"use client";

import { useState, useEffect } from "react";
import type { Problem } from "@/lib/problems";
import ProblemCard from "./problem-card";

interface ProblemsGridProps {
  problems: Problem[];
  dateStr: string;
  isPast: boolean;
}

export default function ProblemsGrid({ problems, dateStr, isPast }: ProblemsGridProps) {
  const [solutionVisible, setSolutionVisible] = useState(isPast);

  useEffect(() => {
    if (isPast) {
      setSolutionVisible(true);
      return;
    }
    const check = () => {
      const now = new Date();
      const todayStr = now.toISOString().split("T")[0];
      if (dateStr < todayStr) {
        setSolutionVisible(true);
        return;
      }
      if (dateStr === todayStr) {
        setSolutionVisible(now.getHours() >= 20);
      }
    };
    check();
    const interval = setInterval(check, 30_000);
    return () => clearInterval(interval);
  }, [dateStr, isPast]);

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {problems.map((p, i) => (
        <ProblemCard key={p.id} problem={p} index={i + 1} solutionVisible={solutionVisible} />
      ))}
    </div>
  );
}
