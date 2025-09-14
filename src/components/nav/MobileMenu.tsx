import { NavLink } from "react-router-dom";
import clsx from "clsx";
import { useEffect, useRef } from "react";
import { motion, AnimatePresence, type Variants } from "motion/react";
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
  toggleRef: React.MutableRefObject<HTMLButtonElement | null>;
}) {
  const panelRef = useRef<HTMLDivElement | null>(null);
  useFocusTrap(open, panelRef);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, setOpen]);

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const panelVariants: Variants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 320, damping: 28 },
    },
    exit: { opacity: 0, y: -20, transition: { duration: 0.15 } },
  };

  return (
    <AnimatePresence>
      {open && (
        <div
          id="mobile-overlay"
          className="fixed inset-x-0 top-16 bottom-0 z-50 md:hidden"
          aria-hidden={!open}
        >
          {/* Scrim */}
          <motion.div
            key="scrim"
            className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={overlayVariants}
            transition={{ duration: 0.2 }}
            onClick={() => setOpen(false)}
          />

          {/* Panel */}
          <motion.div
            key="panel"
            ref={panelRef}
            tabIndex={-1}
            role="navigation"
            aria-label="Mobile navigation"
            className="bg-background border-border relative border-t shadow-xl"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={panelVariants}
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
          </motion.div>
        </div>
      )}
    </AnimatePresence>
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
        clsx(
          "rounded-lg px-3 py-2 focus:ring-2 focus:ring-[hsl(var(--ring))] focus:outline-none",
          isActive
            ? "text-foreground bg-[hsl(var(--muted))]"
            : "text-muted-foreground hover:text-foreground hover:bg-[hsl(var(--muted))]"
        )
      }
    >
      {children}
    </NavLink>
  );
}
