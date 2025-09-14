import type { GovernanceConfig } from "@/config/governanceConfig";

function isPairList(items: PairList | StringList): items is PairList {
  const first = (items as unknown[])[0];
  return typeof first === "object" && first !== null && "role" in first && "name" in first;
}

export function DirectoryList({ items }: { items: PairList | StringList }) {
  const pairMode = isPairList(items);

  return (
    <ul className="divide-y divide-[hsl(var(--brand)/0.4)] dark:divide-white/25">
      {pairMode
        ? (items as PairList).map((it) => (
            <li
              key={it.role}
              className="flex flex-col px-4 py-2 text-sm sm:flex-row sm:items-baseline sm:justify-between"
            >
              <span className="font-medium">{it.role}</span>
              <span className="text-muted-foreground sm:text-right">{it.name}</span>
            </li>
          ))
        : (items as StringList).map((m, i) => (
            <li
              key={i}
              className="flex flex-col px-4 py-2 text-sm sm:flex-row sm:items-baseline sm:justify-between"
            >
              <span className="font-medium">{m}</span>
            </li>
          ))}
    </ul>
  );
}

type PairList = GovernanceConfig["board"];
type StringList = string[];
