import NavLinkItem from "./NavLinkItem";
import MoreDropdown from "./MoreDropdown";
import type { NavItem } from "../../nav/items";

export default function DesktopNav({
  primary,
  more,
  moreOpen,
  setMoreOpen,
  className = "",
}: {
  primary: NavItem[];
  more: NavItem[];
  moreOpen: boolean;
  setMoreOpen: (v: boolean) => void;
  className?: string;
}) {
  return (
    <nav className={`hidden items-end gap-6 text-sm md:flex ${className}`} aria-label="Primary">
      {primary.map((n) => (
        <NavLinkItem key={n.to} to={n.to} exact={n.exact}>
          {n.label}
        </NavLinkItem>
      ))}
      <MoreDropdown items={more} open={moreOpen} setOpen={setMoreOpen} />
    </nav>
  );
}
