import { useQuery } from "@tanstack/react-query";
import { useState, useTransition } from "react";

import { OperationLayout } from "@/components/platform/OperationLayout";
import { createStudioCourse, getStudioOverview } from "@/lib/platform-api";

function getMessage(error: unknown, fallback: string) {
  if (error instanceof Error && error.message.trim()) {
    return error.message;
  }

  return fallback;
}

const StudioPage = () => {
  const { data } = useQuery({
    queryKey: ["studio-overview"],
    queryFn: getStudioOverview
  });

  const [title, setTitle] = useState("Nova trilha premium");
  const [summary, setSummary] = useState(
    "Resumo inicial do curso com proposta, estrutura e uma explicacao curta sobre o que sera entregue na area do aluno."
  );
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  return (
    <OperationLayout
      title="Studio"
      subtitle="Espaco operacional para publicar cursos, acompanhar pipeline e iniciar novos rascunhos com a mesma linguagem premium do front."
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

      <div className="mt-8 grid gap-5 xl:grid-cols-[0.85fr_1.15fr]">
        <div className="border border-ink-line bg-ink-soft p-8">
          <p className="text-[11px] uppercase tracking-[0.3em] text-gold">Novo rascunho</p>
          <h2 className="mt-4 font-serif text-3xl text-paper">Criar curso no studio</h2>
          <p className="mt-4 text-sm leading-relaxed text-paper-muted">
            O rascunho entra na operacao com titulo, resumo e trilha de aprovacao pronta para continuar.
          </p>

          <form
            className="mt-6 space-y-5"
            onSubmit={(event) => {
              event.preventDefault();

              startTransition(() => {
                void (async () => {
                  try {
                    const result = await createStudioCourse({ title, summary });
                    setFeedback(`${result.message}: ${result.draft.title}`);
                  } catch (error) {
                    setFeedback(getMessage(error, "Nao foi possivel criar o rascunho."));
                  }
                })();
              });
            }}
          >
            <label className="block">
              <span className="text-[10px] uppercase tracking-[0.3em] text-paper-muted">Titulo</span>
              <input
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                required
                className="mt-2 h-12 w-full border border-ink-line bg-ink px-4 text-sm text-paper focus:border-gold focus:outline-none"
              />
            </label>

            <label className="block">
              <span className="text-[10px] uppercase tracking-[0.3em] text-paper-muted">Resumo</span>
              <textarea
                value={summary}
                onChange={(event) => setSummary(event.target.value)}
                rows={5}
                required
                className="mt-2 w-full border border-ink-line bg-ink px-4 py-3 text-sm text-paper focus:border-gold focus:outline-none"
              />
            </label>

            <button
              type="submit"
              disabled={isPending}
              className="hover-gold-shimmer w-full px-6 py-4 text-[11px] uppercase tracking-[0.25em] text-gold-foreground"
            >
              {isPending ? "Criando..." : "Gerar rascunho"}
            </button>
          </form>

          {feedback ? <p className="mt-4 text-sm text-paper-soft">{feedback}</p> : null}
        </div>

        <div className="border border-ink-line bg-ink-soft">
          <div className="border-b border-ink-line px-8 py-6">
            <p className="text-[11px] uppercase tracking-[0.3em] text-gold">Pipeline de revisao</p>
            <h2 className="mt-3 font-serif text-3xl text-paper">Fila operacional</h2>
          </div>
          <div className="divide-y divide-ink-line">
            {(data?.pipeline ?? []).map((item) => (
              <div key={`${item.title}-${item.state}`} className="px-8 py-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="font-serif text-2xl text-paper">{item.title}</h3>
                  <span className="border border-gold/30 px-3 py-2 text-[10px] uppercase tracking-[0.22em] text-gold">
                    {item.state}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </OperationLayout>
  );
};

export default StudioPage;
