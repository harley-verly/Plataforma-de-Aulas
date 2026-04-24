import { notFound } from "next/navigation";

import { demoCourses } from "@plataforma/contracts";
import { Pill, SectionHeading, SurfaceCard } from "@plataforma/ui";

import { SiteShell } from "../../../components/site-shell";

export default async function LearningCoursePage({
  params
}: {
  params: Promise<{ courseSlug: string }>;
}) {
  const { courseSlug } = await params;
  const course = demoCourses.find((item) => item.slug === courseSlug);

  if (!course) {
    notFound();
  }

  const firstLesson = course.modules[0]?.lessons[0];

  return (
    <SiteShell title={course.title} subtitle="Consumo guiado com video, materiais e progresso por aula.">
      <section className="hero-grid">
        <SurfaceCard className="hero-panel hero-panel-primary">
          <p className="section-eyebrow">aula em destaque</p>
          <h2>{firstLesson?.title}</h2>
          <p>{firstLesson?.summary}</p>
          <div className="video-frame">
            <div className="video-frame-inner">
              <p>{firstLesson?.video.videoProvider.toUpperCase()}</p>
              <p>{firstLesson?.video.embedUrl}</p>
            </div>
          </div>
        </SurfaceCard>

        <SurfaceCard className="hero-panel">
          <p className="section-eyebrow">metadados de video</p>
          <ul className="check-list">
            <li>provedor: {firstLesson?.video.videoProvider}</li>
            <li>externalVideoId: {firstLesson?.video.externalVideoId}</li>
            <li>allowedDomains: {firstLesson?.video.allowedDomains.join(", ")}</li>
            <li>durationSec: {firstLesson?.video.durationSec}</li>
            <li>captionsUrl: {firstLesson?.video.captionsUrl ?? "nao informado"}</li>
          </ul>
        </SurfaceCard>
      </section>

      <section className="content-section">
        <SectionHeading
          eyebrow="progresso"
          title="Mapa de consumo"
          description="A jornada do aluno combina preview, drip controlado e materiais associados a cada aula."
        />
        <div className="module-stack">
          {course.modules.map((module) => (
            <SurfaceCard key={module.id}>
              <h3>{module.title}</h3>
              <p>{module.description}</p>
              <div className="lesson-stack">
                {module.lessons.map((lesson) => (
                  <div key={lesson.id} className="lesson-row">
                    <div>
                      <p className="lesson-title">{lesson.title}</p>
                      <p className="muted-label">{lesson.summary}</p>
                    </div>
                    <div className="lesson-tags">
                      <Pill>{lesson.isPreview ? "preview" : `drip ${lesson.dripAfterDays}d`}</Pill>
                      <Pill>{Math.round(lesson.video.durationSec / 60)} min</Pill>
                    </div>
                  </div>
                ))}
              </div>
            </SurfaceCard>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
