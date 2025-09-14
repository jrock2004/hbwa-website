import { Card } from "@/components/ui/Card";
import { useGovernance } from "@/hooks/useGovernance";
import type { GovernanceConfig } from "@/config/governanceConfig";
import { DirectoryList } from "@/components/Governance/DirectoryList";

export default function Governance() {
  const state = useGovernance();
  const data: GovernanceConfig | null = state.status === "success" ? state.data : null;

  if (state.status !== "success") {
    return (
      <div className="mx-auto max-w-3xl py-10">
        {state.status === "loading"
          ? "Loading rates…"
          : `Error: ${state.error?.message ?? "Failed to load"}`}
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl space-y-8 py-8">
      <header className="space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Governance</h1>
        <p className="text-muted-foreground">
          Board Members, Employees, Consultants, and Professional Memberships
        </p>
      </header>

      <div className="grid auto-rows-fr gap-6 lg:grid-cols-2">
        <Card title="Board Members">
          <DirectoryList items={data?.board ?? []} />
        </Card>

        <Card title="Employees">
          <DirectoryList items={data?.employees ?? []} />
        </Card>

        <Card title="Professional Memberships">
          <DirectoryList items={data?.memberships ?? []} />
        </Card>

        <Card title="Consultants">
          <DirectoryList items={data?.consultants ?? []} />
        </Card>
      </div>
    </div>
  );
}
