import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { PresentationChapterCard } from "@/components/presentation/PresentationChapterCard";
import { PresentationOfferRail } from "@/components/presentation/PresentationOfferRail";
import { PresentationProgressNav } from "@/components/presentation/PresentationProgressNav";
import { PRESENTATION_CHAPTERS } from "@/components/presentation/presentation-content";
import { SectionLabel } from "@/components/site/SectionLabel";
import { SiteLayout } from "@/components/site/SiteLayout";
import {
  getActiveOfferState,
  initializeProposalProgress,
  isValidChapterId,
  persistProposalProgress
} from "@/lib/commercial-presentation";

const CommercialPresentation = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const requestedChapterId = searchParams.get("capitulo");

  const [progress, setProgress] = useState(() =>
    initializeProposalProgress(PRESENTATION_CHAPTERS, requestedChapterId)
  );
  const [now, setNow] = useState(Date.now());

  const currentChapterIndex = PRESENTATION_CHAPTERS.findIndex(
    (chapter) => chapter.id === progress.lastChapter
  );
  const safeChapterIndex = currentChapterIndex >= 0 ? currentChapterIndex : 0;
  const currentChapter = PRESENTATION_CHAPTERS[safeChapterIndex];
  const activeOffer = getActiveOfferState(progress.startedAt, now);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => {
      window.clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (!requestedChapterId || !isValidChapterId(PRESENTATION_CHAPTERS, requestedChapterId)) {
      return;
    }

    setProgress((previous) =>
      previous.lastChapter === requestedChapterId
        ? previous
        : {
            ...previous,
            lastChapter: requestedChapterId,
            lastSeenAt: Date.now()
          }
    );
  }, [requestedChapterId]);

  useEffect(() => {
    persistProposalProgress(progress);
  }, [progress]);

  useEffect(() => {
    if (requestedChapterId !== progress.lastChapter) {
      setSearchParams({ capitulo: progress.lastChapter }, { replace: true });
    }
  }, [progress.lastChapter, requestedChapterId, setSearchParams]);

  const goToChapter = (chapterId: string) => {
    setProgress((previous) => ({
      ...previous,
      lastChapter: chapterId,
      lastSeenAt: Date.now()
    }));
  };

  const goToPreviousChapter = () => {
    if (safeChapterIndex === 0) {
      return;
    }

    goToChapter(PRESENTATION_CHAPTERS[safeChapterIndex - 1].id);
  };

  const goToNextChapter = () => {
    if (safeChapterIndex >= PRESENTATION_CHAPTERS.length - 1) {
      return;
    }

    goToChapter(PRESENTATION_CHAPTERS[safeChapterIndex + 1].id);
  };

  return (
    <SiteLayout>
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
            <div className="sticky top-28">
              <PresentationOfferRail activeOffer={activeOffer} currentChapter={currentChapter} />
            </div>
          </aside>
        </div>
      </section>
    </SiteLayout>
  );
};

export default CommercialPresentation;
