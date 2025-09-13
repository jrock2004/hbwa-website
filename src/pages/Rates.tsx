import { useMemo } from "react";
import { useRates } from "@/hooks/useRates";
import type { RateFee, RatesSection, RatesConfig } from "@/config/ratesConfig";

export default function Rates() {
  const state = useRates();

  // Safe handle to data so hooks always run
  const data: RatesConfig | null = state.status === "success" ? state.data : null;

  // Build a stable order for notes (first appearance across the page)
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
  }, [data]); // ✅ stable dependency — no ESLint warning

  const renderNoteMark = (key?: string) =>
    key && noteOrder.has(key) ? (
      <sup className="ml-1">
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
    if (typeof f.amountUSD === "number") {
      const usd = f.amountUSD.toLocaleString(undefined, { style: "currency", currency: "USD" });
      const unit = f.unit ? ` (${f.unit.replaceAll("_", " ")})` : "";
      return usd + unit;
    }
    return (f.amountText ?? "") + (f.unit ? ` (${f.unit.replaceAll("_", " ")})` : "");
  };

  const FeesList = ({ fees }: { fees: RateFee[] }) => (
    <ul className="divide-y rounded border">
      {fees.map((f, i) => (
        <li key={i} className="flex items-start justify-between p-3">
          <span className="pr-4">
            {f.label}
            {renderNoteMark(f.noteKey)}
            {f.details ? <span className="block text-xs opacity-70">{f.details}</span> : null}
          </span>
          <span className="font-medium whitespace-nowrap">{formatAmount(f)}</span>
        </li>
      ))}
    </ul>
  );

  const SectionBlock = ({ s }: { s: RatesSection }) => (
    <section id={s.key} className="space-y-4">
      <h2 className="text-xl font-medium">{s.title}</h2>
      {s.subtitle && <p className="text-sm opacity-80">{s.subtitle}</p>}
      {s.fees?.length ? <FeesList fees={s.fees} /> : null}

      {s.subsections?.map((ss) => (
        <div key={ss.key} className="space-y-2">
          <h3 className="text-lg font-medium">{ss.title}</h3>
          {ss.subtitle && <p className="text-sm opacity-80">{ss.subtitle}</p>}
          {ss.fees?.length ? <FeesList fees={ss.fees} /> : null}
        </div>
      ))}

      {s.policies?.length ? (
        <div className="text-sm opacity-80">
          <ul className="list-disc space-y-1 pl-5">
            {s.policies.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ul>
        </div>
      ) : null}

      {s.links?.length ? (
        <div className="text-sm">
          {s.links.map((l, i) => (
            <a key={i} href={l.href} className="mr-4 underline">
              {l.label}
            </a>
          ))}
        </div>
      ) : null}
    </section>
  );

  // Loading / error UI AFTER hooks so rules-of-hooks are satisfied
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
      <header className="flex items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-semibold">{data!.title}</h1>
          <p className="text-sm opacity-70">
            Effective {new Date(data!.effectiveDate).toLocaleDateString()}
          </p>
        </div>

        {count > 0 && (
          <a
            href="#notes"
            className="hover:bg-muted/50 inline-flex items-center gap-1 rounded-full border px-2 py-1 text-xs"
            aria-label={`Jump to notes, ${count} item${count > 1 ? "s" : ""}`}
          >
            Notes
            <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full border text-[10px] font-semibold">
              {count}
            </span>
          </a>
        )}
      </header>

      {data!.sections.map((s) => (
        <SectionBlock key={s.key} s={s} />
      ))}

      {count > 0 && (
        <aside id="notes" className="space-y-2 border-t pt-4 text-sm opacity-80">
          {[...noteOrder.entries()].map(([key, num]) => (
            <p key={key} id={`note-${num}`}>
              <span className="mr-1 font-semibold">*</span>
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
