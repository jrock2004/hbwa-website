import { useMemo, useState } from "react";
import { useRates } from "@/hooks/useRates";
import type { RateFee, RatesConfig } from "@/config/ratesConfig";
import RatesSectionCard from "@/components/rates/RatesSectionCard";
import RatesFilterBar, { type RatesFilter } from "@/components/rates/RatesFilterBar";

export default function Rates() {
  const state = useRates();
  const data: RatesConfig | null = state.status === "success" ? state.data : null;

  // ---------- notes order (unchanged) ----------
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

  // ---------- filter state ----------
  const [filter, setFilter] = useState<RatesFilter>({
    q: "",
    min: null,
    max: null,
    sectionKey: "all",
    hasNote: false,
  });

  // text normalizer for search
  const norm = (s: string) => s.normalize("NFKD").toLowerCase();

  const filterFee = (f: RateFee, sectionKey: string) => {
    // section
    if (filter.sectionKey && filter.sectionKey !== "all" && filter.sectionKey !== sectionKey) {
      return false;
    }

    // has note
    if (filter.hasNote && !f.noteKey) return false;

    // amount range (only for numeric fees)
    if (typeof f.amountUSD === "number") {
      if (filter.min != null && f.amountUSD < filter.min) return false;
      if (filter.max != null && f.amountUSD > filter.max) return false;
    }

    // text match against label, details, amount text, and unit
    if (filter.q.trim()) {
      const q = norm(filter.q.trim());
      const hay = [
        f.label ?? "",
        f.details ?? "",
        typeof f.amountUSD === "number" ? f.amountUSD.toLocaleString() : (f.amountText ?? ""),
        f.unit?.replaceAll("_", " ") ?? "",
      ]
        .map((x) => norm(x))
        .join(" • ");
      if (!hay.includes(q)) return false;
    }

    return true;
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

      {/* Filter bar */}
      <RatesFilterBar
        value={filter}
        onChange={setFilter}
        sections={data!.sections.map((s) => ({ key: s.key, title: s.title }))}
      />

      {/* Sections (respect filter) */}
      {data!.sections.map((s) => (
        <RatesSectionCard
          key={s.key}
          section={s}
          renderNoteMark={renderNoteMark}
          formatAmount={formatAmount}
          filterFee={(f) => filterFee(f, s.key)} // NEW
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
