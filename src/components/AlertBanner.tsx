const VARIANT_STYLES: Record<Variant, string> = {
  info: "border-[hsl(var(--border))] bg-[hsl(var(--muted))]",
  success: "border-[hsl(var(--border))] bg-[hsl(var(--muted))]",
  warning: "border-[hsl(var(--border))] bg-[hsl(var(--muted))]",
  danger: "border-[hsl(var(--border))] bg-[hsl(var(--muted))]",
};

export function AlertBanner({
  title,
  children,
  variant = "info",
}: {
  title: string;
  children?: React.ReactNode;
  variant?: Variant;
}) {
  return (
    <div role="status" className={clsx("rounded-xl border p-4", VARIANT_STYLES[variant])}>
      <div className="font-medium">{title}</div>
      {children ? <div className="text-muted-foreground mt-1 text-sm">{children}</div> : null}
    </div>
  );
}
import clsx from "clsx";
type Variant = "info" | "success" | "warning" | "danger";
