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

  return (
    <div className="module-stack">
      <section className="hero-grid">
        <SurfaceCard className="hero-panel hero-panel-primary">
          <p className="section-eyebrow">aula ativa</p>
          <h2>{activeLesson?.title ?? course.title}</h2>
          <p>{activeLesson?.summary ?? course.subtitle}</p>
          <div className="video-frame">
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
        </SurfaceCard>

        <SurfaceCard className="hero-panel">
          <p className="section-eyebrow">metadados ativos</p>
          <ul className="check-list">
            <li>provedor: {activeLesson?.videoProvider ?? "indisponivel"}</li>
            <li>externalVideoId: {activeLesson?.externalVideoId ?? "-"}</li>
            <li>duracao estimada: {activeLesson ? Math.round(activeLesson.durationSec / 60) : 0} min</li>
            <li>preview: {activeLesson?.isPreview ? "sim" : "nao"}</li>
            <li>captions: {activeLesson?.captionsUrl ?? "nao informado"}</li>
          </ul>
        </SurfaceCard>
      </section>

      {feedback ? <div className="status-banner status-banner-success">{feedback}</div> : null}

      <div className="module-stack">
        {course.modules.map((module) => (
          <SurfaceCard key={module.id}>
            <h3>{module.title}</h3>
            <p>{module.description}</p>
            <div className="lesson-stack">
              {module.lessons.map((lesson) => {
                const watchedPct = progressById.get(lesson.id) ?? 0;

                return (
                  <div key={lesson.id} className="lesson-panel">
                    <div className="lesson-panel-copy">
                      <div className="course-card-meta">
                        <Pill>{lesson.isPreview ? "preview" : `drip ${lesson.dripAfterDays}d`}</Pill>
                        <Pill>{Math.round(lesson.durationSec / 60)} min</Pill>
                      </div>
                      <p className="lesson-title">{lesson.title}</p>
                      <p className="muted-label">{lesson.summary}</p>
                      <div className="progress-meter">
                        <div className="progress-bar" style={{ width: `${watchedPct}%` }} />
                      </div>
                      <p className="muted-label">progresso atual: {watchedPct}%</p>
                    </div>
                    <div className="lesson-panel-actions">
                      <button
                        className="secondary-button"
                        onClick={() => setActiveLessonId(lesson.id)}
                        type="button"
                      >
                        Abrir aula
                      </button>
                      <button
                        className="primary-button"
                        disabled={isPending}
                        onClick={() => {
                          startTransition(async () => {
                            const nextProgress = watchedPct >= 100 ? 0 : 100;
                            const response = await fetch(`${getClientApiBaseUrl()}/learning/progress`, {
                              method: "POST",
                              headers: {
                                "Content-Type": "application/json"
                              },
                              body: JSON.stringify({
                                lessonId: lesson.id,
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
                                  progressLesson.lessonId === lesson.id
                                    ? {
                                        ...progressLesson,
                                        watchedPct: nextProgress
                                      }
                                    : progressLesson
                                )
                              }))
                            }));
                            setFeedback(
                              nextProgress === 100
                                ? "Aula marcada como concluida."
                                : "Progresso da aula reiniciado para a demonstracao."
                            );
                          });
                        }}
                        type="button"
                      >
                        {watchedPct >= 100 ? "Reiniciar" : "Marcar concluida"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </SurfaceCard>
        ))}
      </div>
    </div>
  );
}
