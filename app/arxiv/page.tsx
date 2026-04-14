import { getNumberTheoryPapers } from "@/lib/arxiv";
import PaperCard from "@/components/paper-card";
import PageTransition from "@/components/page-transition";

export default async function ArxivPage() {
  const papers = await getNumberTheoryPapers(4);

  return (
    <PageTransition>
      {papers.length === 0 ? (
        <div className="rounded-lg border border-dashed border-gray-200 p-8 text-center text-sm text-gray-400">
          Could not load papers. Check your connection or try again later.
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {papers.map((paper) => (
            <PaperCard key={paper.id} paper={paper} />
          ))}
        </div>
      )}
    </PageTransition>
  );
}
