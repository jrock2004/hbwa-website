export type DocumentItem = {
  id: string;
  title: string;
  url: string; // pdf link
  category: "Minutes" | "Reports" | "Forms" | "Notices" | "Other";
  date: string; // ISO
};

export const DOCUMENTS: DocumentItem[] = [
  {
    id: "d1",
    title: "Board Minutes — May 2025",
    url: "/docs/minutes-2025-05.pdf",
    category: "Minutes",
    date: "2025-05-15",
  },
  {
    id: "d2",
    title: "Annual Water Quality Report 2024",
    url: "/docs/awqr-2024.pdf",
    category: "Reports",
    date: "2025-03-01",
  },
  {
    id: "d3",
    title: "New Service Application",
    url: "/docs/new-service-app.pdf",
    category: "Forms",
    date: "2024-11-01",
  },
];
