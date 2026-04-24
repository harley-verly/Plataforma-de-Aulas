import Link from "next/link";
import { notFound } from "next/navigation";

import { demoCourses } from "@plataforma/contracts";
import { Pill } from "@plataforma/ui";

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
    <SiteShell>
      <section className="marketing-detail-hero">
        <div className="marketing-detail-copy">
          <span className="marketing-kicker">{course.category}</span>
          <h1>{course.title}</h1>
          <p>{course.subtitle}</p>
          <div className="auth-pill-row">
            <span className="scope-pill">{course.producerName}</span>
            <span className="scope-pill">{course.audience}</span>
          </div>
        </div>

        <aside className="marketing-detail-offer">
          <span className="eyebrow">escopo do curso</span>
          <div className="marketing-stat-list">
            <div>
              <strong>{totalLessons}</strong>
              <span>aulas distribuidas em modulos</span>
            </div>
            <div>
              <strong>{totalDuration} min</strong>
              <span>duracao estimada da trilha</span>
            </div>
          </div>
          <div className="marketing-inline-actions">
            <Link href={`/checkout/${course.offers[0]?.id}?course=${course.slug}`} className="primary-action workspace-link">
              Ir para checkout
            </Link>
            <Link href="/catalog" className="ghost-link">
              Voltar ao catalogo
            </Link>
          </div>
        </aside>
      </section>

      <section className="marketing-panel-grid">
        {course.offers.map((offer) => (
          <article key={offer.id} className="marketing-panel-card">
            <Pill>{offer.billingModel === "subscription" ? "recorrencia" : "avulso"}</Pill>
            <h3>{offer.title}</h3>
            <p>{offer.description}</p>
            <p className="offer-price">{offer.priceLabel}</p>
            <Link href={`/checkout/${offer.id}?course=${course.slug}`} className="button-link">
              Abrir checkout
            </Link>
          </article>
        ))}
        <article className="marketing-panel-card">
          <span className="eyebrow">transformacao prometida</span>
          <h3>{course.transformation}</h3>
          <p>{course.summary}</p>
        </article>
      </section>

      <section className="marketing-module-section">
        <div className="marketing-section-heading">
          <span className="eyebrow">modulos</span>
          <h2>Conteudo desenhado para consumo real.</h2>
          <p>Cada aula ja nasce com metadados de video, preview e ritmo de liberacao.</p>
        </div>

        <div className="module-grid">
          {course.modules.map((module) => (
            <article className="panel-card marketing-module-card" key={module.id}>
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
            </article>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
