import { SectionHeading } from "@plataforma/ui";

import { AdminApprovalConsole } from "../../components/admin-approval-console";
import { SiteShell } from "../../components/site-shell";
import { getAdminApprovals, getAdminOverview } from "../../lib/platform-api";

export default async function AdminPage() {
  const [overview, approvals] = await Promise.all([getAdminOverview(), getAdminApprovals()]);

  return (
    <SiteShell
      title="Admin"
      subtitle="Console operacional para curadoria de entrada, leitura financeira e supervisao do staging."
    >
      <section className="content-section">
        <SectionHeading
          eyebrow="governanca"
          title="Fila de aprovacao e observabilidade"
          description="A administracao do produto concentra aprovacoes, saude operacional e leitura das trilhas financeiras."
        />
        <AdminApprovalConsole initialApprovals={approvals} overview={overview} />
      </section>
    </SiteShell>
  );
}
