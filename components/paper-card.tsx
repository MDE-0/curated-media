import { ExternalLink } from "lucide-react";
import type { ArxivPaper } from "@/lib/arxiv";
import { formatArxivDate } from "@/lib/arxiv";

interface PaperCardProps {
  paper: ArxivPaper;
}

export default function PaperCard({ paper }: PaperCardProps) {
  const authorList =
    paper.authors.length > 3
      ? paper.authors.slice(0, 3).join(", ") + ` +${paper.authors.length - 3} more`
      : paper.authors.join(", ");

  return (
    <a
      href={paper.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group block rounded-lg border border-gray-100 bg-white p-5 shadow-sm transition hover:border-gray-300 hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-sm font-semibold leading-snug text-gray-900 group-hover:text-black">
          {paper.title}
        </h3>
        <ExternalLink
          size={14}
          className="mt-0.5 shrink-0 text-gray-300 group-hover:text-gray-500"
        />
      </div>

      {authorList && (
        <p className="mt-1.5 text-xs text-gray-500">{authorList}</p>
      )}

      <p className="mt-2.5 line-clamp-3 text-xs leading-relaxed text-gray-600">
        {paper.summary}
      </p>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500">
          {formatArxivDate(paper.published)}
        </span>
        {paper.categories.slice(0, 3).map((cat) => (
          <span
            key={cat}
            className="rounded-full border border-gray-100 px-2 py-0.5 text-xs text-gray-400"
          >
            {cat}
          </span>
        ))}
      </div>
    </a>
  );
}
