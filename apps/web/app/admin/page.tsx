import { SectionHeading } from "@plataforma/ui";

import { AdminApprovalConsole } from "../../components/admin-approval-console";
import { SiteShell } from "../../components/site-shell";
import { getAdminApprovals, getAdminOverview } from "../../lib/platform-api";

export default async function AdminPage() {
  const [overview, approvals] = await Promise.all([getAdminOverview(), getAdminApprovals()]);

  return (
    <SiteShell
      eyebrow="governanca"
      title="Admin"
      subtitle="Console operacional para curadoria de entrada, leitura financeira e supervisao do ambiente de prova."
    >
      <section className="content-section">
        <div className="story-stage">
          <div className="story-stage-main">
            <p className="section-eyebrow">sala de controle</p>
            <h2>Fila de aprovacao, saude operacional e leitura financeira no mesmo panorama.</h2>
            <p>
              Para a demonstracao ficar crivel, o admin precisa transmitir governanca de verdade. Por isso a pagina
              agora carrega contexto operacional antes dos cards de aprovacao.
            </p>
          </div>

          <div className="story-stage-side">
            <span className="spotlight-badge">ambiente atual</span>
            <h3>Guard rails do staging</h3>
            <div className="story-list">
              <div className="story-list-item">
                <span>pagamentos</span>
                <strong>{overview.health.paymentsMode}</strong>
              </div>
              <div className="story-list-item">
                <span>videos</span>
                <strong>{overview.health.videoProviders.join(" + ")}</strong>
              </div>
              <div className="story-list-item">
                <span>dominio</span>
                <strong>{overview.health.stagingDomain}</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="content-section">
        <SectionHeading
          eyebrow="governanca ativa"
          title="Fila de aprovacao e observabilidade"
          description="A administracao do produto concentra aprovacoes, saude operacional e leitura das trilhas financeiras."
        />
        <AdminApprovalConsole initialApprovals={approvals} overview={overview} />
      </section>
    </SiteShell>
  );
}
