import type { RateFee } from "@/config/ratesConfig";
import type { JSX } from "react";

interface FeesListProps {
  fees: RateFee[];
  renderNoteMark: (key?: string) => JSX.Element | null;
  formatAmount: (f: RateFee) => string;
}

export default function FeesList({ fees, renderNoteMark, formatAmount }: FeesListProps) {
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
