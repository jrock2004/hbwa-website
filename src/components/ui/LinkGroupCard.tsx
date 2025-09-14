import { Card } from "@/components/ui/Card";
import { Tooltip } from "@/components/ui/Tooltip";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import type { LinkGroup } from "@/config/linksConfig";
import { useIsTruncated } from "@/hooks/useIsTruncated";
import clsx from "clsx";

function LinkText({ name }: { name: string }) {
  const { ref, truncated } = useIsTruncated<HTMLSpanElement>([name]);

  return (
    <Tooltip content={name} disabled={!truncated}>
      <span
        ref={ref}
        className="block max-w-full truncate align-middle"
        title={truncated ? name : undefined} // optional fallback
      >
        {name}
      </span>
    </Tooltip>
  );
}

export function LinkGroupCard({ className, group }: { className?: string; group: LinkGroup }) {
  return (
    <div className={clsx(className)}>
      <Card title={group.label} className="overflow-visible rounded-2xl p-4 shadow-sm">
        <ul className="mt-3 space-y-2 overflow-visible">
          {group.items.map((item) => (
            <li key={item.url} className="overflow-visible">
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${item.name} (opens in a new tab)`}
                className="group border-border hover:bg-muted/50 flex items-center justify-between overflow-visible rounded-md border px-3 py-2 text-sm no-underline"
              >
                {/* Left: text (ellipsis + tooltip only if truncated) */}
                <div className="min-w-0 flex-1">
                  <LinkText name={item.name} />
                </div>

                {/* Right: external link icon */}
                <ArrowTopRightOnSquareIcon
                  className="text-muted-foreground ml-2 h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </a>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
