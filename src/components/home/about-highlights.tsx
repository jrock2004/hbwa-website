export function AboutHighlights() {
  const left = [
    "Service Area: Borough + parts of Township (and minor in Caernarvon, Lancaster County).",
    "Water Sources: Four groundwater wells; two storage tanks; booster pump station.",
    "Fire Protection: ≈88 hydrants connected to the distribution system.",
    "Quality: Meet all Federal, State, and County regulations.",
  ];
  const right = [
    "Governance: Five‑person Board appointed by Borough Council.",
    "Wellhead Protection: Approved plan in cooperation with local agencies.",
    "Upgrades: Ongoing valves, hydrants, mains, and admin/ops technology.",
    "Customer Commitment: Clear info, timely notices, community focus.",
  ];
  return (
    <section className="mx-auto max-w-6xl px-4 py-12" aria-labelledby="about-heading">
      <div className="mb-6">
        <h2 id="about-heading" className="text-base font-semibold">
          About HBWA
        </h2>
        <p className="text-muted-foreground mt-2 max-w-2xl text-sm">
          Convert legacy paragraphs into scannable bullets. Replace the placeholders below with real
          copy.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <ul className="space-y-3">
          {left.map((t) => (
            <li key={t} className="border-border bg-card rounded border p-3 text-sm">
              {t}
            </li>
          ))}
        </ul>
        <ul className="space-y-3">
          {right.map((t) => (
            <li key={t} className="border-border bg-card rounded border p-3 text-sm">
              {t}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
