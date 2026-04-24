import { AffiliateConsole } from "../../components/affiliate-console";
import { MemberShell } from "../../components/member-shell";
import { getAffiliateOverview } from "../../lib/platform-api";

export default async function AffiliatePage() {
  const overview = await getAffiliateOverview();

  return (
    <MemberShell
      currentSection="affiliate"
      eyebrow="painel do afiliado"
      title="Affiliate"
      subtitle="Links, conversao e leitura comercial para perfis de afiliacao ja aprovados."
    >
      <section className="member-page-section">
        <AffiliateConsole overview={overview} />
      </section>
    </MemberShell>
  );
}
