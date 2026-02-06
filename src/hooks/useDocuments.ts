import { DocumentsSchema } from "@/config/documentsConfig";
import type { DocumentItem } from "@/config/documentsConfig";
import { useJsonConfig } from "./useJsonConfig";

export function useDocuments(): {
  documents: DocumentItem[];
  loading: boolean;
  error: Error | null;
} {
  const state = useJsonConfig("/documents.json", DocumentsSchema);
  return {
    documents: state.status === "success" ? state.data : [],
    loading: state.status === "idle" || state.status === "loading",
    error: state.status === "error" ? state.error : null,
  };
}
