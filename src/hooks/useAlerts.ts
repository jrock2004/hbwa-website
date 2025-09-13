import { useEffect, useState } from "react";
import { AlertsSchema, type Alert } from "@/config/alertsConfig";

export function useAlerts() {
  const [data, setData] = useState<Alert[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/alerts.json", { cache: "no-store" })
      .then((r) => r.json())
      .then((json) => {
        const parsed = AlertsSchema.safeParse(json);
        if (!parsed.success) {
          setError("Config error: please check alerts.json (fields or commas).");
          return;
        }
        setData(parsed.data);
      })
      .catch(() => setError("Could not load alerts.json"));
  }, []);

  return { data, error, isLoading: !data && !error };
}
