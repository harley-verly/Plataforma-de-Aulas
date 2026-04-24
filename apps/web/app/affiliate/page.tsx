import { SectionHeading } from "@plataforma/ui";

import { AffiliateConsole } from "../../components/affiliate-console";
import { SiteShell } from "../../components/site-shell";
import { getAffiliateOverview } from "../../lib/platform-api";

export default async function AffiliatePage() {
  const overview = await getAffiliateOverview();

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
        <AffiliateConsole overview={overview} />
      </section>
    </SiteShell>
  );
}
