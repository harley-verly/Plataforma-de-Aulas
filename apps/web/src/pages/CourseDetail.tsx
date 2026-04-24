import { useQuery } from "@tanstack/react-query";
import { Clock, GraduationCap, MonitorPlay } from "lucide-react";
import { Link, useParams } from "react-router-dom";

import { GoldButton } from "@/components/site/GoldButton";
import { SectionLabel } from "@/components/site/SectionLabel";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { getCourseDetails } from "@/lib/platform-api";

function formatDuration(totalDurationSec: number) {
  const totalMinutes = Math.max(1, Math.round(totalDurationSec / 60));
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (!hours) {
    return `${minutes} min`;
  }

  if (!minutes) {
    return `${hours}h`;
  }

  return `${hours}h ${minutes}min`;
}

const CourseDetail = () => {
  const { slug } = useParams();
  const { data: course } = useQuery({
    queryKey: ["catalog-course", slug],
    queryFn: () => getCourseDetails(slug ?? ""),
    enabled: Boolean(slug)
  });

  if (!course) {
    return (
      <SiteLayout>
        <div className="container-editorial py-32 text-center">
          <h1 className="font-serif text-4xl text-paper">Curso nao encontrado</h1>
          <Link to="/catalog" className="mt-6 inline-block editorial-link">
            Voltar para o catalogo
          </Link>
        </div>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <section className="container-editorial pb-12 pt-12 md:pt-20">
        <SectionLabel number="03">Curso</SectionLabel>
        <div className="mt-8 grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h1 className="font-serif text-5xl leading-[1] text-paper md:text-7xl text-balance">{course.title}</h1>
            <p className="mt-8 font-serif text-2xl leading-snug text-paper-soft md:text-3xl">{course.subtitle}</p>
            <p className="mt-6 text-base leading-relaxed text-paper-soft">{course.summary}</p>

            <div className="mt-10 grid grid-cols-3 gap-px overflow-hidden border border-ink-line bg-ink-line">
              {[
                { icon: Clock, label: "Duracao", value: formatDuration(course.totalDurationSec) },
                { icon: MonitorPlay, label: "Modulos", value: `${course.modules.length}` },
                { icon: GraduationCap, label: "Aulas", value: `${course.lessonCount}` }
              ].map((item) => (
                <div key={item.label} className="bg-ink-soft p-6">
                  <item.icon className="h-4 w-4 text-gold" />
                  <p className="mt-3 text-[10px] uppercase tracking-[0.3em] text-paper-muted">{item.label}</p>
                  <p className="mt-1 font-serif text-2xl text-paper">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <SectionLabel>Estrutura da experiencia</SectionLabel>
              <Accordion type="single" collapsible className="mt-6 border-t border-ink-line">
                {course.modules.map((module, index) => (
                  <AccordionItem key={module.id} value={module.id} className="border-b border-ink-line">
                    <AccordionTrigger className="py-5 text-left font-serif text-xl text-paper hover:no-underline">
                      <span className="flex items-baseline gap-4">
                        <span className="text-gold-soft">{String(index + 1).padStart(2, "0")}</span>
                        <span>{module.title}</span>
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="pb-5 text-paper-soft">
                      <p className="mb-4">{module.description}</p>
                      <ul className="space-y-3">
                        {module.lessons.map((lesson) => (
                          <li key={lesson.id} className="flex items-start justify-between gap-4 border-t border-ink-line/60 pt-3">
                            <div>
                              <p className="text-paper">{lesson.title}</p>
                              <p className="text-sm text-paper-muted">{lesson.summary}</p>
                            </div>
                            <span className="text-[10px] uppercase tracking-[0.22em] text-gold">
                              {lesson.isPreview ? "preview" : `${lesson.dripAfterDays}d`}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>

          <aside className="lg:col-span-5">
            <div className="sticky top-28 border border-ink-line bg-ink-soft p-8">
              <div className="aspect-[4/5] overflow-hidden border border-ink-line">
                <img src={course.thumbnailUrl} alt={course.title} className="h-full w-full object-cover" />
              </div>
              <p className="mt-6 text-[11px] uppercase tracking-[0.3em] text-gold">Equipe responsavel</p>
              <p className="mt-2 font-serif text-2xl text-paper">{course.producerName}</p>
              <p className="mt-2 text-sm text-paper-muted">{course.audience}</p>
              <div className="mt-8 space-y-3">
                {course.offers.map((offer) => (
                  <div key={offer.id} className="border border-ink-line bg-ink p-5">
                    <p className="text-[11px] uppercase tracking-[0.22em] text-gold">{offer.title}</p>
                    <p className="mt-2 font-serif text-3xl text-paper">{offer.priceLabel}</p>
                    <p className="mt-3 text-sm text-paper-muted">{offer.description}</p>
                    <GoldButton to={`/checkout/${offer.id}`} className="mt-6 w-full justify-center">
                      Ir para checkout
                    </GoldButton>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </SiteLayout>
  );
};

export default CourseDetail;
