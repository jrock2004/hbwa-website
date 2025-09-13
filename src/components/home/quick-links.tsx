export function QuickLinks() {
  const links = [
    "Rates & Charges",
    "Documents",
    "Contact HBWA",
    "Governance",
    "Policies",
    "Newsletters",
    "Conservation",
    "Links / Resources",
  ];
  return (
    <section className="bg-muted" aria-labelledby="quicklinks-heading">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <h2 id="quicklinks-heading" className="text-base font-semibold">
          Quick Links
        </h2>
        <ul className="mt-4 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          {links.map((i) => (
            <li key={i} className="border-border bg-card rounded border p-4">
              <div className="bg-muted mb-3 h-8 w-8 rounded" aria-hidden />
              <div className="bg-muted h-4 w-40 rounded" aria-hidden />
              <a href="#" className="text-muted-foreground mt-2 block text-xs">
                {i}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
