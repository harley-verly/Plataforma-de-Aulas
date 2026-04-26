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
      <div className="grid h-full gap-3 xl:grid-cols-[minmax(0,1fr)_180px] xl:items-stretch">
        <div className="grid h-full min-w-0 grid-cols-[auto_auto_minmax(0,1fr)] items-center gap-4 overflow-hidden border border-ink-line bg-ink-soft px-4">
          <span className="shrink-0 text-[8px] uppercase tracking-[0.22em] text-gold">
            Condição reservada
          </span>
          <h2 className="shrink-0 font-serif text-[1.15rem] leading-none text-paper xl:text-[1.35rem]">
            {activeOffer.activeTier.label}
          </h2>
          <p className="min-w-0 truncate whitespace-nowrap text-[10px] leading-none text-paper-muted xl:text-[11px]">
            {formatCurrency(activeOffer.activeTier.priceCurrent)} | beta em{" "}
            {activeOffer.activeTier.betaDeliveryDays} dias | final em{" "}
            {activeOffer.activeTier.finalDeliveryDays} dias | acompanhamento de{" "}
            {activeOffer.activeTier.supportDays} dias
          </p>
        </div>

        <div className="flex h-full min-h-0 flex-col justify-center overflow-hidden border border-gold/20 bg-ink-soft px-3">
          <p className="flex items-center gap-2 text-[8px] uppercase tracking-[0.18em] leading-3 text-gold">
            <Clock3 className="h-3 w-3" />
            Janela desta condição
          </p>
          <p className="mt-1 font-serif text-[1.85rem] leading-none text-paper xl:text-[2rem]">
            {activeOffer.offerExpired ? "00:00:00" : formatRemainingClock(activeOffer.remainingMs)}
          </p>
        </div>
      </div>
    </div>
  </div>
);
