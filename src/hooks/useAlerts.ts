import { AlertsSchema, type Alert } from "@/config/alertsConfig";
import { useJsonConfig } from "./useJsonConfig";

export function useAlerts(): {
  data: Alert[] | null;
  error: string | null;
  isLoading: boolean;
} {
  const state = useJsonConfig("/alerts.json", AlertsSchema);
  return {
    data: state.status === "success" ? state.data : null,
    error: state.status === "error" ? state.error.message : null,
    isLoading: state.status === "idle" || state.status === "loading",
  };
}
