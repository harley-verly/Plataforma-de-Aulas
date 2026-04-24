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
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">{course.category}</span>
          <h1>{course.title}</h1>
          <p className="hero-text">{course.subtitle}</p>
          <div className="auth-pill-row">
            <span className="scope-pill">{course.producerName}</span>
            <span className="scope-pill">{course.audience}</span>
          </div>
          <div className="hero-actions">
            <Link href={`/checkout/${course.offers[0]?.id}?course=${course.slug}`} className="primary-action workspace-link">
              Ir para checkout
            </Link>
            <Link href="/catalog" className="secondary-action workspace-link">
              Voltar ao catalogo
            </Link>
          </div>
        </div>

        <aside className="hero-panel">
          <div className="stack-panel compact-stack-panel">
            <span className="eyebrow">escopo do curso</span>
            <div className="stack-row">
              <span>aulas</span>
              <strong>{totalLessons} distribuidas em modulos progressivos</strong>
            </div>
            <div className="stack-row">
              <span>duracao</span>
              <strong>{totalDuration} minutos estimados</strong>
            </div>
            <div className="stack-row">
              <span>recursos</span>
              <strong>certificado, materiais e progresso</strong>
            </div>
          </div>
        </aside>
      </section>

      <section className="content-grid">
        <div className="content-column">
          <div className="section-heading">
            <span className="eyebrow">ofertas</span>
            <h2>Modelos comerciais prontos para venda.</h2>
            <p className="section-copy">
              Compra avulsa, recorrencia e caminho preparado para afiliacao e liberacao do aluno.
            </p>
          </div>

          <div className="module-grid">
            {course.offers.map((offer) => (
              <article key={offer.id} className="panel-card">
                <Pill>{offer.billingModel === "subscription" ? "recorrencia" : "avulso"}</Pill>
                <h3>{offer.title}</h3>
                <p>{offer.description}</p>
                <p className="offer-price">{offer.priceLabel}</p>
                <Link href={`/checkout/${offer.id}?course=${course.slug}`} className="primary-action workspace-link">
                  Abrir checkout
                </Link>
              </article>
            ))}
          </div>
        </div>

        <aside className="sidebar-column">
          <div className="stack-panel">
            <span className="eyebrow">transformacao prometida</span>
            <h3>{course.transformation}</h3>
            <p>{course.summary}</p>
          </div>
        </aside>
      </section>

      <section className="content-grid">
        <div className="content-column">
          <div className="section-heading">
            <span className="eyebrow">modulos</span>
            <h2>Conteudo desenhado para consumo real.</h2>
            <p className="section-copy">Cada aula ja nasce com metadados de video, preview e ritmo de liberacao.</p>
          </div>

          <div className="module-grid">
            {course.modules.map((module) => (
              <article className="panel-card" key={module.id}>
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
        </div>
      </section>
    </SiteShell>
  );
}
