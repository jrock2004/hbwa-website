// hooks/usePictures.ts
import { useEffect, useState } from "react";
import type { Picture, PicturesConfig } from "@/config/picturesConfig";

type HookState = {
  data: Picture[] | null;
  error: Error | null;
  isLoading: boolean;
};

export function usePictures(): HookState {
  const [data, setData] = useState<Picture[] | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const ctrl = new AbortController();

    const load = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Vite injects BASE_URL as a string at build time.
        // Fall back to "/" if not present (tests/SSR, etc).
        const baseUrl: string =
          (import.meta as unknown as { env?: { BASE_URL?: string } })?.env?.BASE_URL ?? "/";

        const res = await fetch(`${baseUrl}pictures.json`, {
          signal: ctrl.signal,
          headers: { Accept: "application/json" },
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error(`Failed to load pictures.json (${res.status})`);
        }

        const json: unknown = await res.json();

        // Accept either { items: Picture[] } or raw Picture[] for flexibility
        let items: Picture[];
        if (Array.isArray(json)) {
          items = json as Picture[];
        } else {
          const cfg = json as Partial<PicturesConfig>;
          items = Array.isArray(cfg.items) ? cfg.items : [];
        }

        setData(items);
      } catch (e: unknown) {
        if (e instanceof Error) {
          // ignore abort errors
          if (e.name !== "AbortError") setError(e);
        } else {
          setError(new Error("Unknown error while loading pictures.json"));
        }
      } finally {
        setIsLoading(false);
      }
    };

    load();
    return () => ctrl.abort();
  }, []);

  return { data, error, isLoading };
}
