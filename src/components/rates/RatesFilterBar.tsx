import { useId } from "react";
import clsx from "clsx";

export type RatesFilter = {
  q: string;
  min?: number | null;
  max?: number | null;
  sectionKey?: string | "all";
  hasNote?: boolean;
};

export default function RatesFilterBar({
  value,
  onChange,
  sections,
}: {
  value: RatesFilter;
  onChange: (next: RatesFilter) => void;
  sections: { key: string; title: string }[];
}) {
  const qId = useId();
  const minId = useId();
  const maxId = useId();
  const sectionId = useId();

  const set = <K extends keyof RatesFilter>(k: K, v: RatesFilter[K]) =>
    onChange({ ...value, [k]: v });

  const fieldBase =
    "w-full rounded-lg px-3 py-2 text-sm outline-none " +
    // Light mode
    "text-foreground placeholder:text-foreground/45 bg-transparent " +
    "border border-[hsl(var(--brand)/0.35)] " +
    "focus:border-[hsl(var(--brand))] focus:ring-2 focus:ring-[hsl(var(--brand)/0.25)] " +
    // Dark mode
    "dark:text-white/90 dark:placeholder:text-white/50 " +
    "dark:border-white/15 dark:bg-transparent " +
    "dark:focus:border-white/30 dark:focus:ring-white/20";

  return (
    <div className="rounded-2xl border border-[hsl(var(--brand)/0.35)] bg-transparent p-3 shadow-sm dark:border-[color-mix(in_oklab,hsl(var(--brand))_25%,white_75%)]">
      <div className="grid gap-3 sm:grid-cols-4">
        {/* Text search */}
        <label className="sm:col-span-2">
          <div className="mb-1 text-xs opacity-70 dark:text-white/75">Search</div>
          <input
            id={qId}
            type="text"
            value={value.q}
            onChange={(e) => set("q", e.target.value)}
            placeholder="Label, details, amount…"
            className={fieldBase}
          />
        </label>

        {/* Amount min / max */}
        <label>
          <div className="mb-1 text-xs opacity-70 dark:text-white/75">Min $</div>
          <input
            id={minId}
            inputMode="numeric"
            pattern="[0-9]*"
            value={value.min ?? ""}
            onChange={(e) => set("min", e.target.value ? Number(e.target.value) : null)}
            className={fieldBase}
          />
        </label>
        <label>
          <div className="mb-1 text-xs opacity-70 dark:text-white/75">Max $</div>
          <input
            id={maxId}
            inputMode="numeric"
            pattern="[0-9]*"
            value={value.max ?? ""}
            onChange={(e) => set("max", e.target.value ? Number(e.target.value) : null)}
            className={fieldBase}
          />
        </label>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-3">
        {/* Section select */}
        <label className="inline-flex min-w-[220px] flex-1 items-center gap-2 sm:flex-none">
          <span className="text-xs opacity-70 dark:text-white/75">Section</span>
          <select
            id={sectionId}
            value={value.sectionKey ?? "all"}
            onChange={(e) =>
              set("sectionKey", (e.target.value as RatesFilter["sectionKey"]) || "all")
            }
            className={fieldBase}
          >
            <option value="all">All</option>
            {sections.map((s) => (
              <option key={s.key} value={s.key}>
                {s.title}
              </option>
            ))}
          </select>
        </label>

        {/* Has note toggle */}
        <button
          type="button"
          onClick={() => set("hasNote", !value.hasNote)}
          className={clsx(
            "rounded-full border bg-transparent px-3 py-2 text-sm transition",
            value.hasNote
              ? [
                  "rates-accent",
                  "border-[hsl(var(--brand))]",
                  "dark:border-[color-mix(in_oklab,hsl(var(--brand))_55%,white_45%)]"
                ]
              : [
                  "text-foreground border-black/30 hover:bg-black/[0.04]",
                  "dark:text-white/85",
                  "dark:border-[color-mix(in_oklab,hsl(var(--brand))_25%,white_75%)]",
                  "dark:hover:bg-white/[0.06]"
                ]
          )}
          aria-pressed={value.hasNote ? "true" : "false"}
        >
          Only items with notes
        </button>

        {/* Reset */}
        <button
          type="button"
          onClick={() =>
            onChange({ q: "", min: null, max: null, sectionKey: "all", hasNote: false })
          }
          className={clsx(
            "ml-auto rounded-full border bg-transparent px-3 py-2 text-sm text-foreground border-black/30 hover:bg-black/[0.04]",
            "dark:text-white/90",
            "dark:border-[color-mix(in_oklab,hsl(var(--brand))_25%,white_75%)]",
            "dark:hover:bg-white/[0.06]"
          )}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
