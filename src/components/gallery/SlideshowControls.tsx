import clsx from "clsx";

export function SlideshowControls({
  onPrev,
  onNext,
  playing,
  onPlayPause,
  isAutoPaused,
}: SlideshowControlsProps) {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={onPrev}
        className={clsx(
          "inline-flex items-center gap-1 rounded-xl px-3 py-1.5 text-sm",
          "bg-[hsl(var(--muted))] text-[hsl(var(--foreground))]",
          "hover:bg-[hsl(var(--muted)/0.9)]",
          "focus-visible:ring-2 focus-visible:ring-[hsl(var(--brand))] focus-visible:outline-none",
        )}
        aria-label="Previous slide"
      >
        <span aria-hidden>◀</span>
        <span className="sr-only sm:not-sr-only">Prev</span>
      </button>
      <button
        type="button"
        onClick={onPlayPause}
        className={clsx(
          "inline-flex items-center gap-1 rounded-xl px-3 py-1.5 text-sm",
          "bg-[hsl(var(--muted))] text-[hsl(var(--foreground))]",
          "hover:bg-[hsl(var(--muted)/0.9)]",
          "focus-visible:ring-2 focus-visible:ring-[hsl(var(--brand))] focus-visible:outline-none",
        )}
        aria-pressed={playing}
        aria-label={
          !playing
            ? "Play slideshow"
            : isAutoPaused
              ? "Slideshow paused temporarily (hover/focus)"
              : "Pause slideshow"
        }
        title={!playing ? "Play" : isAutoPaused ? "Paused while hovered or focused" : "Pause"}
      >
        <span aria-hidden>{!playing ? "▶" : "⏸"}</span>
        <span className="sr-only sm:not-sr-only">
          {!playing ? "Play" : isAutoPaused ? "Paused (hover)" : "Pause"}
        </span>
      </button>
      <button
        type="button"
        onClick={onNext}
        className={clsx(
          "inline-flex items-center gap-1 rounded-xl px-3 py-1.5 text-sm",
          "bg-[hsl(var(--muted))] text-[hsl(var(--foreground))]",
          "hover:bg-[hsl(var(--muted)/0.9)]",
          "focus-visible:ring-2 focus-visible:ring-[hsl(var(--brand))] focus-visible:outline-none",
        )}
        aria-label="Next slide"
      >
        <span className="sr-only sm:not-sr-only">Next</span>
        <span aria-hidden>▶</span>
      </button>
    </div>
  );
}

interface SlideshowControlsProps {
  onPrev: () => void;
  onNext: () => void;
  playing: boolean;
  onPlayPause: () => void;
  isAutoPaused: boolean;
}
