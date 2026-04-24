import { demoAdminQueue } from "@plataforma/contracts";
import { Pill, SectionHeading, SurfaceCard } from "@plataforma/ui";

import { SiteShell } from "../../components/site-shell";

export default function AdminPage() {
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
        <div className="queue-grid">
          {demoAdminQueue.map((item) => (
            <SurfaceCard key={item.id}>
              <Pill>{item.kind}</Pill>
              <h3>{item.displayName}</h3>
              <p className="muted-label">estado atual: {item.state}</p>
              <p>{item.note}</p>
            </SurfaceCard>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
