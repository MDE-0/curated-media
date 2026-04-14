"use client";

import { useState, useEffect } from "react";
import type { Problem } from "@/lib/problems";
import ProblemCard from "./problem-card";

interface QotdCardProps {
  problem: Problem;
  dateStr: string;
}

export default function QotdCard({ problem, dateStr }: QotdCardProps) {
  const [solutionVisible, setSolutionVisible] = useState(false);

  useEffect(() => {
    const check = () => {
      const now = new Date();
      const todayStr = now.toISOString().split("T")[0];
      setSolutionVisible(dateStr < todayStr || (dateStr === todayStr && now.getHours() >= 20));
    };
    check();
    const interval = setInterval(check, 30_000);
    return () => clearInterval(interval);
  }, [dateStr]);

  return (
    <div>
      <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-indigo-500">
        Graph Theory · Question of the Day
      </p>
      <ProblemCard problem={problem} index={0} solutionVisible={solutionVisible} isQotd />
    </div>
  );
}
