import { NavLink } from "react-router-dom";

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
        [
          "inline-flex items-center gap-1 pb-1 leading-none transition",
          isActive
            ? "text-foreground border-b-2 border-[hsl(var(--brand))]"
            : "text-muted-foreground hover:text-foreground",
        ].join(" ")
      }
    >
      {children}
    </NavLink>
  );
}
