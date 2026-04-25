import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";

import { PresentationChapter } from "@/lib/commercial-presentation";

type Props = {
  chapter: PresentationChapter;
  chapterIndex: number;
  totalChapters: number;
  onPrevious: () => void;
  onNext: () => void;
  hasPrevious: boolean;
  hasNext: boolean;
};

export const PresentationChapterCard = ({
  chapter,
  chapterIndex,
  totalChapters,
  onPrevious,
  onNext,
  hasPrevious,
  hasNext
}: Props) => {
  return (
    <article className="overflow-hidden border border-ink-line bg-ink-soft">
      <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="p-6 md:p-8">
          <p className="text-[10px] uppercase tracking-[0.3em] text-gold">{chapter.eyebrow}</p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <span className="text-[10px] uppercase tracking-[0.28em] text-paper-muted">
              Bloco {chapterIndex + 1} de {totalChapters}
            </span>
            <span className="h-px w-10 bg-gold/50" />
            <span className="text-[10px] uppercase tracking-[0.28em] text-paper-muted">
              argumento de valor
            </span>
          </div>

          <h1 className="mt-5 max-w-4xl font-serif text-4xl leading-[1.02] text-paper md:text-6xl">
            {chapter.title}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-paper-soft">{chapter.summary}</p>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-paper-muted">{chapter.description}</p>

          <div className="mt-8 grid gap-3 md:grid-cols-2">
            {chapter.features.map((feature) => (
              <div key={feature} className="border border-ink-line bg-background/50 px-4 py-4">
                <p className="text-sm leading-relaxed text-paper-soft">{feature}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {chapter.liveDemoUrl && chapter.ctaLabel && (
              <a
                href={chapter.liveDemoUrl}
                target="_blank"
                rel="noreferrer"
                className="hover-gold-shimmer inline-flex items-center gap-3 px-6 py-4 text-[11px] uppercase tracking-[0.25em] text-gold-foreground shadow-gold-glow"
              >
                {chapter.ctaLabel}
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
        </div>

        <div className="border-l border-ink-line bg-background/40 p-4 md:p-6">
          <div className="overflow-hidden border border-ink-line bg-background">
            <img
              src={chapter.screenshot}
              alt={chapter.title}
              className="h-full w-full object-cover"
            />
          </div>
          <p className="mt-4 text-xs leading-relaxed text-paper-muted">
            Recorte real do ambiente que dá materialidade a esta proposta comercial.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-ink-line bg-background/60 px-6 py-5 md:px-8">
        <button
          type="button"
          onClick={onPrevious}
          disabled={!hasPrevious}
          className={[
            "inline-flex items-center gap-2 border px-4 py-3 text-[11px] uppercase tracking-[0.25em] transition-all",
            hasPrevious
              ? "border-ink-line text-paper hover:border-gold/40 hover:text-gold"
              : "cursor-not-allowed border-ink-line/40 text-paper-muted/60"
          ].join(" ")}
        >
          <ChevronLeft className="h-3.5 w-3.5" />
          Ponto anterior
        </button>

        <button
          type="button"
          onClick={onNext}
          disabled={!hasNext}
          className={[
            "inline-flex items-center gap-2 border px-4 py-3 text-[11px] uppercase tracking-[0.25em] transition-all",
            hasNext
              ? "border-gold/40 text-gold hover:bg-gold/10"
              : "cursor-not-allowed border-ink-line/40 text-paper-muted/60"
          ].join(" ")}
        >
          Próximo diferencial
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </article>
  );
};
