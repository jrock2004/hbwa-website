import { useEffect, useState } from "react";
import type { DocumentItem } from "../config/documentsConfig";

export function useDocuments() {
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetch("/documents.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch reports");
        return res.json();
      })
      .then((data) => setDocuments(data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, []);

  return { documents, loading, error };
}
