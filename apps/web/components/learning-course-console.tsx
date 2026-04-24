"use client";

import { useState, useTransition } from "react";

import { Pill, SurfaceCard } from "@plataforma/ui";

import { getClientApiBaseUrl, type LearningCourseResponse } from "../lib/platform-api";

export function LearningCourseConsole({ initialCourse }: { initialCourse: LearningCourseResponse }) {
  const [course, setCourse] = useState(initialCourse);
  const [activeLessonId, setActiveLessonId] = useState(
    initialCourse.progress.flatMap((module) => module.lessons).find((lesson) => lesson.watchedPct < 100)?.lessonId ??
      initialCourse.progress[0]?.lessons[0]?.lessonId ??
      initialCourse.modules[0]?.lessons[0]?.id
  );
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const allLessons = course.modules.flatMap((module) => module.lessons);
  const activeLesson = allLessons.find((lesson) => lesson.id === activeLessonId);
  const progressById = new Map(
    course.progress.flatMap((module) => module.lessons).map((lesson) => [lesson.lessonId, lesson.watchedPct])
  );
  const totalLessons = allLessons.length;
  const completedLessons = Array.from(progressById.values()).filter((value) => value >= 100).length;
  const overallProgress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  const toggleLessonProgress = (lessonId: string, watchedPct: number) => {
    startTransition(async () => {
      const nextProgress = watchedPct >= 100 ? 0 : 100;
      const response = await fetch(`${getClientApiBaseUrl()}/learning/progress`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          lessonId,
          watchedPct: nextProgress
        })
      });

      if (!response.ok) {
        setFeedback("Nao foi possivel atualizar o progresso desta aula.");
        return;
      }

      setCourse((current) => ({
        ...current,
        progress: current.progress.map((progressModule) => ({
          ...progressModule,
          lessons: progressModule.lessons.map((progressLesson) =>
            progressLesson.lessonId === lessonId
              ? {
                  ...progressLesson,
                  watchedPct: nextProgress
                }
              : progressLesson
          )
        }))
      }));
      setFeedback(
        nextProgress === 100 ? "Aula marcada como concluida." : "Progresso da aula reiniciado para a demonstracao."
      );
    });
  };

  return (
    <div className="module-stack">
      {feedback ? <div className="status-banner status-banner-success">{feedback}</div> : null}

      <div className="lesson-workspace">
        <section className="lesson-main-stage">
          <div className="lesson-stage-top">
            <div className="lesson-stage-copy">
              <p className="section-eyebrow">aula ativa</p>
              <h2>{activeLesson?.title ?? course.title}</h2>
              <p>{activeLesson?.summary ?? course.subtitle}</p>
            </div>
            <div className="lesson-stage-summary">
              <Pill>{activeLesson?.videoProvider ?? "video"}</Pill>
              <Pill>{activeLesson ? `${Math.round(activeLesson.durationSec / 60)} min` : "0 min"}</Pill>
              <Pill>{activeLesson?.isPreview ? "preview" : "aula liberada"}</Pill>
            </div>
          </div>

          <div className="video-frame lesson-video-frame">
            {activeLesson ? (
              <iframe
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="embed-frame"
                referrerPolicy="strict-origin-when-cross-origin"
                src={activeLesson.embedUrl}
                title={activeLesson.title}
              />
            ) : (
              <div className="video-frame-inner">
                <p>Nenhuma aula encontrada para esta trilha.</p>
              </div>
            )}
          </div>

          <div className="lesson-support-grid">
            <SurfaceCard className="inline-card">
              <p className="muted-label">Resumo da trilha</p>
              <div className="course-card-meta">
                <Pill>{completedLessons}/{totalLessons} concluidas</Pill>
                <Pill>{overallProgress}% total</Pill>
              </div>
              <div className="progress-meter">
                <div className="progress-bar" style={{ width: `${overallProgress}%` }} />
              </div>
              <p className="muted-label">Seu progresso geral fica visivel antes mesmo de abrir o menu lateral.</p>
            </SurfaceCard>

            <SurfaceCard className="inline-card">
              <p className="muted-label">Metadados ativos</p>
              <ul className="check-list">
                <li>externalVideoId: {activeLesson?.externalVideoId ?? "-"}</li>
                <li>drip desta aula: {activeLesson?.dripAfterDays ?? 0} dia(s)</li>
                <li>captions: {activeLesson?.captionsUrl ?? "nao informado"}</li>
                <li>curso: {course.title}</li>
              </ul>
              {activeLesson ? (
                <button
                  className="primary-button"
                  disabled={isPending}
                  onClick={() => toggleLessonProgress(activeLesson.id, progressById.get(activeLesson.id) ?? 0)}
                  type="button"
                >
                  {(progressById.get(activeLesson.id) ?? 0) >= 100 ? "Reiniciar aula ativa" : "Marcar aula ativa como concluida"}
                </button>
              ) : null}
            </SurfaceCard>
          </div>
        </section>

        <aside className="lesson-sidebar">
          <div className="lesson-sidebar-header">
            <p className="section-eyebrow">conteudo do curso</p>
            <h3>{course.title}</h3>
            <p className="muted-label">Biblioteca lateral com modulos, tempo estimado e marcacao rapida de progresso.</p>
          </div>

          <div className="lesson-sidebar-body">
            {course.modules.map((module) => (
              <div key={module.id} className="lesson-sidebar-section">
                <div className="lesson-sidebar-title">
                  <strong>{module.title}</strong>
                  <span>{module.description}</span>
                </div>
                <div className="lesson-nav-group">
                  {module.lessons.map((lesson) => {
                    const watchedPct = progressById.get(lesson.id) ?? 0;

                    return (
                      <div
                        key={lesson.id}
                        className={lesson.id === activeLessonId ? "lesson-nav-card lesson-nav-card-active" : "lesson-nav-card"}
                      >
                        <button
                          className="lesson-nav-main"
                          onClick={() => setActiveLessonId(lesson.id)}
                          type="button"
                        >
                          <span className="lesson-nav-copy">
                            <strong>{lesson.title}</strong>
                            <span>{lesson.summary}</span>
                          </span>
                          <span className="lesson-nav-meta">
                            <Pill>{Math.round(lesson.durationSec / 60)} min</Pill>
                            <Pill>{lesson.isPreview ? "preview" : `${watchedPct}%`}</Pill>
                          </span>
                        </button>

                        <div className="lesson-nav-footer">
                          <div className="progress-meter">
                            <div className="progress-bar" style={{ width: `${watchedPct}%` }} />
                          </div>
                          <button
                            className="secondary-button"
                            disabled={isPending}
                            onClick={() => toggleLessonProgress(lesson.id, watchedPct)}
                            type="button"
                          >
                            {watchedPct >= 100 ? "Reiniciar" : "Concluir"}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
