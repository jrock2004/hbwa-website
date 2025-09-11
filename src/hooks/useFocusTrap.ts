import { useEffect } from "react";

// Accept either RefObject or MutableRefObject, and allow null currents
export function useFocusTrap<T extends HTMLElement>(
  active: boolean,
  container: React.RefObject<T | null> | React.MutableRefObject<T | null>,
) {
  useEffect(() => {
    const el = container?.current;
    if (!active || !el) return;

    const getFocusable = () =>
      Array.from(
        el.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), select, input, textarea, [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((n) => !n.hasAttribute("disabled") && n.tabIndex !== -1);

    const prev = document.activeElement as HTMLElement | null;
    (getFocusable()[0] || el).focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const list = getFocusable();
      if (!list.length) return;
      const first = list[0];
      const last = list[list.length - 1];
      const a = document.activeElement as HTMLElement | null;

      if (!e.shiftKey && a === last) {
        e.preventDefault();
        first.focus();
      } else if (e.shiftKey && a === first) {
        e.preventDefault();
        last.focus();
      }
    };

    el.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      el.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
      prev?.focus?.();
    };
  }, [active, container]);
}
