import { useParams, Link } from "react-router-dom";
import { Clock, Users, MonitorPlay, Download } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { SectionLabel } from "@/components/site/SectionLabel";
import { GoldButton } from "@/components/site/GoldButton";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { courses } from "@/data/portal";

const CourseDetail = () => {
  const { slug } = useParams();
  const course = courses.find((c) => c.slug === slug);
  if (!course) {
    return (
      <SiteLayout>
        <div className="container-editorial py-32 text-center">
          <h1 className="font-serif text-4xl text-paper">Curso não encontrado</h1>
          <Link to="/cursos" className="mt-6 inline-block editorial-link">Voltar para cursos</Link>
        </div>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <section className="container-editorial pt-12 pb-12 md:pt-20">
        <SectionLabel number="03">Curso</SectionLabel>
        <div className="mt-8 grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h1 className="font-serif text-5xl leading-[1] text-paper md:text-7xl text-balance">
              {course.title}
            </h1>
            <p className="mt-8 font-serif text-2xl leading-snug text-paper-soft md:text-3xl">
              {course.excerpt}
            </p>
            <p className="mt-6 text-base leading-relaxed text-paper-soft">{course.description}</p>

            <div className="mt-10 grid grid-cols-3 gap-px overflow-hidden border border-ink-line bg-ink-line">
              {[
                { icon: Clock, label: "Carga", value: course.workload },
                { icon: MonitorPlay, label: "Modalidade", value: course.modality },
                { icon: Users, label: "Vagas", value: `${course.seats}` },
              ].map((s, i) => (
                <div key={i} className="bg-ink-soft p-6">
                  <s.icon className="h-4 w-4 text-gold" />
                  <p className="mt-3 text-[10px] uppercase tracking-[0.3em] text-paper-muted">{s.label}</p>
                  <p className="mt-1 font-serif text-2xl text-paper">{s.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <SectionLabel>Cronograma</SectionLabel>
              <Accordion type="single" collapsible className="mt-6 border-t border-ink-line">
                {course.schedule.map((s, i) => (
                  <AccordionItem key={i} value={`item-${i}`} className="border-b border-ink-line">
                    <AccordionTrigger className="py-5 text-left font-serif text-xl text-paper hover:no-underline">
                      <span className="flex items-baseline gap-4">
                        <span className="text-gold-soft">{String(i + 1).padStart(2, "0")}</span>
                        <span>{s.week}</span>
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="pb-5 text-paper-soft">{s.topic}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            <div className="mt-10">
              <SectionLabel>Materiais complementares</SectionLabel>
              <ul className="mt-6 divide-y divide-ink-line border-y border-ink-line">
                {course.materials.map((m, i) => (
                  <li key={i} className="flex items-center justify-between py-4">
                    <span className="text-paper">{m.name}</span>
                    <span className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-gold">
                      {m.type}
                      <Download className="h-3.5 w-3.5" />
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <aside className="lg:col-span-5">
            <div className="sticky top-28 border border-ink-line bg-ink-soft p-8">
              <div className="aspect-[4/5] overflow-hidden border border-ink-line">
                <img src={course.image} alt={course.title} className="h-full w-full object-cover" />
              </div>
              <p className="mt-6 text-[11px] uppercase tracking-[0.3em] text-gold">Instrutor(a)</p>
              <p className="mt-2 font-serif text-2xl text-paper">{course.instructor}</p>
              <div className="mt-8">
                <GoldButton className="w-full justify-center">Quero me matricular</GoldButton>
              </div>
              <p className="mt-4 text-center text-[10px] uppercase tracking-[0.25em] text-paper-muted">
                Vagas limitadas
              </p>
            </div>
          </aside>
        </div>
      </section>
    </SiteLayout>
  );
};

export default CourseDetail;
