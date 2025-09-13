import { useEffect, useState } from "react";
import { RatesConfigSchema, type RatesConfig, RATES_CONFIG_PATH } from "@/config/ratesConfig";

type UseRatesState =
  | { status: "idle" | "loading"; data: null; error: null }
  | { status: "success"; data: RatesConfig; error: null }
  | { status: "error"; data: null; error: Error };

const toError = (e: unknown): Error =>
  e instanceof Error ? e : new Error(typeof e === "string" ? e : JSON.stringify(e));

export function useRates(): UseRatesState {
  const [state, setState] = useState<UseRatesState>({ status: "idle", data: null, error: null });

  useEffect(() => {
    let cancelled: boolean = false;

    setState({ status: "loading", data: null, error: null });

    (async () => {
      try {
        const res = await fetch(RATES_CONFIG_PATH, { credentials: "omit", cache: "no-store" });
        if (!res.ok) throw new Error(`Failed to load rates.json (${res.status})`);
        const json: unknown = await res.json();
        const parsed = RatesConfigSchema.parse(json);
        if (!cancelled) setState({ status: "success", data: parsed, error: null });
      } catch (err: unknown) {
        if (!cancelled) setState({ status: "error", data: null, error: toError(err) });
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}
