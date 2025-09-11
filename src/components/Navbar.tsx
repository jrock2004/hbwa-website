import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import DesktopNav from "./nav/DesktopNav";
import MobileMenu from "./nav/MobileMenu";
import { primary, more } from "../nav/items";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const mobileBtnRef = useRef<HTMLButtonElement | null>(null);
  const location = useLocation();

  // Close menus on route change; restore focus to mobile toggle
  useEffect(() => {
    if (mobileOpen) {
      setMobileOpen(false);
      mobileBtnRef.current?.focus();
    }
    if (moreOpen) setMoreOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  // ESC to close either menu
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (mobileOpen) {
        setMobileOpen(false);
        mobileBtnRef.current?.focus();
      }
      if (moreOpen) setMoreOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mobileOpen, moreOpen]);

  return (
    <header className="bg-background/80 border-border sticky top-0 z-50 border-b backdrop-blur">
      <div className="container-page flex h-16 items-center">
        {/* Full title on the left */}
        <Link to="/" className="text-base font-semibold whitespace-nowrap md:text-lg">
          Honey Brook Water Authority
        </Link>

        {/* Desktop nav on the right */}
        <DesktopNav
          primary={primary}
          more={more}
          moreOpen={moreOpen}
          setMoreOpen={setMoreOpen}
          className="ml-auto"
        />

        {/* Mobile toggle on far right */}
        <button
          ref={mobileBtnRef}
          className="border-border ml-auto rounded-md border p-2 focus:ring-2 focus:ring-[hsl(var(--ring))] focus:outline-none md:hidden"
          aria-controls="mobile-overlay"
          aria-expanded={mobileOpen}
          aria-label="Toggle menu"
          onClick={() => setMobileOpen((o) => !o)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" />
          </svg>
        </button>
      </div>

      <MobileMenu
        open={mobileOpen}
        setOpen={setMobileOpen}
        primary={primary}
        more={more}
        toggleRef={mobileBtnRef}
      />
    </header>
  );
}
