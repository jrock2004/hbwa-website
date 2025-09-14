import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { useSiteConfig } from "@/hooks/useSiteConfig";

export default function EmailContactCard() {
  const { data } = useSiteConfig();
  const email = data?.contact.email ?? "info@example.org"; // fallback if not in config

  return (
    <div className="flex items-center justify-between rounded-xl border border-black/10 px-5 py-4 dark:border-white/12">
      <div className="flex items-center gap-3">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-black/10 dark:border-white/12">
          <EnvelopeIcon className="h-5 w-5 opacity-70" aria-hidden />
        </span>
        <div className="leading-tight">
          <div className="font-medium">General mailbox</div>
          <div className="text-muted-foreground text-sm">{email}</div>
        </div>
      </div>
      <a
        href={`mailto:${email}`}
        className="rounded-xl border border-[hsl(var(--brand)/0.35)] px-3 py-1.5 text-sm hover:border-[hsl(var(--brand)/0.5)] dark:border-white/25"
      >
        Email us
      </a>
    </div>
  );
}
