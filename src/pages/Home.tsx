import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main className="container-page py-10">
      <section className="grid items-center gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Honey Brook Water Authority
          </h1>
          <p className="text-muted-foreground">
            A modern, accessible website starter ready for content migration from the legacy site.
          </p>
          <div className="flex gap-3">
            <Link to="/services" className="btn btn-primary">
              View Services
            </Link>
            <Link to="/contact" className="btn btn-ghost">
              Contact Us
            </Link>
          </div>
        </div>
        <div className="card p-6">
          <h2 className="mb-2 text-lg font-semibold">What’s included</h2>
          <ul className="text-muted-foreground list-inside list-disc space-y-1 text-sm">
            <li>React Router structure with semantic pages</li>
            <li>Tailwind v4 with light/dark themes via CSS variables</li>
            <li>Accessible components and sensible defaults</li>
          </ul>
        </div>
      </section>
    </main>
  );
}
