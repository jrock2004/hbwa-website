import { Link } from "react-router-dom";
import { ROUTES } from "../../nav/items";
import { ALERTS } from "../../data/alerts";

export function NoticesPreview() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-8" aria-labelledby="notices-heading">
      <div className="mb-4 flex items-center justify-between">
        <h2 id="notices-heading" className="text-base font-semibold">
          Notices
        </h2>
        <Link to={ROUTES.alerts} className="text-muted-foreground text-xs">
          View all →
        </Link>
      </div>
      <ul className="grid gap-4 md:grid-cols-3">
        {ALERTS.map((n) => (
          <li key={n.id} className="border-border bg-card flex flex-col gap-2 rounded border p-4">
            <h3 className="text-sm font-medium">{n.title}</h3>
            <p className="text-muted-foreground text-xs">{n.body}</p>
            <div className="mt-auto flex items-center justify-between">
              <time className="text-muted-foreground text-[10px]">{n.date}</time>
              <Link to={n.to} className="text-muted-foreground text-xs">
                Read more →
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
