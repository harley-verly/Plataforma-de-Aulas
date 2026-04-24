"use client";

import { useState, useTransition } from "react";

import { Pill, SurfaceCard } from "@plataforma/ui";

import { getClientApiBaseUrl, type LearningCourseResponse } from "../lib/platform-api";

export function LearningCourseConsole({ initialCourse }: { initialCourse: LearningCourseResponse }) {
  const [course, setCourse] = useState(initialCourse);
  const [activeTab, setActiveTab] = useState<"overview" | "comments">("overview");
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
    <div className="module-stack academy-course-shell">
      {feedback ? <div className="status-banner status-banner-success">{feedback}</div> : null}

      <div className="lesson-command-bar academy-lesson-command-bar">
        <div className="lesson-command-meta academy-lesson-command-meta">
          <span>Seu progresso: {completedLessons} de {totalLessons} aulas</span>
          <strong>({overallProgress}%)</strong>
        </div>
        {activeLesson ? (
          <button
            className="primary-action"
            disabled={isPending}
            onClick={() => toggleLessonProgress(activeLesson.id, progressById.get(activeLesson.id) ?? 0)}
            type="button"
          >
            {(progressById.get(activeLesson.id) ?? 0) >= 100 ? "Marcar como pendente" : "Marcar como concluido"}
          </button>
        ) : null}
      </div>

      <div className="lesson-workspace academy-lesson-workspace">
        <section className="lesson-main-stage academy-lesson-main-stage">
          <div className="lesson-stage-top academy-lesson-stage-top">
            <div className="lesson-stage-copy academy-lesson-stage-copy">
              <p className="section-eyebrow">aula ativa</p>
              <h2>{activeLesson?.title ?? course.title}</h2>
              <p>{activeLesson?.summary ?? course.subtitle}</p>
            </div>
            <div className="lesson-stage-summary academy-lesson-stage-summary">
              <Pill>{activeLesson?.videoProvider ?? "video"}</Pill>
              <Pill>{activeLesson ? `${Math.round(activeLesson.durationSec / 60)} min` : "0 min"}</Pill>
              <Pill>{activeLesson?.isPreview ? "preview" : "aula liberada"}</Pill>
            </div>
          </div>

          <div className="video-frame lesson-video-frame academy-video-frame">
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

          <div className="lesson-panel-tabs academy-lesson-tabs">
            <button
              className={activeTab === "overview" ? "lesson-tab-button lesson-tab-button-active" : "lesson-tab-button"}
              onClick={() => setActiveTab("overview")}
              type="button"
            >
              Visao geral
            </button>
            <button
              className={activeTab === "comments" ? "lesson-tab-button lesson-tab-button-active" : "lesson-tab-button"}
              onClick={() => setActiveTab("comments")}
              type="button"
            >
              Comentarios
            </button>
          </div>

          {activeTab === "overview" ? (
            <div className="lesson-support-grid academy-lesson-support-grid">
              <SurfaceCard className="inline-card academy-support-card">
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

              <SurfaceCard className="inline-card academy-support-card">
                <p className="muted-label">Sobre a aula</p>
                <ul className="check-list">
                  <li>externalVideoId: {activeLesson?.externalVideoId ?? "-"}</li>
                  <li>drip desta aula: {activeLesson?.dripAfterDays ?? 0} dia(s)</li>
                  <li>captions: {activeLesson?.captionsUrl ?? "nao informado"}</li>
                  <li>curso: {course.title}</li>
                </ul>
              </SurfaceCard>
            </div>
          ) : (
            <SurfaceCard className="inline-card lesson-comments-card academy-support-card">
              <p className="muted-label">Comentarios da aula</p>
              <p>
                Este bloco representa a extensao natural da area interna para duvidas, conversa e suporte do aluno sem
                quebrar o visual principal da trilha.
              </p>
            </SurfaceCard>
          )}
        </section>

        <aside className="lesson-sidebar academy-lesson-sidebar">
          <div className="lesson-sidebar-header academy-lesson-sidebar-header">
            <p className="section-eyebrow">conteudo do curso</p>
            <h3>{course.title}</h3>
            <p className="muted-label">Biblioteca lateral com modulos, tempo estimado e marcacao rapida de progresso.</p>
          </div>

          <div className="lesson-sidebar-body academy-lesson-sidebar-body">
            {course.modules.map((module) => (
              <div key={module.id} className="lesson-sidebar-section academy-module-section">
                <div className="lesson-sidebar-title academy-module-title">
                  <strong>{module.title}</strong>
                  <span>{module.description}</span>
                </div>
                <div className="lesson-nav-group">
                  {module.lessons.map((lesson) => {
                    const watchedPct = progressById.get(lesson.id) ?? 0;

                    return (
                      <div
                        key={lesson.id}
                        className={
                          lesson.id === activeLessonId
                            ? "lesson-nav-card lesson-nav-card-active academy-lesson-nav-card"
                            : "lesson-nav-card academy-lesson-nav-card"
                        }
                      >
                        <button
                          className="lesson-nav-main academy-lesson-nav-main"
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
