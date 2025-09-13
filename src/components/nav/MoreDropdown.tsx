import { useRef } from "react";
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
    <>
      <button
        ref={btnRef}
        type="button"
        className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 rounded-md px-1 pb-1 leading-none focus:ring-2 focus:ring-[hsl(var(--ring))] focus:outline-none"
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
        className={[
          "border-border bg-background absolute right-0 mt-5 w-56 rounded-xl border shadow-lg",
          "origin-top-right transform transition",
          open ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0",
        ].join(" ")}
      >
        <ul className="py-1">
          {items.map((m) => (
            <li key={m.to}>
              <NavLink
                to={m.to}
                role="menuitem"
                className={({ isActive }) =>
                  [
                    "block rounded-md px-3 py-2 focus:ring-2 focus:ring-[hsl(var(--ring))] focus:outline-none",
                    isActive
                      ? "text-foreground bg-[hsl(var(--muted))]"
                      : "text-muted-foreground hover:text-foreground",
                  ].join(" ")
                }
              >
                {m.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
