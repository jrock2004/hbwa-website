import { useMemo, type JSX } from "react";
import { useRates } from "@/hooks/useRates";
import type { RateFee, RatesSection, RatesConfig } from "@/config/ratesConfig";

export default function Rates() {
  const state = useRates();
  const data: RatesConfig | null = state.status === "success" ? state.data : null;

  // Build deterministic order for notes
  const { noteOrder, count } = useMemo(() => {
    const order = new Map<string, number>();
    let n = 1;
    const consider = (f: RateFee) => {
      if (f.noteKey && !order.has(f.noteKey)) order.set(f.noteKey, n++);
    };
    if (data) {
      for (const s of data.sections) {
        s.fees?.forEach(consider);
        s.subsections?.forEach((ss) => ss.fees?.forEach(consider));
      }
    }
    return { noteOrder: order, count: order.size };
  }, [data]);

  const renderNoteMark = (key?: string) =>
    key && noteOrder.has(key) ? (
      <sup className="rates-accent ml-1">
        <a
          href={`#note-${noteOrder.get(key)}`}
          aria-label={`See note ${noteOrder.get(key)}`}
          className="underline decoration-dotted"
        >
          *
        </a>
      </sup>
    ) : null;

  const formatAmount = (f: RateFee) => {
    const base =
      typeof f.amountUSD === "number"
        ? f.amountUSD.toLocaleString(undefined, { style: "currency", currency: "USD" })
        : (f.amountText ?? "");
    const unit = f.unit ? ` (${f.unit.replaceAll("_", " ")})` : "";
    return base + unit;
  };

  if (state.status !== "success") {
    return (
      <div className="mx-auto max-w-3xl py-10">
        {state.status === "loading"
          ? "Loading rates…"
          : `Error: ${state.error?.message ?? "Failed to load"}`}
      </div>
    );
  }

  return (
    <div id="top" className="mx-auto max-w-3xl space-y-8 scroll-smooth py-10">
      {/* Page header */}
      <header className="flex items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-semibold">{data!.title}</h1>
          <div className="mt-1">
            <span className="rates-accent inline-flex items-center rounded-full border border-[hsl(var(--brand))] bg-transparent px-2 py-1 text-[11px] dark:border-white/70">
              Effective {new Date(data!.effectiveDate).toLocaleDateString()}
            </span>
          </div>
        </div>

        {count > 0 && (
          <a
            href="#notes"
            className="rates-accent inline-flex items-center gap-1 rounded-full border border-[hsl(var(--brand))] bg-transparent px-2 py-1 text-xs hover:bg-[hsl(var(--brand)/0.08)] dark:border-white/70 dark:hover:bg-white/[0.06]"
          >
            Notes
            <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full border border-[hsl(var(--brand))] px-1 text-[10px] font-semibold dark:border-white/70">
              {count}
            </span>
          </a>
        )}
      </header>

      {/* Sections */}
      {data!.sections.map((s) => (
        <RatesSectionCard
          key={s.key}
          section={s}
          renderNoteMark={renderNoteMark}
          formatAmount={formatAmount}
        />
      ))}

      {/* Notes */}
      {count > 0 && (
        <aside
          id="notes"
          className="space-y-2 border-t pt-4 text-sm opacity-80 dark:border-white/25 dark:opacity-90"
        >
          {[...noteOrder.entries()].map(([key, num]) => (
            <p key={key} id={`note-${num}`}>
              <span className="rates-accent mr-1 font-semibold">*</span>
              {data!.notes[key]}
            </p>
          ))}
          <div>
            <a href="#top" className="text-xs underline hover:no-underline">
              Back to top ↑
            </a>
          </div>
        </aside>
      )}
    </div>
  );
}

/* ---------- Section Card + Fees ---------- */

function RatesSectionCard({
  section,
  renderNoteMark,
  formatAmount,
}: {
  section: RatesSection;
  renderNoteMark: (key?: string) => JSX.Element | null;
  formatAmount: (f: RateFee) => string;
}) {
  return (
    <section className="rates-card overflow-hidden rounded-2xl border border-black/10 shadow-sm dark:border-white/12">
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

function FeesList({
  fees,
  renderNoteMark,
  formatAmount,
}: {
  fees: RateFee[];
  renderNoteMark: (key?: string) => JSX.Element | null;
  formatAmount: (f: RateFee) => string;
}) {
  return (
    <ul className="divide-y divide-[hsl(var(--brand)/0.4)] dark:divide-white/25">
      {fees.map((f, i) => (
        <li
          key={i}
          className="grid grid-cols-1 items-start gap-2 px-5 py-3 sm:grid-cols-[1fr_auto] dark:bg-transparent"
        >
          <div className="pr-4">
            <span className="font-medium dark:text-white/85">{f.label}</span>
            {renderNoteMark(f.noteKey)}
            {f.details && (
              <div className="mt-0.5 text-xs opacity-70 dark:text-white/65">{f.details}</div>
            )}
          </div>

          {/* Amounts */}
          <div className="rates-accent font-semibold tabular-nums sm:text-right">
            {formatAmount(f)}
          </div>
        </li>
      ))}
    </ul>
  );
}
