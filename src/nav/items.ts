export const primary: NavItem[] = [
  { to: "/", label: "Home", exact: true },
  { to: "/alerts", label: "Alerts" },
  { to: "/water-quality", label: "Water Quality" },
  { to: "/rates", label: "Rates" },
  { to: "/documents", label: "Documents" },
  { to: "/contact", label: "Contact" },
];

export const more: NavItem[] = [
  { to: "/governance", label: "Governance" },
  { to: "/policies", label: "Policies" },
  { to: "/newsletters", label: "Newsletters" },
  { to: "/conservation", label: "Conservation" },
  { to: "/links", label: "Links" },
  { to: "/gallery", label: "Gallery" },
];

export type NavItem = { to: string; label: string; exact?: boolean };
