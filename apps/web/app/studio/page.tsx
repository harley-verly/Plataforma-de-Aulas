import { SectionHeading } from "@plataforma/ui";

import { StudioConsole } from "../../components/studio-console";
import { SiteShell } from "../../components/site-shell";
import { getStudioOverview } from "../../lib/platform-api";

export default async function StudioPage() {
  const overview = await getStudioOverview();

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
        <StudioConsole overview={overview} />
      </section>
    </SiteShell>
  );
}
