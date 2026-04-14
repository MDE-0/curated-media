import Link from "next/link";
import { notFound } from "next/navigation";
import { getProblemsForDate, formatDateLabel } from "@/lib/problems";
import ProblemsGrid from "@/components/problems-grid";
import { ChevronLeft } from "lucide-react";

interface Props {
  params: Promise<{ date: string }>;
}

export default async function ArchiveDatePage({ params }: Props) {
  const { date } = await params;

  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) notFound();

  const today = new Date().toISOString().split("T")[0];
  if (date > today) notFound();

  const problems = getProblemsForDate(date);
  const isPast = date < today;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-3">
        <Link
          href="/problems"
          className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900"
        >
          <ChevronLeft size={15} />
          Problems
        </Link>
        <span className="text-gray-300">/</span>
        <span className="text-sm text-gray-700">{formatDateLabel(date)}</span>
      </div>

      <div>
        <h1 className="text-xl font-semibold text-gray-900">{formatDateLabel(date)}</h1>
        <p className="mt-1 text-sm text-gray-500">
          {isPast
            ? "All solutions are visible for past days."
            : "Solutions unlock at 8 PM today."}
        </p>
      </div>

      <ProblemsGrid problems={problems} dateStr={date} isPast={isPast} />
    </div>
  );
}
