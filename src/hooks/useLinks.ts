import { useEffect, useState } from "react";
import { LinksSchema, type Links } from "@/config/linksConfig";

type UseLinksState =
  | { status: "idle" | "loading"; data: null; error: null }
  | { status: "success"; data: Links; error: null }
  | { status: "error"; data: null; error: Error };

const toError = (e: unknown): Error =>
  e instanceof Error ? e : new Error(typeof e === "string" ? e : JSON.stringify(e));

export function useLinks(): UseLinksState {
  const [state, setState] = useState<UseLinksState>({
    status: "idle",
    data: null,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;
    setState({ status: "loading", data: null, error: null });

    (async () => {
      try {
        const res = await fetch("/links.json", { cache: "no-store" });
        if (!res.ok) throw new Error(`Failed to load links.json: ${res.status}`);

        const json: unknown = await res.json();
        const parsed = LinksSchema.parse(json);

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
