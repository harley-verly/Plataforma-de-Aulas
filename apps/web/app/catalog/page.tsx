import { demoCourses } from "@plataforma/contracts";
import { SectionHeading } from "@plataforma/ui";

import { CourseCard } from "../../components/course-card";
import { SiteShell } from "../../components/site-shell";

export default function CatalogPage() {
  return (
    <SiteShell
      title="Catalogo premium"
      subtitle="Uma vitrine preparada para descoberta, prova de valor e transicao natural para checkout."
    >
      <section className="content-section">
        <SectionHeading
          eyebrow="cursos"
          title="Ofertas estruturadas para venda e entrega"
          description="O catalogo combina narrativa clara, prova de valor e preparacao para checkout avulso ou recorrente."
        />
        <div className="card-grid">
          {demoCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
