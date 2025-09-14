import { Link } from "react-router-dom";
import { ROUTES } from "../../nav/items";
import { useSiteConfig } from "@/hooks/useSiteConfig";

export function NoticesPreview() {
  const { data: config } = useSiteConfig();

  if (!config) return null;

  return (
    <section className="mx-auto max-w-6xl px-4 py-8" aria-labelledby="notices-heading">
      <div className="mb-4 flex items-center justify-between">
        <h2 id="notices-heading" className="text-base font-semibold">
          Notices
        </h2>
        <Link to={ROUTES.alerts} className="link text-muted-foreground text-xs">
          View all →
        </Link>
      </div>
      <ul className="grid gap-4 md:grid-cols-3">
        {config.notices.map((n) => (
          <li key={n.title} className="card border-border border p-4">
            <h3 className="text-sm font-medium">{n.title}</h3>
            <time className="text-muted-foreground block text-[12px]">{n.date}</time>
            <div className="mt-3">
              <Link to={n.to} className="link text-xs">
                Read more →
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
