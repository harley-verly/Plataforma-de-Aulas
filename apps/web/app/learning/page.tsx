import { ButtonLink, Pill, SectionHeading, SurfaceCard } from "@plataforma/ui";

import { SiteShell } from "../../components/site-shell";
import { getCatalogCourses, getLearningOverview } from "../../lib/platform-api";

export default async function LearningOverviewPage() {
  const [overview, courses] = await Promise.all([getLearningOverview(), getCatalogCourses()]);
  const currentCourse = overview.enrolledCourses[0];

  if (!currentCourse) {
    return (
      <SiteShell eyebrow="area do aluno" title="Learning" subtitle="Nao ha cursos configurados nesta base de demonstracao.">
        <section className="content-section" />
      </SiteShell>
    );
  }

  return (
    <SiteShell
      eyebrow="area do aluno"
      title="Learning"
      subtitle="Uma biblioteca com destaque editorial, retomada clara e clima de academia premium para continuar consumindo aulas."
    >
      <section className="member-stage">
        <SurfaceCard className="member-stage-main">
          <p className="section-eyebrow">retomar agora</p>
          <h2>{currentCourse.title}</h2>
          <p>
            {currentCourse.nextLesson
              ? `A proxima aula sugerida nesta trilha e ${currentCourse.nextLesson}.`
              : "Sua trilha ja esta pronta para retomada."}
          </p>
          <div className="hero-actions">
            <ButtonLink href={`/learning/${currentCourse.slug}`}>Continuar curso</ButtonLink>
            <ButtonLink href="/catalog">Ver catalogo</ButtonLink>
          </div>
          <div className="story-facts">
            <div className="story-fact">
              <span className="story-fact-label">progresso atual</span>
              <strong>{currentCourse.completionPct}%</strong>
            </div>
            <div className="story-fact">
              <span className="story-fact-label">certificados prontos</span>
              <strong>{overview.certificatesReady}</strong>
            </div>
            <div className="story-fact">
              <span className="story-fact-label">status do ritmo</span>
              <strong>{currentCourse.nextLesson ? "retomada recomendada" : "trilha em dia"}</strong>
            </div>
          </div>
        </SurfaceCard>

        <SurfaceCard className="member-stage-side">
          <p className="section-eyebrow">carteira do aluno</p>
          <div className="story-list">
            <div className="story-list-item">
              <span>curso em foco</span>
              <strong>{currentCourse.title}</strong>
            </div>
            <div className="story-list-item">
              <span>drip e previews</span>
              <strong>ativos por configuracao</strong>
            </div>
            <div className="story-list-item">
              <span>certificados</span>
              <strong>{overview.certificatesReady} prontos</strong>
            </div>
          </div>
        </SurfaceCard>
      </section>

      <section className="content-section">
        <SectionHeading
          eyebrow="minha biblioteca"
          title="Cursos ativos e trilhas sugeridas"
          description="Cada bloco abaixo representa como o aluno enxerga a carteira de aprendizagem dentro de uma area de membros mais editorial."
        />
        <div className="feature-grid">
          {courses.map((course, index) => {
            const enrolledCourse = overview.enrolledCourses.find((item) => item.slug === course.slug);

            return (
              <SurfaceCard key={course.id} className="feature-card">
                <div className="course-card-meta">
                  <Pill>{enrolledCourse ? "matriculado" : index === 0 ? "matriculado" : "sugerido"}</Pill>
                  <Pill>{course.offers.length} ofertas</Pill>
                </div>
                <h3>{course.title}</h3>
                <p>{course.summary}</p>
                {enrolledCourse ? <p className="muted-label">progresso atual: {enrolledCourse.completionPct}%</p> : null}
                <ButtonLink href={`/learning/${course.slug}`}>Abrir trilha</ButtonLink>
              </SurfaceCard>
            );
          })}
        </div>
      </section>
    </SiteShell>
  );
}
