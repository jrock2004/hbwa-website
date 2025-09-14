import { useMemo } from "react";
import { Link } from "react-router-dom";
import {
  ArrowDownTrayIcon,
  ArrowTopRightOnSquareIcon,
  BuildingOffice2Icon,
} from "@heroicons/react/24/outline";
import type { DocumentItem } from "../config/documentsConfig";
import { useDocuments } from "@/hooks/useDocuments";

export default function WaterQuality() {
  const { documents, loading, error } = useDocuments();
  const reports = useMemo(
    () => (documents ? documents.filter((d) => d.category === "Reports") : []),
    [documents],
  );
  const latestYear = useMemo(
    () =>
      reports.length
        ? Math.max(...reports.map((r: DocumentItem) => new Date(r.date).getFullYear()))
        : undefined,
    [reports],
  );

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      {/* Page header */}
      <header className="mb-8">
        <p className="text-muted-foreground text-sm/6 font-medium tracking-wide">Water Quality</p>
        <h1 className="mt-1 text-3xl/tight font-semibold tracking-tight">
          Annual Drinking Water Quality Report
        </h1>
        {latestYear && (
          <p className="text-muted-foreground mt-2 text-base">
            Latest CCR available: <span className="text-foreground font-medium">{latestYear}</span>
          </p>
        )}
      </header>

      {/* Introductory copy (adapted from legacy site) */}
      <section className="mb-10">
        <div className="bg-card rounded-2xl border p-6 shadow-sm">
          <p className="text-foreground text-base text-pretty">
            We’re pleased to share our Annual Water Quality Report. This report explains the quality
            of the water we deliver, how we protect our sources, and the continuous improvements we
            make to provide a safe and dependable supply to every customer.
          </p>
          <p className="text-foreground mt-4 text-base text-pretty">
            Nuestro informe anual sobre la calidad del agua está disponible.{" "}
            <em>
              “Este informe contiene información muy importante sobre su agua de beber. Tradúzcalo o
              hable con alguien que lo entienda bien.”
            </em>
          </p>
          <div className="bg-muted/60 text-muted-foreground mt-4 flex items-center gap-2 rounded-xl p-3 text-sm">
            <BuildingOffice2Icon className="size-5" />
            <span>
              Our system uses four deep groundwater wells and follows state and federal monitoring
              requirements.
            </span>
          </div>
        </div>
      </section>

      {/* Report list */}
      <section aria-labelledby="reports-heading" className="mb-14">
        <h2 id="reports-heading" className="mb-4 text-xl font-semibold tracking-tight">
          Consumer Confidence Reports (CCR)
        </h2>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {loading && <li>Loading reports…</li>}
          {error && <li className="text-red-600">Failed to load reports.</li>}
          {!loading &&
            !error &&
            reports
              .sort((a: DocumentItem, b: DocumentItem) => {
                // Sort by year descending, extracted from ISO date string
                const yearA = new Date(a.date).getFullYear();
                const yearB = new Date(b.date).getFullYear();
                return yearB - yearA;
              })
              .slice(0, 3)
              .map((r: DocumentItem) => {
                const year = new Date(r.date).getFullYear();
                return (
                  <li
                    key={r.id}
                    className="group bg-card rounded-2xl border p-5 shadow-sm transition hover:shadow-md"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-semibold">{year} CCR</h3>
                        <p className="text-muted-foreground mt-1 text-sm">
                          {r.title ?? "Annual Drinking Water Quality Report"}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 flex flex-wrap items-center gap-3">
                      <a
                        href={r.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:bg-muted focus:ring-ring inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-medium focus:ring-2 focus:outline-none"
                      >
                        <ArrowDownTrayIcon className="size-5" />
                        <span>Open PDF</span>
                      </a>
                    </div>
                  </li>
                );
              })}
        </ul>
        <p className="text-muted-foreground mt-4 text-sm">
          Need an older CCR?{" "}
          <Link to="/documents" className="underline underline-offset-4">
            Check our Documents page
          </Link>{" "}
          or contact the office.
        </p>
      </section>

      {/* Helpful resources */}
      <section aria-labelledby="resources-heading" className="mb-16">
        <h2 id="resources-heading" className="mb-4 text-xl font-semibold tracking-tight">
          Helpful Resources
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <a
            href="https://www.epa.gov/ccr"
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-card flex items-start gap-3 rounded-2xl border p-5 shadow-sm transition hover:shadow-md"
          >
            <ArrowTopRightOnSquareIcon className="size-4" />
            <div>
              <p className="font-medium">EPA: Consumer Confidence Reports</p>
              <p className="text-muted-foreground text-sm">
                Learn about what’s included in a CCR and how to read it.
              </p>
            </div>
          </a>
          <a
            href="https://www.pa.gov/environment/water/"
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-card flex items-start gap-3 rounded-2xl border p-5 shadow-sm transition hover:shadow-md"
          >
            <ArrowTopRightOnSquareIcon className="size-4" />
            <div>
              <p className="font-medium">Pennsylvania DEP: Drinking Water</p>
              <p className="text-muted-foreground text-sm">
                State-level information about drinking water standards and testing.
              </p>
            </div>
          </a>
        </div>
      </section>

      {/* Contact/help */}
      <section aria-labelledby="contact-heading" className="mb-10">
        <h2 id="contact-heading" className="mb-4 text-xl font-semibold tracking-tight">
          Questions about your water?
        </h2>
        <div className="bg-card rounded-2xl border p-6 shadow-sm">
          <ul className="text-foreground/90 list-inside list-disc text-sm">
            <li>Call the office during business hours and we’ll be happy to help.</li>
            <li>
              For after-hours emergencies, please use the emergency contact on our{" "}
              <Link to="/alerts" className="underline underline-offset-4">
                Alerts
              </Link>{" "}
              page.
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
}
