import Link from "next/link";

import { demoCourses } from "@plataforma/contracts";

import { CourseCard } from "../../components/course-card";
import { SiteShell } from "../../components/site-shell";

export default function CatalogPage() {
  return (
    <SiteShell>
      <section className="hero hero-compact">
        <div className="hero-copy">
          <span className="eyebrow">catalogo oficial</span>
          <h1>Descoberta comercial no mesmo padrao da landing externa.</h1>
          <p className="hero-text">
            Aqui o visitante enxerga o portfolio da plataforma com narrativa, oferta e transicao limpa para checkout e
            acesso.
          </p>
          <div className="hero-actions">
            <Link href="/login" className="primary-action workspace-link">
              Entrar
            </Link>
            <Link href="/" className="secondary-action workspace-link">
              Voltar para a home
            </Link>
          </div>
        </div>

        <aside className="hero-panel">
          <div className="stack-panel compact-stack-panel">
            <span className="eyebrow">curadoria</span>
            <h3>Catalogo de prova</h3>
            <p>Cursos preparados para demonstrar compra avulsa, recorrencia, video e area de membros.</p>
          </div>
        </aside>
      </section>

      <section className="content-grid">
        <div className="content-column">
          <div className="section-heading">
            <span className="eyebrow">cursos</span>
            <h2>Ofertas estruturadas para venda e entrega.</h2>
            <p className="section-copy">
              Cada card foi reposicionado para a linguagem comercial externa, mas ja aponta para uma area interna mais
              robusta.
            </p>
          </div>

          <div className="card-grid">
            {demoCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
