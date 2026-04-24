import { SectionHeading, SurfaceCard } from "@plataforma/ui";

import { SiteShell } from "../../components/site-shell";

export default function AffiliatePage() {
  return (
    <SiteShell
      title="Affiliate"
      subtitle="Painel de afiliacao com links rastreaveis, aprovacao e leitura clara de comissoes."
    >
      <section className="content-section">
        <SectionHeading
          eyebrow="afiliacao"
          title="Governanca antes de escala"
          description="A fundacao do produto ja considera aprovacao, links por campanha e trilha financeira preparada para split."
        />
        <div className="feature-grid">
          <SurfaceCard>
            <h3>Entrada com aprovacao</h3>
            <p>Afiliados entram por auto cadastro, mas so operam apos validacao administrativa.</p>
          </SurfaceCard>
          <SurfaceCard>
            <h3>Links e atribuicao</h3>
            <p>Estrutura pronta para identificar cliques, origem da venda e comissao correspondente.</p>
          </SurfaceCard>
          <SurfaceCard>
            <h3>Extrato operacional</h3>
            <p>Comissao segue modo sandbox-first, com previsao de liquidacao real quando a conta final entrar.</p>
          </SurfaceCard>
        </div>
      </section>
    </SiteShell>
  );
}
