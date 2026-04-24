import { useQuery } from "@tanstack/react-query";
import { ArrowUpRight, GraduationCap, Presentation, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

import heroImg from "@/assets/hero-entrepreneur.jpg";
import { CourseCard } from "@/components/site/CourseCard";
import { GoldButton } from "@/components/site/GoldButton";
import { SectionLabel } from "@/components/site/SectionLabel";
import { SiteLayout } from "@/components/site/SiteLayout";
import { getHomeData } from "@/lib/platform-api";

const Index = () => {
  const { data: home } = useQuery({
    queryKey: ["catalog-home"],
    queryFn: getHomeData
  });

  if (!home) {
    return (
      <SiteLayout>
        <div className="container-editorial py-32">
          <p className="text-[11px] uppercase tracking-[0.3em] text-gold">Carregando experiencia</p>
          <h1 className="mt-6 font-serif text-5xl text-paper">Plataforma de Aulas</h1>
        </div>
      </SiteLayout>
    );
  }

  const featuredCourse = home.featuredCourses[0];

  return (
    <SiteLayout>
      <section className="relative">
        <div className="container-editorial pb-16 pt-12 md:pb-20 md:pt-20">
          <SectionLabel number="00" className="animate-fade-in">
            Plataforma proprietaria
          </SectionLabel>

          <div className="mt-10 grid gap-6 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-7">
              <h1 className="animate-fade-up font-serif text-[44px] leading-[0.98] text-paper text-balance md:text-[72px] lg:text-[92px]">
                {home.hero.title}
              </h1>
              <p className="mt-8 max-w-xl animate-fade-up text-base leading-relaxed text-paper-soft delay-200 md:text-lg">
                {home.hero.subtitle}
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-4 animate-fade-up delay-300">
                <GoldButton to="/catalog">Explorar catalogo</GoldButton>
                <Link to="/login" className="editorial-link text-[11px] uppercase tracking-[0.25em]">
                  Entrar na plataforma
                </Link>
              </div>

              <div className="mt-16 grid max-w-3xl gap-6 border-t border-ink-line pt-8 md:grid-cols-3 animate-fade-up delay-500">
                {home.metrics.slice(0, 3).map((metric) => (
                  <div key={metric.label}>
                    <div className="font-serif text-4xl text-gold-soft">{metric.value}</div>
                    <div className="mt-1 text-[10px] uppercase tracking-[0.22em] text-paper-muted">{metric.label}</div>
                    <p className="mt-2 text-sm text-paper-muted">{metric.note}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative lg:col-span-5">
              <div className="relative aspect-[4/5] overflow-hidden border border-ink-line">
                <img
                  src={featuredCourse?.thumbnailUrl ?? heroImg}
                  alt={featuredCourse?.title ?? "Ambiente premium"}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-ink/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-paper">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-gold">Em destaque</p>
                    <p className="mt-2 font-serif text-xl leading-tight">
                      {featuredCourse?.title ?? "Operacao premium de cursos"}
                    </p>
                  </div>
                  {featuredCourse ? (
                    <Link
                      to={`/catalog/${featuredCourse.slug}`}
                      className="border border-paper/30 p-2 text-paper transition-colors hover:border-gold hover:text-gold"
                      aria-label="Ver curso"
                    >
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  ) : null}
                </div>
              </div>
              <div className="absolute -inset-px -z-10 bg-gradient-radial-gold opacity-60 blur-2xl" />
            </div>
          </div>
        </div>
      </section>

      <section className="relative">
        <div className="container-editorial py-16 md:py-24">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-6 md:gap-5">
            <div className="group relative col-span-1 flex flex-col justify-between overflow-hidden border border-ink-line bg-ink-soft p-8 transition-all duration-500 hover:border-gold/40 md:col-span-2 md:row-span-2 md:p-10">
              <div>
                <p className="font-serif text-7xl text-gold-soft md:text-8xl">01</p>
                <p className="mt-4 text-[11px] uppercase tracking-[0.3em] text-gold">Arquitetura</p>
              </div>
              <div>
                <h3 className="font-serif text-3xl leading-tight text-paper md:text-4xl text-balance">
                  Catalogo, checkout e area do aluno costurados como <em className="italic text-gold-soft">um produto unico</em>.
                </h3>
                <div className="mt-6 flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-gold">
                  Experiencia conectada
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1" />
                </div>
              </div>
            </div>

            <div className="border border-ink-line bg-gradient-ink p-8 md:col-span-4 md:row-span-2 md:p-10">
              <SectionLabel number="02">Manifesto</SectionLabel>
              <p className="mt-6 font-serif text-2xl leading-snug text-paper md:text-3xl">
                A fachada comercial precisa parecer premium, e a area interna precisa sustentar a promessa
                com <em className="italic text-gold-soft">clareza operacional</em>.
              </p>
            </div>

            {[
              {
                label: "Learning",
                text: "Consumo de aulas, progresso, retomada e acompanhamento do aluno.",
                Icon: GraduationCap
              },
              {
                label: "Studio",
                text: "Operacao do produtor com pipeline, rascunhos e governanca de publicacao.",
                Icon: Presentation
              },
              {
                label: "Admin",
                text: "Aprovacoes, webhooks, leitura financeira e supervisao do staging.",
                Icon: ShieldCheck
              }
            ].map((item) => (
              <div key={item.label} className="border border-ink-line bg-ink-soft p-8">
                <item.Icon className="h-5 w-5 text-gold" />
                <p className="mt-6 text-[11px] uppercase tracking-[0.3em] text-gold">{item.label}</p>
                <p className="mt-3 text-sm leading-relaxed text-paper-soft">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative">
        <div className="container-editorial py-16 md:py-24">
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
            <div>
              <SectionLabel number="03">Cursos em destaque</SectionLabel>
              <h2 className="mt-6 max-w-3xl font-serif text-4xl leading-[1.05] text-paper md:text-6xl text-balance">
                Uma vitrine que vende a experiencia antes mesmo do <em className="italic text-gold-soft">primeiro login</em>.
              </h2>
            </div>
            <GoldButton to="/catalog" variant="ghost">
              Ver catalogo completo
            </GoldButton>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {home.featuredCourses.map((course) => (
              <CourseCard key={course.slug} course={course} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink-soft/60">
        <div className="container-editorial py-16 md:py-28">
          <div className="grid gap-5 lg:grid-cols-3">
            {home.testimonials.map((testimonial, index) => (
              <div key={`${testimonial.name}-${index}`} className="border border-ink-line bg-ink-soft p-8 md:p-10">
                <p className="font-serif text-5xl text-gold-soft">{String(index + 1).padStart(2, "0")}</p>
                <p className="mt-3 text-[11px] uppercase tracking-[0.3em] text-gold">{testimonial.name}</p>
                <p className="mt-2 text-sm uppercase tracking-[0.22em] text-paper-muted">{testimonial.role}</p>
                <p className="mt-6 text-sm leading-relaxed text-paper-soft">{testimonial.quote}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
};

export default Index;
