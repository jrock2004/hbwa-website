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

  // Build a signature for the current active set so we can re‑show when alerts change
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

  // Read/write dismissal (localStorage)
  useEffect(() => {
    try {
      const saved = localStorage.getItem("hbwa.alertBanner.dismissed");
      setDismissedSig(saved);
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    // If the active alert set changed, clear an unrelated dismissal
    if (signature && dismissedSig && dismissedSig !== signature) {
      try {
        localStorage.removeItem("hbwa.alertBanner.dismissed");
      } catch {
        // ignore
      }
      setDismissedSig(null);
    }
  }, [signature, dismissedSig]);

  const dismiss = () => {
    if (!signature) return;
    try {
      localStorage.setItem("hbwa.alertBanner.dismissed", signature);
    } catch {
      // ignore
    }
    setDismissedSig(signature);
  };

  if (isLoading || error) return null;
  if (!mode || !primary) return null; // nothing active
  if (dismissedSig === signature) return null; // user dismissed current set

  const isEmergency = mode === "emergency";
  const color = isEmergency
    ? "border-red-700/30 bg-red-600 text-white"
    : "border-amber-700/30 bg-amber-500 text-white";

  const Icon = isEmergency ? ExclamationTriangleIcon : InformationCircleIcon;
  const label = isEmergency ? "Active Emergency Notice" : "Active Non‑Emergency Notice";

  return (
    <div className={`sticky top-0 z-40 border-b py-2 ${color}`} role="alert" aria-live="assertive">
      <div className="flex w-full items-center gap-3 px-4">
        <Icon className="h-5 w-5 shrink-0" aria-hidden />
        <p className="text-sm font-medium tracking-wide">
          {label}
          {" — "}
          <a href="/alerts" className="underline underline-offset-4 hover:no-underline">
            see details
          </a>
          .
        </p>
        <button
          type="button"
          onClick={dismiss}
          className="rounded-full/px ms-auto inline-flex items-center gap-2 transition hover:opacity-80 focus:ring-2 focus:ring-white/60 focus:outline-none"
          aria-label="Dismiss banner"
        >
          <XMarkIcon className="h-5 w-5" aria-hidden />
        </button>
      </div>
    </div>
  );
}
