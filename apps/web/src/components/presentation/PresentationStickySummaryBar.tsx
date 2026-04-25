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
  <div className="sticky top-20 z-40 border-b border-gold/20 bg-background">
    <div className="container-editorial py-4">
      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_240px] xl:items-stretch">
        <div className="border border-ink-line bg-ink-soft px-5 py-5">
          <p className="text-[10px] uppercase tracking-[0.28em] text-gold">Condição reservada</p>
          <div className="mt-3 grid gap-4 xl:grid-cols-[minmax(0,1fr)_auto] xl:items-start">
            <div>
              <h2 className="font-serif text-4xl leading-none text-paper">
                {activeOffer.activeTier.label}
              </h2>
              <p className="mt-3 text-sm text-paper-muted">
                Proposta aberta para <span className="text-paper">{lead.name}</span>
              </p>
              <p className="mt-4 max-w-4xl text-lg leading-relaxed text-paper-soft">
                {formatCurrency(activeOffer.activeTier.priceCurrent)} para transformar a base atual
                da Plataforma de Aulas em uma entrega premium, com beta em{" "}
                {activeOffer.activeTier.betaDeliveryDays} dias, fase final em{" "}
                {activeOffer.activeTier.finalDeliveryDays} dias e{" "}
                {activeOffer.activeTier.supportDays} dias de acompanhamento pós-compra.
              </p>
            </div>

            <div className="grid gap-2 text-sm text-paper-muted xl:text-right">
              <span>
                Ponto atual da proposta: <span className="text-paper">{currentChapter.title}</span>
              </span>
              <span>
                Contato: <span className="text-paper">{lead.email}</span>
              </span>
            </div>
          </div>
        </div>

        <div className="border border-gold/20 bg-ink-soft px-5 py-4">
          <p className="flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-gold">
            <Clock3 className="h-3.5 w-3.5" />
            Janela desta condição
          </p>
          <p className="mt-2 font-serif text-4xl leading-none text-paper">
            {activeOffer.offerExpired ? "00:00:00" : formatRemainingClock(activeOffer.remainingMs)}
          </p>
          <p className="mt-2 text-xs leading-relaxed text-paper-muted">
            {activeOffer.offerExpired
              ? "A condição promocional desta apresentação foi encerrada."
              : "Enquanto esta contagem estiver ativa, esta é a condição comercial reservada para este acesso."}
          </p>
        </div>
      </div>
    </div>
  </div>
);
