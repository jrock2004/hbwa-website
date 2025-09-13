import { InformationCircleIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import type { Alert } from "@/config/alertsConfig";

// small helper to keep the component self-contained
const parse = (s?: string | null) => (s ? new Date(s) : undefined);
function formatDateRange(a: Alert): string {
  const start = parse(a.effectiveFrom);
  const end = parse(a.effectiveTo ?? undefined);
  const fmt: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  };
  if (start && end)
    return `${start.toLocaleString(undefined, fmt)} → ${end.toLocaleString(undefined, fmt)}`;
  if (start) return `${start.toLocaleString(undefined, fmt)} → ongoing`;
  return "";
}

export function NoticeCard({ a }: { a: Alert }) {
  const isEmerg = a.severity === "emergency";

  const shell = "rounded-2xl border p-4 shadow-sm transition hover:shadow-md";
  const tone = isEmerg
    ? [
        // light
        "border-red-600/30 bg-red-50 text-red-950",
        // dark: subtle surface, higher-contrast border, default text color
        "dark:bg-red-950/20 dark:border-red-400/30 dark:text-foreground",
      ].join(" ")
    : [
        "border-amber-600/30 bg-amber-50 text-amber-950",
        "dark:bg-amber-950/15 dark:border-amber-400/30 dark:text-foreground",
      ].join(" ");

  return (
    <article className={`${shell} ${tone}`}>
      <header className="flex items-start gap-3">
        {isEmerg ? (
          <ExclamationTriangleIcon
            className="mt-0.5 h-5 w-5 text-red-600 dark:text-red-400"
            aria-hidden
          />
        ) : (
          <InformationCircleIcon
            className="mt-0.5 h-5 w-5 text-amber-600 dark:text-amber-400"
            aria-hidden
          />
        )}
        <div className="flex-1">
          <h3 className="text-base leading-tight font-semibold">{a.title}</h3>
          <p className="text-muted-foreground mt-0.5 text-xs">{formatDateRange(a)}</p>
        </div>
      </header>

      <p className="mt-3 text-sm leading-relaxed">{a.description}</p>

      <footer className="mt-4 flex flex-wrap items-center gap-3">
        {a.link ? (
          <a
            href={a.link}
            className="text-sm font-medium underline underline-offset-4 hover:no-underline"
          >
            View full notice
          </a>
        ) : null}
        <div className="ms-auto flex gap-2">
          {(a.tags ?? []).slice(0, 4).map((t) => (
            <span
              key={t}
              className="border-foreground/15 text-foreground/80 rounded-full border px-2 py-0.5 text-xs dark:border-white/15 dark:text-white/80"
            >
              {t}
            </span>
          ))}
        </div>
      </footer>
    </article>
  );
}
