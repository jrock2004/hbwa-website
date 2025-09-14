// components/VisitUsCard.tsx
import { Card } from "@/components/ui/Card";
import { MapPinIcon } from "@heroicons/react/24/outline";
import { useSiteConfig } from "@/hooks/useSiteConfig";
import ContactMap from "@/components/contact/ContactMap";

export default function VisitUsCard() {
  const { data } = useSiteConfig();
  const addr = data?.contact?.address;

  const title = addr?.buildingName || "Visit Us";
  const subtitle = [addr?.city, addr?.state, addr?.zip].filter(Boolean).join(", ");

  return (
    <Card title="Visit Us" subtitle="Our office location">
      <div className="space-y-4 px-5 py-4">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-black/10 dark:border-white/12">
            <MapPinIcon className="h-5 w-5 opacity-70" aria-hidden />
          </span>
          <div className="leading-tight">
            <div className="font-medium">{title}</div>
            {subtitle && <div className="text-muted-foreground text-sm">{subtitle}</div>}
          </div>
        </div>

        {/* Reuse ContactMap with links, but no caption to avoid address repetition */}
        <ContactMap showLinks={true} showAddressCaption={true} height={256} />
      </div>
    </Card>
  );
}
