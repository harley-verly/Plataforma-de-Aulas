import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState, useTransition } from "react";
import { CheckCircle2, Clock3, PlayCircle } from "lucide-react";
import { useParams } from "react-router-dom";

import { OperationLayout } from "@/components/platform/OperationLayout";
import { getLearningCourse, updateLessonProgress } from "@/lib/platform-api";

function formatDuration(seconds: number) {
  const minutes = Math.max(1, Math.round(seconds / 60));
  return `${minutes} min`;
}

const LearningCoursePage = () => {
  const { slug } = useParams();
  const { data, refetch } = useQuery({
    queryKey: ["learning-course", slug],
    queryFn: () => getLearningCourse(slug ?? ""),
    enabled: Boolean(slug)
  });

  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const orderedLessons = useMemo(
    () => data?.modules.flatMap((module) => module.lessons.map((lesson) => ({ module, lesson }))) ?? [],
    [data]
  );

  useEffect(() => {
    if (!data || selectedLessonId) {
      return;
    }

    const firstIncomplete =
      data.progress
        .flatMap((module) => module.lessons)
        .find((lesson) => lesson.watchedPct < 100)?.lessonId ?? orderedLessons[0]?.lesson.id ?? null;

    setSelectedLessonId(firstIncomplete);
  }, [data, orderedLessons, selectedLessonId]);

  const selectedLesson = orderedLessons.find((entry) => entry.lesson.id === selectedLessonId)?.lesson ?? null;
  const selectedProgress =
    data?.progress.flatMap((module) => module.lessons).find((lesson) => lesson.lessonId === selectedLessonId)?.watchedPct ?? 0;

  if (!data || !selectedLesson) {
    return (
      <OperationLayout title="Learning" subtitle="Preparando curso e progresso atual.">
        <p className="text-[11px] uppercase tracking-[0.3em] text-gold">Carregando trilha</p>
      </OperationLayout>
    );
  }

  return (
    <OperationLayout
      title={data.title}
      subtitle={data.subtitle}
      eyebrow="Area do aluno"
      action={
        <div className="border border-gold/30 px-4 py-3 text-[11px] uppercase tracking-[0.22em] text-gold">
          {selectedProgress}% assistido
        </div>
      }
    >
      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <div className="overflow-hidden border border-ink-line bg-ink-soft">
            <div className="aspect-video bg-ink">
              <iframe
                key={selectedLesson.id}
                src={selectedLesson.embedUrl}
                title={selectedLesson.title}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="p-8">
              <p className="text-[11px] uppercase tracking-[0.3em] text-gold">{selectedLesson.videoProvider}</p>
              <h2 className="mt-4 font-serif text-4xl text-paper">{selectedLesson.title}</h2>
              <p className="mt-4 text-base leading-relaxed text-paper-soft">{selectedLesson.summary}</p>

              <div className="mt-6 flex flex-wrap gap-3 text-[11px] uppercase tracking-[0.22em] text-paper-muted">
                <span className="border border-ink-line px-3 py-2">{formatDuration(selectedLesson.durationSec)}</span>
                <span className="border border-ink-line px-3 py-2">
                  {selectedLesson.isPreview ? "preview" : `libera em ${selectedLesson.dripAfterDays}d`}
                </span>
              </div>

              {feedback ? <p className="mt-4 text-sm text-paper-soft">{feedback}</p> : null}

              <button
                type="button"
                disabled={isPending}
                onClick={() => {
                  startTransition(() => {
                    void (async () => {
                      try {
                        await updateLessonProgress({
                          lessonId: selectedLesson.id,
                          watchedPct: 100
                        });
                        setFeedback("Progresso atualizado com sucesso.");
                        await refetch();
                      } catch {
                        setFeedback("Nao foi possivel atualizar o progresso.");
                      }
                    })();
                  });
                }}
                className="hover-gold-shimmer mt-8 px-6 py-4 text-[11px] uppercase tracking-[0.25em] text-gold-foreground"
              >
                {isPending ? "Atualizando..." : "Marcar como concluida"}
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div className="border border-ink-line bg-ink-soft p-6">
            <p className="text-[11px] uppercase tracking-[0.3em] text-gold">Progresso atual</p>
            <p className="mt-3 font-serif text-4xl text-paper">{selectedProgress}%</p>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-ink">
              <div className="h-full bg-gradient-gold" style={{ width: `${selectedProgress}%` }} />
            </div>
          </div>

          {data.modules.map((module) => (
            <div key={module.id} className="border border-ink-line bg-ink-soft p-6">
              <p className="text-[11px] uppercase tracking-[0.3em] text-gold">{module.title}</p>
              <p className="mt-3 text-sm leading-relaxed text-paper-muted">{module.description}</p>
              <div className="mt-6 space-y-3">
                {module.lessons.map((lesson) => {
                  const watchedPct =
                    data.progress
                      .flatMap((progressModule) => progressModule.lessons)
                      .find((progressLesson) => progressLesson.lessonId === lesson.id)?.watchedPct ?? 0;

                  return (
                    <button
                      key={lesson.id}
                      type="button"
                      onClick={() => setSelectedLessonId(lesson.id)}
                      className={`w-full border px-4 py-4 text-left transition-colors ${
                        lesson.id === selectedLessonId
                          ? "border-gold/40 bg-ink text-paper"
                          : "border-ink-line bg-ink/60 text-paper-soft hover:border-gold/30"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="font-serif text-xl">{lesson.title}</p>
                          <p className="mt-2 text-sm text-paper-muted">{lesson.summary}</p>
                        </div>
                        {watchedPct >= 100 ? (
                          <CheckCircle2 className="h-5 w-5 text-gold" />
                        ) : lesson.id === selectedLessonId ? (
                          <PlayCircle className="h-5 w-5 text-gold" />
                        ) : (
                          <Clock3 className="h-5 w-5 text-paper-muted" />
                        )}
                      </div>
                      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-background">
                        <div className="h-full bg-gradient-gold" style={{ width: `${watchedPct}%` }} />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </OperationLayout>
  );
};

export default LearningCoursePage;
