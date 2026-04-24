import Image from "next/image";

import { ButtonLink, Pill, SurfaceCard } from "@plataforma/ui";

import { MemberApplicationsPanel } from "../../components/member-applications-panel";
import { MemberShell } from "../../components/member-shell";
import { getCatalogCourses, getLearningOverview } from "../../lib/platform-api";

export default async function LearningOverviewPage() {
  const [overview, courses] = await Promise.all([getLearningOverview(), getCatalogCourses()]);
  const currentCourse = overview.enrolledCourses[0];

  if (!currentCourse) {
    return (
      <MemberShell
        bannerImage={courses[0]?.thumbnailUrl}
        currentSection="learning"
        eyebrow="area do aluno"
        title="Minha area de cursos"
        subtitle="Nao ha cursos configurados nesta base de demonstracao."
      >
        <section className="member-page-section" />
      </MemberShell>
    );
  }

  return (
    <MemberShell
      bannerImage="/references/harley-bio-dourada-2.png"
      currentSection="learning"
      eyebrow="lancamento"
      title="Minha area de cursos"
      subtitle="Leia o corpo, conecte-se com a alma e acompanhe seus cursos em um ambiente inspirado diretamente na sua plataforma WordPress."
    >
      <section className="member-page-section">
        <div className="academy-info-card">
          <div className="academy-info-card-logo">
            <Image src="/references/logo-sem-fundo-192.png" alt="Instituto Metaterapia" width={120} height={120} />
          </div>
          <div className="academy-info-card-copy">
            <p>Use esse conteudo sem moderacao, desde que use para propagacao do Reino de Deus na Terra.</p>
            <strong>Tenha responsabilidade!</strong>
          </div>
          <div className="academy-social-list">
            <span className="academy-social-bubble">IG</span>
            <span className="academy-social-bubble">YT</span>
          </div>
        </div>
      </section>

      <section className="member-page-section">
        <div className="member-section-heading academy-section-heading">
          <span className="member-card-kicker">introducao e boas vindas</span>
          <h2>Comece por aqui para entender como funciona a plataforma.</h2>
          <p>Biblioteca interna, retomada de aulas e liberacoes internas em um layout muito mais proximo da sua referencia.</p>
        </div>

        <div className="member-dashboard-grid">
          <SurfaceCard className="member-highlight-card">
            <span className="member-card-kicker">continue de onde parou</span>
            <h2>{currentCourse.title}</h2>
            <p>
              {currentCourse.nextLesson
                ? `A proxima aula sugerida para voce e ${currentCourse.nextLesson}.`
                : "Sua trilha esta pronta para retomada imediata."}
            </p>
            <div className="member-card-actions">
              <ButtonLink href={`/learning/${currentCourse.slug}`}>Continuar curso</ButtonLink>
              <ButtonLink href="/catalog">Explorar catalogo</ButtonLink>
            </div>
          </SurfaceCard>

          <SurfaceCard className="member-side-summary">
            <div className="member-stat-list">
              <div className="member-stat-item">
                <span>Seu progresso</span>
                <strong>{currentCourse.completionPct}%</strong>
              </div>
              <div className="member-stat-item">
                <span>Certificados</span>
                <strong>{overview.certificatesReady}</strong>
              </div>
              <div className="member-stat-item">
                <span>Ritmo atual</span>
                <strong>{currentCourse.nextLesson ? "retomada recomendada" : "trilha em dia"}</strong>
              </div>
            </div>
          </SurfaceCard>
        </div>
      </section>

      <section className="member-page-section">
        <div className="member-section-heading academy-section-heading">
          <span className="member-card-kicker">minha biblioteca</span>
          <h2>Cursos ativos e trilhas recomendadas</h2>
        </div>
        <div className="member-library-grid">
          {courses.map((course, index) => {
            const enrolledCourse = overview.enrolledCourses.find((item) => item.slug === course.slug);

            return (
              <SurfaceCard key={course.id} className="member-course-card">
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

      <section className="member-page-section">
        <div className="member-section-heading">
          <span className="member-card-kicker">solicitacoes internas</span>
          <h2>Afiliacao e publicacao de cursos acontecem aqui por dentro</h2>
        </div>
        <MemberApplicationsPanel />
      </section>
    </MemberShell>
  );
}
