import { NavLink } from "react-router-dom";
import clsx from "clsx";

export default function NavLinkItem({
  to,
  exact,
  children,
}: {
  to: string;
  exact?: boolean;
  children: React.ReactNode;
}) {
  return (
    <NavLink
      to={to}
      end={!!exact}
      className={({ isActive }) =>
        clsx(
          "inline-flex items-center gap-1 pb-1 leading-none transition-colors",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--link-fg-hover)]",
          isActive
            ? "border-b-2 border-[var(--link-fg)] text-[var(--link-fg)]"
            : "text-muted-foreground hover:text-[var(--link-fg)]"
        )
      }
    >
      {children}
    </NavLink>
  );
}
