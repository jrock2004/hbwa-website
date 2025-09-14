import { useMemo, useState } from "react";
import { useDocuments } from "@/hooks/useDocuments";
import type { DocumentItem } from "@/config/documentsConfig";

export default function DocumentsPage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<"All" | DocumentItem["category"]>("All");
  const { documents } = useDocuments();

  const categories = useMemo(() => {
    const cats = new Set<string>();
    documents.forEach((d) => {
      if (d.category) cats.add(d.category);
    });
    return Array.from(cats).sort();
  }, [documents]);

  const items = useMemo(() => {
    const term = q.trim().toLowerCase();
    let list = [...documents];
    if (cat !== "All") list = list.filter((d) => d.category === cat);
    if (term) list = list.filter((d) => d.title.toLowerCase().includes(term));
    return list.sort((a, b) => b.date.localeCompare(a.date));
  }, [q, cat, documents]);

  return (
    <main className="container-page py-10">
      <h1 className="mb-4 text-3xl font-bold">Documents</h1>

      <div className="mb-6 flex flex-wrap items-center gap-3">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search documents..."
          className="border-border bg-background w-full rounded-md border px-3 py-2 sm:w-64"
          aria-label="Search documents"
        />
        <select
          value={cat}
          onChange={(e) => setCat(e.target.value as "All" | DocumentItem["category"])}
          className="border-border bg-background rounded-md border px-2 py-2"
          aria-label="Filter by category"
        >
          <option value="All">All categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {items.length === 0 ? (
        <p className="text-muted-foreground">No documents found.</p>
      ) : (
        <ul className="grid gap-3">
          {items.map((d) => (
            <li key={d.id} className="card p-4">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <a href={d.url} className="font-medium" target="_blank" rel="noreferrer">
                    {d.title}
                  </a>
                  <div className="text-muted-foreground text-xs">
                    {d.category} • <time>{new Date(d.date).toLocaleDateString()}</time>
                  </div>
                </div>
                <a
                  className="btn btn-ghost"
                  href={d.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Open ${d.title}`}
                >
                  View PDF
                </a>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
