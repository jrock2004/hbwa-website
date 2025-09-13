import type { JSX } from "react";

export function SectionHeader({
  icon,
  title,
  subtitle,
}: {
  icon: JSX.Element;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-4 flex items-start gap-3">
      <div className="text-foreground/80 mt-0.5 dark:text-white/80">{icon}</div>
      <div>
        <h2 className="text-xl leading-tight font-semibold">{title}</h2>
        {subtitle ? <p className="text-muted-foreground text-sm leading-snug">{subtitle}</p> : null}
      </div>
    </div>
  );
}
