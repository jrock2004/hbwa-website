import { useSiteConfig } from "@/hooks/useSiteConfig";
import { Link } from "react-router-dom";

export function QuickLinks() {
  const { data: config } = useSiteConfig();

  if (!config) return null;

  return (
    <section className="bg-muted" aria-labelledby="quicklinks-heading">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <h2 id="quicklinks-heading" className="text-base font-semibold">
          Quick Links
        </h2>
        <ul className="mt-4 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          {config.quickLinks.map((l) => (
            <li key={l.to} className="bg-card border-border rounded border p-4">
              <Link to={l.to} className="block text-sm">
                {l.label}
              </Link>
              <p className="text-muted-foreground mt-1 text-xs">Navigate to {l.label}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
