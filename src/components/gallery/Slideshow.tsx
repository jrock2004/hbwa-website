import { useEffect, useMemo, useRef, useState } from "react";
import clsx from "clsx";
import type { Picture } from "@/config/picturesConfig";

// tweak here if you want a default ratio when width/height are missing
const FALLBACK_ASPECT = "16 / 9";
const DEFAULT_SLIDESHOW_INTERVAL = 5000;

export default function Slideshow({
  pictures,
  interval = DEFAULT_SLIDESHOW_INTERVAL,
  autoPlay = true,
  ariaLabel = "Gallery slideshow",
  loop = true,
  className,
}: Props) {
  const count = pictures?.length ?? 0;
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(autoPlay);

  // pause signals
  const [isUserFocus, setIsUserFocus] = useState(false);
  const [isMediaHover, setIsMediaHover] = useState(false);
  const [prefersReduced, setPrefersReduced] = useState(false);

  // image load state to fade-in & show skeleton
  const [loadedBySrc, setLoadedBySrc] = useState<Record<string, boolean>>({});

  const regionId = useMemo(() => `slideshow-${Math.random().toString(36).slice(2)}`, []);
  const liveRef = useRef<HTMLDivElement | null>(null);
  const timerRef = useRef<number | null>(null);

  const clamp = (i: number) => {
    if (loop) return (i + count) % count;
    return Math.max(0, Math.min(count - 1, i));
  };

  const next = () => setIndex((i) => clamp(i + 1));
  const prev = () => setIndex((i) => clamp(i - 1));
  const goTo = (i: number) => setIndex(clamp(i));

  const announce = (msg: string) => {
    if (liveRef.current) liveRef.current.textContent = msg;
  };

  // prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPrefersReduced(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  // prefetch the next image to smooth transitions
  useEffect(() => {
    const nextPic = pictures?.[clamp(index + 1)];
    if (nextPic?.src) {
      const img = new Image();
      img.src = nextPic.src;
    }
  }, [index, pictures]);

  // autoplay, now CLS-safe since height is reserved
  useEffect(() => {
    if (!playing || prefersReduced || isMediaHover || isUserFocus || count < 2) return;

    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    timerRef.current = window.setTimeout(() => next(), interval);

    return () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [playing, index, interval, isMediaHover, isUserFocus, prefersReduced, count]);

  // SR announce
  useEffect(() => {
    if (count > 0) announce(`Slide ${index + 1} of ${count}`);
  }, [index, count]);

  if (!pictures || count === 0) return null;
  const pic = pictures[index];
  const aspect = pic.width && pic.height ? `${pic.width} / ${pic.height}` : FALLBACK_ASPECT;

  const isFirst = index === 0;
  const isLoaded = !!loadedBySrc[pic.src];
  const isAutoPaused = playing && (isMediaHover || isUserFocus || prefersReduced);

  const onKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "ArrowLeft":
        e.preventDefault();
        prev();
        break;
      case "ArrowRight":
        e.preventDefault();
        next();
        break;
      case "Home":
        e.preventDefault();
        goTo(0);
        break;
      case "End":
        e.preventDefault();
        goTo(count - 1);
        break;
      case " ":
      case "Enter":
        if ((e.target as HTMLElement).id === regionId) {
          e.preventDefault();
          setPlaying((p) => !p);
        }
        break;
    }
  };

  return (
    <section
      id={regionId}
      tabIndex={0}
      onKeyDown={onKeyDown}
      onFocus={(e) => {
        if (e.currentTarget === e.target) setIsUserFocus(true);
      }}
      onBlur={(e) => {
        if (e.currentTarget === e.target) setIsUserFocus(false);
      }}
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      aria-live="off"
      className={clsx(
        "relative w-full outline-none select-none",
        "rounded-2xl bg-[hsl(var(--card))] shadow-sm",
        "ring-1 ring-[hsl(var(--muted)/0.4)] dark:ring-white/15",
        "p-3 sm:p-4",
        className,
      )}
    >
      {/* Live region for announcements */}
      <div ref={liveRef} aria-live="polite" className="sr-only" />

      {/* Media area: aspect-ratio reserves height to prevent CLS */}
      <div
        className={clsx(
          "relative w-full overflow-hidden rounded-xl",
          "bg-[hsl(var(--card))] dark:bg-white/5",
        )}
        style={{ aspectRatio: aspect }}
        onMouseEnter={() => setIsMediaHover(true)}
        onMouseLeave={() => setIsMediaHover(false)}
      >
        {/* Skeleton while image paints */}
        {!isLoaded && (
          <div
            className={clsx(
              "absolute inset-0 animate-pulse",
              "bg-[hsl(var(--muted))] dark:bg-white/10",
            )}
            aria-hidden="true"
          />
        )}

        {/* The image fills the reserved box without shifting layout */}
        <img
          key={pic.src}
          src={pic.src}
          alt={pic.alt}
          width={pic.width}
          height={pic.height}
          decoding="async"
          loading={isFirst ? "eager" : "lazy"}
          fetchPriority={isFirst ? ("high" as const) : ("auto" as const)}
          onLoad={() => setLoadedBySrc((m) => (m[pic.src] ? m : { ...m, [pic.src]: true }))}
          className={clsx(
            "absolute inset-0 m-auto",
            "h-full w-full object-contain",
            "transition-opacity duration-300",
            isLoaded ? "opacity-100" : "opacity-0",
          )}
          sizes="(min-width: 1024px) 1024px, 100vw"
        />

        {(pic.title || pic.caption) && (
          <figcaption
            className={clsx(
              "pointer-events-none absolute inset-x-0 bottom-0",
              "flex flex-col gap-0.5 p-3 sm:p-4",
              "bg-gradient-to-t from-black/60 to-transparent text-white",
            )}
          >
            {pic.title && <span className="text-sm font-medium sm:text-base">{pic.title}</span>}
            {pic.caption && <span className="text-xs opacity-90 sm:text-sm">{pic.caption}</span>}
          </figcaption>
        )}
      </div>

      {/* Controls */}
      <div className="mt-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={prev}
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
            onClick={() => setPlaying((p) => !p)}
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
            onClick={next}
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

        {/* Dots */}
        <div className="flex items-center gap-1.5" role="tablist" aria-label="Slides">
          {pictures.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === index}
              aria-controls={`${regionId}-panel-${i}`}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => goTo(i)}
              className={clsx(
                "h-2.5 w-2.5 rounded-full ring-offset-2 outline-none",
                i === index
                  ? "bg-[hsl(var(--brand))] ring-1 ring-[hsl(var(--brand))]"
                  : "bg-[hsl(var(--muted-foreground)/0.4)] hover:bg-[hsl(var(--muted-foreground)/0.6)]",
                "focus-visible:ring-2 focus-visible:ring-[hsl(var(--brand))]",
              )}
            />
          ))}
        </div>
      </div>

      {/* Hidden panels for a11y mapping */}
      <div className="sr-only" aria-live="polite">
        {pictures.map((p, i) => (
          <div key={i} id={`${regionId}-panel-${i}`} role="tabpanel">
            {p.title || p.caption || p.alt}
          </div>
        ))}
      </div>
    </section>
  );
}

type Props = {
  pictures: Picture[];
  interval?: number;
  autoPlay?: boolean;
  ariaLabel?: string;
  loop?: boolean;
  className?: string;
};
