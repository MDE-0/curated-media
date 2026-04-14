export interface ArxivPaper {
  id: string;
  title: string;
  authors: string[];
  summary: string;
  published: string;
  updated: string;
  link: string;
  categories: string[];
}

function extractText(xml: string, tag: string): string {
  const re = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i");
  const match = xml.match(re);
  return match ? match[1].trim() : "";
}

function extractAll(xml: string, tag: string): string[] {
  const re = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "gi");
  const results: string[] = [];
  let match;
  while ((match = re.exec(xml)) !== null) {
    results.push(match[1].trim());
  }
  return results;
}

function parseEntry(entryXml: string): ArxivPaper | null {
  try {
    const rawId = extractText(entryXml, "id");
    const absId = rawId.replace("http://arxiv.org/abs/", "").replace("https://arxiv.org/abs/", "");

    const title = extractText(entryXml, "title").replace(/\s+/g, " ");
    const summary = extractText(entryXml, "summary").replace(/\s+/g, " ");
    const published = extractText(entryXml, "published");
    const updated = extractText(entryXml, "updated");

    const authorMatches = extractAll(entryXml, "author");
    const authors = authorMatches.map((a) => extractText(a, "name")).filter(Boolean);

    const catRe = /<category[^>]+term="([^"]+)"/gi;
    const categories: string[] = [];
    let catMatch;
    while ((catMatch = catRe.exec(entryXml)) !== null) {
      categories.push(catMatch[1]);
    }

    return {
      id: absId,
      title,
      authors,
      summary,
      published,
      updated,
      link: `https://arxiv.org/abs/${absId}`,
      categories,
    };
  } catch {
    return null;
  }
}

export async function getNumberTheoryPapers(maxResults = 25): Promise<ArxivPaper[]> {
  try {
    const url =
      `https://export.arxiv.org/api/query` +
      `?search_query=cat:math.NT` +
      `&sortBy=submittedDate&sortOrder=descending` +
      `&max_results=${maxResults}`;

    const res = await fetch(url, { next: { revalidate: 1800 } });
    if (!res.ok) return [];

    const xml = await res.text();

    const entryRe = /<entry>([\s\S]*?)<\/entry>/gi;
    const papers: ArxivPaper[] = [];
    let match;
    while ((match = entryRe.exec(xml)) !== null) {
      const paper = parseEntry(match[1]);
      if (paper) papers.push(paper);
    }
    return papers;
  } catch {
    return [];
  }
}

export function formatArxivDate(dateStr: string): string {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-AU", { day: "numeric", month: "short", year: "numeric" });
}
