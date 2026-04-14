import Link from "next/link";
import { getProblemsForDate, getArchiveDates, formatDateLabel, getQotdForDate } from "@/lib/problems";
import ProblemsGrid from "@/components/problems-grid";
import QotdCard from "@/components/qotd-card";
import PageTransition from "@/components/page-transition";
import { CalendarDays } from "lucide-react";

export default function ProblemsPage() {
  const today = new Date().toISOString().split("T")[0];
  const problems = getProblemsForDate(today);
  const archiveDates = getArchiveDates();
  const qotd = getQotdForDate(today);

  return (
    <PageTransition>
      <div className="flex flex-col gap-8">
        {qotd && <QotdCard problem={qotd} dateStr={today} />}
        <div>
          <div className="mb-4 flex items-center gap-2">
            <CalendarDays size={15} className="text-gray-400" />
            <h2 className="text-sm font-semibold text-gray-900">{formatDateLabel(today)}</h2>
            <span className="rounded-full bg-gray-900 px-2 py-0.5 text-xs text-white">Today</span>
          </div>
          <ProblemsGrid problems={problems} dateStr={today} isPast={false} />
        </div>

        {archiveDates.length > 0 && (
          <div>
            <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-900">
              <CalendarDays size={15} className="text-gray-400" />
              Archive
            </h2>
            <div className="flex flex-col divide-y divide-gray-100 rounded-lg border border-gray-100 bg-white shadow-sm">
              {archiveDates.map((date) => (
                <Link
                  key={date}
                  href={`/problems/${date}`}
                  className="flex items-center justify-between px-4 py-2.5 text-sm text-gray-700 transition hover:bg-gray-50"
                >
                  <span>{formatDateLabel(date)}</span>
                  <span className="text-xs text-gray-400">8 problems</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </PageTransition>
  );
}
