import problemsData from "@/data/problems.json";

export const LAUNCH_DATE = "2026-04-14";

export interface Problem {
  id: string;
  source: "quant_prof" | "simon_marais" | "amt" | "aops" | "graph_theory";
  difficulty: "easy" | "medium" | "hard";
  title: string;
  problem: string;
  hint: string;
  solution: string;
  url: string;
  tags: string[];
}

export const SOURCE_META: Record<
  string,
  { label: string; fullName: string; url: string; color: string }
> = {
  quant_prof: {
    label: "Quant Prof",
    fullName: "Quant Prof (YouTube)",
    url: "https://www.youtube.com/@Quant_Prof",
    color: "bg-violet-100 text-violet-800",
  },
  simon_marais: {
    label: "Simon Marais",
    fullName: "Simon Marais Mathematics Competition",
    url: "https://www.simonmarais.org/",
    color: "bg-blue-100 text-blue-800",
  },
  amt: {
    label: "AMT",
    fullName: "Australian Mathematics Trust",
    url: "https://amt.edu.au/department/past-papers",
    color: "bg-emerald-100 text-emerald-800",
  },
  aops: {
    label: "AoPS",
    fullName: "Art of Problem Solving",
    url: "https://artofproblemsolving.com/wiki/index.php/Category:Math_Contest_Problems",
    color: "bg-amber-100 text-amber-800",
  },
  graph_theory: {
    label: "Graph Theory",
    fullName: "Graph Theory",
    url: "https://en.wikipedia.org/wiki/Graph_theory",
    color: "bg-indigo-100 text-indigo-800",
  },
};

function dateToSeed(dateStr: string): number {
  let hash = 0;
  for (let i = 0; i < dateStr.length; i++) {
    hash = (Math.imul(31, hash) + dateStr.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

function seededShuffle<T>(arr: T[], seed: number): T[] {
  const result = [...arr];
  let s = seed;
  for (let i = result.length - 1; i > 0; i--) {
    s = (Math.imul(s, 1664525) + 1013904223) | 0;
    const j = Math.abs(s) % (i + 1);
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function getProblemsForDate(dateStr: string): Problem[] {
  const seed = dateToSeed(dateStr);
  const sources = ["quant_prof", "simon_marais", "amt", "aops"] as const;
  const result: Problem[] = [];

  sources.forEach((source, i) => {
    const pool = (problemsData.problems as Problem[]).filter((p) => p.source === source);
    const shuffled = seededShuffle(pool, seed + i * 7919);
    result.push(...shuffled.slice(0, 2));
  });

  return result;
}

export function todayDateStr(): string {
  return new Date().toISOString().split("T")[0];
}

export function getArchiveDates(): string[] {
  const dates: string[] = [];
  const today = new Date();
  const launch = new Date(LAUNCH_DATE + "T12:00:00");
  const d = new Date(today);
  d.setDate(d.getDate() - 1);
  while (d >= launch) {
    dates.push(d.toISOString().split("T")[0]);
    d.setDate(d.getDate() - 1);
  }
  return dates;
}

export function getQotdForDate(dateStr: string): Problem | null {
  const pool = (problemsData.problems as Problem[]).filter((p) => p.source === "graph_theory");
  if (pool.length === 0) return null;
  const seed = dateToSeed(dateStr + "_qotd");
  const shuffled = seededShuffle(pool, seed);
  return shuffled[0];
}

export function isSolutionVisible(dateStr: string): boolean {
  const now = new Date();
  const todayStr = now.toISOString().split("T")[0];

  if (dateStr < todayStr) return true;

  if (dateStr === todayStr) {
    const h = now.getHours();
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const localHour = new Date().toLocaleString("en-AU", { timeZone: tz, hour: "numeric", hour12: false });
    return parseInt(localHour) >= 20;
  }

  return false;
}

export function formatDateLabel(dateStr: string): string {
  const d = new Date(dateStr + "T12:00:00");
  return d.toLocaleDateString("en-AU", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
}
