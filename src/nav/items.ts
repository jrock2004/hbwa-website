export const ROUTES = {
  alerts: "/alerts",
  waterQuality: "/water-quality",
  rates: "/rates",
  documents: "/documents",
  contact: "/contact",
  governance: "/governance",
  policies: "/policies",
  conservation: "/conservation",
  links: "/links",
  gallery: "/gallery",
};

export const primary: NavItem[] = [
  { to: "/", label: "Home", exact: true },
  { to: ROUTES.alerts, label: "Alerts" },
  { to: ROUTES.waterQuality, label: "Water Quality" },
  { to: ROUTES.rates, label: "Rates" },
  { to: ROUTES.documents, label: "Documents" },
  { to: ROUTES.contact, label: "Contact" },
];

export const more: NavItem[] = [
  { to: ROUTES.governance, label: "Governance" },
  { to: ROUTES.policies, label: "Policies" },
  { to: ROUTES.conservation, label: "Conservation" },
  { to: ROUTES.links, label: "Links" },
  { to: ROUTES.gallery, label: "Gallery" },
];

export type NavItem = { to: string; label: string; exact?: boolean };
