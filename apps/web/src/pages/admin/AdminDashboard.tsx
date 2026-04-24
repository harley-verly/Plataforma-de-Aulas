import { useQuery } from "@tanstack/react-query";
import { useState, useTransition } from "react";
import { Activity, ArrowUpRight, BadgeCheck, RadioTower, Wallet } from "lucide-react";

import { OperationLayout } from "@/components/platform/OperationLayout";
import { approveApplication, getAdminOverview } from "@/lib/platform-api";

function getMessage(error: unknown, fallback: string) {
  if (error instanceof Error && error.message.trim()) {
    return error.message;
  }

  return fallback;
}

const AdminDashboard = () => {
  const { data, refetch } = useQuery({
    queryKey: ["admin-overview"],
    queryFn: getAdminOverview
  });

  const [feedback, setFeedback] = useState<string | null>(null);
  const [approvingId, setApprovingId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const stats = [
    {
      label: "Aprovacoes pendentes",
      value: `${data?.approvals.filter((item) => item.state !== "approved").length ?? 0}`,
      hint: "fila ativa de governanca",
      Icon: BadgeCheck
    },
    {
      label: "Checkouts",
      value: `${data?.finance.lastCheckoutCount ?? 0}`,
      hint: "sessoes criadas no staging",
      Icon: Wallet
    },
    {
      label: "Webhooks",
      value: `${data?.finance.webhookEventsReceived ?? 0}`,
      hint: "eventos recebidos pela operacao",
      Icon: RadioTower
    },
    {
      label: "Saude",
      value: data?.health.paymentsMode ?? "sandbox-first",
      hint: data?.health.stagingDomain ?? "aulas.abasolucoesetecnologia.com.br",
      Icon: Activity
    }
  ];

  return (
    <OperationLayout
      title="Admin"
      subtitle="Governanca, aprovacoes e leitura operacional do staging sem exposicao publica de modulos sensiveis."
      eyebrow="Painel administrativo"
    >
      {feedback ? <p className="mb-6 text-sm text-paper-soft">{feedback}</p> : null}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="group relative flex flex-col justify-between border border-ink-line bg-ink-soft p-6 transition-all duration-500 hover:border-gold/40"
          >
            <div className="flex items-center justify-between">
              <stat.Icon className="h-4 w-4 text-gold" />
              <ArrowUpRight className="h-4 w-4 text-paper-muted transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-gold" />
            </div>
            <div className="mt-10">
              <div className="font-serif text-4xl text-paper">{stat.value}</div>
              <p className="mt-2 text-[11px] uppercase tracking-[0.25em] text-gold">{stat.label}</p>
              <p className="mt-2 text-xs text-paper-muted">{stat.hint}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="border border-ink-line bg-ink-soft">
          <div className="flex items-center justify-between border-b border-ink-line px-6 py-4">
            <h2 className="font-serif text-2xl text-paper">Fila de aprovacao</h2>
            <span className="text-[10px] uppercase tracking-[0.3em] text-paper-muted">tempo real da demo</span>
          </div>
          <ul className="divide-y divide-ink-line">
            {(data?.approvals ?? []).map((approval) => (
              <li key={approval.id} className="px-6 py-5">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.25em] text-gold">
                      {approval.kind} · {approval.state}
                    </p>
                    <p className="mt-2 font-serif text-2xl text-paper">{approval.displayName}</p>
                    <p className="mt-2 text-sm text-paper-muted">{approval.note}</p>
                  </div>

                  {approval.state !== "approved" ? (
                    <button
                      type="button"
                      disabled={isPending && approvingId === approval.id}
                      onClick={() => {
                        setApprovingId(approval.id);
                        startTransition(() => {
                          void (async () => {
                            try {
                              const result = await approveApplication(approval.id, "aprovado pelo painel administrativo");
                              setFeedback(result.message);
                              await refetch();
                            } catch (error) {
                              setFeedback(getMessage(error, "Nao foi possivel registrar a aprovacao."));
                            } finally {
                              setApprovingId(null);
                            }
                          })();
                        });
                      }}
                      className="hover-gold-shimmer px-5 py-3 text-[11px] uppercase tracking-[0.25em] text-gold-foreground"
                    >
                      {isPending && approvingId === approval.id ? "Aprovando..." : "Aprovar"}
                    </button>
                  ) : (
                    <span className="border border-gold/30 px-4 py-3 text-[10px] uppercase tracking-[0.22em] text-gold">
                      aprovado
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-5">
          <div className="border border-ink-line bg-ink-soft p-6">
            <p className="text-[11px] uppercase tracking-[0.3em] text-gold">Saude do ambiente</p>
            <p className="mt-4 font-serif text-3xl text-paper">{data?.health.stagingDomain}</p>
            <p className="mt-4 text-sm text-paper-muted">
              Pagamentos em {data?.health.paymentsMode} com video por {data?.health.videoProviders.join(" + ")}.
            </p>
          </div>

          <div className="border border-ink-line bg-ink-soft p-6">
            <p className="text-[11px] uppercase tracking-[0.3em] text-gold">Observabilidade</p>
            <p className="mt-4 text-sm leading-relaxed text-paper-muted">
              Este painel consolida aprovacoes, checkouts e eventos do staging para a prova comercial do cliente.
            </p>
          </div>
        </div>
      </div>
    </OperationLayout>
  );
};

export default AdminDashboard;
