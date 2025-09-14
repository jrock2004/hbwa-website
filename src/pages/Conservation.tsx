import { Card } from "@/components/ui/Card";
import { useSiteConfig } from "@/hooks/useSiteConfig";

type Tip = string;

function TipsList({ items }: { items: Tip[] }) {
  return (
    <ul className="text-muted-foreground list-disc space-y-2 pl-6 text-sm">
      {items.map((t) => (
        <li key={t}>{t}</li>
      ))}
    </ul>
  );
}

function StepsList({ steps }: { steps: string[] }) {
  return (
    <ol className="text-muted-foreground list-decimal space-y-2 pl-6 text-sm">
      {steps.map((s, i) => (
        <li key={`${i}-${s.slice(0, 10)}`}>{s}</li>
      ))}
    </ol>
  );
}

export default function Conservation() {
  const { data: siteConfig } = useSiteConfig();

  // --- Content pulled and lightly edited from the legacy page ---
  const intro = {
    title: "Water Conservation Can Save You Money",
    blurb:
      "The average Pennsylvanian uses ~62 gallons of water at home each day. The average home can LOSE ~9½ gallons per person per day due to leaks—often from toilet tanks. Even a faucet that drips once per second can waste ~10 gallons in a day. Small fixes add up quickly.",
  };

  const quickWins: Tip[] = [
    "Turn off the tap while brushing teeth or scrubbing in the shower.",
    "Fix dripping faucets promptly; add aerators where possible.",
    "Match laundry water level to load size; run full loads when you can.",
    "Keep a bottle of cold water in the fridge instead of running the tap.",
  ];

  const leakChecks = [
    "Shut off all faucets/appliances. If your water meter still turns, you likely have a leak.",
    "Alternatively: record your meter reading at night; before using water in the morning, read it again to see overnight loss.",
    "If you suspect a leak, contact a plumber.",
  ];

  const toiletDyeTest = [
    "Put a few drops of food coloring (or provided dye strips) into the toilet tank.",
    "Wait 15 minutes without flushing. If color appears in the bowl, the flapper or other parts may be leaking—repair it.",
  ];

  const outdoorUse: Tip[] = [
    "Water after sunset and before 8 a.m. to reduce evaporation; use mulch to retain moisture.",
    "Prefer slow-drip irrigation over sprinklers.",
    "Use a hose nozzle you can shut off; turn water off at the house after use to prevent leaks.",
    "Consider a rain barrel under a downspout for watering plants and washing vehicles.",
    "Use a commercial car wash that recycles water when possible.",
  ];

  const appliances: Tip[] = [
    "When replacing fixtures (showerheads, faucets) or appliances (dishwashers, clothes washers), choose efficient, water-saving models.",
  ];

  const poolCare: Tip[] = [
    "Don’t overfill pools to reduce splash loss; use a cover to slow evaporation.",
    "Keep walls, filtration, and inlets in good repair to avoid leaks.",
  ];

  const kitchenLaundry: Tip[] = [
    "For hand-washing dishes, use a wash basin and a rinse basin rather than running water continuously.",
    "Check dishwasher and laundry hose connections for leaks and repair/replace if needed.",
    "Pre-soak heavily soiled items; use detergent sparingly.",
  ];

  const resources = [
    {
      label: "Estimating Water Use and Savings in Your Home",
      href: "/docs/Water%20Audit%20Fact%20Sheet.pdf",
    },
    { label: "Household Water Conservation", href: "/docs/household-water.pdf" },
  ];

  return (
    <div className="mx-auto max-w-5xl space-y-6 px-4 py-8">
      {/* Intro */}
      <Card title={intro.title} subtitle="Small changes = big savings">
        <div className="space-y-5 p-5">
          <p className="text-muted-foreground text-sm text-balance">{intro.blurb}</p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Card title="Quick Wins">
              <div className="p-5">
                <TipsList items={quickWins} />
              </div>
            </Card>
            <Card title="Appliances & Fixtures">
              <div className="p-5">
                <TipsList items={appliances} />
              </div>
            </Card>
          </div>
        </div>
      </Card>

      {/* Check for leaks */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card title="Check for Leaks (Meter Test)" subtitle="Find hidden water loss fast">
          <div className="p-5">
            <StepsList steps={leakChecks} />
          </div>
        </Card>

        <Card title="Toilet Dye Test" subtitle="The #1 source of household leaks">
          <div className="p-5">
            <StepsList steps={toiletDyeTest} />
            <p className="text-muted-foreground mt-4 text-xs">
              Tip: Modern toilets use ~1.6 gallons per flush and the average person flushes ~5 times
              per day—fixes here can save quickly.
            </p>
          </div>
        </Card>
      </div>

      {/* Outdoor & Pools */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card title="Outdoor Watering & Yard">
          <div className="p-5">
            <TipsList items={outdoorUse} />
          </div>
        </Card>

        <Card title="Pool Care">
          <div className="p-5">
            <TipsList items={poolCare} />
          </div>
        </Card>
      </div>

      {/* Kitchen & Laundry */}
      <Card title="Kitchen & Laundry">
        <div className="p-5">
          <TipsList items={kitchenLaundry} />
        </div>
      </Card>

      {/* Resources */}
      <Card title="Resources & Downloads" subtitle="Guides you can print and share">
        <div className="p-5">
          <ul className="space-y-2 text-sm">
            {resources.map((r) => (
              <li key={r.href}>
                <a
                  className="underline underline-offset-2 hover:no-underline"
                  href={r.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  {r.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Card>

      {/* Contact */}
      <Card title="Questions? We’re here to help.">
        <div className="p-5">
          <p className="text-muted-foreground text-sm">
            Honey Brook is fortunate to have an abundant, reasonably priced water supply. Let’s
            conserve our wonderful water. If you have questions, please contact us.
          </p>
          <p className="mt-2 text-sm font-medium">Call: {siteConfig?.contact.phone}</p>
        </div>
      </Card>
    </div>
  );
}
