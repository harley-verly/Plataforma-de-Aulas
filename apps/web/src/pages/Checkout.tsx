import { useQuery } from "@tanstack/react-query";
import { useEffect, useState, useTransition } from "react";
import { Link, useParams } from "react-router-dom";

import { SectionLabel } from "@/components/site/SectionLabel";
import { SiteLayout } from "@/components/site/SiteLayout";
import { useDemoSession } from "@/hooks/use-demo-session";
import { createCheckoutSession, getCheckoutOffer, type CheckoutSessionResponse } from "@/lib/platform-api";

function getMessage(error: unknown, fallback: string) {
  if (error instanceof Error && error.message.trim()) {
    return error.message;
  }

  return fallback;
}

const CheckoutPage = () => {
  const { offerId } = useParams();
  const session = useDemoSession();
  const { data } = useQuery({
    queryKey: ["checkout-offer", offerId],
    queryFn: () => getCheckoutOffer(offerId ?? ""),
    enabled: Boolean(offerId)
  });

  const [buyerName, setBuyerName] = useState("Harley Verly");
  const [buyerEmail, setBuyerEmail] = useState("contato@abasolucoesetecnologia.com.br");
  const [affiliateCode, setAffiliateCode] = useState("");
  const [checkoutSession, setCheckoutSession] = useState<CheckoutSessionResponse | null>(null);
  const [feedback, setFeedback] = useState<{ tone: "success" | "error"; text: string } | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (!session) {
      return;
    }

    setBuyerEmail(session.email);
    if (session.fullName) {
      setBuyerName(session.fullName);
    }
  }, [session]);

  if (!data) {
    return (
      <SiteLayout>
        <div className="container-editorial py-32">
          <p className="text-[11px] uppercase tracking-[0.3em] text-gold">Preparando checkout</p>
          <h1 className="mt-6 font-serif text-5xl text-paper">Carregando oferta</h1>
        </div>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <section className="container-editorial pb-24 pt-12 md:pt-20">
        <SectionLabel number="05">Checkout sandbox-first</SectionLabel>
        <div className="mt-8 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="border border-ink-line bg-gradient-ink p-10 md:p-12">
            <p className="text-[11px] uppercase tracking-[0.3em] text-gold">{data.course.producerName}</p>
            <h1 className="mt-6 font-serif text-5xl leading-[0.98] text-paper md:text-6xl">{data.course.title}</h1>
            <p className="mt-6 text-lg text-paper-soft">{data.course.subtitle}</p>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-paper-muted">{data.course.summary}</p>

            <div className="mt-10 border border-ink-line bg-ink-soft p-6">
              <p className="text-[11px] uppercase tracking-[0.3em] text-gold">{data.offer.title}</p>
              <p className="mt-2 font-serif text-4xl text-paper">{data.offer.priceLabel}</p>
              <p className="mt-3 text-sm leading-relaxed text-paper-muted">{data.offer.description}</p>
            </div>
          </div>

          <div className="border border-ink-line bg-ink-soft p-8 md:p-10">
            <p className="text-[11px] uppercase tracking-[0.3em] text-gold">Dados da demonstracao</p>
            <h2 className="mt-4 font-serif text-4xl text-paper">Gerar sessao de checkout</h2>

            {feedback ? (
              <div
                className={`mt-6 border px-5 py-4 text-sm ${
                  feedback.tone === "error"
                    ? "border-destructive/40 bg-destructive/10 text-paper"
                    : "border-gold/30 bg-gold/10 text-paper"
                }`}
              >
                {feedback.text}
              </div>
            ) : null}

            <form
              className="mt-8 space-y-5"
              onSubmit={(event) => {
                event.preventDefault();

                startTransition(() => {
                  void (async () => {
                    setFeedback(null);

                    try {
                      const result = await createCheckoutSession({
                        offerId: data.offer.id,
                        buyerName,
                        buyerEmail,
                        affiliateCode: affiliateCode.trim() || undefined
                      });

                      setCheckoutSession(result);
                      setFeedback({
                        tone: "success",
                        text: "Sessao criada com sucesso no modo sandbox-first."
                      });
                    } catch (error) {
                      setFeedback({
                        tone: "error",
                        text: getMessage(error, "Nao foi possivel criar a sessao de checkout.")
                      });
                    }
                  })();
                });
              }}
            >
              <label className="block">
                <span className="text-[10px] uppercase tracking-[0.3em] text-paper-muted">Nome do comprador</span>
                <input
                  value={buyerName}
                  onChange={(event) => setBuyerName(event.target.value)}
                  required
                  className="mt-2 h-12 w-full border border-ink-line bg-ink px-4 text-sm text-paper focus:border-gold focus:outline-none"
                />
              </label>

              <label className="block">
                <span className="text-[10px] uppercase tracking-[0.3em] text-paper-muted">E-mail</span>
                <input
                  type="email"
                  value={buyerEmail}
                  onChange={(event) => setBuyerEmail(event.target.value)}
                  required
                  className="mt-2 h-12 w-full border border-ink-line bg-ink px-4 text-sm text-paper focus:border-gold focus:outline-none"
                />
              </label>

              <label className="block">
                <span className="text-[10px] uppercase tracking-[0.3em] text-paper-muted">Codigo de afiliado</span>
                <input
                  value={affiliateCode}
                  onChange={(event) => setAffiliateCode(event.target.value)}
                  placeholder="opcional"
                  className="mt-2 h-12 w-full border border-ink-line bg-ink px-4 text-sm text-paper focus:border-gold focus:outline-none"
                />
              </label>

              <button
                type="submit"
                disabled={isPending}
                className="hover-gold-shimmer w-full px-6 py-4 text-[11px] uppercase tracking-[0.25em] text-gold-foreground disabled:opacity-70"
              >
                {isPending ? "Criando sessao..." : "Gerar checkout"}
              </button>
            </form>

            {checkoutSession ? (
              <div className="mt-8 border border-gold/20 bg-ink p-6">
                <p className="text-[11px] uppercase tracking-[0.3em] text-gold">Sessao criada</p>
                <h3 className="mt-3 font-serif text-3xl text-paper">{checkoutSession.checkoutId}</h3>
                <p className="mt-3 text-sm text-paper-muted">
                  Provedor: {checkoutSession.provider} | Split preparado:{" "}
                  {checkoutSession.splitPrepared ? "sim" : "nao"}
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    to={checkoutSession.urls.success}
                    className="hover-gold-shimmer px-6 py-3 text-[11px] uppercase tracking-[0.25em] text-gold-foreground"
                  >
                    Ir para area do aluno
                  </Link>
                  <Link to={`/catalog/${data.course.slug}`} className="editorial-link text-[11px] uppercase tracking-[0.25em]">
                    Voltar para oferta
                  </Link>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
};

export default CheckoutPage;
