import React, { useId, useRef, useState } from "react";
import clsx from "clsx";

type Side = "top" | "right" | "bottom" | "left";
export interface TooltipProps {
  content: React.ReactNode;
  side?: Side;
  delay?: number;
  className?: string;
  disabled?: boolean; // <- NEW
  children: React.ReactNode;
}

export function Tooltip({
  content,
  side = "top",
  delay = 120,
  className = "",
  disabled = false,
  children,
}: TooltipProps) {
  const id = useId();
  const [open, setOpen] = useState(false);
  const timer = useRef<number | null>(null);

  const show = () => {
    if (disabled) return;
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setOpen(true), delay);
  };
  const hide = () => {
    if (timer.current) window.clearTimeout(timer.current);
    setOpen(false);
  };

  const pos =
    side === "top"
      ? "bottom-full mb-2 left-1/2 -translate-x-1/2"
      : side === "bottom"
        ? "top-full mt-2 left-1/2 -translate-x-1/2"
        : side === "left"
          ? "right-full mr-2 top-1/2 -translate-y-1/2"
          : "left-full ml-2 top-1/2 -translate-y-1/2";

  return (
    <span
      className="relative inline-flex max-w-full"
      onPointerEnter={show}
      onPointerLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      <span
        tabIndex={0}
        aria-describedby={open && !disabled ? id : undefined}
        className="max-w-full outline-none"
      >
        {children}
      </span>

      <span
        id={id}
        role="tooltip"
        aria-hidden={disabled || !open}
        className={clsx(
          "pointer-events-none absolute z-[9999] max-w-xs rounded-md px-2.5 py-1.5 text-[11px] leading-snug font-medium select-none",
          "bg-black/90 text-white mix-blend-normal shadow-2xl ring-1 ring-white/20 drop-shadow-lg backdrop-blur-sm",
          "translate-y-0.5 scale-[0.98] opacity-0 transition-all duration-150 ease-out",
          !disabled && open && "translate-y-0 scale-100 opacity-100",
          pos,
          className,
        )}
      >
        {content}
      </span>
    </span>
  );
}
