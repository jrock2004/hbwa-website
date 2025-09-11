import { NavLink } from "react-router-dom";
import { useRef } from "react";
import { useFocusTrap } from "../../hooks/useFocusTrap";
import type { NavItem } from "../../nav/items";

export default function MobileMenu({
  open,
  setOpen,
  primary,
  more,
  toggleRef,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
  primary: NavItem[];
  more: NavItem[];
  toggleRef: React.MutableRefObject<HTMLButtonElement | null>; // 👈
}) {
  const panelRef = useRef<HTMLDivElement | null>(null);
  useFocusTrap(open, panelRef);

  return (
    <div
      id="mobile-overlay"
      className={[
        "fixed inset-x-0 bottom-0 z-40 md:hidden",
        "top-16",
        open ? "pointer-events-auto" : "pointer-events-none",
      ].join(" ")}
      onClick={(e) => {
        if (e.target === e.currentTarget) setOpen(false);
      }}
    >
      {/* Scrim */}
      <div
        className={[
          "absolute inset-0 bg-black/30 backdrop-blur-[2px]",
          "transition-opacity duration-300",
          open ? "opacity-100" : "opacity-0",
        ].join(" ")}
      />
      {/* Panel */}
      <div
        ref={panelRef}
        tabIndex={-1}
        role="navigation"
        aria-label="Mobile navigation"
        className={[
          "bg-background border-border relative border-t shadow-xl",
          "transition-[transform,opacity] duration-300 ease-out",
          open ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0",
        ].join(" ")}
      >
        <div className="container-page flex flex-col gap-5 py-4">
          <Section title="Primary">
            {primary.map((n) => (
              <MobileLink key={n.to} to={n.to} onClick={() => setOpen(false)}>
                {n.label}
              </MobileLink>
            ))}
          </Section>

          <Section title="More">
            {more.map((m) => (
              <MobileLink key={m.to} to={m.to} onClick={() => setOpen(false)}>
                {m.label}
              </MobileLink>
            ))}
          </Section>

          <button
            onClick={() => {
              setOpen(false);
              toggleRef.current?.focus();
            }}
            className="border-border self-start rounded-md border px-3 py-2 text-sm focus:ring-2 focus:ring-[hsl(var(--ring))] focus:outline-none"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-muted-foreground mb-2 text-xs tracking-wide uppercase">{title}</div>
      <div className="flex flex-col gap-1">{children}</div>
    </div>
  );
}

function MobileLink({
  to,
  children,
  onClick,
}: {
  to: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        [
          "rounded-lg px-3 py-2 focus:ring-2 focus:ring-[hsl(var(--ring))] focus:outline-none",
          isActive
            ? "text-foreground bg-[hsl(var(--muted))]"
            : "text-muted-foreground hover:text-foreground hover:bg-[hsl(var(--muted))]",
        ].join(" ")
      }
    >
      {children}
    </NavLink>
  );
}
