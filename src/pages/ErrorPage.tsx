import type { JSX } from "react";
import { Link, useLocation, useNavigate, useRouteError } from "react-router-dom";
import NotFound from "./NotFound";
import {
  ExclamationTriangleIcon,
  BellAlertIcon,
  PhoneIcon,
  EnvelopeIcon,
  ArrowPathIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";
import { useSiteConfig } from "@/hooks/useSiteConfig";
import WaveFooter from "@/components/WaveFooter";

export default function ErrorPage(): JSX.Element {
  const err = useRouteError();
  const nav = useNavigate();
  const loc = useLocation();
  const { data: site } = useSiteConfig();

  function isRouteErrorResponseType(error: unknown): error is RouteErrorResponse {
    return (
      typeof error === "object" && error !== null && "status" in error && "statusText" in error
    );
  }

  const isResp = isRouteErrorResponseType(err);
  const status = isResp ? err.status : 500;
  const statusText = isResp ? err.statusText : "Internal Error";

  const message =
    (isResp && err.data?.message) ||
    (err instanceof Error ? err.message : undefined) ||
    "Something went wrong while loading this page.";

  if (status === 404) return <NotFound />;

  const phone = site?.contact?.phone ?? "610-000-0000";
  const email = site?.contact?.email ?? "info@example.org";
  const telHref = `tel:${phone.replace(/[^\d+]/g, "")}`;

  const tryAgain = () => nav(0);

  const bodyForEmail = encodeURIComponent(
    [
      "HBWA website error report",
      "--------------------------------",
      `URL: ${location.origin}${loc.pathname}${loc.search}${loc.hash}`,
      `Status: ${status} ${statusText}`,
      `Message: ${message}`,
    ].join("\n"),
  );

  const IMAGE_SRC = "/images/error-image.png"; // public/images/error-image.png

  return (
    <section className="relative isolate flex min-h-full flex-col overflow-hidden">
      <section className="mx-auto max-w-5xl px-4 py-10 sm:py-16">
        {/* Emergency / main break CTA */}
        <div
          role="alert"
          aria-live="polite"
          className="mb-8 rounded-2xl border border-[hsl(var(--brand)/0.25)] bg-[hsl(var(--brand)/0.06)] p-4 sm:p-6"
        >
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[hsl(var(--brand))] text-[hsl(var(--brand-foreground))] shadow-sm">
              <BellAlertIcon className="h-6 w-6" />
            </div>
            <div className="min-w-0">
              <h2 className="text-foreground text-lg leading-6 font-semibold">
                Water emergency or suspected main break?
              </h2>
              <p className="text-muted-foreground mt-1 text-sm">
                If you see water bubbling in the street, a sudden loss of pressure, or a major leak,
                please contact us immediately.
              </p>
              <div className="mt-3 flex flex-wrap gap-3">
                <a
                  href={telHref}
                  className="inline-flex items-center gap-2 rounded-2xl bg-[hsl(var(--brand))] px-4 py-2 text-sm font-semibold text-[hsl(var(--brand-foreground))] shadow-sm transition hover:opacity-90 focus-visible:ring-4 focus-visible:ring-[hsl(var(--brand)/0.35)] focus-visible:outline-none"
                >
                  <PhoneIcon className="h-5 w-5" />
                  Call {phone}
                </a>
                <Link
                  to="/alerts"
                  className="text-foreground/90 inline-flex items-center gap-2 rounded-2xl border border-[hsl(var(--brand)/0.25)] bg-[hsl(var(--muted))] px-4 py-2 text-sm font-semibold shadow-sm transition hover:bg-[hsl(var(--muted))/0.9] focus-visible:ring-4 focus-visible:ring-[hsl(var(--brand)/0.2)] focus-visible:outline-none"
                >
                  <ExclamationTriangleIcon className="h-5 w-5" />
                  View current alerts
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Card with image + actions */}
        <div className="rounded-2xl border border-[hsl(var(--brand)/0.15)] bg-[hsl(var(--card))] p-6 shadow-sm sm:p-8">
          <div className="grid items-center gap-8 md:grid-cols-2">
            {/* Image */}
            <figure className="order-first md:order-none">
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-[hsl(var(--muted))] ring-1 ring-[hsl(var(--brand)/0.15)]">
                <img
                  src={IMAGE_SRC}
                  alt="City water icons: street work with splash, skyline in droplet, water tower, and hydrant."
                  loading="lazy"
                  decoding="async"
                  width={1600}
                  height={900}
                  className="absolute inset-0 h-full w-full object-contain"
                />
              </div>
              <figcaption className="sr-only">
                Illustration representing city water services and outages.
              </figcaption>
            </figure>

            {/* Copy + actions */}
            <div>
              <p className="mb-2 inline-flex items-center gap-2 rounded-full border border-[hsl(var(--brand)/0.25)] bg-[hsl(var(--muted))] px-3 py-1 text-xs font-medium tracking-wide text-[hsl(var(--foreground))]/80">
                <span className="inline-block h-2 w-2 rounded-full bg-[hsl(var(--brand))]" />
                {status} {statusText}
              </p>
              <h1 className="text-foreground text-3xl font-extrabold tracking-tight sm:text-4xl">
                Oops — a little hiccup on our end
              </h1>
              <p className="text-muted-foreground mt-2 text-base">
                {message} You can try the page again, check alerts, or reach us for help.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  onClick={tryAgain}
                  className="inline-flex items-center gap-2 rounded-2xl border border-transparent bg-[hsl(var(--brand))] px-4 py-2 text-sm font-semibold text-[hsl(var(--brand-foreground))] shadow-sm transition hover:opacity-90 focus-visible:ring-4 focus-visible:ring-[hsl(var(--brand)/0.35)] focus-visible:outline-none"
                >
                  <ArrowPathIcon className="h-5 w-5" />
                  Try again
                </button>
                <Link
                  to="/alerts"
                  className="text-foreground/90 inline-flex items-center gap-2 rounded-2xl border border-[hsl(var(--brand)/0.25)] bg-[hsl(var(--muted))] px-4 py-2 text-sm font-semibold shadow-sm transition hover:bg-[hsl(var(--muted))/0.9] focus-visible:ring-4 focus-visible:ring-[hsl(var(--brand)/0.2)] focus-visible:outline-none"
                >
                  <ExclamationTriangleIcon className="h-5 w-5" />
                  Alerts
                </Link>
                <Link
                  to="/"
                  className="text-foreground/90 bg-background inline-flex items-center gap-2 rounded-2xl border border-[hsl(var(--brand)/0.25)] px-4 py-2 text-sm font-semibold shadow-sm transition hover:bg-[hsl(var(--muted))] focus-visible:ring-4 focus-visible:ring-[hsl(var(--brand)/0.2)] focus-visible:outline-none"
                >
                  <HomeIcon className="h-5 w-5" />
                  Home
                </Link>
                <a
                  href={`mailto:${email}?subject=HBWA%20Website%20Error&body=${bodyForEmail}`}
                  className="text-foreground/90 bg-background inline-flex items-center gap-2 rounded-2xl border border-[hsl(var(--brand)/0.25)] px-4 py-2 text-sm font-semibold shadow-sm transition hover:bg-[hsl(var(--muted))] focus-visible:ring-4 focus-visible:ring-[hsl(var(--brand)/0.2)] focus-visible:outline-none"
                >
                  <EnvelopeIcon className="h-5 w-5" />
                  Email us
                </a>
              </div>

              {import.meta.env.DEV && (
                <details className="mt-5 rounded-xl border border-[hsl(var(--brand)/0.15)] bg-[hsl(var(--muted))] px-4 py-3 text-sm">
                  <summary className="cursor-pointer font-medium">
                    Technical details (dev only)
                  </summary>
                  <pre className="mt-2 text-xs whitespace-pre-wrap">
                    {status} {statusText}
                    {"\n"}
                    {message}
                    {hasStack(err) ? "\n\n" + err.stack : ""}
                  </pre>
                </details>
              )}
            </div>
          </div>
        </div>
      </section>
      <div className="relative mt-auto">
        <WaveFooter />
      </div>
    </section>
  );
}

function hasStack(error: unknown): error is { stack: string } {
  return (
    typeof error === "object" &&
    error !== null &&
    "stack" in error &&
    typeof (error as Record<string, unknown>).stack === "string"
  );
}

interface RouteErrorResponse {
  status: number;
  statusText: string;
  data?: { message?: string };
}
