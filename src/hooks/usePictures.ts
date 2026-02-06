import { PicturesConfigSchema, type Picture } from "@/config/picturesConfig";
import { useJsonConfig } from "./useJsonConfig";

export function usePictures(): {
  data: Picture[] | null;
  error: Error | null;
  isLoading: boolean;
} {
  const state = useJsonConfig("/pictures.json", PicturesConfigSchema);
  return {
    data: state.status === "success" ? state.data.items : null,
    error: state.status === "error" ? state.error : null,
    isLoading: state.status === "idle" || state.status === "loading",
  };
}
