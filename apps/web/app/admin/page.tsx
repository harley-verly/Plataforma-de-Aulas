import { AdminApprovalConsole } from "../../components/admin-approval-console";
import { MemberShell } from "../../components/member-shell";
import { getAdminApprovals, getAdminOverview } from "../../lib/platform-api";

export default async function AdminPage() {
  const [overview, approvals] = await Promise.all([getAdminOverview(), getAdminApprovals()]);

  return (
    <MemberShell
      currentSection="admin"
      eyebrow="console operacional"
      title="Admin"
      subtitle="Curadoria de entrada, leitura financeira e governanca do ambiente de demonstracao."
    >
      <section className="member-page-section">
        <div className="member-dashboard-grid">
          <div className="member-highlight-card surface-card">
            <span className="member-card-kicker">sala de controle</span>
            <h2>Fila de aprovacao, saude operacional e leitura financeira no mesmo panorama.</h2>
            <p>
              O admin fica dentro da area interna, sem exposicao publica, mas com contexto suficiente para a demo
              parecer operacao real.
            </p>
          </div>
          <div className="member-side-summary surface-card">
            <div className="member-stat-list">
              <div className="member-stat-item">
                <span>Pagamentos</span>
                <strong>{overview.health.paymentsMode}</strong>
              </div>
              <div className="member-stat-item">
                <span>Video</span>
                <strong>{overview.health.videoProviders.join(" + ")}</strong>
              </div>
              <div className="member-stat-item">
                <span>Dominio</span>
                <strong>{overview.health.stagingDomain}</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="member-page-section">
        <AdminApprovalConsole initialApprovals={approvals} overview={overview} />
      </section>
    </MemberShell>
  );
}
