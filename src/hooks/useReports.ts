import { useEffect, useState } from "react";
import type { Report } from "../config/reportConfig";

export function useReports() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetch("/reports.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch reports");
        return res.json();
      })
      .then((data) => setReports(data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, []);

  return { reports, loading, error };
}
