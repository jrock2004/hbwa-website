import { useEffect, useState } from "react";
import type { z } from "zod";

export type JsonConfigState<T> =
  | { status: "idle" | "loading"; data: null; error: null }
  | { status: "success"; data: T; error: null }
  | { status: "error"; data: null; error: Error };

const toError = (e: unknown): Error =>
  e instanceof Error ? e : new Error(typeof e === "string" ? e : JSON.stringify(e));

export function useJsonConfig<T>(path: string, schema: z.ZodType<T>): JsonConfigState<T> {
  const [state, setState] = useState<JsonConfigState<T>>({
    status: "idle",
    data: null,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;

    setState({ status: "loading", data: null, error: null });

    (async () => {
      try {
        const res = await fetch(path, { cache: "no-store" });
        if (!res.ok) throw new Error(`Failed to load ${path} (${res.status})`);
        const json: unknown = await res.json();
        const parsed = schema.parse(json);
        if (!cancelled) setState({ status: "success", data: parsed, error: null });
      } catch (err: unknown) {
        if (!cancelled) setState({ status: "error", data: null, error: toError(err) });
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [path, schema]);

  return state;
}
