import { useRef } from "react";
import clsx from "clsx";
import { NavLink } from "react-router-dom";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";
import type { NavItem } from "../../nav/items";

export default function MoreDropdown({
  items,
  open,
  setOpen,
}: {
  items: NavItem[];
  open: boolean;
  setOpen: (v: boolean) => void;
}) {
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useOnClickOutside([btnRef, menuRef], () => open && setOpen(false));

  return (
    <div className="relative self-end">
      <button
        ref={btnRef}
        type="button"
        className={clsx(
          "inline-flex items-center gap-1 pb-1 leading-none transition-colors",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--link-fg-hover)]",
          open
            ? "border-b-2 border-[var(--link-fg)] text-[var(--link-fg)]"
            : "text-muted-foreground hover:text-[var(--link-fg)]"
        )}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        More
        <svg
          className="relative top-px"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" fill="none" />
        </svg>
      </button>

      <div
        ref={menuRef}
        role="menu"
        className={clsx(
          "border-border bg-background absolute right-0 mt-2 w-56 rounded-xl border shadow-lg",
          "origin-top-right transition-all duration-150 ease-out",
          open ? "z-50 scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"
        )}
      >
        <ul className="py-1">
          {items.map((m) => (
            <li key={m.to}>
              <NavLink
                to={m.to}
                role="menuitem"
                className={({ isActive }) =>
                  clsx(
                    "block rounded-md px-3 py-2 focus:ring-2 focus:ring-[hsl(var(--ring))] focus:outline-none",
                    isActive
                      ? "text-foreground bg-[hsl(var(--muted))]"
                      : "text-muted-foreground hover:text-foreground"
                  )
                }
              >
                {m.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
