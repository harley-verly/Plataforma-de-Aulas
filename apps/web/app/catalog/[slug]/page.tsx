import { notFound } from "next/navigation";

import { demoCourses } from "@plataforma/contracts";
import { ButtonLink, Pill, SectionHeading, SurfaceCard } from "@plataforma/ui";

import { SiteShell } from "../../../components/site-shell";

export default async function CourseDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = demoCourses.find((item) => item.slug === slug);

  if (!course) {
    notFound();
  }

  const totalLessons = course.modules.reduce((acc, module) => acc + module.lessons.length, 0);
  const totalDuration = Math.round(
    course.modules.flatMap((module) => module.lessons).reduce((acc, lesson) => acc + lesson.video.durationSec, 0) / 60
  );

  return (
    <SiteShell title={course.title} subtitle={course.subtitle}>
      <section className="hero-grid">
        <SurfaceCard className="hero-panel hero-panel-primary">
          <div className="course-card-meta">
            <Pill>{course.producerName}</Pill>
            <Pill>{course.audience}</Pill>
          </div>
          <h2>{course.summary}</h2>
          <p>{course.transformation}</p>
          <div className="hero-actions">
            <ButtonLink href={`/checkout/${course.offers[0]?.id}?course=${course.slug}`}>Ir para checkout</ButtonLink>
          </div>
        </SurfaceCard>

        <SurfaceCard className="hero-panel">
          <p className="section-eyebrow">escopo do curso</p>
          <ul className="check-list">
            <li>{totalLessons} aulas distribuidas em modulos progressivos</li>
            <li>{totalDuration} minutos estimados de conteudo</li>
            <li>certificado, materiais e retomada de progresso</li>
            <li>video principal em Panda com fallback em YouTube</li>
          </ul>
        </SurfaceCard>
      </section>

      <section className="content-section">
        <SectionHeading
          eyebrow="ofertas"
          title="Modelos comerciais prontos"
          description="A fundacao considera compra avulsa e recorrencia, com encaixe para cupons, afiliacao e trilha de comissao."
        />
        <div className="feature-grid">
          {course.offers.map((offer) => (
            <SurfaceCard key={offer.id}>
              <Pill>{offer.billingModel === "subscription" ? "recorrencia" : "avulso"}</Pill>
              <h3>{offer.title}</h3>
              <p>{offer.description}</p>
              <p className="offer-price">{offer.priceLabel}</p>
              <ButtonLink href={`/checkout/${offer.id}?course=${course.slug}`}>Abrir checkout</ButtonLink>
            </SurfaceCard>
          ))}
        </div>
      </section>

      <section className="content-section">
        <SectionHeading
          eyebrow="modulos"
          title="Conteudo desenhado para consumo real"
          description="Cada aula traz metadados de video, preview, drip e materiais complementares."
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
                      <Pill>{lesson.video.videoProvider}</Pill>
                      <Pill>{lesson.isPreview ? "preview" : `drip ${lesson.dripAfterDays}d`}</Pill>
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
