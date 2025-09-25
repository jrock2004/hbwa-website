export default function WaveFooter() {
  return (
    <div className="pointer-events-none relative mt-4 w-full select-none" aria-hidden>
      <svg
        className="block w-full opacity-70 [filter:drop-shadow(0_2px_6px_hsl(var(--brand)/.18))]"
        viewBox="0 0 1440 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Decorative water waves"
      >
        <path
          d="M0 60 C 120 40 240 80 360 60 C 480 40 600 0 720 20 C 840 40 960 100 1080 90 C 1200 80 1320 20 1440 40 L 1440 120 L 0 120 Z"
          fill="hsl(var(--brand)/.08)"
        />
        <path
          d="M0 70 C 120 90 240 50 360 70 C 480 90 600 120 720 100 C 840 80 960 20 1080 30 C 1200 40 1320 100 1440 80 L 1440 120 L 0 120 Z"
          fill="hsl(var(--brand)/.12)"
        />
        <path
          d="M0 85 C 120 65 240 95 360 85 C 480 75 600 55 720 65 C 840 75 960 115 1080 105 C 1200 95 1320 55 1440 65 L 1440 120 L 0 120 Z"
          fill="hsl(var(--brand)/.18)"
        />
      </svg>
      <div className="-mt-3 h-3 w-full bg-gradient-to-b from-[hsl(var(--brand)/.12)] to-transparent" />
    </div>
  );
}
