export function UtilityRow() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10" aria-label="Utilities">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="border-border bg-card rounded border p-6">
          <div className="bg-muted mb-2 h-4 w-48 rounded" aria-hidden />
          <p className="text-muted-foreground text-sm">
            Call 811 before you dig. Convert this to a strong external CTA with logo + guidance.
          </p>
          <a
            href="#"
            className="bg-primary text-primary-foreground mt-4 inline-grid h-10 w-32 place-items-center rounded text-sm"
          >
            Visit 811
          </a>
        </div>
        <div className="border-border bg-card rounded border p-6">
          <div className="bg-muted mb-2 h-4 w-40 rounded" aria-hidden />
          <p className="text-muted-foreground text-sm">
            Office Telephone (610) 273‑7830. Add hours, address, and a contact form link.
          </p>
          <a
            href="#"
            className="border-input mt-4 inline-grid h-10 w-32 place-items-center rounded border text-sm"
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
}
