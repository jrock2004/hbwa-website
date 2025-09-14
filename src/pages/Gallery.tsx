import Slideshow from "@/components/gallery/Slideshow";
import { usePictures } from "@/hooks/usePictures";

export default function Gallery() {
  const { data: pictures, error, isLoading } = usePictures();

  return (
    <div className="mx-auto w-full max-w-5xl p-4 sm:p-6">
      <h1 className="text-2xl font-semibold tracking-tight">Gallery</h1>

      {/* Loading state */}
      {isLoading && (
        <div className="mt-4 h-[360px] w-full animate-pulse rounded-2xl bg-[hsl(var(--muted))] dark:bg-white/5" />
      )}

      {/* Error state */}
      {error && !isLoading && (
        <div className="mt-4 rounded-xl border border-red-300/60 bg-red-50 p-4 text-sm text-red-800 dark:border-red-400/40 dark:bg-red-950/30 dark:text-red-100">
          Failed to load pictures. {error.message}
        </div>
      )}

      {/* Empty state */}
      {!isLoading && !error && (!pictures || pictures.length === 0) && (
        <p className="mt-4 text-[hsl(var(--muted-foreground))]">
          No pictures found. Add images to <code>/public/slideshow</code> and list them in{" "}
          <code>/public/pictures.json</code>.
        </p>
      )}

      {/* Slideshow */}
      {!isLoading && !error && pictures && pictures.length > 0 && (
        <div className="mt-4">
          <Slideshow pictures={pictures} ariaLabel="HBWA Photo Gallery" autoPlay interval={5000} />
        </div>
      )}
    </div>
  );
}
