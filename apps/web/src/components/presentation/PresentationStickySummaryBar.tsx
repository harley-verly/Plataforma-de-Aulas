import { Clock3 } from "lucide-react";

import {
  ActiveOfferState,
  PresentationAccessLead,
  PresentationChapter,
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
          <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_auto] xl:items-center">
            <div>
              <p className="text-[10px] uppercase tracking-[0.28em] text-gold">Ponto atual da proposta</p>
              <p className="mt-3 text-lg leading-relaxed text-paper">
                {currentChapter.title}
              </p>
            </div>

            <div className="grid gap-2 text-sm text-paper-muted xl:text-right">
              <span>
                Contato: <span className="text-paper">{lead.email}</span>
              </span>
              <span>
                Proposta aberta para <span className="text-paper">{lead.name}</span>
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
              : activeOffer.activeTier.label}
          </p>
        </div>
      </div>
    </div>
  </div>
);
