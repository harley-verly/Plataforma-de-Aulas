import { Clock3 } from "lucide-react";

import {
  ActiveOfferState,
  formatCurrency,
  formatRemainingClock
} from "@/lib/commercial-presentation";

type Props = {
  activeOffer: ActiveOfferState;
};

export const PresentationStickySummaryBar = ({ activeOffer }: Props) => (
  <div className="sticky top-20 z-40 border-b border-gold/20 bg-background">
    <div className="container-editorial h-20 py-0">
      <div className="grid h-full gap-4 xl:grid-cols-[minmax(0,1fr)_210px] xl:items-stretch">
        <div className="flex h-full min-w-0 items-center gap-4 border border-ink-line bg-ink-soft px-5">
          <span className="shrink-0 text-[9px] uppercase tracking-[0.26em] text-gold">
            Condição reservada
          </span>
          <h2 className="shrink-0 font-serif text-[2rem] leading-none text-paper">
            {activeOffer.activeTier.label}
          </h2>
          <p className="min-w-0 text-[13px] leading-5 text-paper-muted">
            {formatCurrency(activeOffer.activeTier.priceCurrent)} para transformar a base atual da Plataforma de
            Aulas em uma entrega premium, com beta em {activeOffer.activeTier.betaDeliveryDays} dias, fase final em{" "}
            {activeOffer.activeTier.finalDeliveryDays} dias e {activeOffer.activeTier.supportDays} dias de
            acompanhamento pós-compra.
          </p>
        </div>

        <div className="flex h-full flex-col justify-center border border-gold/20 bg-ink-soft px-4">
          <p className="flex items-center gap-2 text-[9px] uppercase tracking-[0.24em] text-gold">
            <Clock3 className="h-3 w-3" />
            Janela desta condição
          </p>
          <p className="mt-1 font-serif text-[2.4rem] leading-none text-paper">
            {activeOffer.offerExpired ? "00:00:00" : formatRemainingClock(activeOffer.remainingMs)}
          </p>
          <p className="mt-1 text-[11px] leading-4 text-paper-muted">
            {activeOffer.offerExpired
              ? "Condição promocional encerrada."
              : activeOffer.activeTier.label}
          </p>
        </div>
      </div>
    </div>
  </div>
);
