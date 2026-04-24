import { SectionHeading, SurfaceCard } from "@plataforma/ui";

import { SiteShell } from "../../components/site-shell";

export default function StudioPage() {
  return (
    <SiteShell
      title="Studio"
      subtitle="Um bastidor de produtor pensado para publicar cursos, acompanhar pipeline e crescer com governanca."
    >
      <section className="content-section">
        <SectionHeading
          eyebrow="produtor"
          title="Esteira de operacao"
          description="O studio foi desenhado para receber pedidos de entrada, cursos em rascunho e leitura consolidada da operacao."
        />
        <div className="feature-grid">
          <SurfaceCard>
            <h3>Onboarding controlado</h3>
            <p>Auto cadastro com aprovacao administrativa e preparacao de conta de repasse.</p>
          </SurfaceCard>
          <SurfaceCard>
            <h3>Publicacao por rascunho</h3>
            <p>Curso nasce em draft, recebe oferta e passa por fila antes de abrir para venda.</p>
          </SurfaceCard>
          <SurfaceCard>
            <h3>Leitura comercial</h3>
            <p>KPIs prontos para conectar vendas, afiliados e performance de ofertas.</p>
          </SurfaceCard>
        </div>
      </section>
    </SiteShell>
  );
}
