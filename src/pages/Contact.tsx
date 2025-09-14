import { Card } from "@/components/ui/Card";
import { PhoneIcon, InformationCircleIcon } from "@heroicons/react/24/outline";
import { useSiteConfig } from "@/hooks/useSiteConfig"; // uses contact.{phone,paOneCallUrl,address}
import ContactInfoCards from "@/components/contact/ContactInfoCards";
import VisitUsCard from "@/components/contact/VisitUsCard";

export default function Contact() {
  const { data } = useSiteConfig();

  const phone = data?.contact.phone ?? "";
  const paOneCallUrl = data?.contact.paOneCallUrl ?? "#";

  return (
    <main className="container mx-auto max-w-4xl space-y-6 px-4 py-8">
      <h1 className="text-2xl font-semibold tracking-tight">Contact Us</h1>

      {/* Call Us */}
      <Card title="Call Us" subtitle="We’re happy to help.">
        <div className="px-5 py-4">
          <a
            href={phone ? `tel:${phone.replace(/[^0-9+]/g, "")}` : undefined}
            className="group flex w-full items-center justify-between rounded-xl border border-transparent bg-[hsl(var(--card))] px-4 py-3 transition hover:border-[hsl(var(--brand)/0.35)]"
          >
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-black/10 dark:border-white/12">
                <PhoneIcon className="h-5 w-5 opacity-70" aria-hidden />
              </span>
              <div className="leading-tight">
                <div className="font-medium">Call</div>
                <div className="text-muted-foreground text-sm">{phone || "—"}</div>
              </div>
            </div>
            <span className="text-sm underline underline-offset-4 opacity-90 group-hover:opacity-100">
              Tap to dial
            </span>
          </a>
        </div>
      </Card>

      {/* Visit Us */}
      <VisitUsCard />

      {/* PA One Call / 811 */}
      <Card
        title="PA One Call"
        subtitle="Call before you dig — it’s the law."
        className="border-[hsl(var(--brand)/0.4)] dark:border-white/25"
      >
        <div className="flex flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-black/10 dark:border-white/12">
              <InformationCircleIcon className="h-5 w-5 opacity-70" aria-hidden />
            </span>
            <p className="text-muted-foreground text-sm">
              Use PA One Call (811) before any digging to prevent utility damage and ensure safety.
            </p>
          </div>
          <a
            href={paOneCallUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-xl border border-[hsl(var(--brand)/0.35)] px-4 py-2 text-sm font-medium transition hover:border-[hsl(var(--brand)/0.5)] dark:border-white/25"
          >
            Visit PA One Call
          </a>
        </div>
      </Card>

      {/* Contact Form */}
      <ContactInfoCards />
    </main>
  );
}
