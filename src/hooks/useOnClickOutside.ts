// src/hooks/useOnClickOutside.ts
import { useEffect } from "react";

type AnyRef = React.MutableRefObject<HTMLElement | null> | React.RefObject<HTMLElement | null>;

export function useOnClickOutside(refs: AnyRef[], handler: (e: Event) => void) {
  useEffect(() => {
    const onDown = (e: Event) => {
      const target = e.target as Node;
      const inside = refs.some((r) => r.current && r.current.contains(target));
      if (!inside) handler(e);
    };

    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [refs, handler]);
}
