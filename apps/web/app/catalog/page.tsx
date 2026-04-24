import Link from "next/link";

import { demoCourses } from "@plataforma/contracts";

import { CourseCard } from "../../components/course-card";
import { SiteShell } from "../../components/site-shell";

export default function CatalogPage() {
  return (
    <SiteShell>
      <section className="marketing-page-hero">
        <span className="marketing-kicker">catalogo oficial</span>
        <h1>
          Cursos, trilhas e ofertas em uma
          <span> vitrine premium</span>
        </h1>
        <p>
          A area externa do catalogo segue a mesma identidade da landing principal: contraste forte, centro de atencao
          bem definido e CTA limpo para oferta e checkout.
        </p>
        <div className="marketing-hero-actions marketing-hero-actions-left">
          <Link href="/login" className="primary-action workspace-link">
            Entrar
          </Link>
          <Link href="/" className="secondary-action workspace-link">
            Voltar para home
          </Link>
        </div>
      </section>

      <section className="marketing-course-section">
        <div className="card-grid">
          {demoCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
