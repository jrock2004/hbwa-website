export function FeatureCcr() {
  return (
    <section className="bg-muted" aria-labelledby="ccr-heading">
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-10 md:grid-cols-3">
        <div className="md:col-span-2">
          <h2 id="ccr-heading" className="text-base font-semibold">
            Featured: Annual Water Quality Report (CCR)
          </h2>
          <p className="text-muted-foreground mt-2 max-w-prose text-sm">
            Short explanation of the CCR and why it matters. Link to the current PDF and archive.
            Include file size and year when wired up.
          </p>
          <div className="mt-4 flex gap-3">
            <a
              href="#"
              className="bg-primary text-primary-foreground grid h-10 place-items-center rounded px-4 text-sm"
            >
              View 2024 CCR (PDF)
            </a>
            <a
              href="#"
              className="border-input grid h-10 place-items-center rounded border px-4 text-sm"
            >
              View Archive
            </a>
          </div>
        </div>
        <div className="bg-muted aspect-[3/4] rounded" aria-hidden />
      </div>
    </section>
  );
}
