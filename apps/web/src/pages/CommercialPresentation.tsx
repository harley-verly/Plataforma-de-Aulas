import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { PresentationAccessGate } from "@/components/presentation/PresentationAccessGate";
import { PresentationChapterCard } from "@/components/presentation/PresentationChapterCard";
import { PresentationOfferRail } from "@/components/presentation/PresentationOfferRail";
import { PresentationProgressNav } from "@/components/presentation/PresentationProgressNav";
import { PresentationStickySummaryBar } from "@/components/presentation/PresentationStickySummaryBar";
import { PRESENTATION_CHAPTERS } from "@/components/presentation/presentation-content";
import { SectionLabel } from "@/components/site/SectionLabel";
import { SiteLayout } from "@/components/site/SiteLayout";
import {
  COMMERCIAL_OFFER_TIERS,
  createUnlockedProposalProgress,
  getActiveOfferState,
  getSavedPresentationAccessLead,
  initializeProposalProgress,
  isValidChapterId,
  persistPresentationAccessLead,
  persistProposalProgress
} from "@/lib/commercial-presentation";
import { captureCommercialPresentationLead } from "@/lib/platform-api";

const CommercialPresentation = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const requestedChapterId = searchParams.get("capitulo");
  const savedLead = useMemo(() => getSavedPresentationAccessLead(), []);
  const initialChapter = useMemo(
    () =>
      PRESENTATION_CHAPTERS.find((chapter) => chapter.id === requestedChapterId) ??
      PRESENTATION_CHAPTERS[0],
    [requestedChapterId]
  );

  const [lead, setLead] = useState(savedLead);
  const [progress, setProgress] = useState(() =>
    savedLead ? initializeProposalProgress(PRESENTATION_CHAPTERS, requestedChapterId) : null
  );
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [now, setNow] = useState(Date.now());

  const currentChapterIndex = progress
    ? PRESENTATION_CHAPTERS.findIndex((chapter) => chapter.id === progress.lastChapter)
    : 0;
  const safeChapterIndex = currentChapterIndex >= 0 ? currentChapterIndex : 0;
  const currentChapter = progress ? PRESENTATION_CHAPTERS[safeChapterIndex] : initialChapter;
  const activeOffer = progress ? getActiveOfferState(progress.startedAt, now) : null;

  useEffect(() => {
    if (!progress) {
      return;
    }

    const interval = window.setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => {
      window.clearInterval(interval);
    };
  }, [progress]);

  useEffect(() => {
    if (!progress || !requestedChapterId || !isValidChapterId(PRESENTATION_CHAPTERS, requestedChapterId)) {
      return;
    }

    setProgress((previous) =>
      !previous
        ? previous
        : previous.lastChapter === requestedChapterId
          ? previous
          : {
              ...previous,
              lastChapter: requestedChapterId,
              lastSeenAt: Date.now()
            }
    );
  }, [progress, requestedChapterId]);

  useEffect(() => {
    if (!progress) {
      return;
    }

    persistProposalProgress(progress);
  }, [progress]);

  useEffect(() => {
    if (!progress) {
      return;
    }

    if (requestedChapterId !== progress.lastChapter) {
      setSearchParams({ capitulo: progress.lastChapter }, { replace: true });
    }
  }, [progress, requestedChapterId, setSearchParams]);

  const goToChapter = (chapterId: string) => {
    setProgress((previous) =>
      !previous
        ? previous
        : {
            ...previous,
            lastChapter: chapterId,
            lastSeenAt: Date.now()
          }
    );
  };

  const goToPreviousChapter = () => {
    if (!progress || safeChapterIndex === 0) {
      return;
    }

    goToChapter(PRESENTATION_CHAPTERS[safeChapterIndex - 1].id);
  };

  const goToNextChapter = () => {
    if (!progress || safeChapterIndex >= PRESENTATION_CHAPTERS.length - 1) {
      return;
    }

    goToChapter(PRESENTATION_CHAPTERS[safeChapterIndex + 1].id);
  };

  const handleUnlockPresentation = async (input: {
    name: string;
    email: string;
    phone: string;
  }) => {
    setIsUnlocking(true);
    setSubmitError(null);

    try {
      const firstTier = COMMERCIAL_OFFER_TIERS[0];
      const response = await captureCommercialPresentationLead({
        name: input.name,
        email: input.email,
        phone: input.phone,
        currentChapterId: initialChapter.id,
        currentChapterTitle: initialChapter.title,
        activeTierId: firstTier.tierId,
        activeTierLabel: firstTier.label,
        activePriceInCents: firstTier.priceCurrent,
        landingPath: `${window.location.pathname}${window.location.search}`
      });

      const capturedAt = response.capturedAt || Date.now();
      const unlockedLead = {
        ...input,
        capturedAt
      };
      const unlockedProgress = createUnlockedProposalProgress(
        PRESENTATION_CHAPTERS,
        requestedChapterId,
        capturedAt
      );

      persistPresentationAccessLead(unlockedLead);
      persistProposalProgress(unlockedProgress);
      setLead(unlockedLead);
      setProgress(unlockedProgress);
      setNow(capturedAt);
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Não foi possível liberar a apresentação agora. Tente novamente em instantes."
      );
    } finally {
      setIsUnlocking(false);
    }
  };

  if (!lead || !progress || !activeOffer) {
    return (
      <SiteLayout>
        <PresentationAccessGate
          onSubmit={handleUnlockPresentation}
          isSubmitting={isUnlocking}
          errorMessage={submitError}
        />
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <PresentationStickySummaryBar
        activeOffer={activeOffer}
        currentChapter={currentChapter}
        lead={lead}
      />

      <section className="container-editorial py-12 md:py-16">
        <SectionLabel number="00">Apresentação comercial</SectionLabel>

        <div className="mt-8 max-w-4xl">
          <h1 className="font-serif text-5xl leading-[0.98] text-paper md:text-7xl">
            Uma proposta comercial viva para vender a Plataforma de Aulas com clareza.
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-paper-soft">
            Este material funciona como walkthrough comercial da estrutura já validada no demo
            e da entrega contratada do projeto. O progresso e a janela de oferta ficam salvos
            neste navegador para o cliente retomar a proposta sem perder contexto.
          </p>
        </div>

        <div className="mt-10 xl:hidden">
          <PresentationOfferRail activeOffer={activeOffer} currentChapter={currentChapter} compact />
        </div>

        <div className="mt-10 grid gap-8 xl:grid-cols-[minmax(0,1fr)_360px]">
          <div className="space-y-8">
            <PresentationProgressNav
              chapters={PRESENTATION_CHAPTERS}
              currentChapterId={currentChapter.id}
              onSelectChapter={goToChapter}
            />

            <PresentationChapterCard
              chapter={currentChapter}
              chapterIndex={safeChapterIndex}
              totalChapters={PRESENTATION_CHAPTERS.length}
              onPrevious={goToPreviousChapter}
              onNext={goToNextChapter}
              hasPrevious={safeChapterIndex > 0}
              hasNext={safeChapterIndex < PRESENTATION_CHAPTERS.length - 1}
            />
          </div>

          <aside className="hidden xl:block">
            <div className="sticky top-[11.5rem]">
              <PresentationOfferRail activeOffer={activeOffer} currentChapter={currentChapter} />
            </div>
          </aside>
        </div>
      </section>
    </SiteLayout>
  );
};

export default CommercialPresentation;
