import { Link } from "react-router-dom";
import { useMemo, useState } from "react";

// HBWA 404 / Not Found page
// - Stays on brand (water / utility) with a playful tone
// - Uses Tailwind utility tokens (no external CSS)
// - Accessible: clear headings, focus states, good contrast, aria labels
// - Responsive & lightweight; zero external assets
// - Offers quick links that match the site IA
// - Includes subtle animation + SVG wave for fun

// Update these if routes change
const POPULAR_LINKS = [
  { title: "Home", to: "/" },
  { title: "Alerts", to: "/alerts" },
  { title: "Water Quality", to: "/water-quality" },
  { title: "Rates", to: "/rates" },
  { title: "Documents", to: "/documents" },
  { title: "Contact", to: "/contact" },
  { title: "Governance", to: "/governance" },
  { title: "Policies", to: "/policies" },
  { title: "Newsletters", to: "/newsletters" },
  { title: "Conservation", to: "/conservation" },
  { title: "Links", to: "/links" },
  { title: "Gallery", to: "/gallery" },
];

export default function NotFound() {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return POPULAR_LINKS;
    return POPULAR_LINKS.filter((l) => l.title.toLowerCase().includes(q));
  }, [query]);

  return (
    <main className="relative isolate min-h-[calc(100dvh-4rem)] overflow-hidden">
      {/* Background wash */}
      <div
        aria-hidden
        className="from-muted to-background pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b"
      />

      {/* Floating droplet */}
      <div className="absolute top-4 right-4 md:top-8 md:right-8" aria-hidden>
        <span
          className="ring-muted-foreground/20 inline-flex h-12 w-12 animate-bounce items-center justify-center rounded-full bg-[hsl(var(--muted))] text-3xl shadow-sm ring-1 ring-inset"
          title="Splash!"
        >
          💧
        </span>
      </div>

      <section className="mx-auto grid max-w-5xl grid-cols-1 items-center gap-10 px-4 py-16 md:grid-cols-2 md:gap-16 md:py-24">
        {/* Left: Copy */}
        <div>
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-[hsl(var(--brand)/0.25)] bg-[hsl(var(--muted))] px-3 py-1 text-xs font-medium tracking-wide text-[hsl(var(--foreground))]/80">
            <span className="inline-block h-2 w-2 rounded-full bg-[hsl(var(--brand))]" />
            Error 404
          </p>
          <h1 className="text-foreground text-4xl leading-tight font-extrabold tracking-tight text-balance sm:text-5xl">
            This page went down the wrong pipe
          </h1>
          <p className="text-muted-foreground mt-3 text-base text-pretty sm:text-lg">
            We couldn’t find the page you were looking for. Try one of the quick links below or head
            back to the homepage.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-transparent bg-[hsl(var(--brand))] px-4 py-2 text-sm font-semibold text-[hsl(var(--brand-foreground))] shadow-sm transition hover:opacity-90 focus:outline-none focus-visible:ring-4 focus-visible:ring-[hsl(var(--brand)/0.35)]"
            >
              ⟵ Go Home
            </Link>
            <Link
              to="/alerts"
              className="text-foreground/90 inline-flex items-center justify-center gap-2 rounded-2xl border border-[hsl(var(--brand)/0.25)] bg-[hsl(var(--muted))] px-4 py-2 text-sm font-semibold shadow-sm transition hover:bg-[hsl(var(--muted))/0.9] focus:outline-none focus-visible:ring-4 focus-visible:ring-[hsl(var(--brand)/0.2)]"
            >
              View Alerts
            </Link>
            <a
              href="mailto:info@hbwa.example?subject=Broken%20link%20report"
              className="bg-background text-foreground/90 inline-flex items-center justify-center gap-2 rounded-2xl border border-[hsl(var(--brand)/0.25)] px-4 py-2 text-sm font-semibold shadow-sm transition hover:bg-[hsl(var(--muted))] focus:outline-none focus-visible:ring-4 focus-visible:ring-[hsl(var(--brand)/0.2)]"
            >
              Report a broken link
            </a>
          </div>
        </div>

        {/* Right: Search + Quick links */}
        <div className="w-full">
          <label htmlFor="q" className="sr-only">
            Filter quick links
          </label>
          <div className="group relative">
            <input
              id="q"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search quick links (e.g., Rates, Documents)"
              autoComplete="off"
              className="bg-background/80 placeholder:text-muted-foreground/70 w-full rounded-2xl border border-[hsl(var(--brand)/0.25)] px-4 py-3 pe-12 text-base shadow-sm transition outline-none focus:border-[hsl(var(--brand))] focus:ring-4 focus:ring-[hsl(var(--brand)/0.2)]"
            />
            <span className="text-muted-foreground/70 pointer-events-none absolute inset-y-0 end-3 inline-flex items-center">
              🔎
            </span>
          </div>

          <ul role="list" className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2" aria-live="polite">
            {filtered.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="group block rounded-2xl border border-[hsl(var(--brand)/0.15)] bg-[hsl(var(--card))] p-4 shadow-sm transition hover:border-[hsl(var(--brand)/0.35)] hover:shadow-md focus:outline-none focus-visible:ring-4 focus-visible:ring-[hsl(var(--brand)/0.25)]"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-foreground text-sm font-semibold transition-transform group-hover:translate-x-0.5">
                      {link.title}
                    </span>
                    <span
                      aria-hidden
                      className="ms-2 inline-flex h-8 w-8 items-center justify-center rounded-xl border border-[hsl(var(--brand)/0.2)] bg-[hsl(var(--muted))] text-base"
                    >
                      →
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>

          {filtered.length === 0 && (
            <p className="text-muted-foreground mt-4 text-sm">
              No matches. Try a different search term.
            </p>
          )}
        </div>
      </section>

      {/* Decorative waves at the bottom */}
      <WaveFooter />
    </main>
  );
}

function WaveFooter() {
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
