import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

import { OperationLayout } from "@/components/platform/OperationLayout";
import { getAffiliateOverview } from "@/lib/platform-api";

const AffiliatePage = () => {
  const { data } = useQuery({
    queryKey: ["affiliate-overview"],
    queryFn: getAffiliateOverview
  });

  return (
    <OperationLayout
      title="Affiliate"
      subtitle="Links, rastreio e leitura de comissao em uma camada interna coerente com o frontend principal."
    >
      <div className="grid gap-4 md:grid-cols-3">
        {(data?.kpis ?? []).map((kpi) => (
          <div key={kpi.label} className="border border-ink-line bg-ink-soft p-6">
            <p className="text-[11px] uppercase tracking-[0.3em] text-gold">{kpi.label}</p>
            <p className="mt-3 font-serif text-5xl text-paper">{kpi.value}</p>
            <p className="mt-3 text-sm text-paper-muted">{kpi.note}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 overflow-hidden border border-ink-line bg-ink-soft">
        <div className="border-b border-ink-line px-8 py-6">
          <p className="text-[11px] uppercase tracking-[0.3em] text-gold">Links ativos</p>
          <h2 className="mt-3 font-serif text-3xl text-paper">Rastreio de campanhas</h2>
        </div>
        <div className="divide-y divide-ink-line">
          {(data?.links ?? []).map((link) => (
            <div key={link.slug} className="flex flex-col gap-4 px-8 py-6 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="font-serif text-2xl text-paper">{link.slug}</p>
                <p className="mt-2 text-sm text-paper-muted">{link.destination}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="border border-gold/30 px-3 py-2 text-[10px] uppercase tracking-[0.22em] text-gold">
                  {link.status}
                </span>
                <Link to={link.destination} className="editorial-link text-[11px] uppercase tracking-[0.25em]">
                  Ver destino
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </OperationLayout>
  );
};

export default AffiliatePage;
