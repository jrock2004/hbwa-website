import { useSiteConfig } from "@/hooks/useSiteConfig";
import { Link } from "react-router-dom";

export function Hero() {
  const { data: config } = useSiteConfig();
  if (!config) return null;

  return (
    <section className="bg-muted" aria-labelledby="hero-heading">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-2">
        <div className="flex flex-col justify-center">
          <h1 id="hero-heading" className="text-xl font-semibold">
            {config.hero.title}
          </h1>
          <p className="text-muted-foreground mt-3 text-sm leading-6">{config.hero.tagline}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            {config.hero.ctas.map((cta) => (
              <Link
                key={cta.label}
                to={cta.to}
                className={`btn ${
                  cta.variant === "primary"
                    ? "btn-primary"
                    : cta.variant === "outline"
                      ? "btn-outline"
                      : "btn-ghost"
                }`}
              >
                {cta.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="bg-muted aspect-video w-full rounded" aria-hidden>
          {config.hero.image && (
            <img
              src={config.hero.image.src}
              alt={config.hero.image.alt}
              className="h-full w-full rounded object-cover"
            />
          )}
        </div>
      </div>
    </section>
  );
}
