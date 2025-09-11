import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/documents", label: "Documents" },
  { to: "/alerts", label: "Alerts" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();

  // Close the menu on route change and restore focus to the toggle
  useEffect(() => {
    if (open) {
      setOpen(false);
      btnRef.current?.focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  // Escape closes; prevent background scroll when open
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        btnRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  // Focus trap inside the mobile panel
  useEffect(() => {
    if (!open || !panelRef.current) return;

    const panel = panelRef.current;

    const getFocusable = () =>
      Array.from(
        panel.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), select, input, textarea, [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((el) => !el.hasAttribute("disabled") && el.tabIndex !== -1);

    // Move initial focus to first focusable link
    const focusables = getFocusable();
    (focusables[0] || panel).focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const items = getFocusable();
      if (items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      } else if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      }
    };

    panel.addEventListener("keydown", handleKeyDown);
    return () => panel.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  return (
    <header className="bg-background/80 border-border sticky top-0 z-50 border-b backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between">
        <Link to="/" className="text-lg font-semibold">
          HBWA
        </Link>

        {/* Desktop nav */}
        <nav className="hidden gap-6 text-sm md:flex" aria-label="Primary">
          {nav.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              className={({ isActive }) =>
                [
                  "relative transition",
                  isActive
                    ? "text-foreground border-b-2 border-[hsl(var(--brand))] pb-1"
                    : "text-muted-foreground hover:text-foreground",
                ].join(" ")
              }
              // NavLink sets aria-current="page" automatically when active
              end={n.to === "/"} // only exact match active on Home
            >
              {n.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          {/* Mobile menu button */}
          <button
            ref={btnRef}
            className="border-border rounded-md border p-2 focus:ring-2 focus:ring-[hsl(var(--ring))] focus:outline-none md:hidden"
            aria-controls="mobile-nav"
            aria-expanded={open}
            aria-label="Toggle menu"
            onClick={() => setOpen((o) => !o)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile nav panel (animated, focus-trapped) */}
      <div
        id="mobile-nav"
        ref={panelRef}
        // Make the panel itself focusable as a fallback focus target
        tabIndex={-1}
        role="navigation"
        aria-label="Mobile navigation"
        className={[
          "border-border overflow-hidden border-t md:hidden",
          "transition-[max-height,opacity,transform] duration-300 ease-out",
          "motion-reduce:transform-none motion-reduce:transition-none",
          open
            ? "max-h-96 translate-y-0 opacity-100"
            : "pointer-events-none max-h-0 -translate-y-1 opacity-0",
        ].join(" ")}
      >
        <div className="container-page flex flex-col gap-3 py-3">
          {nav.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                [
                  "rounded-md px-1 py-1 focus:ring-2 focus:ring-[hsl(var(--ring))] focus:outline-none",
                  isActive
                    ? "text-foreground border-l-2 border-[hsl(var(--brand))] pl-3"
                    : "text-muted-foreground hover:text-foreground",
                ].join(" ")
              }
              end={n.to === "/"}
            >
              {n.label}
            </NavLink>
          ))}
          {/* Close button as a final focusable target */}
          <button
            onClick={() => {
              setOpen(false);
              btnRef.current?.focus();
            }}
            className="border-border mt-1 self-start rounded-md border px-3 py-2 text-sm focus:ring-2 focus:ring-[hsl(var(--ring))] focus:outline-none"
          >
            Close
          </button>
        </div>
      </div>
    </header>
  );
}
