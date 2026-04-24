import { useQuery } from "@tanstack/react-query";
import { useState, useTransition } from "react";
import { ArrowUpRight, BadgeCheck, GraduationCap, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

import { OperationLayout } from "@/components/platform/OperationLayout";
import { useDemoSession } from "@/hooks/use-demo-session";
import {
  getLearningOverview,
  submitAffiliateApplication,
  submitProducerApplication
} from "@/lib/platform-api";

function getMessage(error: unknown, fallback: string) {
  if (error instanceof Error && error.message.trim()) {
    return error.message;
  }

  return fallback;
}

const LearningPage = () => {
  const session = useDemoSession();
  const { data } = useQuery({
    queryKey: ["learning-overview"],
    queryFn: getLearningOverview
  });

  const [portfolioUrl, setPortfolioUrl] = useState("https://exemplo.com/portfolio");
  const [channelUrl, setChannelUrl] = useState("https://instagram.com/seu_canal");
  const [producerFeedback, setProducerFeedback] = useState<string | null>(null);
  const [affiliateFeedback, setAffiliateFeedback] = useState<string | null>(null);
  const [isProducerPending, startProducerTransition] = useTransition();
  const [isAffiliatePending, startAffiliateTransition] = useTransition();

  return (
    <OperationLayout
      title="Learning"
      subtitle="Continue as trilhas em andamento, acompanhe progresso e use a propria sessao para pedir novos papeis quando fizer sentido."
    >
      <div className="grid gap-4 md:grid-cols-3">
        <div className="border border-ink-line bg-ink-soft p-6">
          <GraduationCap className="h-5 w-5 text-gold" />
          <p className="mt-4 text-[11px] uppercase tracking-[0.3em] text-gold">Cursos ativos</p>
          <p className="mt-3 font-serif text-5xl text-paper">{data?.enrolledCourses.length ?? 0}</p>
        </div>
        <div className="border border-ink-line bg-ink-soft p-6">
          <BadgeCheck className="h-5 w-5 text-gold" />
          <p className="mt-4 text-[11px] uppercase tracking-[0.3em] text-gold">Certificados prontos</p>
          <p className="mt-3 font-serif text-5xl text-paper">{data?.certificatesReady ?? 0}</p>
        </div>
        <div className="border border-ink-line bg-ink-soft p-6">
          <Sparkles className="h-5 w-5 text-gold" />
          <p className="mt-4 text-[11px] uppercase tracking-[0.3em] text-gold">Sessao atual</p>
          <p className="mt-3 font-serif text-2xl text-paper">{session?.fullName ?? session?.email ?? "Aluno"}</p>
          <p className="mt-2 text-sm text-paper-muted">{session?.statusLabel ?? "acesso ativo"}</p>
        </div>
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        {(data?.enrolledCourses ?? []).map((course) => (
          <Link
            key={course.slug}
            to={`/learning/${course.slug}`}
            className="group border border-ink-line bg-ink-soft p-8 transition-all duration-500 hover:border-gold/40"
          >
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="text-[11px] uppercase tracking-[0.3em] text-gold">Trilha ativa</p>
                <h2 className="mt-4 font-serif text-3xl text-paper">{course.title}</h2>
                <p className="mt-4 text-sm leading-relaxed text-paper-muted">
                  Proxima aula: {course.nextLesson ?? "retomada disponivel"}
                </p>
              </div>
              <ArrowUpRight className="h-5 w-5 text-paper-muted transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-gold" />
            </div>
            <div className="mt-8">
              <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.22em] text-paper-muted">
                <span>Progresso</span>
                <span>{course.completionPct}%</span>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-ink">
                <div className="h-full bg-gradient-gold" style={{ width: `${course.completionPct}%` }} />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {session?.role === "student" ? (
        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          <div className="border border-ink-line bg-ink-soft p-8">
            <p className="text-[11px] uppercase tracking-[0.3em] text-gold">Aplicacao interna</p>
            <h2 className="mt-4 font-serif text-3xl text-paper">Solicitar perfil de produtor</h2>
            <p className="mt-4 text-sm leading-relaxed text-paper-muted">
              O pedido parte da conta normal e entra na fila administrativa para validacao de portfolio e operacao.
            </p>
            <form
              className="mt-6 space-y-4"
              onSubmit={(event) => {
                event.preventDefault();
                if (!session) {
                  return;
                }

                startProducerTransition(() => {
                  void (async () => {
                    try {
                      const result = await submitProducerApplication({
                        fullName: session.fullName ?? session.email,
                        email: session.email,
                        portfolioUrl
                      });
                      setProducerFeedback(result.message);
                    } catch (error) {
                      setProducerFeedback(getMessage(error, "Nao foi possivel registrar a solicitacao."));
                    }
                  })();
                });
              }}
            >
              <label className="block">
                <span className="text-[10px] uppercase tracking-[0.3em] text-paper-muted">URL do portfolio</span>
                <input
                  value={portfolioUrl}
                  onChange={(event) => setPortfolioUrl(event.target.value)}
                  required
                  className="mt-2 h-12 w-full border border-ink-line bg-ink px-4 text-sm text-paper focus:border-gold focus:outline-none"
                />
              </label>
              <button
                type="submit"
                disabled={isProducerPending}
                className="hover-gold-shimmer w-full px-6 py-4 text-[11px] uppercase tracking-[0.25em] text-gold-foreground"
              >
                {isProducerPending ? "Enviando..." : "Registrar solicitacao"}
              </button>
            </form>
            {producerFeedback ? <p className="mt-4 text-sm text-paper-soft">{producerFeedback}</p> : null}
          </div>

          <div className="border border-ink-line bg-ink-soft p-8">
            <p className="text-[11px] uppercase tracking-[0.3em] text-gold">Aplicacao interna</p>
            <h2 className="mt-4 font-serif text-3xl text-paper">Solicitar perfil de afiliado</h2>
            <p className="mt-4 text-sm leading-relaxed text-paper-muted">
              O processo fica dentro da sessao do aluno e segue para aprovacao administrativa com trilha de governanca.
            </p>
            <form
              className="mt-6 space-y-4"
              onSubmit={(event) => {
                event.preventDefault();
                if (!session) {
                  return;
                }

                startAffiliateTransition(() => {
                  void (async () => {
                    try {
                      const result = await submitAffiliateApplication({
                        fullName: session.fullName ?? session.email,
                        email: session.email,
                        channelUrl
                      });
                      setAffiliateFeedback(result.message);
                    } catch (error) {
                      setAffiliateFeedback(getMessage(error, "Nao foi possivel registrar a solicitacao."));
                    }
                  })();
                });
              }}
            >
              <label className="block">
                <span className="text-[10px] uppercase tracking-[0.3em] text-paper-muted">URL do canal</span>
                <input
                  value={channelUrl}
                  onChange={(event) => setChannelUrl(event.target.value)}
                  required
                  className="mt-2 h-12 w-full border border-ink-line bg-ink px-4 text-sm text-paper focus:border-gold focus:outline-none"
                />
              </label>
              <button
                type="submit"
                disabled={isAffiliatePending}
                className="hover-gold-shimmer w-full px-6 py-4 text-[11px] uppercase tracking-[0.25em] text-gold-foreground"
              >
                {isAffiliatePending ? "Enviando..." : "Registrar solicitacao"}
              </button>
            </form>
            {affiliateFeedback ? <p className="mt-4 text-sm text-paper-soft">{affiliateFeedback}</p> : null}
          </div>
        </div>
      ) : null}
    </OperationLayout>
  );
};

export default LearningPage;
