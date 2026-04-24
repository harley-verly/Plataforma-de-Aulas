import { ButtonLink, Pill, SectionHeading, SurfaceCard } from "@plataforma/ui";

import { SiteShell } from "../../components/site-shell";
import { getCatalogCourses, getLearningOverview } from "../../lib/platform-api";

export default async function LearningOverviewPage() {
  const [overview, courses] = await Promise.all([getLearningOverview(), getCatalogCourses()]);
  const currentCourse = overview.enrolledCourses[0];

  if (!currentCourse) {
    return (
      <SiteShell title="Learning" subtitle="Nao ha cursos configurados nesta base de demonstracao.">
        <section className="content-section" />
      </SiteShell>
    );
  }

  return (
    <SiteShell
      title="Learning"
      subtitle="Uma area do aluno pensada para consumo continuo, clareza de progresso e retomada sem atrito."
    >
      <section className="hero-grid">
        <SurfaceCard className="hero-panel hero-panel-primary">
          <p className="section-eyebrow">retomada de progresso</p>
          <h2>{currentCourse.title}</h2>
          <p>
            {currentCourse.nextLesson
              ? `Proxima aula sugerida: ${currentCourse.nextLesson}`
              : "Sua trilha ja esta pronta para retomada."}
          </p>
          <div className="hero-actions">
            <ButtonLink href={`/learning/${currentCourse.slug}`}>Continuar curso</ButtonLink>
          </div>
        </SurfaceCard>

        <SurfaceCard className="hero-panel">
          <p className="section-eyebrow">status do aluno</p>
          <ul className="check-list">
            <li>progresso consolidado atual: {currentCourse.completionPct}%</li>
            <li>drip e previews respeitados por configuracao</li>
            <li>certificados prontos: {overview.certificatesReady}</li>
          </ul>
        </SurfaceCard>
      </section>

      <section className="content-section">
        <SectionHeading
          eyebrow="minha trilha"
          title="Cursos ativos"
          description="Cada bloco abaixo representa como o aluno enxerga sua carteira de aprendizagem."
        />
        <div className="feature-grid">
          {courses.map((course, index) => {
            const enrolledCourse = overview.enrolledCourses.find((item) => item.slug === course.slug);

            return (
              <SurfaceCard key={course.id}>
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
