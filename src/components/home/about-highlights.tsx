import { useSiteConfig } from "@/hooks/useSiteConfig";

export function AboutHighlights() {
  const { data } = useSiteConfig();
  const left = data?.about.left ?? [];
  const right = data?.about.right ?? [];

  if (left.length === 0 && right.length === 0) return null;

  return (
    <section className="mx-auto max-w-6xl px-4 py-12" aria-labelledby="about-heading">
      <div className="mb-6">
        <h2 id="about-heading" className="text-base font-semibold">
          About HBWA
        </h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <ul className="space-y-3">
          {left.map((t) => (
            <li key={t} className="border-border bg-card rounded border p-3 text-sm">
              {t}
            </li>
          ))}
        </ul>
        <ul className="space-y-3">
          {right.map((t) => (
            <li key={t} className="border-border bg-card rounded border p-3 text-sm">
              {t}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
