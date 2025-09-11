import { useMemo, useState } from "react";
import { ALERTS } from "../data/alerts";
import { AlertBanner } from "../components/AlertBanner";

export default function AlertsPage() {
  const [q, setQ] = useState("");

  const items = useMemo(() => {
    const term = q.trim().toLowerCase();
    const sorted = [...ALERTS].sort((a, b) => b.date.localeCompare(a.date));
    if (!term) return sorted;
    return sorted.filter(
      (a) => a.title.toLowerCase().includes(term) || a.body?.toLowerCase().includes(term),
    );
  }, [q]);

  return (
    <main className="container-page py-10">
      <h1 className="mb-4 text-3xl font-bold">Alerts & Notices</h1>

      <div className="mb-4">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search alerts..."
          className="border-border bg-background w-full max-w-sm rounded-md border px-3 py-2"
          aria-label="Search alerts"
        />
      </div>

      <div className="grid gap-4">
        {items.length === 0 ? (
          <p className="text-muted-foreground">No alerts found.</p>
        ) : (
          items.map((a) => (
            <AlertBanner key={a.id} title={a.title} variant={a.severity}>
              <div className="flex items-center justify-between">
                <span>{a.body}</span>
                <time className="text-muted-foreground text-xs">
                  {new Date(a.date).toLocaleDateString()}
                </time>
              </div>
            </AlertBanner>
          ))
        )}
      </div>
    </main>
  );
}
