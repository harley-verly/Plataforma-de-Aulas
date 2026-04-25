import { PresentationChapter } from "@/lib/commercial-presentation";

type Props = {
  chapters: PresentationChapter[];
  currentChapterId: string;
  onSelectChapter: (chapterId: string) => void;
};

export const PresentationProgressNav = ({ chapters, currentChapterId, onSelectChapter }: Props) => {
  return (
    <div className="overflow-hidden border border-ink-line bg-ink-soft">
      <div className="border-b border-ink-line px-5 py-4">
        <p className="text-[10px] uppercase tracking-[0.3em] text-gold">O que esta proposta comprova</p>
        <p className="mt-2 text-sm text-paper-muted">
          Cada bloco reforça um ganho estratégico da plataforma em marca, conversão, experiência e operação.
        </p>
      </div>
      <div className="flex gap-3 overflow-x-auto px-4 py-4">
        {chapters.map((chapter, index) => {
          const isActive = chapter.id === currentChapterId;

          return (
            <button
              key={chapter.id}
              type="button"
              onClick={() => onSelectChapter(chapter.id)}
              className={[
                "min-w-[220px] flex-1 border px-4 py-4 text-left transition-all duration-300",
                isActive
                  ? "border-gold/50 bg-gold/10 shadow-gold-glow"
                  : "border-ink-line bg-background hover:border-gold/30"
              ].join(" ")}
            >
              <p className="text-[10px] uppercase tracking-[0.28em] text-gold">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h2 className="mt-3 font-serif text-2xl text-paper">{chapter.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-paper-muted">{chapter.summary}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
};
