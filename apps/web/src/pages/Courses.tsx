import { useQuery } from "@tanstack/react-query";
import { SiteLayout } from "@/components/site/SiteLayout";
import { SectionLabel } from "@/components/site/SectionLabel";
import { CourseCard } from "@/components/site/CourseCard";
import { courses } from "@/data/portal";
import { getCatalogCourses } from "@/lib/platform-api";

const CoursesPage = () => {
  const { data: apiCourses } = useQuery({
    queryKey: ["catalog-courses"],
    queryFn: getCatalogCourses
  });
  const list = (apiCourses ?? courses).filter((c) => c.status === "publicado");
  return (
    <SiteLayout>
      <section className="container-editorial pt-12 pb-12 md:pt-20">
        <SectionLabel number="03">Cursos & Capacitações</SectionLabel>
        <h1 className="mt-8 max-w-4xl font-serif text-5xl leading-[1] text-paper md:text-7xl text-balance">
          Conhecimento aplicado <em className="italic text-gold-soft">à realidade</em> do pequeno negócio.
        </h1>
        <p className="mt-8 max-w-2xl text-lg text-paper-soft">
          Programas curtos, intensivos e práticos. Cada turma reúne empreendedores em estágios
          semelhantes para que cada conversa avance o negócio.
        </p>
      </section>

      <section className="container-editorial pb-24">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {list.map((c) => (
            <CourseCard key={c.slug} course={c} />
          ))}
        </div>
      </section>
    </SiteLayout>
  );
};

export default CoursesPage;
