import { useLayoutEffect, useRef, useState } from "react";

export function useIsTruncated<T extends HTMLElement>(deps: unknown[] = []) {
  const ref = useRef<T>(null);
  const [truncated, setTruncated] = useState(false);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const measure = () => {
      setTruncated(el.scrollWidth > el.clientWidth + 1);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    if (el.parentElement) ro.observe(el.parentElement);
    window.addEventListener("resize", measure);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
    // deps is intentionally passed from caller to control re-measurement timing
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { ref, truncated };
}
