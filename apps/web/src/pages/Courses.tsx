import { useQuery } from "@tanstack/react-query";

import { CourseCard } from "@/components/site/CourseCard";
import { SectionLabel } from "@/components/site/SectionLabel";
import { SiteLayout } from "@/components/site/SiteLayout";
import { getCatalogCourses } from "@/lib/platform-api";

const CoursesPage = () => {
  const { data: courses } = useQuery({
    queryKey: ["catalog-courses"],
    queryFn: getCatalogCourses
  });

  return (
    <SiteLayout>
      <section className="container-editorial pb-12 pt-12 md:pt-20">
        <SectionLabel number="03">Catalogo premium</SectionLabel>
        <h1 className="mt-8 max-w-4xl font-serif text-5xl leading-[1] text-paper md:text-7xl text-balance">
          Cursos que entram em cena com oferta, experiencia e <em className="italic text-gold-soft">governanca</em>.
        </h1>
        <p className="mt-8 max-w-2xl text-lg text-paper-soft">
          Cada produto nasce com pagina comercial, checkout conectado e area do aluno pronta para sustentar
          a promessa feita na venda.
        </p>
      </section>

      <section className="container-editorial pb-24">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {(courses ?? []).map((course) => (
            <CourseCard key={course.slug} course={course} />
          ))}
        </div>
      </section>
    </SiteLayout>
  );
};

export default CoursesPage;
