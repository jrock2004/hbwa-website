import { ExclamationTriangleIcon, InformationCircleIcon } from "@heroicons/react/24/outline";
import type { Alert as AlertRecord } from "@/config/alertsConfig";

function formatDateRange(a: AlertRecord): string {
  const parse = (s?: string | null) => (s ? new Date(s) : undefined);
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

export function NoticeCard({ a }: { a: AlertRecord }) {
  const isEmerg = a.severity === "emergency";
  return (
    <article
      className={
        "rounded-2xl border p-4 shadow-sm transition hover:shadow-md " +
        (isEmerg
          ? "border-red-600/30 bg-red-50 text-red-950 dark:bg-red-950/10 dark:text-red-100"
          : "border-amber-600/30 bg-amber-50 text-amber-950 dark:bg-amber-950/10 dark:text-amber-100")
      }
    >
      <header className="flex items-start gap-3">
        {isEmerg ? (
          <ExclamationTriangleIcon className="mt-0.5 h-5 w-5" aria-hidden />
        ) : (
          <InformationCircleIcon className="mt-0.5 h-5 w-5" aria-hidden />
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
            <span key={t} className="rounded-full border px-2 py-0.5 text-xs">
              {t}
            </span>
          ))}
        </div>
      </footer>
    </article>
  );
}
