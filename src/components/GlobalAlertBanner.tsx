// src/components/GlobalAlertBanner.tsx
import { useEffect, useMemo, useState } from "react";
import { useAlerts } from "@/hooks/useAlerts";
import type { Alert } from "@/config/alertsConfig";
import {
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const now = () => new Date();
const parse = (s?: string | null) => (s ? new Date(s) : undefined);
const isActive = (a: Alert, ref: Date = now()) => {
  const start = parse(a.effectiveFrom);
  const end = parse(a.effectiveTo ?? undefined);
  if (!start) return false;
  if (start > ref) return false;
  if (end && end < ref) return false;
  return true;
};

export default function GlobalAlertBanner() {
  const { data: alerts, error, isLoading } = useAlerts();
  const [dismissedSig, setDismissedSig] = useState<string | null>(null);

  const { mode, signature, primary } = useMemo(() => {
    if (!alerts)
      return {
        mode: null as null | "emergency" | "notice",
        signature: "",
        primary: null as Alert | null,
      };

    const active = alerts.filter((a) => isActive(a));
    const emergencies = active.filter((a) => a.severity === "emergency");
    const notices = active.filter((a) => a.severity === "notice");

    const chosen = emergencies.length ? emergencies : notices;
    const chosenMode: null | "emergency" | "notice" = emergencies.length
      ? "emergency"
      : notices.length
        ? "notice"
        : null;

    const sig = chosenMode
      ? `${chosenMode}::${chosen.map((a) => `${a.id}:${a.lastUpdated ?? ""}`).join("|")}`
      : "";
    return { mode: chosenMode, signature: sig, primary: chosen[0] ?? null };
  }, [alerts]);

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem("hbwa.alertBanner.dismissed");
      setDismissedSig(saved);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    if (signature && dismissedSig && dismissedSig !== signature) {
      try {
        sessionStorage.removeItem("hbwa.alertBanner.dismissed");
      } catch {
        /* ignore */
      }
      setDismissedSig(null);
    }
  }, [signature, dismissedSig]);

  const dismiss = () => {
    if (!signature) return;
    try {
      sessionStorage.setItem("hbwa.alertBanner.dismissed", signature);
    } catch {
      /* ignore */
    }
    setDismissedSig(signature);
  };

  if (isLoading || error) return null;
  if (!mode || !primary) return null;
  if (dismissedSig === signature) return null;

  const isEmergency = mode === "emergency";

  // Both variants softened for dark mode
  const tone = isEmergency
    ? "border-red-800/40 bg-red-600 text-white dark:bg-red-700/90 dark:border-red-300/20 dark:text-red-50"
    : "border-amber-800/40 bg-amber-500 text-white dark:bg-amber-600/90 dark:border-amber-300/20 dark:text-amber-50";

  const Icon = isEmergency ? ExclamationTriangleIcon : InformationCircleIcon;
  const label = isEmergency ? "Active Emergency Notice" : "Active Non-Emergency Notice";

  return (
    <div className={`sticky top-0 z-40 border-b py-2 ${tone}`} role="alert" aria-live="assertive">
      <div className="container mx-auto flex items-center gap-3 px-4">
        <Icon className="h-5 w-5 shrink-0" aria-hidden />
        <p className="text-sm font-medium tracking-wide">
          {label}
          {" — "}
          <a
            href="/alerts"
            className="link--inverse underline underline-offset-4 hover:no-underline"
          >
            see details
          </a>
          .
        </p>
        <button
          type="button"
          onClick={dismiss}
          className="ms-auto inline-flex items-center gap-2 rounded px-1 hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/70"
          aria-label="Dismiss banner"
        >
          <XMarkIcon className="h-5 w-5" aria-hidden />
        </button>
      </div>
    </div>
  );
}
