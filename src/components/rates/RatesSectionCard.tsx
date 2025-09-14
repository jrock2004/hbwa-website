import type { RateFee, RatesSection } from "@/config/ratesConfig";
import FeesList from "./FeesList";
import type { JSX } from "react";

interface RatesSectionCardProps {
  section: RatesSection;
  renderNoteMark: (key?: string) => JSX.Element | null;
  formatAmount: (f: RateFee) => string;
  filterFee?: (f: RateFee) => boolean;
}

export default function RatesSectionCard({
  section,
  renderNoteMark,
  formatAmount,
  filterFee,
}: RatesSectionCardProps) {
  const fees = (section.fees ?? []).filter((f) => (filterFee ? filterFee(f) : true));
  const subsections = (section.subsections ?? []).map((ss) => ({
    ...ss,
    fees: (ss.fees ?? []).filter((f) => (filterFee ? filterFee(f) : true)),
  }));
  const hasAny = fees.length > 0 || subsections.some((ss) => (ss.fees?.length ?? 0) > 0);

  if (!hasAny) return null;

  return (
    <section className="overflow-hidden rounded-2xl border border-black/10 shadow-sm dark:border-white/12">
      <header className="border-b border-[hsl(var(--brand)/0.4)] px-5 py-4 dark:border-white/25">
        <h2 className="rates-accent text-lg font-semibold tracking-tight">{section.title}</h2>
        {section.subtitle && (
          <p className="mt-1 text-xs opacity-80 dark:text-white/65">{section.subtitle}</p>
        )}
      </header>

      {section.fees?.length ? (
        <FeesList fees={section.fees} renderNoteMark={renderNoteMark} formatAmount={formatAmount} />
      ) : null}

      {section.subsections?.map((ss) => (
        <div key={ss.key} className="border-t border-[hsl(var(--brand)/0.4)] dark:border-white/25">
          <div className="px-5 pt-4 pb-2">
            <h3 className="text-sm font-semibold dark:text-white/85">{ss.title}</h3>
            {ss.subtitle && (
              <p className="mt-1 text-xs opacity-80 dark:text-white/65">{ss.subtitle}</p>
            )}
          </div>
          {ss.fees?.length ? (
            <FeesList fees={ss.fees} renderNoteMark={renderNoteMark} formatAmount={formatAmount} />
          ) : null}
        </div>
      ))}

      {(section.policies?.length || section.links?.length) && (
        <div className="policies border-t border-[hsl(var(--brand)/0.4)] bg-black/[0.02] px-5 py-4 dark:border-white/25">
          {section.policies?.length ? (
            <ul className="list-disc space-y-1 pl-5 text-xs opacity-80 dark:text-white/85">
              {section.policies.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
          ) : null}
          {section.links?.length ? (
            <div className="mt-2 text-xs">
              {section.links.map((l, i) => (
                <a
                  key={i}
                  href={l.href}
                  className="underline underline-offset-2 dark:text-white/85"
                >
                  {l.label}
                </a>
              ))}
            </div>
          ) : null}
        </div>
      )}
    </section>
  );
}
