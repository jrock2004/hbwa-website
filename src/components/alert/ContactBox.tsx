import { useSiteConfig } from "@/hooks/useSiteConfig";

export function ContactBox() {
  const { data } = useSiteConfig();
  const phone = data?.contact.phone || "(610) 273-7830";
  // Remove non-digit characters for tel: link
  const phoneHref = `tel:${phone.replace(/[^\d+]/g, "")}`;
  return (
    <aside className="bg-card text-card-foreground rounded-2xl border p-4 shadow-sm">
      <h3 className="text-base font-semibold">Report an Emergency</h3>
      <p className="mt-1 text-sm">
        Call our main office at{" "}
        <a href={phoneHref} className="link" aria-label={`Call ${phone}`}>
          {phone}
        </a>
        . If the office is closed, the voicemail recording provides emergency contact numbers.
      </p>
      <p className="text-muted-foreground mt-3 text-sm">
        Note: HBWA maintains the public system (mains, hydrants, wells, plants, pump stations,
        storage tanks). Repairs on the property owner’s side of the curb-stop are the owner’s
        responsibility.
      </p>
    </aside>
  );
}
