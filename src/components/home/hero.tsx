import { Link } from "react-router-dom";

export function Hero() {
  return (
    <section className="bg-muted" aria-labelledby="hero-heading">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-2">
        <div className="flex flex-col justify-center">
          <h1 id="hero-heading" className="text-xl font-semibold">
            Honey Brook Water Authority
          </h1>
          <p className="text-muted-foreground mt-3 text-sm leading-6">
            Providing safe, reliable water service to Honey Brook Borough & Township.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/pay" className="btn btn-primary">
              Pay Bill
            </Link>
            <Link to="/alerts" className="btn btn-ghost">
              View Alerts
            </Link>
            <Link to="/water-quality" className="btn btn-ghost">
              2024 Water Quality Report
            </Link>
          </div>
        </div>
        <div className="bg-muted aspect-video w-full rounded" aria-hidden>
          <img
            src="/images/booster-pump.jpg"
            alt="Honey Brook Water Authority Pump Station"
            className="h-full w-full rounded object-cover"
          />
        </div>
      </div>
    </section>
  );
}
