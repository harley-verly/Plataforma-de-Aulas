import { Clock3 } from "lucide-react";

import {
  ActiveOfferState,
  PresentationAccessLead,
  PresentationChapter,
  formatCurrency,
  formatRemainingClock
} from "@/lib/commercial-presentation";

type Props = {
  activeOffer: ActiveOfferState;
  currentChapter: PresentationChapter;
  lead: PresentationAccessLead;
};

export const PresentationStickySummaryBar = ({ activeOffer, currentChapter, lead }: Props) => (
  <div className="sticky top-20 z-40 border-y border-gold/20 bg-background/92 backdrop-blur-xl">
    <div className="container-editorial grid gap-4 py-4 xl:grid-cols-[minmax(0,1fr)_260px] xl:items-center">
      <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
        <div>
          <p className="text-[10px] uppercase tracking-[0.28em] text-gold">Proposta vigente</p>
          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2">
            <h2 className="font-serif text-2xl text-paper">{activeOffer.activeTier.label}</h2>
            <span className="text-sm text-paper-muted">
              Liberada para <span className="text-paper">{lead.name}</span>
            </span>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-paper-muted">
            {formatCurrency(activeOffer.activeTier.priceCurrent)} com beta em{" "}
            {activeOffer.activeTier.betaDeliveryDays} dias, entrega final em{" "}
            {activeOffer.activeTier.finalDeliveryDays} dias e{" "}
            {activeOffer.activeTier.supportDays} dias de acompanhamento.
          </p>
        </div>

        <div className="grid gap-2 text-sm text-paper-muted md:text-right">
          <span>Capítulo atual: <span className="text-paper">{currentChapter.title}</span></span>
          <span>Contato: <span className="text-paper">{lead.email}</span></span>
        </div>
      </div>

      <div className="border border-gold/20 bg-ink-soft px-5 py-4 xl:justify-self-end">
        <p className="flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-gold">
          <Clock3 className="h-3.5 w-3.5" />
          Contagem da condição
        </p>
        <p className="mt-2 font-serif text-4xl leading-none text-paper">
          {activeOffer.offerExpired ? "00:00:00" : formatRemainingClock(activeOffer.remainingMs)}
        </p>
        <p className="mt-2 text-xs leading-relaxed text-paper-muted">
          {activeOffer.offerExpired
            ? "A janela promocional deste navegador encerrou e a proposta segue em valor padrão."
            : "Este relógio fixa o tempo restante da faixa comercial que está ativa neste navegador."}
        </p>
      </div>
    </div>
  </div>
);
