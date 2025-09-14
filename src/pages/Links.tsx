import { useLinks } from "@/hooks/useLinks";
import { LinkGroupCard } from "@/components/ui/LinkGroupCard";

export default function LinksPage() {
  const state = useLinks();

  if (state.status === "idle" || state.status === "loading") {
    return <div className="py-10 text-center">Loading links…</div>;
  }
  if (state.status === "error") {
    return <div className="text-destructive py-10 text-center">Failed to load links.</div>;
  }

  const { data } = state;

  const groups = data?.groups ?? [];

  return (
    <section className="container mx-auto max-w-5xl px-4 py-8">
      <header className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">{data?.title}</h1>
        <p className="text-muted-foreground mt-2 text-sm">All links open in a new tab.</p>
      </header>

      <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
        {groups.map((group, idx) => {
          const isLastOdd = groups.length % 2 === 1 && idx === groups.length - 1;
          const span = isLastOdd ? "lg:col-span-2" : "";

          return <LinkGroupCard key={group.label} group={group} className={span} />;
        })}
      </div>
    </section>
  );
}
