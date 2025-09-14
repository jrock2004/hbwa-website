import clsx from "clsx";

export function SlideshowDots({ count, current, regionId, goTo }: SlideshowDotsProps) {
  return (
    <div className="flex items-center gap-1.5" role="tablist" aria-label="Slides">
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          role="tab"
          aria-selected={i === current}
          aria-controls={`${regionId}-panel-${i}`}
          aria-label={`Go to slide ${i + 1}`}
          onClick={() => goTo(i)}
          className={clsx(
            "h-2.5 w-2.5 rounded-full ring-offset-2 outline-none",
            i === current
              ? "bg-[hsl(var(--brand))] ring-1 ring-[hsl(var(--brand))]"
              : "bg-[hsl(var(--muted-foreground)/0.4)] hover:bg-[hsl(var(--muted-foreground)/0.6)]",
            "focus-visible:ring-2 focus-visible:ring-[hsl(var(--brand))]",
          )}
        />
      ))}
    </div>
  );
}

interface SlideshowDotsProps {
  count: number;
  current: number;
  regionId: string;
  goTo: (i: number) => void;
}
