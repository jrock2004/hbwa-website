export type Alert = {
  id: string;
  title: string;
  body?: string;
  severity: "info" | "warning" | "danger" | "success";
  date: string; // ISO
};

export const ALERTS: Alert[] = [
  {
    id: "a1",
    title: "Planned maintenance: 6/21 10pm–1am",
    severity: "info",
    date: "2025-06-21T00:00:00Z",
  },
  {
    id: "a2",
    title: "Boil advisory lifted (Oak St / Maple Ave)",
    severity: "success",
    date: "2025-06-10T12:00:00Z",
  },
  {
    id: "a3",
    title: "Hydrant flushing next week",
    severity: "warning",
    date: "2025-05-28T00:00:00Z",
    body: "Expect temporary discoloration and pressure changes.",
  },
];
