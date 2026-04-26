import {
  ActiveOfferState,
  COMMERCIAL_OFFER_TIERS,
  PresentationChapter,
  buildWhatsAppHref,
  formatCurrency,
  formatRemainingTime
} from "@/lib/commercial-presentation";

type Props = {
  activeOffer: ActiveOfferState;
  currentChapter: PresentationChapter;
  compact?: boolean;
};

export const PresentationOfferRail = ({ activeOffer, currentChapter, compact = false }: Props) => {
  const whatsappHref = buildWhatsAppHref(currentChapter.title, activeOffer.activeTier);

  return (
    <div className={["border border-gold/20 bg-gradient-ink", compact ? "p-5" : "p-6"].join(" ")}>
      <p className="text-[10px] uppercase tracking-[0.3em] text-gold">Condição comercial</p>
      <h2 className="mt-3 font-serif text-3xl text-paper">{activeOffer.activeTier.label}</h2>
      <p className="mt-3 text-sm leading-relaxed text-paper-muted">
        Esta proposta reserva uma condição de entrada pensada para acelerar a decisão sem perder clareza
        de prazo, investimento e acompanhamento pós-entrega.
      </p>

      <div className="mt-6 grid gap-3 border-y border-ink-line py-5">
        <div className="flex items-baseline justify-between gap-4">
          <span className="text-[10px] uppercase tracking-[0.28em] text-paper-muted">Investimento</span>
          <div className="text-right">
            <p className="text-xs text-paper-muted line-through">
              {formatCurrency(activeOffer.activeTier.priceOriginal)}
            </p>
            <p className="font-serif text-4xl text-gold-soft">
              {formatCurrency(activeOffer.activeTier.priceCurrent)}
            </p>
          </div>
        </div>

        <div className={compact ? "grid gap-3 sm:grid-cols-3" : "grid grid-cols-2 gap-3"}>
          <OfferMetric label="Versão beta" value={`${activeOffer.activeTier.betaDeliveryDays} dias`} />
          <OfferMetric label="Projeto final" value={`${activeOffer.activeTier.finalDeliveryDays} dias`} />
          <OfferMetric
            label="Acompanhamento"
            value={`${activeOffer.activeTier.supportDays} dias`}
            className={compact ? "" : "col-span-2"}
          />
        </div>

        <div className="rounded-sm border border-gold/20 bg-background/70 px-4 py-4">
          <p className="text-[10px] uppercase tracking-[0.28em] text-paper-muted">Janela desta condição</p>
          <p className="mt-2 font-serif text-3xl text-paper">
            {activeOffer.offerExpired ? "Encerrada" : formatRemainingTime(activeOffer.remainingMs)}
          </p>
          <p className="mt-2 text-sm text-paper-muted">
            {activeOffer.offerExpired
              ? "A condição promocional deste acesso terminou. A proposta segue disponível na faixa padrão."
              : "Enquanto esta janela estiver ativa, esta é a melhor condição reservada para esta apresentação."}
          </p>
        </div>
      </div>

      <div className="mt-5 space-y-3">
        {COMMERCIAL_OFFER_TIERS.map((tier) => {
          const isActive = tier.tierId === activeOffer.activeTier.tierId;

          return (
            <div
              key={tier.tierId}
              className={[
                "border px-4 py-4 transition-all",
                isActive ? "border-gold/50 bg-gold/10" : "border-ink-line bg-background/60"
              ].join(" ")}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.28em] text-gold">{tier.label}</p>
                  <p className="mt-2 font-serif text-2xl text-paper">{formatCurrency(tier.priceCurrent)}</p>
                </div>
                <span className="text-[10px] uppercase tracking-[0.28em] text-paper-muted">
                  até {tier.deadlineHours}h
                </span>
              </div>
              <p className="mt-3 text-sm text-paper-muted">
                Beta em {tier.betaDeliveryDays} dias, fase final em {tier.finalDeliveryDays} dias e{" "}
                {tier.supportDays} dias de acompanhamento pós-compra.
              </p>
            </div>
          );
        })}
      </div>

      <a
        href={whatsappHref}
        target="_blank"
        rel="noreferrer"
        className="hover-gold-shimmer mt-6 inline-flex w-full items-center justify-center gap-3 px-6 py-4 text-[11px] uppercase tracking-[0.25em] text-gold-foreground shadow-gold-glow"
      >
        Quero avançar por WhatsApp
      </a>

      {!compact && (
        <p className="mt-4 text-xs leading-relaxed text-paper-muted">
          Ponto atual da proposta: <span className="text-paper">{currentChapter.title}</span>
        </p>
      )}
    </div>
  );
};

const OfferMetric = ({
  label,
  value,
  className = ""
}: {
  label: string;
  value: string;
  className?: string;
}) => (
  <div className={["border border-ink-line bg-background/50 px-4 py-4", className].join(" ").trim()}>
    <p className="text-[10px] uppercase tracking-[0.18em] text-paper-muted">{label}</p>
    <p className="mt-2 font-serif text-2xl text-paper">{value}</p>
  </div>
);
