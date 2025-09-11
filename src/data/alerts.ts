import { ROUTES } from "../nav/items";

export const ALERTS: Alert[] = [
  {
    body: "Water service will be interrupted in the downtown area for maintenance. Please plan accordingly.",
    date: "2025-06-21T00:00:00Z",
    id: "a1",
    severity: "info",
    title: "Planned maintenance: 6/21 10pm–1am",
    to: ROUTES.alerts,
  },
  {
    body: "The boil advisory for Oak St / Maple Ave has been lifted. Thank you for your patience.",
    date: "2025-06-10T12:00:00Z",
    id: "a2",
    severity: "success",
    title: "Boil advisory lifted (Oak St / Maple Ave)",
    to: ROUTES.alerts,
  },
  {
    body: "Expect temporary discoloration and pressure changes.",
    date: "2025-05-28T00:00:00Z",
    id: "a3",
    severity: "warning",
    title: "Hydrant flushing next week",
    to: ROUTES.alerts,
  },
];

export type Alert = {
  body?: string;
  date: string;
  id: string;
  severity: "info" | "warning" | "danger" | "success";
  title: string;
  to: (typeof ROUTES)[keyof typeof ROUTES];
};
