import type { ReactNode } from "react";

export function Card({ children, subtitle, title }: CardProps) {
  return (
    <section className="overflow-hidden rounded-2xl border border-black/10 shadow-sm dark:border-white/12">
      <header className="border-b border-[hsl(var(--brand)/0.4)] px-5 py-4 dark:border-white/25">
        <h2 className="rates-accent text-lg font-semibold tracking-tight">{title}</h2>
        {subtitle && <p className="mt-1 text-xs opacity-80 dark:text-white/65">{subtitle}</p>}
      </header>
      {children}
    </section>
  );
}

export type CardProps = {
  children: ReactNode;
  subtitle?: string;
  title: string;
};
