import { useEffect, type JSX } from "react";
import { useAlerts } from "@/hooks/useAlerts";
import type { Alert as AlertRecord } from "@/config/alertsConfig";
import {
  MegaphoneIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";

// --- Utilities ---
const now = () => new Date();
const parse = (s?: string | null) => (s ? new Date(s) : undefined);

function isActive(a: AlertRecord, ref: Date = now()): boolean {
  const start = parse(a.effectiveFrom);
  const end = parse(a.effectiveTo ?? undefined);
  if (!start) return false;
  if (start > ref) return false;
  if (end && end < ref) return false;
  return true;
}

function isRecentlyResolved(a: AlertRecord, ref: Date = now()): boolean {
  const end = parse(a.effectiveTo ?? undefined);
  if (!end) return false;
  const diffDays = (ref.getTime() - end.getTime()) / 86_400_000;
  return diffDays >= 0 && diffDays <= 14;
}

function formatDateRange(a: AlertRecord): string {
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

function SectionHeader({
  icon,
  title,
  subtitle,
}: {
  icon: JSX.Element;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-4 flex items-start gap-3">
      <div className="mt-0.5">{icon}</div>
      <div>
        <h2 className="text-xl leading-tight font-semibold">{title}</h2>
        {subtitle ? <p className="text-muted-foreground text-sm leading-snug">{subtitle}</p> : null}
      </div>
    </div>
  );
}

function NoticeCard({ a }: { a: AlertRecord }) {
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

function ContactBox() {
  return (
    <aside className="bg-card text-card-foreground rounded-2xl border p-4 shadow-sm">
      <h3 className="text-base font-semibold">Report an Emergency</h3>
      <p className="mt-1 text-sm">
        Call our main office at <span className="font-semibold">(610) 273-7830</span>. If the office
        is closed, the voicemail recording provides emergency contact numbers.
      </p>
      <p className="text-muted-foreground mt-3 text-sm">
        Note: HBWA maintains the public system (mains, hydrants, wells, plants, pump stations,
        storage tanks). Repairs on the property owner’s side of the curb-stop are the owner’s
        responsibility.
      </p>
    </aside>
  );
}

export default function AlertsRoute() {
  useEffect(() => {
    document.title = "Alerts | Honey Brook Water Authority";
  }, []);

  const { data: alerts, error, isLoading } = useAlerts();

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-10">
        <p className="text-muted-foreground text-sm">Loading alerts…</p>
      </div>
    );
  }

  if (error || !alerts) {
    return (
      <div className="container mx-auto px-4 py-10">
        <p className="text-sm text-red-600">{error ?? "Unable to load alerts."}</p>
      </div>
    );
  }

  const active = alerts.filter((a) => isActive(a));
  const activeEmerg = active.filter((a) => a.severity === "emergency");
  const activeNotices = active.filter((a) => a.severity === "notice");
  const recentlyResolved = alerts.filter((a) => isRecentlyResolved(a));

  return (
    <div className="min-h-[60vh]">
      <div className="container mx-auto px-4 py-10">
        <header className="mb-8">
          <div className="flex items-center gap-3">
            <MegaphoneIcon className="h-6 w-6" aria-hidden />
            <h1 className="text-2xl font-bold tracking-tight">Alerts</h1>
          </div>
          <p className="text-muted-foreground mt-2 max-w-prose text-sm">
            This page consolidates all Emergency and Non-Emergency notices in one place, replacing
            the separate pages. It updates as soon as we post new information.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <main className="space-y-8 lg:col-span-2">
            <section aria-labelledby="active-emergencies">
              <SectionHeader
                icon={<ExclamationTriangleIcon className="h-5 w-5 text-red-600" aria-hidden />}
                title="Active Emergencies"
                subtitle={activeEmerg.length ? undefined : "None at this time."}
              />
              <div className="space-y-4">
                {activeEmerg.length
                  ? activeEmerg.map((a) => <NoticeCard key={a.id} a={a} />)
                  : null}
              </div>
            </section>

            <section aria-labelledby="active-notices">
              <SectionHeader
                icon={<InformationCircleIcon className="h-5 w-5 text-amber-600" aria-hidden />}
                title="Active Non‑Emergency Notices"
                subtitle={activeNotices.length ? undefined : "None at this time."}
              />
              <div className="space-y-4">
                {activeNotices.length
                  ? activeNotices.map((a) => <NoticeCard key={a.id} a={a} />)
                  : null}
              </div>
            </section>

            <section aria-labelledby="resolved">
              <SectionHeader
                icon={<InformationCircleIcon className="h-5 w-5" aria-hidden />}
                title="Recently Resolved"
                subtitle={
                  recentlyResolved.length ? undefined : "Nothing resolved in the last 14 days."
                }
              />
              <div className="space-y-4">
                {recentlyResolved.length
                  ? recentlyResolved.map((a) => <NoticeCard key={a.id} a={a} />)
                  : null}
              </div>
            </section>
          </main>

          <div className="space-y-6">
            <ContactBox />

            <aside className="bg-card text-card-foreground rounded-2xl border p-4 shadow-sm">
              <h3 className="text-base font-semibold">Get Updates</h3>
              <p className="text-muted-foreground mt-1 text-sm">
                Coming soon: email and text signup. For now, check this page or call the office.
              </p>
            </aside>

            <aside className="bg-card text-card-foreground rounded-2xl border p-4 shadow-sm">
              <h3 className="text-base font-semibold">About Alerts</h3>
              <ul className="text-muted-foreground mt-2 list-disc space-y-1 ps-5 text-sm">
                <li>
                  We post emergencies immediately and update status as we receive field reports.
                </li>
                <li>
                  Non‑emergency notices cover maintenance (hydrant flushing, valve work) and
                  advisories.
                </li>
                <li>
                  Resolved items remain visible here for two weeks for residents who may have missed
                  the initial notice.
                </li>
              </ul>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}

// File: src/routes/alerts/index.ts
export { default as Component } from "./Alerts";
