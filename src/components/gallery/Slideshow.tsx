import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import clsx from "clsx";
import type { Picture } from "@/config/picturesConfig";
import { SlideshowImage } from "./SlideshowImage";
import { SlideshowCaption } from "./SlideshowCaption";
import { SlideshowControls } from "./SlideshowControls";
import { SlideshowDots } from "./SlideshowDots";
import { A11yPanels } from "./A11yPanels";

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

  // NEW: store transition direction for slide animation
  const [direction, setDirection] = useState<1 | -1>(1);

  // pause signals
  const [isUserFocus, setIsUserFocus] = useState(false);
  const [isMediaHover, setIsMediaHover] = useState(false);
  const [prefersReduced, setPrefersReduced] = useState(false);

  // image load state to fade-in & show skeleton
  const [loadedBySrc, setLoadedBySrc] = useState<Record<string, boolean>>({});

  const regionId = useMemo(() => `slideshow-${Math.random().toString(36).slice(2)}`, []);
  const liveRef = useRef<HTMLDivElement | null>(null);
  const timerRef = useRef<number | null>(null);

  const clamp = useCallback(
    (i: number) => {
      if (loop) return (i + count) % count;
      return Math.max(0, Math.min(count - 1, i));
    },
    [loop, count],
  );

  const next = useCallback(() => {
    setDirection(1);
    setIndex((i) => clamp(i + 1));
  }, [clamp]);

  const prev = useCallback(() => {
    setDirection(-1);
    setIndex((i) => clamp(i - 1));
  }, [clamp]);

  const goTo = useCallback(
    (i: number) => {
      setDirection(i > index ? 1 : -1);
      setIndex(clamp(i));
    },
    [clamp, index],
  );

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
  }, [index, pictures, clamp]);

  // autoplay, CLS-safe since height is reserved
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
  }, [playing, index, interval, isMediaHover, isUserFocus, prefersReduced, count, next]);

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

  // Helper to compute enter/exit offsets respecting reduced motion
  const dx = prefersReduced ? 0 : 40;

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

        {/* Animated slide/fade image */}
        <SlideshowImage
          src={pic.src}
          alt={pic.alt}
          width={pic.width}
          height={pic.height}
          isLoaded={isLoaded}
          isFirst={isFirst}
          direction={direction}
          dx={dx}
          onLoad={() => setLoadedBySrc((m) => (m[pic.src] ? m : { ...m, [pic.src]: true }))}
        />

        {/* Caption overlay */}
        <SlideshowCaption src={pic.src} title={pic.title} caption={pic.caption} />
      </div>

      {/* Controls and dots */}
      <div className="mt-3 flex items-center justify-between gap-2">
        <SlideshowControls
          onPrev={prev}
          onNext={next}
          playing={playing}
          onPlayPause={() => setPlaying((p) => !p)}
          isAutoPaused={isAutoPaused}
        />
        <SlideshowDots count={count} current={index} regionId={regionId} goTo={goTo} />
      </div>

      {/* Hidden panels for a11y mapping */}
      <A11yPanels pictures={pictures} regionId={regionId} />
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
