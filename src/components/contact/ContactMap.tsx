import { useEffect, useRef, useState } from "react";
import { useSiteConfig } from "@/hooks/useSiteConfig";

export default function ContactMap({
  showLinks = true,
  showAddressCaption = false,
  height = 256,
}: ContactMapProps) {
  const { data } = useSiteConfig();
  const addr = data?.contact?.address;

  const line1 = [addr?.street].filter(Boolean).join(" · ");
  const line2 =
    [addr?.city, addr?.state, addr?.zip].filter(Boolean).join(", ") || addr?.poBox || "";

  const query = [addr?.buildingName, addr?.street, addr?.city, addr?.state, addr?.zip]
    .filter(Boolean)
    .join(" ");
  const encoded = encodeURIComponent(query || line1 || line2 || "");
  const googleEmbed = `https://www.google.com/maps?q=${encoded}&output=embed`;
  const googleLink = `https://www.google.com/maps/search/?api=1&query=${encoded}`;
  const appleLink = `https://maps.apple.com/?q=${encoded}`;

  const ref = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setReady(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className="space-y-3">
      <div
        className="overflow-hidden rounded-xl border border-black/10 dark:border-white/12"
        ref={ref}
      >
        {!ready && <div aria-hidden className="bg-muted w-full animate-pulse" style={{ height }} />}
        {ready && (
          <iframe
            title="HBWA office location map"
            src={googleEmbed}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full"
            style={{ border: 0, height }}
            allowFullScreen
          />
        )}
      </div>

      {showLinks && (
        <div className="flex flex-wrap items-center gap-2">
          <a
            href={googleLink}
            target="_blank"
            rel="noreferrer"
            className="rounded-xl border border-[hsl(var(--brand)/0.35)] px-3 py-1.5 text-sm hover:border-[hsl(var(--brand)/0.5)] dark:border-white/25"
          >
            Open in Google Maps
          </a>
          <a
            href={appleLink}
            target="_blank"
            rel="noreferrer"
            className="rounded-xl border border-[hsl(var(--brand)/0.35)] px-3 py-1.5 text-sm hover:border-[hsl(var(--brand)/0.5)] dark:border-white/25"
          >
            Open in Apple Maps
          </a>
          {showAddressCaption && (
            <span className="text-muted-foreground ml-auto text-sm">
              {line1 || "Address"} {line2 ? `— ${line2}` : ""}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

type ContactMapProps = {
  showLinks?: boolean;
  showAddressCaption?: boolean;
  height?: number;
};
