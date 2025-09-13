import { useEffect } from "react";
import { useAlerts } from "@/hooks/useAlerts";
import {
  MegaphoneIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import type { Alert as AlertRecord } from "@/config/alertsConfig";
import { SectionHeader } from "@/components/alert/SectionHeader";
import { NoticeCard } from "@/components/alert/NoticeCard";
import { ContactBox } from "@/components/alert/ContactBox";

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
          <p className="text-muted-foreground dark:text-foreground/80 mt-2 max-w-prose text-sm">
            This page consolidates all Emergency and Non-Emergency notices in one place, replacing
            the separate pages. It updates as soon as we post new information.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <main className="space-y-8 lg:col-span-2">
            <section aria-labelledby="active-emergencies">
              <SectionHeader
                icon={
                  <ExclamationTriangleIcon
                    className="h-5 w-5 text-red-600 dark:text-red-400"
                    aria-hidden
                  />
                }
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
                icon={
                  <InformationCircleIcon
                    className="h-5 w-5 text-amber-600 dark:text-amber-400"
                    aria-hidden
                  />
                }
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

            <aside className="bg-card text-card-foreground rounded-2xl border p-4 shadow-sm dark:border-white/10 dark:bg-white/[0.04]">
              <h3 className="text-base font-semibold">Get Updates</h3>
              <p className="text-muted-foreground mt-1 text-sm">
                Coming soon: email and text signup. For now, check this page or call the office.
              </p>
            </aside>

            <aside className="bg-card text-card-foreground rounded-2xl border p-4 shadow-sm dark:border-white/10 dark:bg-white/[0.04]">
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
